import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPanel } from './employee-list-panel';

describe('EmployeeListPanel', () => {
  let component: EmployeeListPanel;
  let fixture: ComponentFixture<EmployeeListPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
