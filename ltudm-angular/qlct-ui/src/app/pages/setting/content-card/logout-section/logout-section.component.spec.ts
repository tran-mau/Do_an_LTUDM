import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutSectionComponent } from './logout-section.component';

describe('LogoutSectionComponent', () => {
  let component: LogoutSectionComponent;
  let fixture: ComponentFixture<LogoutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
