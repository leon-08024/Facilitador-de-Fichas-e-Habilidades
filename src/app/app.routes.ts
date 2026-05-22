import { Routes } from '@angular/router';
import { Home } from './features/Home/home';
import { MasterPageComponent } from './features/Master/master';
import { CartPageComponent } from './features/cart/cart';
import { PaymentPageComponent } from './features/payment/payment';
import { ThanksPageComponent } from './features/thanks/thanks';


export const routes: Routes = [

    { path: 'home', component: Home },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'master', component: MasterPageComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'pagamento', component: PaymentPageComponent },
    { path: 'thanks', component: ThanksPageComponent}
];
