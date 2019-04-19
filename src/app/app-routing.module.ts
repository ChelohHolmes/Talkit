import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { TranslatorComponent } from './translator/translator.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'Login', component:  LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Recovery', component: RecoveryComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Friends', component: FriendsComponent },
  { path: 'Translator', component: TranslatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
