import {CodeBlock} from './CodeBlock';
import { CopyLinkButton } from './CopyLinkButton';
import { StepNavigation } from './StepNavigation';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { FileCode, ListChecks, SlidersHorizontal } from 'lucide-react';

export function Examples() {
    const { copyStepLink, setStepRef } = useStepNavigation();
    const serviceExample = `
import { DataListDto } from '@mixin-ui/be-interop';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #http = inject(HttpClient);

  getUsers(params: Record<string, any>): Observable<DataListDto<User>> {
    return this.#http.get<DataListDto<User>>('/api/users', { params });
  }
}`;

    

    const storeExample = `
import { dataList } from '@mixin-ui/be-interop';
import { UserService } from './user.service';

@Injectable()
export class UserStore {
  readonly users = dataList({
    stream: params => inject(UserService).getUsers(params)
  });
}`;

    const contractExample = `export interface DataListRef<T> {
  readonly items: Signal<readonly T[]>;
  readonly query: Signal<DataListQuery>;
  readonly total: Signal<number>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<unknown>;
  readonly filter: (updater: FilterUpdater) => void;
  readonly sort: (updater: SorterUpdater) => void;
  readonly paginate: (updater: PaginationUpdater) => void;
  readonly search: (query: string) => void;
  readonly reload: () => void;
}`;

    const componentIntegrationTsExample = `
import { dataList } from '@mixin-ui/be-interop';
import { ProductService } from './product.service';

@Component({ ... })
export class ProductListComponent {
  readonly products = dataList({
    stream: params => inject(ProductService).getProducts(params),
  });
}`;

    const searchInputExample = `<input
  type="text"
  placeholder="Search products..."
  (input)="products.search(el.value)" #el
/>`;

    const stateRenderingExample = `@if (products.loading()) {
  <app-spinner />
} @else if (products.error(); as error) {
  <app-error [error]="error" />
} @else {
  @for (item of products.items(); track item.id) {
    <app-product [product]="item" />
  }
}`;

    const defaultStateExample = `
{
  items: [],
  total: 0,
  query: {
    filter: {},
    pagination: { take: 250, skip: 0 },
    sorters: [],
  },
  error: null,
  loading: true,
}`;

    const customStateExample = `// You can override parts of the initial state
readonly users = dataList({
  // ...
  state: {
    query: { pagination: { take: 50, skip: 0 } },
    loading: false,
  }
  // ...
});`;

    const loadingTimeoutExample = `// Prevents loading flicker for fast responses (default: 250ms)
readonly users = dataList({
  // ...
  loadingTimeout: 300
  // ...
});`;

    const searchDebounceExample = `// Debounce for search(query: string) (default: 300ms)
readonly users = dataList({
  // ...
  searchDebounce: 400
  // ...
});`;

    const filterShapeExample = `// Filter: key-value pairs you send to backend
// Example: show only active users from a specific team
{
  status: 'active',
  teamId: '42'
}`;

    const paginationShapeExample = `// Pagination: how many items and from which offset
{ take: 50, skip: 0 } // first page (items 0..49)
{ take: 50, skip: 50 } // second page (items 50..99)`;

    const sorterShapeExample = `// Sorters: list of sorting rules
[
  { key: 'name', order: 'asc' },
  { key: 'createdAt', order: 'desc' }
]`;

    const filterUpdaterExample = `// Two ways to update filter
// 1) Function: get previous filter and return new one
users.filter(prev => ({ ...prev, status: 'active' }));

// 2) Partial object: will be merged into current filter
users.filter({ status: 'active' });`;

    const paginationUpdaterExample = `// Two ways to update pagination
// 1) Function: next page relative to previous values
users.paginate(prev => ({ ...prev, skip: (prev.skip ?? 0) + prev.take }));

// 2) Partial object: set absolute values
users.paginate({ take: 100, skip: 0 });`;

    const sorterUpdaterExample = `// One way to update sorters: provide a new list
users.sort(() => [{ key: 'name', order: 'asc' }]);`;

    const dataListQueryInterfaceExample = `export interface DataListQuery {
  readonly filter: Filter;
  readonly pagination: Pagination;
  readonly sorters: readonly Sorter[];
}`;

    const installKitCommand = `npm install @mixin-ui/kit`;

    const dataGridComponentTsExample = `import { Component, inject } from '@angular/core';
import { dataList, XDataGridConnector } from '@mixin-ui/be-interop';
import { XDataGrid, XTable, XThead, XTh, XTr } from '@mixin-ui/kit';

@Component({
  selector: 'app-employee-grid',
  imports: [XDataGrid, XDataGridConnector, XTable, XThead, XTh, XTr],
  templateUrl: './employee-grid.component.html',
})
export class EmployeeGridComponent {
  readonly employees = dataList<Employee>({
    stream: params => inject(EmployeeService).getEmployees(params),
  });
}`;

    const dataGridTemplateExample = `<x-data-grid
  [x-data-grid-connector]="employees"
>
  <table x-table key="id" [data]="employees.items()">
    <thead x-thead>
    <tr>
      <th x-th="lastName">Last Name</th>
      <th x-th="firstName">First Name</th>
    </tr>
    </thead>

    <tbody>
      @for (employee of employees.items(); track employee.id) {
        <tr x-tr [data]="employee">
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.firstName }}</td>
        </tr>
      }
    </tbody>
  </table>
</x-data-grid>`;

    const dataListDebugBuiltInExample = `readonly employees = dataList<Employee>({
  stream: params => this.#employeeService.getEmployees(params),
  debugName: 'Employees',
});`;

    const dataListDebugConsoleExample = `DataList [Employees]: Query changed: {"filter":{"search":""},"pagination":{"take":250,"skip":0},"sorters":[{"key":"lastName","order":"asc"}]}

DataList [Employees]: Request successful: {"total":2,"data":[{"id":"1","firstName":"Admin","lastName":"Systemovy"},{"id":"2","firstName":"John","lastName":"Doe"}]}

DataList [Employees]: Query changed: {"filter":{"search":"doe"},"pagination":{"take":250,"skip":0},"sorters":[{"key":"lastName","order":"asc"}]}

DataList [Employees]: Request successful: {"total":1,"data":[{"id":"2","firstName":"John","lastName":"Doe"}]}`;

    return (
        <section id="examples" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                    Step-by-step guide
                </h2>
                <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
                    Learn how to use the dataList utility in a clear, incremental way.
                </p>

                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200/50 via-blue-200/30 to-transparent"></div>
                    
                    <div className="mb-8">
                        <StepNavigation />
                    </div>

                    <ol className="space-y-10">
                        <li className="relative pl-16" ref={setStepRef(1)}>
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow ring-1 ring-blue-200">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold">1</div>
                            </div>
                            <div className="group rounded-2xl bg-white p-6 shadow-md border transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                                            <FileCode className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Step 1. Define a data fetching method in a service</h3>
                                    </div>
                                    <CopyLinkButton stepNumber={1} onCopy={copyStepLink} />
                                </div>
                                <p className="text-gray-600 mb-5">
                                    The service must return a properly typed <code>DataListDto&lt;T&gt;</code> from <code>@mixin-ui/be-interop</code>.
                                </p>
                                <CodeBlock code={serviceExample} highlightedLines={[13]} />
                            </div>
                        </li>

                        <li className="relative pl-16" ref={setStepRef(2)}>
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow ring-1 ring-blue-200">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold">2</div>
                            </div>
                            <div className="group rounded-2xl bg-white p-6 shadow-md border transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                                            <ListChecks className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Step 2. dataList options and initial state</h3>
                                    </div>
                                    <CopyLinkButton stepNumber={2} onCopy={copyStepLink} />
                                </div>
                                <div className="space-y-8">
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">stream (required)</div>
                                        <p className="text-gray-600 mb-3">Function that returns an Observable with <code>data</code> and <code>total</code>. It must complete. Typically calls your service method.</p>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">Stream usage</div>
                                                <CodeBlock code={storeExample} highlightedLines={[7]} maxHeightClass="max-h-80" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">state (optional)</div>
                                        <p className="text-gray-600 mb-3">Initial state of the list. You can override parts. Defaults shown below.</p>
                                        <div className="space-y-6">
                                        <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">Default initial state</div>
                                                <CodeBlock code={defaultStateExample} maxHeightClass="max-h-72" />
                                            </div>
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">Custom initial state</div>
                                                <CodeBlock code={customStateExample} highlightedLines={[4,5,6,7]} maxHeightClass="max-h-72" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">loadingTimeout (optional)</div>
                                        <p className="text-gray-600 mb-3">Delay before <code>loading</code> becomes true after subscription. Prevents flicker on fast responses. Default: <code>250ms</code>.</p>
                                        <CodeBlock code={loadingTimeoutExample} highlightedLines={[4]} />
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">searchDebounce (optional)</div>
                                        <p className="text-gray-600 mb-3">Debounce for <code>search(query)</code> method in milliseconds. Default: <code>300ms</code>.</p>
                                        <CodeBlock code={searchDebounceExample} highlightedLines={[4]} />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="relative pl-16" ref={setStepRef(3)}>
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow ring-1 ring-blue-200">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold">3</div>
                            </div>
                            <div className="group rounded-2xl bg-white p-6 shadow-md border transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                                            <SlidersHorizontal className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Step 3. Understand the DataList contract, query and updaters</h3>
                                    </div>
                                    <CopyLinkButton stepNumber={3} onCopy={copyStepLink} />
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Calling <code>dataList</code> creates a <code>DataListRef</code> with signals for state and methods to control behavior.
                                </p>
                                <div className="space-y-8">
                                    <div>
                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">DataListRef</div>
                                        <CodeBlock code={contractExample} maxHeightClass="max-h-72" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-3">The <code>query</code> describes what you want from the server.</p>
                                        <div className="mb-4">
                                            <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">DataListQuery</div>
                                            <CodeBlock code={dataListQueryInterfaceExample} language="typescript" />
                                        </div>
                                        <p className="text-gray-600 mb-3">
                                            It has three parts:
                                        </p>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">filter</div>
                                                <CodeBlock code={filterShapeExample} language="typescript" />
                                            </div>
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">pagination</div>
                                                <CodeBlock code={paginationShapeExample} language="typescript" />
                                            </div>
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">sorters</div>
                                                <CodeBlock code={sorterShapeExample} language="typescript" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">Updaters</div>
                                        <p className="text-gray-600 mb-3">Updaters are simple inputs you pass to <code>filter</code>, <code>paginate</code> and <code>sort</code> to change the <code>query</code>. There are two styles:</p>
                                        <ul className="list-disc pl-5 text-gray-600 mb-4">
                                            <li><span className="text-gray-800 font-medium">Function</span>: receives the previous value and returns the next one (good for relative changes)</li>
                                            <li><span className="text-gray-800 font-medium">Partial object</span>: merged into the current value (good for absolute changes)</li>
                                        </ul>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">filter(updater)</div>
                                                <CodeBlock code={filterUpdaterExample} language="typescript" />
                                            </div>
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">paginate(updater)</div>
                                                <CodeBlock code={paginationUpdaterExample} language="typescript" />
                                            </div>
                                            <div>
                                                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">sort(updater)</div>
                                                <CodeBlock code={sorterUpdaterExample} language="typescript" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <li className="relative pl-16" ref={setStepRef(4)}>
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow ring-1 ring-blue-200">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold">4</div>
                            </div>
                            <div className="group rounded-2xl bg-white p-6 shadow-md border transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                                            <SlidersHorizontal className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Step 4. Component Integration</h3>
                                    </div>
                                    <CopyLinkButton stepNumber={4} onCopy={copyStepLink} />
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Use <code>dataList</code> in a component, render <code>items()</code>, show <code>loading()</code>/<code>error()</code>, and provide search and pagination controls.
                                </p>
                                <div className="space-y-8">
                                  <div>
                                    <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">Component (TS)</div>
                                    <CodeBlock code={componentIntegrationTsExample} />
                                  </div>
                                  <div>
                                    <p className="text-gray-600 mb-3">Search products declaratively:</p>
                                    <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">Search Input</div>
                                    <CodeBlock code={searchInputExample} highlightedLines={[4]} language="html" />
                                  </div>
                                  <div>
                                    <p className="text-gray-600 mb-3">Use computed states to display loading, error, and the collection itself:</p>
                                    <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">State Rendering</div>
                                    <CodeBlock code={stateRenderingExample} highlightedLines={[1,3,6]} language="html" />
                                  </div>
                                </div>
                            </div>
                        </li>

                        <li className="relative pl-16" ref={setStepRef(5)}>
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow ring-1 ring-blue-200">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold">5</div>
                            </div>
                            <div className="group rounded-2xl bg-white p-6 shadow-md border transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                                            <SlidersHorizontal className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Step 5. Integration with Data Grid</h3>
                                    </div>
                                    <CopyLinkButton stepNumber={5} onCopy={copyStepLink} />
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Use a Data Grid to visualize <code>dataList</code> results with built-in sorting, filtering, and pagination that stay in sync with your backend.
                                </p>

                                <div className="space-y-8">
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Capabilities</div>
                                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                            <li>Sorting, filtering, and pagination synchronized with backend</li>
                                            <li>Server-driven data with automatic reload</li>
                                            <li>Query-aware initial state</li>
                                        </ul>
                                    </div>

                                    <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Install UI Kit <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">Optional</span></div>
                                        <p className="text-gray-600 mb-3">Install the UI package that provides the Data Grid component. Only needed if you don't already have @mixin-ui/kit installed.</p>
                                        <CodeBlock code={installKitCommand} language="bash" />
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Component (TS)</div>
                                        <p className="text-gray-600 mb-3">Host the grid and bind your <code>DataListRef</code> as <code>employees</code>. Provide create, update, and open handlers.</p>
                                        <CodeBlock code={dataGridComponentTsExample} />
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Template (HTML)</div>
                                        <p className="text-gray-600 mb-3">Attach the connector via <code>[x-data-grid-connector]</code>.</p>
                                        <CodeBlock code={dataGridTemplateExample} highlightedLines={[2]} language="html" />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="relative pl-16" ref={setStepRef(6)}>
                            <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow ring-1 ring-blue-200">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold">6</div>
                            </div>
                            <div className="group rounded-2xl bg-white p-6 shadow-md border transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                                            <SlidersHorizontal className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Step 6. Debug mode</h3>
                                    </div>
                                    <CopyLinkButton stepNumber={6} onCopy={copyStepLink} />
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Enable console tracing for your <code>DataListRef</code> to inspect queries, requests, and results while you develop. This helps validate sorting, filtering, and search flows in the data grid.
                                </p>

                                <div className="space-y-8">
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Enable built-in debug</div>
                                        <p className="text-gray-600 mb-3">Pass <code>debugName</code> to <code>dataList</code>. The name is used as a prefix for console logs.</p>
                                        <div className="relative">
                                            <CodeBlock code={dataListDebugBuiltInExample} highlightedLines={[3]} />
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Sample console output</div>
                                        <p className="text-gray-600 mb-3">You should see logs similar to the following when sorting, searching, filtering etc.:</p>
                                        <CodeBlock code={dataListDebugConsoleExample} />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
