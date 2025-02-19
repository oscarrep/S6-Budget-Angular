import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { List } from '../interfaces/list';
import { BudgetService } from '../../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { BudgetRequest } from '../interfaces/budget-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PanelComponent, BudgetsListComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  private fb = inject(FormBuilder);
  budgetList = inject(BudgetService);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]]
  });

  totalPrice: Signal<number> = this.budgetList.totalPrice;
  requestedBudgets = this.budgetList.requestedBudgets;

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const selectedServices = this.getSelectedServices();
    this.pushRequest(selectedServices);
    this.resetForm()
  }

  getSelectedServices(): string[] {
    const selectedServices = this.budgetList.budgetList()
      .filter(service => service.checked)
      .map(service => service.title);
    return selectedServices;
  }

  pushRequest(selectedServices: string[]): void {
    this.budgetList.addBudget({
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      services: selectedServices,
      pages: this.budgetList.pages(),
      languages: this.budgetList.languages(),
      totalPrice: this.totalPrice()
    });

    console.log('Budget saved:', this.budgetList.requestedBudgets());
  }

  resetForm(): void {
    this.budgetList.budgetList.update(list => list.map(service => ({ ...service, checked: false })));
    this.form.reset();
    this.budgetList.pages.set(1);
    this.budgetList.languages.set(1);
    this.budgetList.webTotal.set(0);
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
