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
  if (user.role !== 'mestre') { router.navigate(['/player']); return false; }
  return true;
};

export const playerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('currentUser');
  if (!raw) { router.navigate(['/']); return false; }
  const user = JSON.parse(raw);
  if (user.role !== 'player') { router.navigate(['/master']); return false; }
  return true;
};