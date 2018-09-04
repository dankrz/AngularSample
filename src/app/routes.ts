import {Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/trucks', pathMatch: 'full' },
  {
    path: 'trucks',
    loadChildren: './features/trucks/trucks.module#TrucksModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
