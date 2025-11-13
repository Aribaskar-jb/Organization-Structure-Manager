import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPanel } from './employee-list-panel';
import { Employee } from '../../models/employee.model';
import { SingleSelectOption } from '../../models/single-select.model';

describe('EmployeeListPanel', () => {
  let component: EmployeeListPanel;
  let fixture: ComponentFixture<EmployeeListPanel>;
  let mockEmployees: Employee[];
  let mockFilteredEmployees: Employee[];
  let mockTeams: string[];

  beforeEach(async () => {
    mockEmployees = [
      { id: 1, name: 'John Doe', designation: 'Manager', team: 'Sales', manager: null },
      { id: 2, name: 'Jane Smith', designation: 'Developer', team: 'Tech', manager: 1 }
    ];

    mockFilteredEmployees = [
      { id: 1, name: 'John Doe', designation: 'Manager', team: 'Sales', manager: null }
    ];

    mockTeams = ['Sales', 'Tech', 'HR'];

    await TestBed.configureTestingModule({
      imports: [EmployeeListPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListPanel);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs defined', () => {
    expect(component.employees).toBeDefined();
    expect(component.teamsList).toBeDefined();
    expect(component.filteredEmployees).toBeDefined();
    expect(component.isLoading).toBeDefined();
  });

  it('should have output events defined', () => {
    expect(component.searchQuery).toBeDefined();
    expect(component.selectedTeam).toBeDefined();
  });

  it('should have loader array with 10 items', () => {
    expect(component.loader).toBeDefined();
    expect(component.loader.length).toBe(10);
  });

  it('should emit search query on onSearch', (done) => {
    component.searchQuery.subscribe((query: string) => {
      expect(query).toBe('test search');
      done();
    });

    component.onSearch('test search');
  });

  it('should emit selected team on onTeamChange', (done) => {
    const mockTeam: SingleSelectOption = { value: 'Sales', label: 'Sales' };

    component.selectedTeam.subscribe((team: SingleSelectOption) => {
      expect(team.value).toBe('Sales');
      expect(team.label).toBe('Sales');
      done();
    });

    component.onTeamChange(mockTeam);
  });

  it('should have proper component selector', () => {
    const element = fixture.nativeElement.tagName.toLowerCase();
    expect(element).toBe('app-employee-list-panel');
  });

  it('should render without errors', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should handle empty search query', (done) => {
    component.searchQuery.subscribe((query: string) => {
      expect(query).toBe('');
      done();
    });

    component.onSearch('');
  });

  it('should handle multiple team changes', () => {
    let emittedTeams: SingleSelectOption[] = [];

    component.selectedTeam.subscribe((team: SingleSelectOption) => {
      emittedTeams.push(team);
    });

    const team1: SingleSelectOption = { value: 'Sales', label: 'Sales' };
    const team2: SingleSelectOption = { value: 'Tech', label: 'Tech' };

    component.onTeamChange(team1);
    component.onTeamChange(team2);

    expect(emittedTeams.length).toBe(2);
    expect(emittedTeams[0].value).toBe('Sales');
    expect(emittedTeams[1].value).toBe('Tech');
  });

  it('should be present in the DOM', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element).toBeTruthy();
  });
});
