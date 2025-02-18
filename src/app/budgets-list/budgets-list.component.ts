import { Component } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent { 

  constructor(public budgetList: BudgetService, public home: HomeComponent) { }
}
