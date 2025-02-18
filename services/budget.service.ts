import { Injectable } from '@angular/core';
import { List } from '../src/app/interfaces/list';
import { BudgetRequest } from '../src/app/interfaces/budget-request';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  totalPrice: number = 0;
  pages: number = 1;
  languages: number = 1;
  webTotal: number = 0;
  pageLanguage: number = 30;
  checkedServices: string[] = [];

  budgetList: List[] = [
    {
      title: 'SEO',
      description: 'Programming a complete and responsive web',
      bgColor: 'white',
      price: 300,
      currency: '€',
      id: 0,
      checked: false,
      showPanel: false,
    },
    {
      title: 'ADS',
      description: 'Programming a complete and responsive web',
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
  ]

  requestedBudgets: BudgetRequest[] = [
    {
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
  ]

  constructor() { }

  getBudgetList() {
    return this.budgetList;
  }

  getPriceById(index: number) {
    return this.budgetList[index].price;
  }

  getId(index: number) {
    return this.budgetList[index].id;
  }

  calculateTotal(itemPrice: number, id: number): number {

    if (this.budgetList[id].checked === false) {
      this.budgetList[id].checked = true;
      this.totalPrice += (itemPrice ? this.budgetList[id].price : 0);
    }
    else if (this.budgetList[id].checked === true) {
      this.budgetList[id].checked = false;
      this.totalPrice -= (itemPrice ? this.budgetList[id].price : 0);
      this.totalPrice = this.totalPrice - this.webTotal;
      this.webTotal = 0;
    }
    return this.totalPrice;
  }

  calculateWebTotal(add: boolean): number {
    if (add === true) {
      this.totalPrice = this.totalPrice + this.pageLanguage;
      this.webTotal += this.pageLanguage
    }
    else if (add === false) {
      this.totalPrice = this.totalPrice - this.pageLanguage;
      this.webTotal -= this.pageLanguage
    }
    return this.totalPrice;
  }
}
