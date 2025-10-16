import { CodeBlock } from './CodeBlock';

export function Examples() {
  const basicExample = `import { dataList } from '@mixin-ui/be-interop';
import { inject } from '@angular/core';
import { UserService } from './user.service';

export class UserListComponent {
  readonly userService = inject(UserService);

  readonly users = dataList({
    stream: params => this.userService.getUsers(params),
    state: {
      query: {
        pagination: { take: 50, skip: 0 },
      },
    },
  });

  loadMore() {
    this.users.paginate(prev => ({
      ...prev,
      skip: prev.skip + prev.take,
    }));
  }

  filterByStatus(status: string) {
    this.users.filter({ status });
  }

  sortByName() {
    this.users.sort(() => [{ key: 'name', order: 'asc' }]);
  }
}`;

  const lazyExample = `import { dataList } from '@mixin-ui/be-interop';

export class ProductListComponent {
  readonly products = dataList.lazy({
    stream: params => this.productService.getProducts(params),
  });

  ngOnInit() {
    this.products.filter({ category: 'electronics' });
  }
}`;

  const storeExample = `import { Injectable, inject, signal } from '@angular/core';
import { dataList } from '@mixin-ui/be-interop';
import { MeterService } from './meter.service';

@Injectable()
export class MeterStore {
  readonly #meterService = inject(MeterService);

  readonly meters = dataList.lazy({
    stream: params => this.#meterService.getMeters(params),
  });

  readonly creating = signal(false);

  createMeter(model: CreateMeterDto) {
    this.creating.set(true);

    return firstValueFrom(
      this.#meterService.createMeter(model).pipe(
        tap({
          next: () => this.meters.reload(),
          finalize: () => this.creating.set(false),
        }),
      ),
    );
  }

  updateMeter(id: string, model: UpdateMeterDto) {
    return firstValueFrom(
      this.#meterService.updateMeter(id, model).pipe(
        tap(() => this.meters.reload()),
      ),
    );
  }

  deleteMeter(id: string) {
    return firstValueFrom(
      this.#meterService.deleteMeter(id).pipe(
        tap(() => this.meters.reload()),
      ),
    );
  }
}`;

  const serviceExample = `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataListDto } from '@mixin-ui/be-interop';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(params: Record<string, any>): Observable<DataListDto<User>> {
    return this.http.get<DataListDto<User>>('/api/users', { params });
  }
}`;

  return (
    <section id="examples" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Usage Examples
        </h2>
        <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
          See how to integrate dataList in your Angular components and stores
        </p>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Basic Usage
            </h3>
            <p className="text-gray-600 mb-6">
              Create a data list with pagination, filtering, and sorting capabilities.
            </p>
            <CodeBlock code={basicExample} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Lazy Loading
            </h3>
            <p className="text-gray-600 mb-6">
              Use dataList.lazy to defer the initial request until the first query change.
            </p>
            <CodeBlock code={lazyExample} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Store Integration
            </h3>
            <p className="text-gray-600 mb-6">
              Integrate dataList with your store pattern. After mutations, simply call reload() to refresh the list.
            </p>
            <CodeBlock code={storeExample} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Service Contract
            </h3>
            <p className="text-gray-600 mb-6">
              Your service should return DataListDto with data and total properties.
            </p>
            <CodeBlock code={serviceExample} />
          </div>
        </div>
      </div>
    </section>
  );
}
