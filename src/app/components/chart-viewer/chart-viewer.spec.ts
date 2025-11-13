import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewer } from './chart-viewer';

describe('ChartViewer', () => {
  let component: ChartViewer;
  let fixture: ComponentFixture<ChartViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
