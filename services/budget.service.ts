import { Injectable } from '@angular/core';
import { List } from '../src/app/interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  totalPrice: number = 0;
  pages: number = 1;
  languages: number = 1;
  webTotal: number = 0;

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

  constructor() { }

  getBudgetList() {
    return this.budgetList;
  }

  getPriceById(index:number){
    return this.budgetList[index].price;
  }

  getId(index:number){
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
    }
    return this.totalPrice;
  }

  calculateWebTotal(itemPrice: number, id: number): number {
    this.webTotal = (this.pages * this.languages * 30);

    this.calculateTotal(itemPrice, id);

    return this.totalPrice = this.webTotal + this.totalPrice;
  }
}
