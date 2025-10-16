import { Zap, Package, RefreshCw, Filter, Settings, Clock } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Package,
      title: 'Standardized Lists',
      description: 'Unified approach for loading tables and collections through services. No more duplicated pagination logic.',
    },
    {
      icon: Settings,
      title: 'State Encapsulation',
      description: 'Stores items, total, loading state, errors, and query parameters in one place with reactive signals.',
    },
    {
      icon: RefreshCw,
      title: 'Simple Reload',
      description: 'After mutations (create/update/delete), just call reload() and the list refreshes with current params.',
    },
    {
      icon: Filter,
      title: 'Built-in Filtering',
      description: 'Filter, paginate, and sort methods out of the box. Search with automatic debouncing included.',
    },
    {
      icon: Zap,
      title: 'Lazy Mode',
      description: 'Use dataList.lazy for delayed loading. Perfect when query state needs to stabilize first.',
    },
    {
      icon: Clock,
      title: 'Smart Loading',
      description: 'Configurable loading timeout prevents UI flicker for fast responses. Search debounce reduces API calls.',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Features
        </h2>
        <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
          Everything you need for data list management, built with Angular signals and RxJS.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
