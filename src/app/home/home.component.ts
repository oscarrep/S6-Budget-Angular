import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { BudgetService } from '../../../services/budget.service';
import { FormControl,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listArr: List[] = [];
  budget = 0;

  constructor(private budgetList: BudgetService, private budgetTotal:BudgetsListComponent) { }


  ngOnInit(): void {
    this.listArr = this.budgetList.getBudgetList();
    //this.budget = this.budgetTotal.getFormBudget();
  }

  calculateTotal(price: number, id: number): void {
    console.log(price);
    this.budgetList.calcTotalPrice(price, id);
  }

}
