import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import usersData from '../../assets/users.json';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
  role: string;
  nome: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  username = '';
  password = '';
  error = '';
  loading = false;

  private users: User[] = usersData.users;

  constructor(private router: Router) {}

  async onLogin() {
    this.error = '';
    this.loading = true;

    await new Promise(resolve => setTimeout(resolve, 600));

    const user = this.users.find(u =>
      u.username.toLowerCase() === this.username.toLowerCase() &&
      u.password === this.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.redirectByRole(user.role);
    } else {
      this.error = 'Usuário ou senha incorretos.';
    }

    this.loading = false;
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'mestre':       this.router.navigate(['/master']);      break;
      case 'player':       this.router.navigate(['/player']);      break;
      case 'estrangeiro':  this.router.navigate(['/estrangeiro']); break;
      default:             this.router.navigate(['/']);             break;
    }
  }
}