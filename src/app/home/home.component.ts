import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Signal, inject, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PanelComponent, BudgetsListComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);
  budgetList = inject(BudgetService);
  submitted: boolean = false;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]]
  });

  totalPrice: Signal<number> = this.budgetList.totalPrice;
  requestedBudgets = this.budgetList.requestedBudgets;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.parseUrl();
  }

  onSubmit(event: Event, budgetsListComp: BudgetsListComponent) {
    event.preventDefault();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const selectedServices = this.getSelectedServices();
    this.pushRequest(selectedServices);
    budgetsListComp.updateOriginalOrder();
    this.resetForm();
  }

  updateUrl(): void {
    const selectedServices = this.getSelectedServices();
    const params = new URLSearchParams();
    selectedServices.forEach(service => params.append(service, 'true'));
    if (params.get('WEB') === 'true') {
      params.append('pages', this.budgetList.pages().toString());
      params.append('languages', this.budgetList.languages().toString());
    }
    this.router.navigate([], { queryParams: Object.fromEntries(params) });
  }

  parseUrl(): void {
    const params = new URLSearchParams(window.location.search);
    this.budgetList.budgetList().forEach(service => {
      service.checked = params.has(service.title);
    });
    if (params.get('WEB') === 'true') {
      this.budgetList.setPages(parseInt(params.get('pages') || '0', 10));
      this.budgetList.setLanguages(parseInt(params.get('languages') || '0', 10));
      this.budgetList.showPanel();
    }
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
    this.submitted = false;
  }
}
