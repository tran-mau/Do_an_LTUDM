import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceSectionComponent } from './interface-section.component';

describe('InterfaceSectionComponent', () => {
  let component: InterfaceSectionComponent;
  let fixture: ComponentFixture<InterfaceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfaceSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
