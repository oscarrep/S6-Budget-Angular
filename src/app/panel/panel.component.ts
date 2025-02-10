import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Input() text: string = '';

  pages: number = 0;
  languages: number = 0;

  addPage(): void {
    this.pages++;
  }

  addLanguage(): void {
    this.languages++;
  }

  removePage(): void {
    if (this.pages > 0) this.pages--;
  }

  removeLanguage(): void {
    if (this.languages > 0) this.languages--;  }
}
