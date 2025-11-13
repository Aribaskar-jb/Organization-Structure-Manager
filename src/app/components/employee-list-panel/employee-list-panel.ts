import { Component, OnInit, signal, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Search } from '../../design_system_components/search/search';
import { SingleSelect } from '../../design_system_components/single-select/single-select';
import { Card } from '../../design_system_components/card/card';
import { TemplateRef } from '@angular/core';
import { SingleSelectOption } from '../../models/single-select.model';
import { CardLoader } from '../card-loader/card-loader';

@Component({
  selector: 'app-employee-list-panel',
  imports: [CommonModule, Search, SingleSelect, Card , CardLoader],
  templateUrl: './employee-list-panel.html',
  styleUrl: './employee-list-panel.scss',
})
export class EmployeeListPanel {
  employees = input.required<Employee[]>();
  searchQuery = output<string>();
  selectedTeam = output<SingleSelectOption>();
  teamsList = input.required<string[]>();
  filteredEmployees = input.required<Employee[]>();
  isLoading = input.required<boolean>();
  loader=[1,2,3,4,5,6,7,8,9,10];

  onSearch(query: string) {
    this.searchQuery.emit(query);
  }

  onTeamChange(team: SingleSelectOption) {
    this.selectedTeam.emit(team);
  }
}
