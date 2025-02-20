import { Component } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { HomeComponent } from '../home/home.component';
import { BudgetRequest } from '../interfaces/budget-request';


@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {

  private originalOrder: { item: BudgetRequest, index: number }[] = [];
  toggleDate: boolean = false;
  togglePrice: boolean = false;
  toggleAbc: boolean = false;


  constructor(public budgetList: BudgetService, public home: HomeComponent) { }

  ngOnInit() {
    this.originalOrder = this.budgetList.requestedBudgets().map((item, index) => ({ item, index }));
  }

  orderDate() {
    if (this.toggleDate === true) {
      this.toggleDate = false;
      const sortedBudgets = this.originalOrder.sort((a, b) => a.index - b.index).map(entry => entry.item);
      this.budgetList.requestedBudgets.set(sortedBudgets);
    } else if (this.toggleDate === false) {
      this.toggleDate = true;
      const sortedBudgets = this.originalOrder.sort((a, b) => b.index - a.index).map(entry => entry.item);
      this.budgetList.requestedBudgets.set(sortedBudgets);
    }
  }
  orderPrice() {

  }
  orderAbc() {

  }
}
