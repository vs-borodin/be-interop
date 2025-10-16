import { Building2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white text-lg">
                CoreTEQ Technology
              </div>
              <div className="text-sm text-gray-400">
                Internal Development Tools
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              @mixin-ui/be-interop
            </p>
            <p className="text-sm text-gray-500 mt-1">
              © {currentYear} CoreTEQ Technology. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            Built for internal use by the CoreTEQ development team
          </p>
        </div>
      </div>
    </footer>
  );
}
