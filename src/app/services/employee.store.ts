import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { EmployeeSignalStoreState } from '../models/employee-signal-store.model';
import { EmployeeService } from './employee.service';
import { SingleSelectOption } from '../models/single-select.model';
import { Employee } from '../models/employee.model';

const initialState: EmployeeSignalStoreState = {
  employees: [],
  seachFilter: { value: 'All Teams', label: 'All' },
  seachTerm: '',
  isLoading: true,
};

export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ seachFilter, employees, seachTerm }) => ({
    filteredEmployeesList: computed(() => {
      const team = seachFilter().value;
      const search = seachTerm().toLowerCase();
      let employeesData = employees();
      if (team !== 'All Teams') {
        employeesData = employeesData.filter((e) => e.team === team);
      }

      if (search) {
        employeesData = employeesData.filter(
          (e) =>
            e.name.toLowerCase().includes(search) ||
            e.designation.toLowerCase().includes(search) ||
            e.team.toLowerCase().includes(search)
        );
      }
      return employeesData;
    }),
    teamsList: computed(() => {
      const uniqueTeams = [...new Set(employees().map((emp) => emp.team))];
      return ['All Teams', ...uniqueTeams];
    }),
    chartData: computed(() => {
      const search = seachTerm().toLowerCase();
      const team = seachFilter().value;
      let allEmployees = employees();
      allEmployees.forEach((employee) => {
        employee.manager = employee.manager ? Number(employee.manager) : null;
        employee.id = Number(employee.id);
      });
      let employeesForChart: Employee[];
      if (search) {
        allEmployees = allEmployees.filter(
          (e) =>
            e.name.toLowerCase().includes(search) ||
            e.designation.toLowerCase().includes(search) ||
            e.team.toLowerCase().includes(search)
        );
      }
      if (team === 'All Teams' || !team) {
        employeesForChart = [...allEmployees];
      } else {
        const teamMembers = allEmployees.filter((e) => e.team === team);
        const managers = new Map<number, Employee>();
        allEmployees.forEach((e) => managers.set(e.id, e));

        const chartEmployees = new Set<Employee>(teamMembers);

        teamMembers.forEach((member) => {
          let current: Employee | undefined = member;
          while (current && current.manager) {
            const manager = managers.get(current.manager);
            if (manager && !chartEmployees.has(manager)) {
              chartEmployees.add(manager);
              current = manager;
            } else {
              break;
            }
          }
        });
        employeesForChart = Array.from(chartEmployees);
      }

      // Transform data for GoJS: remove 'manager' property for root nodes.
      return employeesForChart.map((e) => {
        const nodeData: any = { ...e };
        if (nodeData.manager === null) {
        }
        return nodeData;
      });
    }),
  })),

  withMethods((store, employeeService = inject(EmployeeService)) => ({
    setSeachTerm(term: string) {
      patchState(store, { seachTerm: term });
    },
    setSeachFilter(filter: SingleSelectOption) {
      patchState(store, { seachFilter: filter });
    },
    updateEmployees(employee: Employee) {
      patchState(store, { isLoading: true });

      employeeService.updateEmployee(employee.id, employee).subscribe((updatedEmployee) => {
        patchState(store, { isLoading: false });
        patchState(store, {
          employees: store
            .employees()
            .map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)),
        });
      });
    },
  })),
  withHooks((store, employeeService = inject(EmployeeService)) => ({
    onInit() {
      employeeService.getEmployees().subscribe((employees) => {
        patchState(store, { employees: employees });
        patchState(store, { isLoading: false });
      });
    },
  }))
);
