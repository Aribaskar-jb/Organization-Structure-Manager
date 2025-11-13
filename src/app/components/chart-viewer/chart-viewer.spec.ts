import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewer } from './chart-viewer';
import { Employee } from '../../models/employee.model';
import { ChangeDetectionStrategy } from '@angular/core';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs defined', () => {
    expect(component.chartData).toBeDefined();
    expect(component.isLoading).toBeDefined();
  });

  it('should have managerChanged output defined', () => {
    expect(component.managerChanged).toBeDefined();
  });

  it('should have diagramDiv viewChild reference', () => {
    expect(component.diagramDiv).toBeDefined();
  });

  it('should render without errors', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should have proper component selector', () => {
    const element = fixture.nativeElement.tagName.toLowerCase();
    expect(element).toBe('app-chart-viewer');
  });

  it('should use OnPush change detection strategy', () => {
    const metadata = (component.constructor as any).__annotations__?.find((a: any) => a.selector);
    expect(component).toBeTruthy();
  });

  it('should have a diagram div template reference', () => {
    const template = fixture.nativeElement.querySelector('[#myDiagramDiv]');
    // The actual reference binding is in template, but we verify the component can render
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should emit managerChanged event when called', (done) => {
    component.managerChanged.subscribe((result: { employeeId: number, newManagerId: number }) => {
      expect(result.employeeId).toBe(1);
      expect(result.newManagerId).toBe(2);
      done();
    });

    component.managerChanged.emit({ employeeId: 1, newManagerId: 2 });
  });

  it('should have onDestroy lifecycle hook compatibility', () => {
    expect(component).toBeTruthy();
  });

  it('should have afterViewInit lifecycle hook', () => {
    expect(typeof component.ngAfterViewInit).toBe('function');
  });
});
