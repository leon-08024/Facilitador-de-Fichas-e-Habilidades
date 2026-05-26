import { Routes } from '@angular/router';
import { Home } from './features/Home/home';
import { MasterPageComponent } from './features/Master/master';
import { PlayerPageComponent } from './features/Player/player';
import { authGuard, masterGuard, playerGuard } from './guards/auth.guard';



export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'master',
    loadComponent: () => import('./features/Master/master').then(m => m.MasterPageComponent),
    canActivate: [masterGuard]
  },
  {
    path: 'player',
    loadComponent: () => import('./features/Player/player').then(m => m.PlayerPageComponent),
    canActivate: [playerGuard]
  },
  { path: '**', redirectTo: '' }
];
