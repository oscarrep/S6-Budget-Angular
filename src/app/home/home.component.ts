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
  imports: [CommonModule, PanelComponent, BudgetsListComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listArr: List[] = [];
  form: FormGroup;
  showList = false;

  constructor(public budgetList: BudgetService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]]
    });
  }


  ngOnInit(): void {
    this.listArr = this.budgetList.getBudgetList();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
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
    const selectedServices = this.budgetList.budgetList
      .filter(service => service.checked)
      .map(service => service.title);
    return selectedServices;
  }

  resetForm(): void {
    this.form.reset();
    this.budgetList.budgetList.forEach(service => (service.checked = false));
    this.budgetList.totalPrice = 0;
    this.budgetList.pages = 1;
    this.budgetList.languages = 1;
    this.budgetList.webTotal = 0;
  }

  pushRequest(selectedServices: string[]): void {
    const newBudget: BudgetRequest = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      services: selectedServices,
      pages: this.budgetList.pages,
      languages: this.budgetList.languages,
      totalPrice: this.budgetList.totalPrice
    };

    this.budgetList.requestedBudgets.push(newBudget);
    console.log('Budget saved:', newBudget);
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
