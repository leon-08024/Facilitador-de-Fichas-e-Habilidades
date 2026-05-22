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