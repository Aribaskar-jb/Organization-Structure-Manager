import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://67f9582d094de2fe6ea13fc3.mockapi.io/api/vi/Employee';

  constructor(private http: HttpClient) {}

  /**
   * Get all employees
   * GET /api/Employee
   */
  getEmployees(){
    console.log('Fetching employees from API...');
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /**
   * Get a single employee by ID
   * GET /api/Employee/:id
   */
  getEmployeeById(employeeId: number): Promise<Employee> {
    console.log(`Fetching employee ${employeeId} from API...`);
    return firstValueFrom(this.http.get<Employee>(`${this.apiUrl}/${employeeId}`));
  }

  /**
   * Create a new employee
   * POST /api/Employee
   */
  createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    console.log('Creating new employee via API...', employee);
    return firstValueFrom(this.http.post<Employee>(this.apiUrl, employee));
  }

  /**
   * Update an existing employee
   * PUT /api/Employee/:id
   */
  updateEmployee(employeeId: number, employee: Partial<Employee>){
    console.log(`Updating employee ${employeeId} via API...`, employee);
    return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, employee);
  }

  /**
   * Update an employee's manager (convenience method)
   * PUT /api/Employee/:id
   */
  updateEmployeeManager(employeeId: number, newManagerId: number | null) {
    console.log(`Updating manager for employee ${employeeId} to ${newManagerId}`);
    return this.updateEmployee(employeeId, { manager: newManagerId });
  }

  /**
   * Delete an employee
   * DELETE /api/Employee/:id
   */
  deleteEmployee(employeeId: number): Promise<void> {
    console.log(`Deleting employee ${employeeId} via API...`);
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${employeeId}`));
  }
}
