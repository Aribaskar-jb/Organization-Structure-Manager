import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Search } from './design_system_components/search/search';
import { FormControl } from '@angular/forms';
import { SingleSelect } from './design_system_components/single-select/single-select';
import { Card } from './design_system_components/card/card';
import { EmployeeListPanel } from './components/employee-list-panel/employee-list-panel';
import { EmployeeStore } from './services/employee.store';
import { SingleSelectOption } from './models/single-select.model';
import { ChartViewer } from './components/chart-viewer/chart-viewer';
import { TreeLoader } from './components/tree-loader/tree-loader';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Search,SingleSelect,Card,EmployeeListPanel,ChartViewer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  employeeSingleStore=inject(EmployeeStore);
  
  seachEvent(data:string){
    console.log('Search event:', data);
    this.employeeSingleStore.setSeachTerm(data);
  }
  singSelectChage(data:any){
    console.log('Team select event:', data);
    const teamValue = typeof data === 'string' ? data : data?.value;
    this.employeeSingleStore.setSeachFilter({ value: teamValue, label: teamValue });
  }

   onManagerChanged(event: { employeeId: number, newManagerId: number }) {
    const employee = this.employeeSingleStore.employees().find(e => e.id === event.employeeId);
    if (employee) {
    employee.manager = event.newManagerId;
    this.employeeSingleStore.updateEmployees(employee);
      }    // await this.employeeService.updateEmployeeManager(event.employeeId, event.newManagerId);
  }
}
