import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesRxComponent } from './heroesRx/heroes-rx.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'heroesrx',
    component: HeroesRxComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
