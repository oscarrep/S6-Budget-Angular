import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BudgetService } from '../../../services/budget.service';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
  totalPrice = 0;
  formBudget!: FormGroup;
  id = 0;

  getFormBudget(){
    return this.formBudget;
  }

  constructor(private builder: FormBuilder, private budgetService: BudgetService) { this.initializeForm(); }

  private initializeForm(): void {
    this.formBudget = this.builder.group({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });
  }

}
