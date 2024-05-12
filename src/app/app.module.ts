import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToggleViewComponent } from './components/toggle-view/toggle-view.component';
import { FilterByHousingComponent } from './components/filter-by-housing/filter-by-housing.component';
import { HousingDetailPageComponent } from './pages/housing-detail-page/housing-detail-page.component';
import { HousingCreatePageComponent } from './pages/housing-create-page/housing-create-page.component';
import { UserHousingComponent } from './components/user-housing/user-housing.component';
import { OpenstreetmapComponent } from './components/openstreetmap/openstreetmap.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { HousingListPageComponent } from './pages/housing-list-page/housing-list-page.component';
import { HousingCardComponent } from './components/housing-card/housing-card.component';
import { HousingListComponent } from './components/housing-list/housing-list.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { BookingComponent } from './components/booking/booking.component';
import { GetHousingByIdComponent } from './components/get-housing-by-id/get-housing-by-id.component';
import { CreateHousingFormComponent } from './components/create-housing-form/create-housing-form.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserHousingPageComponent } from './pages/user-housing-page/user-housing-page.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { TermsOfUsePageComponent } from './pages/terms-of-use-page/terms-of-use-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from '../helpers/http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OpenstreetmapComponent,
    MapPageComponent,
    ToggleViewComponent,
    HousingListPageComponent,
    HousingCardComponent,
    FilterByHousingComponent,
    HousingListComponent,
    GoBackComponent,
    HousingDetailPageComponent,
    BookingComponent,
    GetHousingByIdComponent,
    HousingCreatePageComponent,
    CreateHousingFormComponent,
    SuccessPageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    UserProfilePageComponent,
    UserHousingPageComponent,
    UserHousingComponent,
    TermsOfUseComponent,
    TermsOfUsePageComponent,
    PrivacyPolicyPageComponent,
    PrivacyPolicyComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    BookingDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
