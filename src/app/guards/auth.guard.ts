import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('currentUser');
  if (!raw) { router.navigate(['/']); return false; }
  return true;
};

export const masterGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('currentUser');
  if (!raw) { router.navigate(['/']); return false; }
  const user = JSON.parse(raw);
  if (user.role !== 'mestre') {
    // Redireciona para a página correta do role
    redirectByRole(router, user.role);
    return false;
  }
  return true;
};

export const playerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('currentUser');
  if (!raw) { router.navigate(['/']); return false; }
  const user = JSON.parse(raw);
  if (user.role !== 'player') {
    redirectByRole(router, user.role);
    return false;
  }
  return true;
};

export const estrangeiroGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('currentUser');
  if (!raw) { router.navigate(['/']); return false; }
  const user = JSON.parse(raw);
  if (user.role !== 'estrangeiro') {
    redirectByRole(router, user.role);
    return false;
  }
  return true;
};

function redirectByRole(router: Router, role: string): void {
  switch (role) {
    case 'mestre':       router.navigate(['/master']);      break;
    case 'player':       router.navigate(['/player']);      break;
    case 'estrangeiro':  router.navigate(['/estrangeiro']); break;
    default:             router.navigate(['/']);             break;
  }
}