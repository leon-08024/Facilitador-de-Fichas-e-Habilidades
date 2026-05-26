import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrangeiro',
  imports: [CommonModule],
  templateUrl: './estrangeiro.html',
  styleUrl: './estrangeiro.scss'
})
export class EstrangeiroPageComponent implements OnInit {
  currentUser: { nome: string; username: string } | null = null;
  currentTime = '';
  private clockInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const raw = localStorage.getItem('currentUser');
    if (raw) this.currentUser = JSON.parse(raw);
    this.clockInterval = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  get displayName(): string {
    return (this.currentUser?.nome || this.currentUser?.username || 'AGENTE').toUpperCase();
  }
}