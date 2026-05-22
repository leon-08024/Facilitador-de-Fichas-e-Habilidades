import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
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
  imports: [RouterLink, CommonModule, FormsModule],
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

    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 600));

    const user = this.users.find(u => 
      u.username.toLowerCase() === this.username.toLowerCase() && 
      u.password === this.password
    );

    if (user) {
      // Salva no localStorage (simples)
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      if (user.role === 'mestre') {
        this.router.navigate(['/master']);
      } else {
        this.router.navigate(['/player']);
      }
    } else {
      this.error = 'Usuário ou senha incorretos!';
    }

    this.loading = false;
  }
}