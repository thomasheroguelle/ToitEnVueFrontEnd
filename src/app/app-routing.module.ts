import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HousingListPageComponent } from './pages/housing-list-page/housing-list-page.component';
import { HousingCreatePageComponent } from './pages/housing-create-page/housing-create-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserHousingPageComponent } from './pages/user-housing-page/user-housing-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { TermsOfUsePageComponent } from './pages/terms-of-use-page/terms-of-use-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'housings', component: HousingListPageComponent },
  { path: 'create', component: HousingCreatePageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'my-ads', component: UserHousingPageComponent },
  {
    path: 'politique-de-confidentialité',
    component: PrivacyPolicyPageComponent,
  },
  {
    path: 'conditions-générales',
    component: TermsOfUsePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
