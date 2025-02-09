import { Injectable } from '@angular/core';
import { List } from '../src/app/interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  totalPrice: number = 0;
  pages: number = 1;
  languages: number = 1;

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
      showPanel: true,
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



    return this.totalPrice;
  }
}
