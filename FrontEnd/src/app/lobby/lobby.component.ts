import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {RandomService} from '../services/random.service';
import {FriendsService} from '../services/friends.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ChatService} from '../services/chat.service';
import {Socket} from 'ngx-socket-io';
import english from '../language/string_en.json';
import spanish from '../language/string_es.json';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {
  private users: any;
  private mod: any;
  private userTalking: any;
  private user: string;
  private isMod: boolean;
  private turn: boolean;
  private showSeconds: string;
  private seconds: number;
  private minutes: number;
  private interval;
  private intervals;
  private room: string;
  private totalVotes: number;
  private votes: number;
  private userVotes: number;
  private position: number;
  private kicked: boolean;
  private voted: boolean;
  private topic: any;
  private strings: any;
  private voteKick: boolean;
  private asked: boolean;
  private votedUser: any;
  private isOral: any;
  private isCustom: boolean;
  private modVote: boolean;
  private isLoaded: Promise<boolean>;
  private askedUsers: any;
  private maxUsers: any;
  private isCreator: boolean;
  private randomTopics: boolean;

  constructor(private http: RandomService,
              private https: FriendsService,
              private snack: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder,
              private chat: ChatService,
              private socket: Socket) { }

  message: any;
  Message: FormGroup;
  private messages;
  noTopic: boolean;
  hasFixedTopic: boolean;
  hasFreeTopic: boolean;
  freeTopic: any;
  hasModerator: boolean;

  ngOnInit() {
    if (localStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.room = sessionStorage.getItem('room');
    this.isCustom = sessionStorage.getItem('custom') === '1';
    if (this.isCustom) {
      this.customLobby();
    } else {
      this.randomLobby();
    }
    this.intervals = setInterval(() => {
      this.checkUsers();
    }, 7000);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    if (!sessionStorage.getItem('kick')) {
      const user = this.user;
      const room = this.room;
      const creator = this.isCreator;
      const form = JSON.stringify({user, room, creator});
      if (this.isCustom) {
        this.http.postCustomDelete(form).subscribe(data => {
          if (data) {
            clearInterval(this.intervals);
            clearInterval(this.interval);
            sessionStorage.removeItem('room');
            sessionStorage.removeItem('type');
            sessionStorage.removeItem('custom');
          }
        });
      }
      this.http.postExit(form).subscribe(data => {
        if (data) {
          clearInterval(this.intervals);
          clearInterval(this.interval);
          sessionStorage.removeItem('room');
          sessionStorage.removeItem('type');
          sessionStorage.removeItem('custom');
        }
      });
    } else {
      sessionStorage.removeItem('kick');
    }
  }

  randomLobby() {
    this.messages = [];
    this.message = '';
    this.Message = this.formBuilder.group({Message: this.message});
    this.votes = 0;
    if (this.room) {
      this.user = sessionStorage.getItem('user');
      this.isOral = sessionStorage.getItem('type') === 'Oral';
      this.getUsers();
    }
    this.checkMessages();
  }

  customLobby() {
    this.isCreator = sessionStorage.getItem('creator') === '1';
    this.http.postCheck(this.room).subscribe(data => {
      this.isOral = data[0].tipo_conv === 'Oral';
      this.maxUsers = data[0].participantes_cant;
      this.hasModerator = data[0].moderador === 't';
      if (data[0].tema === 'random') {
        this.randomTopics = true;
        this.changeTopic();
      } else if (isNaN(+data[0].tema)) {
        this.hasFreeTopic = true;
        this.topic = data[0].tema;
      } else {
        this.hasFixedTopic = true;
        this.topic = data[0].tema;
      }
      this.getUsers();
    });
  }

  setFalse() {
    this.askedUsers = [];
  }

  addFriends(username) {
    if (this.user !== username) {
      const user = sessionStorage.getItem('user');
      const form = JSON.stringify({user, username});
      this.https.postAddFriends(form).subscribe(data => {
        if (data === 0) {
          this.snack.open('El usuario ya es su amigo', 'OK');
        } else {
          this.snack.open('Se mandó correctamente la solicitud.', 'OK');
        }
      });
    } else {
      this.snack.open('No puede a sí mismo, punk', 'OK');
    }
  }

  startTurn(user) {
    this.socket.emit('timer', {user});
  }

  startTimer() {
    this.minutes = 3;
    this.seconds = 0;
    this.showSeconds = '00';
    this.interval = setInterval(() => {
      if (this.seconds < 1 && this.minutes < 1) {
        this.endTurn();
      }
      if (this.seconds < 1) {
        this.seconds = 59;
        this.minutes--;
      }
      if (this.seconds < 10) {
        this.showSeconds = ('0' + this.seconds);
      } else {
        this.showSeconds = this.seconds.toString();
      }
      this.seconds--;
    }, 1000);
  }

  endTurn() {
    this.socket.emit('endTurn', true);
  }

  addVote() {
    this.socket.emit('vote', true);
    this.voted = true;
  }

  changeTopic() {
    this.votes = 0;
    this.voted = false;
    const topic = this.generateNumber();
    this.socket.emit('topic', topic);
  }

  kick(index) {
    if (this.user === this.users[index].username) {
      this.snack.open('No puede votar por sí mismo', 'OK');
    } else {
      this.socket.emit('kickVote', index);
      this.voteKick = true;
      this.votedUser = this.users[index].username;
    }
  }

  kickMod() {
    if (this.user === this.mod[0].username) {
      this.snack.open('No puede votar por sí mismo', 'OK');
    } else {
      this.socket.emit('kickVote', 'mod');
      this.voteKick = true;
      this.votedUser = this.mod[0].username;
    }
  }

  askTurn() {
    let askedUser;
    for (const user of this.users) {
      if (user.username === this.user) {
        askedUser = this.user;
      }
    }
    this.socket.emit('askTurn', askedUser);
    this.asked = true;
  }

  getUsers() {
    this.isLoaded = undefined;
    this.users = undefined;
    this.mod = false;
    if (!this.isCustom) {
      this.http.postUsers(this.room).subscribe(data => {
        for (const user of data) {
          if (!user.mod) {
            if (this.users) {
              this.users.push(user[0]);
            } else {
              this.users = user;
            }
          } else {
            this.mod = user.mod;
          }
        }
        if (this.mod && this.mod[0].username === this.user) {
          this.isMod = true;
          this.changeTopic();
        }
        // this.totalVotes = this.users.length - 1;
        this.totalVotes = 2;
        this.askedUsers = [];
        this.isLoaded = Promise.resolve(true);
        if (!this.mod) {
          this.changeTopic();
          // sala libre
        }
        if ((this.users.length <= 3 && !this.mod) || (this.users.length <= 1 && this.mod)) {
          this.deleteRoom();
        }
      });
    } else {
      this.http.postCustom(this.room).subscribe(data => {
        for (const user of data) {
          if (this.hasModerator) {
            if (!user.mod) {
              if (this.users) {
                this.users.push(user[0]);
              } else {
                this.users = user;
              }
            } else {
              this.mod = user.mod;
            }
            if (this.mod && this.mod[0].username === this.user) {
              this.isMod = true;
              this.changeTopic();
            }
          } else {
            if (this.users) {
              this.users.push(user[0]);
            } else {
              this.users = user;
            }
          }
        }
      });
    }
  }

  sendMessage() {
    this.socket.emit('message', {user: this.user, message: this.message});
    this.message = '';
    // this.socket.emit('broadcast', {message: this.message});
  }

  checkMessages() {
    this.socket.on('message', data => {
      this.messages.push(data);
    });
    this.socket.on('timer', data => {
      this.userTalking = data.user;
      this.turn = true;
      this.asked = false;
      this.startTimer();
      this.setFalse();
    });
    this.socket.on('endTurn', () => {
      this.turn = false;
      // Stop audio connection
      this.userTalking = undefined;
    });
    this.socket.on('vote', () => {
      this.votes++;
      if (this.votes === this.totalVotes) {
        this.changeTopic();
      }
    });
    this.socket.on('topic', data => {
      this.topic = data;
    });
    this.socket.on('askTurn', data => {
      for (const user of this.users) {
        if (user.username === data) {
          this.askedUsers.push(user.username);
        }
      }
    });
    this.socket.on('kickVote', index => {
      if (!this.userVotes) { // If there's no votes
        if (index !== 'mod') {
          this.position = index;
          this.modVote = false;
        } else {
          this.modVote = true;
          this.position = undefined;
        }
        this.userVotes = 1;
      } else {
        if (this.position === index || (index === 'mod' && this.modVote)) { // If it is the same as the past one
          this.userVotes++;
          if (this.userVotes >= this.totalVotes) {
            // Kick the dude's ass.
            this.userVotes = 0;
            if (this.isMod) {
              let user;
              if (!this.modVote) {
                user = this.users[index].username;
              } else {
                user = this.mod[0].username;
              }
              const room = this.room;
              const form = JSON.stringify({user, room});
              this.http.postDelete(form).subscribe(data => {
                if (data) {
                  this.http.postAddKick(user).subscribe(() => {
                  });
                } else {
                  this.snack.open('Error al expulsar.', 'OK');
                }
              });
            }
            sessionStorage.setItem('kick', '1');
            if (this.isMod && this.modVote) {
              this.exit(false);
            }
            if  (this.user === this.users[index].username) {
              this.exit(false);
            }
            this.kicked = true;
            setTimeout(() => {
              this.checkUsers();
              this.kicked = false;
            }, 3000);
          }
        } else { // Start again
          if (index !== 'mod') {
            this.position = index;
            this.modVote = false;
          } else {
            this.position = undefined;
            this.modVote = true;
          }
          this.votedUser = undefined;
          this.voteKick = false;
          this.userVotes = 1;
        }
      }
    });
    // this.socket.on('broadcast', data => {
    //   console.log(data);
    // });
  }

  generateNumber() {
    const num = Math.floor(Math.random() * 50) + 1;
    return (num === this.topic) ? this.generateNumber() : num;
  }

  givePoints(username) {
    console.log(username);
    if (username === this.user) {
      this.snack.open('No puede dar puntos a sí mismo', 'OK');
    } else {
      const room = this.room;
      const user = this.user;
      const form = JSON.stringify({user, username, room});
      this.http.postPoints(form).subscribe(data => {
        if (data) {
          this.snack.open('Ha dado un voto.', 'OK');
        } else {
          this.snack.open('Usted no tiene votos restantes.', 'OK');
        }
      });
    }
  }

  checkUsers() {
    let tempUsers;
    let tempMod = false;
    this.http.postUsers(this.room).subscribe(data => {
      for (const user of data) {
        if (!user.mod) {
          if (tempUsers) {
            try {
              tempUsers.push(user[0]);
            } catch (e) {
              this.exit(true);
            }
          } else {
            tempUsers = user;
          }
        } else {
          tempMod = user.mod;
        }
      }
      if (JSON.stringify(this.users) !== JSON.stringify(tempUsers) || JSON.stringify(this.mod) !== JSON.stringify(tempMod)) {
        this.getUsers();
      }
    });
  }

  isAskedUser(user) {
    for (const askedUser of this.askedUsers) {
      if (askedUser === user) {
        return true;
      }
    }
    return false;
  }

  deleteRoom() {
    if (this.users.length <= 1 && this.mod) {
      if (this.isMod) {
        let user = this.users[0].username;
        const room = this.room;
        let form = JSON.stringify({user, room});
        this.http.postDelete(form).subscribe(data => {
          if (data) {
            user = this.user;
            form = JSON.stringify({user, room});
            this.http.postDelete(form).subscribe(() => {
              this.exit(true);
            });
          }
        });
      } else {
        this.exit(true);
      }
    } else if (this.users.length <= 3 && !this.mod) {
      if (this.user === this.users[0].username) {
        for (const users of this.users) {
          if (users !== undefined) {
            const user = users.username;
            const room = this.room;
            const form = JSON.stringify({user, room});
            this.http.postDelete(form).subscribe(() => {
            });
          }
        }
        this.exit(true);
      } else {
        this.exit(true);
      }
    }
  }

  exit(i) {
    sessionStorage.removeItem('room');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('custom');
    clearInterval(this.interval);
    clearInterval(this.intervals);
    if (i) {
      this.router.navigate(['/Home'], {queryParams: {i}});
      this.snack.open('Se cerró la sala', 'OK');
    } else {
      this.router.navigate(['/Home']);
      this.snack.open('A la wea', 'OK');
    }
  }
}
