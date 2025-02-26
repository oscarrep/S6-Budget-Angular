import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { HomeComponent } from '../home/home.component';
import { ModalComponent } from "../shared/modal/modal.component";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  imports: [ModalComponent]
})
export class PanelComponent implements OnInit {
  @Input() text: string = '';

  price: number = 0;
  id: number = 0;
  add: boolean = false
  popupP: boolean = false;
  popupL: boolean = false;

  constructor(public budgetList: BudgetService, public home: HomeComponent) { }

  ngOnInit(): void {
    this.calcPages();
    this.calcLanguages();
  }

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

  calcPages() {
    for (let i = 1; i < this.budgetList.pages(); i++) {
      this.budgetList.calculateWebTotal(true);
    }
  }
  calcLanguages() {
    for (let i = 1; i < this.budgetList.languages(); i++) {
      this.budgetList.calculateWebTotal(true);
    }
  }
}
