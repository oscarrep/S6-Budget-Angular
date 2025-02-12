import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a page', () => {
    component.addPage();
    expect(component.budgetList.pages).toBe(2);
  });

  it('should remove a page', () => {
    component.removePage();
    expect(component.budgetList.pages).toBe(1);
  });
  
  it('should add a language', () => {
    component.addLanguage();
    expect(component.budgetList.languages).toBe(2);
  });

  it('should remove a language', () => {
    component.removeLanguage();
    expect(component.budgetList.languages).toBe(1);
  });

  it('should increase the price by 30', () => {
    component.budgetList.calculateWebTotal(true)
    expect(component.budgetList.totalPrice).toBe(30);
  })

  it('should decrease the price by 30', () => {
    component.budgetList.calculateWebTotal(false)
    expect(component.budgetList.totalPrice).toBe(-30);
  })

});
