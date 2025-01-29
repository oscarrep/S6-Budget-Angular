import { Injectable } from '@angular/core';
import { List } from '../src/app/interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetList: List[] = [
    {
      title: 'SEO',
      description: 'Programming a complete responsive web',
      bgColor: 'white',
      price:300,
      currency:'€',
      id: 0,
    },
    {
      title: 'ADS',
      description: 'Programming a complete responsive web',
      bgColor: 'white',
      price:400,
      currency:'€',
      id: 1,
    },
    {
      title: 'WEB',
      description: 'Programming a complete responsive web',
      bgColor: 'white',
      price:500,
      currency:'€',
      id: 2,
    },
  ]

  constructor() { }
}
