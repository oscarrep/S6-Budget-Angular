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
      description: 'Programming a complete and responsive web',
      bgColor: 'white',
      price: 300,
      currency: '€',
      id: 0,
      checked: false,
    },
    {
      title: 'ADS',
      description: 'Programming a complete and responsive web',
      bgColor: 'white',
      price: 400,
      currency: '€',
      id: 1,
      checked: false,
    },
    {
      title: 'WEB',
      description: 'Programming a complete and responsive web',
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

  calculateTotal(formValue: any, id: number): number {

    if (this.budgetList[id].checked === false) {
      this.budgetList[id].checked = true;
      this.totalPrice += (formValue ? this.budgetList[id].price : 0);
    }
    else if (this.budgetList[id].checked === true) {
      this.budgetList[id].checked = false;
      this.totalPrice -= (formValue ? this.budgetList[id].price : 0);
    }

    console.log("total price " + this.totalPrice);
    console.log(this.budgetList[id].title + ': checked ' + this.budgetList[id].checked);

    return this.totalPrice;
  }
}
