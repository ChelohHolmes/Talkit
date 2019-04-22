import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { TranslatorComponent } from './translator/translator.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { HolaComponent } from './hola/hola.component';
import { CookiesComponent } from './cookies/cookies.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPoliciesComponent } from './privacy-policies/privacy-policies.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UpdateInfoComponent } from './update-info/update-info.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'Login', component:  LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Recovery', component: RecoveryComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Friends', component: FriendsComponent },
  { path: 'Translator', component: TranslatorComponent },
  { path: 'Password_reset', component: RecoverPassComponent },
  { path: 'Cookies_info', component: CookiesComponent },
  { path: 'Privacy_policy', component: PrivacyPoliciesComponent },
  { path: 'Terms_of_use', component: TermsOfUseComponent },
  { path: 'Test', component: HolaComponent },
  { path: 'Configuration', component: ConfigurationComponent },
  { path: 'Update_info', component: UpdateInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
