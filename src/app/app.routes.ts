import { Routes } from '@angular/router';
import { Home } from './features/Home/home';
import { MasterPageComponent } from './features/Master/master';
import { PlayerPageComponent } from './features/Player/player';



export const routes: Routes = [

    { path: 'home', component: Home },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'master', component: MasterPageComponent },
    { path: 'player', component: PlayerPageComponent },
];
