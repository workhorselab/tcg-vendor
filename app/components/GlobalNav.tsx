import { TestLink } from "~/components/TestLink";

export function GlobalNav() {
  return (
    <nav className="bg-[#0a0a0a] border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <TestLink
              to="/"
              className="text-white font-semibold text-xl no-underline hover:text-gray-300"
            >
              TradeUp
            </TestLink>
          </div>

          <div className="flex items-center gap-8">
            <TestLink
              to="#features"
              className="text-gray-400 hover:text-white no-underline text-sm font-medium"
            >
              Features
            </TestLink>
            <TestLink
              to="#pricing"
              className="text-gray-400 hover:text-white no-underline text-sm font-medium"
            >
              Pricing
            </TestLink>
            <TestLink
              to="#community"
              className="text-gray-400 hover:text-white no-underline text-sm font-medium"
            >
              Community
            </TestLink>
            <TestLink
              to="/login"
              className="text-white hover:text-gray-300 no-underline text-sm font-medium"
            >
              Sign In
            </TestLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
