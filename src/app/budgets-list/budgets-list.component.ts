import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
  formBudget!: FormGroup;

  getFormBudget(){
    return this.formBudget;
  }

  constructor(private builder: FormBuilder) { this.initializeForm(); }

  private initializeForm(): void {
    this.formBudget = this.builder.group({
      seo: new FormControl(false),
      ads: new FormControl(false),
      web: new FormControl(false),
    });
  }

}
