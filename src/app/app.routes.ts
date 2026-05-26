import { Routes } from '@angular/router';
import { Home } from './features/Home/home';
import { authGuard, masterGuard, playerGuard, estrangeiroGuard } from './guards/auth.guard';

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
  {
    path: 'estrangeiro',
    loadComponent: () => import('./features/Estrangeiro/estrangeiro').then(m => m.EstrangeiroPageComponent),
    canActivate: [estrangeiroGuard]
  },
  { path: '**', redirectTo: '' }
];