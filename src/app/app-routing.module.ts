import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HousingListPageComponent } from './pages/housing-list-page/housing-list-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'housings', component: HousingListPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
