import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetingComponent } from './add-budgeting.component';

describe('AddBudgetingComponent', () => {
  let component: AddBudgetingComponent;
  let fixture: ComponentFixture<AddBudgetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBudgetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBudgetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
