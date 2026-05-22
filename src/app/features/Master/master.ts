import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import fichasData from '../../assets/fichas.json';

type TabId = 'stats' | 'attacks' | 'abilities' | 'inventory';

type AttributeKey = 'FOR' | 'AGI' | 'INT' | 'PRE' | 'VIG';

type StatKey = 'PV' | 'PE' | 'SAN';

interface Stat {
  key: StatKey;
  label: string;
  color: string;
}

interface Attributes {
  FOR: number;
  AGI: number;
  INT: number;
  PRE: number;
  VIG: number;
}

interface Attack {
  name: string;
  test: string;
  damage: string;
  critical: string;
  range: string;
}

interface Ability {
  name: string;
  cost: number;
  description: string;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  spaces: number;
}

interface Ficha {
  id: string;
  ownerId: string;
  name: string;
  class: string;
  origin: string;
  nex: number;
  attributes: Attributes;
  maxStats: { PV: number; PE: number; SAN: number };
  currentStats: { PV: number; PE: number; SAN: number };
  defesa: number;
  protecao: number;
  deslocamento: number;
  peRodada: number;
  skills: Record<string, number>;
  attacks: Attack[];
  abilities: Ability[];
  inventory: InventoryItem[];
}

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master.html',
  styleUrls: ['./master.scss'],
})
export class MasterPageComponent implements OnInit {
  fichas: Ficha[] = [];
  selectedFicha: Ficha | null = null;
  tabs = [
    { id: 'stats' as TabId, label: 'Perícias' },
    { id: 'attacks' as TabId, label: 'Ataques' },
    { id: 'abilities' as TabId, label: 'Habilidades' },
    { id: 'inventory' as TabId, label: 'Inventário' },
  ] as const;

  attributeList: { key: AttributeKey; label: string }[] = [
    { key: 'FOR', label: 'Força' },
    { key: 'AGI', label: 'Agilidade' },
    { key: 'INT', label: 'Intelecto' },
    { key: 'PRE', label: 'Presença' },
    { key: 'VIG', label: 'Vigor' },
  ];
  stats: Stat[] = [
    { key: 'PV', label: 'Pontos de Vida', color: 'bg-red-600' },
    { key: 'PE', label: 'Pontos de Esforço', color: 'bg-blue-500' },
    { key: 'SAN', label: 'Sanidade', color: 'bg-purple-500' },
  ];

  activeTab: TabId = 'stats';

  constructor(private router: Router) {}

  
  ngOnInit() {
    // Suporta tanto array quanto objeto único
    this.fichas = (Array.isArray(fichasData) ? fichasData : [fichasData]) as unknown as Ficha[]; 
    if (this.fichas.length > 0) this.selectedFicha = this.fichas[0];
  }

  selectFicha(ficha: Ficha) {
    this.selectedFicha = ficha;
    this.activeTab = 'stats';
  }

  setTab(tab: typeof this.activeTab) {
    this.activeTab = tab;
  }

  getSkillEntries(skills: Record<string, number>) {
    return Object.entries(skills);
  }

  getStat(statKey: StatKey): number {
    if (!this.selectedFicha) return 0;
    return this.selectedFicha.currentStats[statKey];
  }

  getMaxStat(statKey: StatKey): number {
    if (!this.selectedFicha) return 0;
    return this.selectedFicha.maxStats[statKey];
  }

  statPercent(current: number, max: number): number {
    return (current / max) * 100;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
