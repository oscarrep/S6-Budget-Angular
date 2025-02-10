import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list';
import { BudgetService } from '../../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listArr: List[] = [];

  constructor(public budgetList: BudgetService) { }


  ngOnInit(): void {
    this.listArr = this.budgetList.getBudgetList();
  }

  togglePanel(event:Event, id:number, price:number):void{

    this.budgetList.calculateTotal(price, id);

    this.listArr[id].showPanel=(event.target as HTMLInputElement).checked
  }

}
