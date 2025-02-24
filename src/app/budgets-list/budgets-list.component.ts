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
  private originalPositions: Map<BudgetRequest, number> = new Map();
  toggleDate: boolean = false;
  togglePrice: boolean = false;
  toggleAbc: boolean = false;


  constructor(public budgetList: BudgetService, public home: HomeComponent) { }

  ngOnInit() {
    this.updateOriginalOrder();
  }

  updateOriginalOrder() {
    this.originalOrder = [...this.budgetList.requestedBudgets()];
    this.originalPositions.clear();
    this.originalOrder.forEach((budget, index) => {
      this.originalPositions.set(budget, index);
    });
  }

  orderDate() {
    this.toggleDate = !this.toggleDate;
    this.togglePrice = false;
    this.toggleAbc = false;
    if (this.toggleDate === true) this.ascendingDate();
    else if (this.toggleDate === false) this.descendingDate();
  }

  ascendingDate() {
    const sortedBudgets = [...this.originalOrder].sort((a, b) => this.originalPositions.get(b)! - this.originalPositions.get(a)!);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  descendingDate() {
    const sortedBudgets = [...this.originalOrder].sort((a, b) => this.originalPositions.get(a)! - this.originalPositions.get(b)!);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  orderPrice() {
    this.toggleDate = false;
    this.togglePrice = !this.togglePrice;
    this.toggleAbc = false;
    if (this.togglePrice === true) this.ascendingPrice();
    else if (this.togglePrice === false) this.descendingPrice();
  }

  ascendingPrice() {
    const sortedBudgets = [...this.budgetList.requestedBudgets()].sort((a, b) => a.totalPrice - b.totalPrice);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  descendingPrice() {
    const sortedBudgets = [...this.budgetList.requestedBudgets()].sort((a, b) => b.totalPrice - a.totalPrice);
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  orderAbc() {
    this.toggleDate = false;
    this.togglePrice = false;
    this.toggleAbc = !this.toggleAbc;
    if (this.toggleAbc === true) this.ascendingAbc();
    else if (this.toggleAbc === false) this.descendingAbc();
  }

  ascendingAbc() {
    const sortedBudgets = [...this.budgetList.requestedBudgets()].sort((a, b) => a.name.localeCompare(b.name));
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }

  descendingAbc() {
    const sortedBudgets = [...this.budgetList.requestedBudgets()].sort((a, b) => b.name.localeCompare(a.name));
    this.budgetList.requestedBudgets.set(sortedBudgets);
  }
}
