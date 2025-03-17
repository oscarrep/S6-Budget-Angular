import { Injectable, signal, computed } from '@angular/core';
import { List } from '../src/app/interfaces/list';
import { BudgetRequest } from '../src/app/interfaces/budget-request';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  pages = signal<number>(1);
  languages = signal<number>(1);
  webTotal = signal<number>(0);
  pageLanguage = 30;
  checkedServices: string[] = [];

  totalPrice = computed(() => {
    const servicesTotal = this.budgetList().reduce((sum, service) => service.checked ? sum + service.price : sum, 0);
    return servicesTotal + this.webTotal();
  })

  budgetList = signal<List[]>([
    {
      title: 'SEO',
      description: 'Setting up the SEO of your website',
      bgColor: 'white',
      price: 300,
      currency: '€',
      id: 0,
      checked: false,
      showPanel: false,
    },
    {
      title: 'ADS',
      description: 'Setting up a marketing campaign to promote your website',
      bgColor: 'white',
      price: 400,
      currency: '€',
      id: 1,
      checked: false,
      showPanel: false,
    },
    {
      title: 'WEB',
      description: 'Programming a complete and responsive web',
      bgColor: 'white',
      price: 500,
      currency: '€',
      id: 2,
      checked: false,
      showPanel: false,
    },
  ]);

  requestedBudgets = signal<BudgetRequest[]>([{
    name: 'Danny Roe',
    phone: 651234789,
    email: 'aaa@bc.com',
    services: ['SEO', 'ADS', 'WEB'],
    pages: 2,
    languages: 2,
    totalPrice: 1260
  },
  {
    name: 'Frankie Diaz',
    phone: 689456213,
    email: 'zzz@ghgh.com',
    services: ['SEO', 'ADS'],
    pages: 0,
    languages: 0,
    totalPrice: 700
  },
  {
    name: 'Jake Asdf',
    phone: 675346751,
    email: 'gtdjkl@po.com',
    services: ['SEO', 'ADS', 'WEB'],
    pages: 3,
    languages: 2,
    totalPrice: 1290
  },
  {
    name: 'Pep Gg',
    phone: 612345678,
    email: 'pot@llll.com',
    services: ['SEO', 'ADS', 'WEB'],
    pages: 3,
    languages: 3,
    totalPrice: 1320
  }]);

  constructor() { }

  getBudgetList() { return this.budgetList; }

  toggleService(id: number) {
    this.budgetList.update(list => list.map(service => service.id === id ?
      { ...service, checked: !service.checked } : service));
  }

  togglePanel(id: number) {
    if (this.pages() > 1 || this.languages() > 1){
      for (let i = 0; i < this.pages(); i++) this.calculateWebTotal(false);
      for (let i = 0; i < this.languages(); i++) this.calculateWebTotal(false);
    }
    this.pages.set(1);
    this.languages.set(1);
    this.budgetList.update(list => list.map(service => service.id === id ?
      { ...service, showPanel: !service.showPanel } : service));
    this.toggleService(id);
  }

  showPanel() {
    this.budgetList.update(list => list.map(service => service.id === 2 ?
      { ...service, showPanel: !service.showPanel } : service));
  }

  calculateWebTotal(add: boolean) {
    this.webTotal.update(total => add ?
      total + this.pageLanguage : total - this.pageLanguage);
  }

  addBudget(budget: BudgetRequest) { this.requestedBudgets.update(budgets => [...budgets, budget]); }

  setPages(pages: number) { this.pages.set(pages); }

  setLanguages(languages: number) { this.languages.set(languages); }

}
