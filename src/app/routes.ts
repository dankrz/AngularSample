import {Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'trucks',
    loadChildren: './features/trucks/trucks.module#TrucksModule',
  },
  {
    path: 'users',
    loadChildren: './features/users/users.module#UsersModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
