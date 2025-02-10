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

  constructor(public budgetList: BudgetService) { }

  addPage(): void {
    this.budgetList.pages++;
  }

  addLanguage(): void {
    this.budgetList.languages++;
  }

  removePage(): void {
    if (this.budgetList.pages > 0) this.budgetList.pages--;
  }

  removeLanguage(): void {
    if (this.budgetList.languages > 0) this.budgetList.languages--;
  }
}
