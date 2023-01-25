export interface MovementsRespose {
  data: Movement[];
  size: number;
}

export interface Movement {
  id: string;
  amount: number;
  balance: number;
  customDate: string;
  customDescription: string;
  date: string;
  dateCreated: string;
  deleted: boolean;
  description: string;
  duplicated: boolean;
  hasConcepts: boolean;
  inResume: boolean;
  lastUpdated: string;
  type: string;
  account: Account;
  concepts: Concept[];
}

export interface Account {
  id: string;
  availableBalance: number;
  balance: number;
  dateCreated: string;
  deleted: boolean;
  lastUpdated: string;
  name: string;
  number: string;
  type: string;
  user: User;
  institution: Institution;
}

export interface Institution {
  id: number;
  code: string;
  institutionType: string;
  name: string;
  status: string;
}

export interface User {
  id: string;
}

export interface Concept {
  id: string;
  amount: number;
  description: string;
  type: string;
  movement: null;
  category: Category;
}

export interface Category {
  id: string;
  color: string;
  name: string;
  textColor: string;
  parent: User;
}
