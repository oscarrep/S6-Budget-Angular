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

  price: number = 0;
  id: number = 0;
  add: boolean = false
  popupP: boolean = false;
  popupL: boolean = false;

  constructor(public budgetList: BudgetService) { }

  addPage(): void {
    this.add = true;
    this.budgetList.pages++;
    this.budgetList.calculateWebTotal(this.add);
  }

  addLanguage(): void {
    this.add = true;
    this.budgetList.languages++;
    this.budgetList.calculateWebTotal(this.add);
  }

  removePage(): void {
    if (this.budgetList.pages > 1) {
      this.add = false;
      this.budgetList.pages--;
      this.budgetList.calculateWebTotal(this.add);
    }
  }

  removeLanguage(): void {
    if (this.budgetList.languages > 1) {
      this.add = false;
      this.budgetList.languages--;
      this.budgetList.calculateWebTotal(this.add);
    }
  }

  openPopup(popup: boolean): void {
    popup = true;
  }

  closePopup(popup:boolean): void {
    popup = false;
  }
}
