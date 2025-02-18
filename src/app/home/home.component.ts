import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { BudgetService } from '../../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { BudgetRequest } from '../interfaces/budget-request';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PanelComponent, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listArr: List[] = [];
  budget!: FormGroup;
  showList = false;

  constructor(public budgetList: BudgetService, public form: FormBuilder) { }


  ngOnInit(): void {
    this.listArr = this.budgetList.getBudgetList();
    this.initForm();
  }

  private initForm(): void {
    this.budget = this.form.group({
      seo: false,
      ads: false,
      web: false,
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{9,}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submtBudget(event: Event) {
    event.preventDefault();
    if (this.budget.invalid) {
      this.budget.markAllAsTouched();
      return;
    }

    const selected = this.listArr.filter((type) => this.budget.get(type.title)?.value).map((type) => type.title);

  }

  onSubmit(event:Event) {
    event.preventDefault();
    this.showList = true;
  }

  togglePanel(event: Event, id: number, price: number): void {

    this.budgetList.pages = 1;
    this.budgetList.languages = 1;
    this.budgetList.calculateTotal(price, id);

    this.listArr[id].showPanel = (event.target as HTMLInputElement).checked
  }

  getCheckedServices(): string[] {
    return [];
  }

  getPages(): number {
    return 0;
  }

  getLanguages(): number {
    return 0;
  }
}
