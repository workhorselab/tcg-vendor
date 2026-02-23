import { TestLink } from "~/components/TestLink";

export function GlobalNav() {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
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
              className="text-gray-400 hover:text-white no-underline text-sm font-medium"
            >
              Sign In
            </TestLink>
            <TestLink
              to="/register"
              className="text-gray-400 hover:text-white no-underline text-sm font-medium"
            >
              Sign Up
            </TestLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
