import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSectionComponent } from './account-section.component';

describe('AccountSectionComponent', () => {
  let component: AccountSectionComponent;
  let fixture: ComponentFixture<AccountSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
