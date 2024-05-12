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
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { HousingDetailPageComponent } from './pages/housing-detail-page/housing-detail-page.component';

import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';

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
  {
    path: 'profil',
    component: UserProfilePageComponent,
  },

  { path: 'housings/:id', component: HousingDetailPageComponent },

  { path: 'success-page/:id', component: SuccessPageComponent },

  { path: 'map', component: MapPageComponent },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
