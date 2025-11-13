import { Employee } from "./employee.model";
import { SingleSelectOption } from "./single-select.model";

export interface EmployeeSignalStoreState {
    employees: Employee[];
    seachTerm: string;
    seachFilter:SingleSelectOption;
    isLoading: boolean;
}