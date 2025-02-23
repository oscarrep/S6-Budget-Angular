import { Component, OnInit } from '@angular/core';
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
export class BudgetsListComponent implements OnInit {

  private originalOrder: BudgetRequest[] = [];
  private originalPositions: Map<BudgetRequest, number>=new Map();
  toggleDate: boolean = false;
  togglePrice: boolean = true;
  toggleAbc: boolean = false;


  constructor(public budgetList: BudgetService, public home: HomeComponent) { }

  ngOnInit() {
    this.updateOriginalOrder();
    console.log('requestedbudgets')
    console.log(this.budgetList.requestedBudgets())
  }

  updateOriginalOrder() {
    this.originalOrder = [...this.budgetList.requestedBudgets()];
    this.originalPositions.clear();
    this.originalOrder.forEach((budget, index) => {
      this.originalPositions.set(budget, index);
    });
    console.log('originaorder')
    console.log(this.originalOrder)
  }

  orderDate() {
    if (this.toggleDate === true) this.ascendingDate();
    else if (this.toggleDate === false) this.descendingDate();
  }

  ascendingDate() {
    this.toggleDate = false;
    const sortedBudgets = [...this.originalOrder].sort((a, b) => this.originalPositions.get(a)! - this.originalPositions.get(b)!);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  descendingDate() {
    this.toggleDate = true;
    const sortedBudgets = [...this.originalOrder].sort((a, b) => this.originalPositions.get(b)! - this.originalPositions.get(a)!);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  orderPrice() {
    if (this.togglePrice === true) this.ascendingPrice();
    else if (this.togglePrice === false) this.descendingPrice();
  }

  ascendingPrice() {
    this.togglePrice = false;
    const sortedBudgets = [...this.budgetList.requestedBudgets()].sort((a, b) => a.totalPrice - b.totalPrice);
    console.log(sortedBudgets);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  descendingPrice() {
    this.togglePrice = true;
    const sortedBudgets = [...this.budgetList.requestedBudgets()].sort((a, b) => b.totalPrice - a.totalPrice);
    console.log(sortedBudgets);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  orderAbc() {

  }

  getIndex(budget: BudgetRequest): number { return this.budgetList.requestedBudgets().indexOf(budget); }
}
