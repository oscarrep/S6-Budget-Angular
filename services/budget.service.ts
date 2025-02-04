import { Injectable } from '@angular/core';
import { List } from '../src/app/interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  totalPrice = 0;

  budgetList: List[] = [
    {
      title: 'SEO',
      description: 'Programming a complete responsive web',
      bgColor: 'white',
      price: 300,
      currency: '€',
      id: 0,
      checked: false,
    },
    {
      title: 'ADS',
      description: 'Programming a complete responsive web',
      bgColor: 'white',
      price: 400,
      currency: '€',
      id: 1,
      checked: false,
    },
    {
      title: 'WEB',
      description: 'Programming a complete responsive web',
      bgColor: 'white',
      price: 500,
      currency: '€',
      id: 2,
      checked: false,
    },
  ]

  constructor() { }

  getBudgetList() {
    return this.budgetList;
  }

  calcTotalPrice(formValue: any, id: number): number {

    this.totalPrice = (formValue.values.seo ? this.budgetList[id].price : 0) +
      (formValue.values.ads ? this.budgetList[id].price : 0) +
      (formValue.values.web ? this.budgetList[id].price : 0);
      
    return this.totalPrice;
  }
}
