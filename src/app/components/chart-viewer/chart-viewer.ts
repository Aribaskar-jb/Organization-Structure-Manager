import { Component, effect, ElementRef, input, output, ViewChild, inject, OnDestroy, AfterViewInit, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { TreeLoader } from '../tree-loader/tree-loader';
import { CommonModule } from '@angular/common';

declare var go: any;

@Component({
  selector: 'app-chart-viewer',
  imports: [TreeLoader, CommonModule],
  templateUrl: './chart-viewer.html',
  styleUrl: './chart-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartViewer implements AfterViewInit {
 diagramDiv = viewChild.required<ElementRef>('myDiagramDiv');
  chartData = input.required<Employee[]>();
  isLoading = input.required<boolean>();
  managerChanged = output<{ employeeId: number, newManagerId: number }>();

  private diagram: any;

  constructor() {
    effect(() => {
      const data = this.chartData();
      if (this.diagram && data) {
        console.log('Updating diagram data:', data);
        this.updateDiagramModel(data);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initDiagram();
  }
  
  private initDiagram(): void {
    const $ = go.GraphObject.make;
    this.diagram = $(go.Diagram, this.diagramDiv().nativeElement, {
       initialContentAlignment: go.Spot.Center,
      'undoManager.isEnabled': true,
      layout: $(go.TreeLayout, { angle: 90, layerSpacing: 45 }),
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
    });

    this.diagram.nodeTemplate = $(
      go.Node, 'Auto',
      {
        deletable: false,
        toolTip:
          $(go.Adornment, "Auto",
            $(go.Shape, { fill: "#FFFFCC" }),
            $(go.TextBlock, { margin: 4 },
              new go.Binding("text", "name"))
          ),
        // handle dropping a node onto another node to re-parent
        mouseDrop: (e: any, targetNode: any) => {
            const draggedNode = e.diagram.selection.first();
            if (!(draggedNode instanceof go.Node) || !(targetNode instanceof go.Node)) return;
            if (draggedNode.key === targetNode.key) return; // Cannot be own manager

            // Prevent circular dependencies by checking up the tree
            let m = targetNode;
            while (m.findLinksInto().first()) {
                m = m.findLinksInto().first().fromNode;
                if (m.key === draggedNode.key) {
                    return; // Found circular dependency
                }
            }
            
            this.managerChanged.emit({ employeeId: draggedNode.key, newManagerId: targetNode.key });
        }
      },
      $(go.Shape, 'RoundedRectangle', {
        fill: '#2d3748', // gray-800
        stroke: '#4a5568', // gray-600
        strokeWidth: 2,
      }),
      $(
        go.Panel, 'Vertical', { margin: 10 },
        $(go.TextBlock, { margin: 4, stroke: '#e2e8f0', font: 'bold 16px sans-serif' }, new go.Binding('text', 'name')),
        $(go.TextBlock, { margin: 4, stroke: '#a0aec0', font: '14px sans-serif' }, new go.Binding('text', 'designation')),
        $(go.TextBlock, { margin: 4, stroke: '#4fd1c5', font: 'italic 12px sans-serif' }, new go.Binding('text', 'team'))
      )
    );

    this.diagram.linkTemplate = $(
      go.Link, { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape, { strokeWidth: 2, stroke: '#4a5568' })
    );
    this.updateDiagramModel(this.chartData());
  }
  private updateDiagramModel(employees: Employee[]): void {
    if (!this.diagram) return;

    this.diagram.model = new go.GraphLinksModel(
        employees.map(e => ({
            key: e.id,
            name: e.name,
            designation: e.designation,
            team: e.team
        })),
        employees
            .filter(e => e.manager !== null)
            .map(e => ({
                from: e.manager,
                to: e.id
            }))
    );
  }
}

