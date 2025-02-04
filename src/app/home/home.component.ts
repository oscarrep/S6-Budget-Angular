import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { BudgetService } from '../../../services/budget.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listArr: List[] = [];
  budget = 0;

  constructor(private budgetList: BudgetService) { }


  ngOnInit(): void {
    this.listArr = this.budgetList.getBudgetList();
  }

  updateTotal(price: number, id: number): void {
    this.budget = this.budgetList.calculateTotal(price, id);
  }

}
