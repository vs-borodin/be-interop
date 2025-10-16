export function ApiReference() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          API Reference
        </h2>
        <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
          Complete reference for dataList methods and options
        </p>

        <div className="space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              DataListRef Methods
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  filter(updater: FilterUpdater)
                </h4>
                <p className="text-gray-600">
                  Update filter parameters. Accepts a partial filter object or a function that receives the current filter and returns a new one.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  paginate(updater: PaginationUpdater)
                </h4>
                <p className="text-gray-600">
                  Update pagination parameters (take, skip). Accepts a partial pagination object or an updater function.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  sort(updater: SorterUpdater)
                </h4>
                <p className="text-gray-600">
                  Update sorting parameters. Accepts a function that receives current sorters and returns new sorters array.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  search(query: string)
                </h4>
                <p className="text-gray-600">
                  Update search query with automatic debouncing (300ms by default). Internally updates the filter with a search parameter.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  reload()
                </h4>
                <p className="text-gray-600">
                  Reload the list with current query parameters. Useful after mutations (create, update, delete).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              DataListRef Signals
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  items: Signal&lt;readonly T[]&gt;
                </h4>
                <p className="text-gray-600">
                  Array of items in the current list.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  total: Signal&lt;number&gt;
                </h4>
                <p className="text-gray-600">
                  Total count of items available (for pagination).
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  query: Signal&lt;DataListQuery&gt;
                </h4>
                <p className="text-gray-600">
                  Current query state including filter, pagination, and sorters.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  loading: Signal&lt;boolean&gt;
                </h4>
                <p className="text-gray-600">
                  Loading state. True when request is in progress (respects loadingTimeout).
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  error: Signal&lt;unknown&gt;
                </h4>
                <p className="text-gray-600">
                  Error state. Contains error object if request fails.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Create Options
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  stream: DataListStream&lt;T&gt;
                </h4>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Required.</span> Function that returns an Observable of DataListDto. Must complete.
                </p>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  (params: Record&lt;string, any&gt;) =&gt; Observable&lt;DataListDto&lt;T&gt;&gt;
                </code>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  state?: DataListPartialState&lt;T&gt;
                </h4>
                <p className="text-gray-600">
                  Optional initial state. Can set initial items, query parameters, loading state, etc.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  loadingTimeout?: number
                </h4>
                <p className="text-gray-600">
                  Time in milliseconds before setting loading to true. Prevents flicker for fast responses. Default: 250ms.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  searchDebounce?: number
                </h4>
                <p className="text-gray-600">
                  Debounce time in milliseconds for search() method. Default: 300ms.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Types
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  DataListDto&lt;T&gt;
                </h4>
                <p className="text-gray-600 mb-2">
                  Contract between service and dataList. Backend must return this structure.
                </p>
                <pre className="text-sm bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`interface DataListDto<T> {
  readonly data: readonly T[];
  readonly total: number;
}`}
                </pre>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  DataListQuery
                </h4>
                <p className="text-gray-600 mb-2">
                  Query structure used internally and passed to toParams().
                </p>
                <pre className="text-sm bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`interface DataListQuery {
  readonly filter: Record<string, any>;
  readonly pagination: {
    readonly take: number;
    readonly skip?: number;
  };
  readonly sorters: readonly {
    readonly key: string;
    readonly order: 'asc' | 'desc';
  }[];
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Utilities
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-teal-500 pl-6">
                <h4 className="font-mono text-lg text-gray-900 mb-2">
                  toParams(query: DataListQuery)
                </h4>
                <p className="text-gray-600 mb-2">
                  Converts DataListQuery to HTTP query parameters. Handles pagination, sorting, and filtering according to backend contract.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Example output: <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    take=50&skip=0&sort[0].field=name&sort[0].dir=asc&filter[0].column=status&filter[0].value=active
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
