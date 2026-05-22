import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import fichasData from '../../assets/fichas.json';

type TabId = 'stats' | 'attacks' | 'abilities' | 'inventory';
type AttributeKey = 'FOR' | 'AGI' | 'INT' | 'PRE' | 'VIG';
type StatKey = 'PV' | 'PE' | 'SAN';

interface Stat { key: StatKey; label: string; color: string; }

interface Ficha {
  id: string;
  ownerId: string;
  name: string;
  class: string;
  origin: string;
  nex: number;
  attributes: Record<AttributeKey, number>;
  maxStats: Record<StatKey, number>;
  currentStats: Record<StatKey, number>;
  defesa: number;
  protecao: number;
  deslocamento: number;
  peRodada: number;
  skills: Record<string, number>;
  attacks: { name: string; test: string; damage: string; critical: string; range: string }[];
  abilities: { name: string; cost: number; description: string }[];
  inventory: { id: string; name: string; category: string; spaces: number }[];
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.scss']
})
export class PlayerPageComponent implements OnInit {
  ficha: Ficha | null = null;
  activeTab: TabId = 'stats';
  nomePlayer = '';

  stats: Stat[] = [
    { key: 'PV', label: 'Pontos de Vida', color: 'bg-red-600' },
    { key: 'PE', label: 'Pontos de Esforço', color: 'bg-blue-500' },
    { key: 'SAN', label: 'Sanidade', color: 'bg-purple-500' },
  ];

  tabs = [
    { id: 'stats' as TabId, label: 'Perícias' },
    { id: 'attacks' as TabId, label: 'Ataques' },
    { id: 'abilities' as TabId, label: 'Habilidades' },
    { id: 'inventory' as TabId, label: 'Inventário' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const raw = localStorage.getItem('currentUser');
    if (!raw) { this.router.navigate(['/']); return; }

    const currentUser = JSON.parse(raw);
    this.nomePlayer = currentUser.nome;

    const todas = (Array.isArray(fichasData) ? fichasData : [fichasData]) as unknown as Ficha[];
    this.ficha = todas.find(f => f.ownerId === currentUser.user) ?? null;
  }

  setTab(tab: TabId) { this.activeTab = tab; }

  getSkillEntries(skills: Record<string, number>) { return Object.entries(skills); }

  statPercent(current: number, max: number): number {
    return max > 0 ? Math.min(100, (current / max) * 100) : 0;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}