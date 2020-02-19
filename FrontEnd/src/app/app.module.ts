import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecoveryComponent } from './recovery/recovery.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { NewsComponent } from './news/news.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RandomComponent } from './random/random.component';
import { CustomComponent } from './custom/custom.component';
import { TranslatorComponent } from './translator/translator.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { HolaComponent } from './hola/hola.component';
import { CookiesComponent } from './cookies/cookies.component';
import { PrivacyPoliciesComponent } from './privacy-policies/privacy-policies.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { AudioComponent } from './audio/audio.component';
import { MatTableModule } from '@angular/material/table';
import { VerifiedComponent } from './verified/verified.component';
import { RequestsComponent } from './friends/requests/requests.component';
import { BlockedComponent } from './friends/blocked/blocked.component';
import { AddedComponent } from './friends/added/added.component';
import { CustomPassComponent } from './custom-pass/custom-pass.component';
import { CustomCreateComponent } from './custom-create/custom-create.component';
import { ChatComponent } from './chat/chat.component';
import { VoiceRoomComponent } from './voice-room/voice-room.component';
import { LobbyComponent } from './lobby/lobby.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FaqComponent } from './faq/faq.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const config: SocketIoConfig = { url: 'http://localhost:1112', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    HomeComponent,
    FriendsComponent,
    NewsComponent,
    ToolbarUserComponent,
    RandomComponent,
    CustomComponent,
    TranslatorComponent,
    RecoverPassComponent,
    HolaComponent,
    CookiesComponent,
    PrivacyPoliciesComponent,
    TermsOfUseComponent,
    EditProfileComponent,
    ConfigurationComponent,
    UpdateInfoComponent,
    UpdatePassComponent,
    AudioComponent,
    VerifiedComponent,
    RequestsComponent,
    AddedComponent,
    BlockedComponent,
    AddedComponent,
    CustomPassComponent,
    CustomCreateComponent,
    ChatComponent,
    VoiceRoomComponent,
    LobbyComponent,
    FaqComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSliderModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent, CustomPassComponent, CustomCreateComponent, ConfirmationComponent]
})
export class AppModule { }
