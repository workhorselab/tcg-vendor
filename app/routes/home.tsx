import { Button } from "~/components/ui/Button";
import { TestLink } from "~/components/TestLink";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TradeUp - Your Collection, Quantified" },
    { name: "description", content: "Track every buy, sell, and trade" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Card Mockup */}
            <div className="relative">
              {/* Card Frame */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 border border-gray-800 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="text-center space-y-6">
                  <div className="text-yellow-500 text-sm font-semibold tracking-wider">
                    PSA 10 · GEM MINT
                  </div>

                  <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-gray-600 text-xl font-semibold mb-4">
                        Crystal Charizard
                      </div>
                      <div className="text-gray-500 text-sm">
                        Drop your Crystal<br />Charizard photo here
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto">
                <div>
                  <div className="text-white text-2xl font-bold">$2.4M+</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                    Portfolio Tracked
                  </div>
                </div>
                <div>
                  <div className="text-white text-2xl font-bold">18K+</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                    Transactions
                  </div>
                </div>
                <div>
                  <div className="text-white text-2xl font-bold">94%</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                    ROI Clarity
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-yellow-500 text-sm font-semibold tracking-wider uppercase">
                  Your Collection, Quantified
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Know exactly what your slabs are{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                    worth.
                  </span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                  TradeUp is the accounting layer for vendors and collectors. Track every buy, sell, and trade — then visualize your portfolio's performance over time. No more spreadsheets. No more guessing what you paid.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <TestLink to="/register">
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 text-base font-medium border-0">
                    Start Tracking Free
                  </Button>
                </TestLink>
                <Button
                  variant="secondary"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 text-base font-medium border-gray-800"
                >
                  See How It Works
                </Button>
              </div>

              {/* Features List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Portfolio Analytics</div>
                    <div className="text-gray-500 text-sm">
                      Real-time P&L across your entire collection with charts and breakdowns.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Trade Journaling</div>
                    <div className="text-gray-500 text-sm">
                      Log every transaction with photos, grades, and market comps.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Market Pulse</div>
                    <div className="text-gray-500 text-sm">
                      Track value changes over time. Know when to hold and when to move.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
