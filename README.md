# 🏢 Organization Structure Manager

A modern, responsive Angular application for managing organizational hierarchies, employee information, and team structures with advanced filtering, visualization, and real-time search capabilities.

---

## Video ref: https://drive.google.com/file/d/1gVKNWcyuUp8tYmFk4c_saWytfjkBfq3u/view?usp=sharing

## Web site Url: https://magenta-nougat-ccb202.netlify.app/

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Data Flow](#-data-flow)
- [Component Architecture](#-component-architecture)
- [Best Practices & Design Patterns](#-best-practices--design-patterns)
- [Features](#-features)
- [Installation & Setup](#-installation--setup)
- [Available Scripts](#-available-scripts)
l---

## 🛠️ Tech Stack

### Frontend Framework
- **Angular 20.3.0** - Modern, scalable frontend framework with standalone components
- **TypeScript** - Strongly-typed JavaScript for better code maintainability
- **RxJS 7.8.0** - Reactive programming library for async operations
- **Bootstrap 5.3.8** - Responsive UI framework
- **ng-bootstrap 19.0.1** - Angular-optimized Bootstrap components
- **FontAwesome 7.1.0** - Icon library for UI enhancements

### State Management
- **@ngrx/signals 20.1.0** - Signal-based reactive state management (modern Angular pattern)
- **Angular Signals** - Built-in signal API for reactive state tracking

### Development & Testing
- **Karma 6.4.0** - Test runner
- **Jasmine 5.9.0** - Testing framework
- **Prettier** - Code formatter with custom Angular template support
- **TypeScript ESLint** - Static code analysis

### Build Tools
- **Angular CLI 20.3.9** - Angular command-line interface
- **Angular Build 20.3.9** - Advanced build optimizer
- **Lodash 4.17.21** - Utility library for functional programming

---

## 🏗️ Architecture Overview

This project follows modern Angular architecture best practices with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Smart Components                      │
│         (Container/Smart Components - Handle Logic)      │
│                                                           │
│  - App Component (Root Container)                        │
│  - EmployeeListPanel (Smart Component)                   │
│  - ChartViewer (Smart Component)                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   State Management                       │
│          (@ngrx/signals + Angular Signal Store)         │
│                                                           │
│  - EmployeeStore (Centralized State)                     │
│  - Computed Signals (Filtered Data, Charts)              │
│  - Signal Methods (State Updates)                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Services Layer                        │
│          (Data Fetching & Business Logic)                │
│                                                           │
│  - EmployeeService (HTTP API Calls)                      │
│  - Async Operations (RxJS Observables)                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Dumb Components                         │
│      (Presentational Components - Display Only)          │
│                                                           │
│  - Search (Input Component)                              │
│  - SingleSelect (Dropdown Component)                     │
│  - Card (Display Component)                              │
│  - CardLoader (Skeleton Loader)                          │
│  - TreeLoader (Tree View Component)                      │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### Complete Data Flow Diagram

![Data Flow Diagram](./Data%20Flow.png)


### State Flow Sequence

![Data Flow Diagram](./State%20Flow.png)


---

## 🧩 Component Architecture

### Smart Components (Container Components)

**Smart components manage state and pass data down to presentational components.**

#### 1. **App Component** (Root Container)
```typescript
- Injects: EmployeeStore
- Responsibilities:
  ✓ Manages top-level component composition
  ✓ Handles user interactions (search, filter)
  ✓ Updates store state
  ✓ Manages employee update logic
```

#### 2. **EmployeeListPanel** (Smart Component)
```typescript
- Purpose: Display filtered employee list
- Data Source: EmployeeStore.filteredEmployeesList
- Responsibilities:
  ✓ Render list of employees
  ✓ Handle manager change events
  ✓ Pass data to Card components
```

#### 3. **ChartViewer** (Smart Component)
```typescript
- Purpose: Visualize employee hierarchy and teams
- Data Source: EmployeeStore.chartData
- Responsibilities:
  ✓ Render org hierarchy charts
  ✓ Display team structure
```

### Dumb Components (Presentational Components)

**Presentational components are reusable, stateless, and only display data passed through @Input.**

#### 1. **Search Component**
```typescript
@Input() placeholder: string
@Output() searchEvent: EventEmitter<string>
- Pure presentation component
- No state management
- Emits user input to parent
```

#### 2. **SingleSelect Component**
```typescript
@Input() options: SingleSelectOption[]
@Input() selectedValue: any
@Output() selectionChange: EventEmitter<any>
- Reusable dropdown/select component
- No internal logic
- Controlled by parent component
```

#### 3. **Card Component**
```typescript
@Input() employee: Employee
@Output() managerChanged: EventEmitter
- Displays employee information
- Presentational only
- No data manipulation
```

#### 4. **CardLoader Component**
```typescript
- Skeleton loader for better UX
- Shows while data is loading
- Improves perceived performance
```

#### 5. **TreeLoader Component**
```typescript
- Renders hierarchical org structure
- Displays in tree format
- Presentational component
```

### Component Hierarchy Diagram

![Data Flow Diagram](./Component%20Hierarchy.png)

---

## ✨ Best Practices & Design Patterns

### 1. **Signal-Based Reactive State Management** ⚡

**Pattern Used:** @ngrx/signals with Signal Store

**Benefits:**
- ✅ Type-safe reactive state
- ✅ Zero-setup state management
- ✅ Fine-grained reactivity
- ✅ Automatic dependency tracking

**Implementation:**
```typescript
export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ employees, searchFilter }) => ({
    // Computed signals automatically track dependencies
    filteredList: computed(() => {
      // Re-computes only when dependencies change
      return filterEmployees(employees(), searchFilter());
    })
  })),
  withMethods((state) => ({
    // Type-safe methods to update state
    updateEmployees: (employee: Employee) => {
      patchState(state, { employees: [...state.employees(), employee] });
    }
  }))
);
```

### 2. **RxJS for Async Operations** 🔄

**Patterns Used:**
- **Observable Pattern:** For HTTP requests
- **firstValueFrom():** Converting Observable to Promise for async/await
- **Reactive Operators:** Transforming and filtering streams

**Key Operators:**
- `map()` - Transform data
- `filter()` - Filter stream based on conditions
- `debounceTime()` - Performance optimization for search
- `distinctUntilChanged()` - Prevent duplicate requests

**Example Usage:**
```typescript
// Convert Observable to Promise
const employee = await firstValueFrom(
  this.http.get<Employee>(`${this.apiUrl}/${id}`)
);

// Use in async context
async updateManagerAsync(id: number, newManagerId: number) {
  const updated = await firstValueFrom(
    this.http.put(`${this.apiUrl}/${id}`, { manager: newManagerId })
  );
  return updated;
}
```

### 3. **Smart vs Dumb Components Pattern** 🎯

**Smart Components (Containers):**
- ✓ Manage state and business logic
- ✓ Inject services and stores
- ✓ Handle user interactions
- ✓ Orchestrate child components
- ✓ Pass data down via @Input

**Dumb Components (Presentational):**
- ✓ Receive data via @Input only
- ✓ No dependencies or services
- ✓ Highly reusable
- ✓ Easy to test
- ✓ Emit events via @Output

**Benefits:**
- Better separation of concerns
- Improved testability
- Enhanced code reusability
- Clearer component responsibilities

### 4. **Computed Signals for Derived State** 📊

**Pattern:** Use `computed()` to derive state without imperative updates

```typescript
filteredEmployeesList: computed(() => {
  const team = searchFilter().value;
  const search = searchTerm().toLowerCase();
  let data = employees();
  
  if (team !== 'All Teams') {
    data = data.filter(e => e.team === team);
  }
  if (search) {
    data = data.filter(e => 
      e.name.toLowerCase().includes(search)
    );
  }
  return data;
})
```

**Advantages:**
- Automatic dependency tracking
- Always in sync with source signals
- Memoized (cached until dependencies change)
- No manual update logic needed

### 5. **Centralized State with Signal Store** 🏪

**Pattern:** Single source of truth for all app state

```typescript
const initialState: EmployeeSignalStoreState = {
  employees: [],        // Main data
  searchFilter: {...},  // Filter state
  searchTerm: '',       // Search state
  isLoading: true       // Loading state
};
```

**Benefits:**
- Predictable state mutations
- Easy debugging (state history)
- Time-travel debugging capability
- Consistent across entire app

### 6. **Dependency Injection (DI)** 💉

**Pattern:** Using Angular's DI to inject services

```typescript
export class App {
  // Service automatically resolved by DI
  employeeStore = inject(EmployeeStore);
  employeeService = inject(EmployeeService);
}
```

**Benefits:**
- Loose coupling between components
- Easy mocking for testing
- Automatic lifecycle management
- Better code organization

### 7. **OnPush Change Detection Strategy** ⚡

**Best Practice:** Use OnPush for dumb components

```typescript
@Component({
  selector: 'app-card',
  template: '...',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  @Input() employee: Employee;
}
```

**Benefits:**
- Improved performance
- Reduced change detection cycles
- Works perfectly with signals
- Only updates when inputs change

### 8. **Typed Observables and Signals** 🔐

**Pattern:** Always use TypeScript types

```typescript
getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.apiUrl);
}

employees = signal<Employee[]>([]);
filteredList = computed<Employee[]>(() => {
  // Type-safe computations
});
```

### 9. **Error Handling** ⚠️

**Pattern:** Centralized error handling in services

```typescript
updateEmployee(id: number, data: Partial<Employee>) {
  return this.http.put<Employee>(
    `${this.apiUrl}/${id}`,
    data
  ).pipe(
    catchError(error => {
      console.error('Update failed:', error);
      return throwError(() => new Error('Failed to update employee'));
    })
  );
}
```

### 10. **Prettier Code Formatting** 🎨

**Configuration:**
- Print width: 100 characters
- Single quotes for JavaScript
- Angular template parser for HTML files
- Automatic formatting on save

---

## ✨ Features

- 🔍 **Real-time Search** - Instant filtering across employees
- 📋 **Team-based Filtering** - Filter by team or view all
- 📈 **Visual Hierarchy** - Organization structure visualization
- 👥 **Employee Management** - View, update employee information
- 🎯 **Manager Assignment** - Drag-and-drop or click to assign managers
- ⚡ **Reactive UI** - Signal-based reactive updates
- 📱 **Responsive Design** - Mobile-friendly Bootstrap layout
- ♿ **Accessibility** - Bootstrap accessibility features
- 🚀 **Performance Optimized** - Lazy loading, efficient rendering

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd orgstructure-manager
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser.

### Step 4: Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

---

## 🚀 Available Scripts

### `npm start`
- Starts development server with live reload
- Angular CLI serves on `localhost:4200`
- Auto-refreshes on file changes

### `npm run build`
- Creates optimized production build
- Outputs to `dist/orgstructure-manager`
- Tree-shaking and minification enabled

### `npm test`
- Runs unit tests with Karma + Jasmine
- Watch mode for continuous testing
- Code coverage reports

### `npm run watch`
- Continuous development build
- Useful for incremental changes
- Outputs to `dist/` directory

---

## 📚 API Integration

**Base URL:** `https://67f9582d094de2fe6ea13fc3.mockapi.io/api/vi/Employee`

### Endpoints

```
GET    /api/vi/Employee          - Get all employees
GET    /api/vi/Employee/:id      - Get employee by ID
POST   /api/vi/Employee          - Create new employee
PUT    /api/vi/Employee/:id      - Update employee
DELETE /api/vi/Employee/:id      - Delete employee
```

---

## 🔧 Project Structure

```
src/
├── app/
│   ├── components/              # Smart & Dumb Components
│   │   ├── employee-list-panel/ # Smart: List container
│   │   ├── chart-viewer/        # Smart: Chart container
│   │   ├── tree-loader/         # Dumb: Tree display
│   │   └── card-loader/         # Dumb: Skeleton loader
│   ├── design_system_components/# Reusable UI Components
│   │   ├── card/                # Dumb: Card display
│   │   ├── search/              # Dumb: Search input
│   │   └── single-select/       # Dumb: Select dropdown
│   ├── models/                  # TypeScript Interfaces
│   │   ├── employee.model.ts
│   │   ├── single-select.model.ts
│   │   └── employee-signal-store.model.ts
│   ├── services/                # Business Logic
│   │   ├── employee.service.ts  # HTTP Operations
│   │   └── employee.store.ts    # State Management
│   ├── app.ts                   # Root Component
│   └── app.html                 # Root Template
├── main.ts                      # Application Entry Point
├── styles.scss                  # Global Styles
└── index.html                   # HTML Template
```

---

**Happy Coding! 🚀**

For questions or improvements, feel free to contribute!
