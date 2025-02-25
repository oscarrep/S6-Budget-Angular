import { Component, Input } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-panel',
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

  constructor(public budgetList: BudgetService, public home: HomeComponent) { }

  addPage(): void {
    this.add = true;
    this.budgetList.pages.update(pages => pages + 1);
    this.budgetList.calculateWebTotal(true);
    this.home.updateUrl();
  }

  addLanguage(): void {
    this.add = true;
    this.budgetList.languages.update(languages => languages + 1);
    this.budgetList.calculateWebTotal(true);
    this.home.updateUrl();
  }

  removePage(): void {
    if (this.budgetList.pages() > 1) {
      this.add = false;
      this.budgetList.pages.update(pages => pages > 0 ? pages - 1 : 0);
      this.budgetList.calculateWebTotal(false);
      this.home.updateUrl();
    }
  }

  removeLanguage(): void {
    if (this.budgetList.languages() > 1) {
      this.add = false;
      this.budgetList.languages.update(languages => languages > 0 ? languages - 1 : 0);
      this.budgetList.calculateWebTotal(false);
      this.home.updateUrl();
    }
  }

  openPopup(popup: boolean): void {
    popup = true;
  }

  closePopup(popup: boolean): void {
    popup = false;
  }
}
