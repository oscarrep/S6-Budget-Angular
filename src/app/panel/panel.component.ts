import { Component, Input } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';


@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Input() text: string = '';

  price: number;
  id: number;

  constructor(public budgetList: BudgetService) {
    this.price = this.budgetList.getPriceById(2);
    this.id = this.budgetList.getId(2);
  }

  addPage(): void {
    this.budgetList.pages++;
    this.budgetList.calculateWebTotal(this.price, this.id);
  }

  addLanguage(): void {
    this.budgetList.languages++;
    this.budgetList.calculateWebTotal(this.price, this.id);
  }

  removePage(): void {
    if (this.budgetList.pages > 1) {
      this.budgetList.pages--;
      this.budgetList.calculateWebTotal(this.price, this.id);
    }
  }

  removeLanguage(): void {
    if (this.budgetList.languages > 1) {
      this.budgetList.languages--;
      this.budgetList.calculateWebTotal(this.price, this.id);
    }
  }
}
