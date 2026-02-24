interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  status?: {
    label: string;
    variant: "active" | "inactive" | "pending";
  };
  breadcrumbs?: Array<{ label: string; href?: string }>;
  collapsed?: boolean;
  onToggleSidebar?: () => void;
}

export function PageHeader({
  title,
  description,
  action,
  status,
  breadcrumbs,
  collapsed,
  onToggleSidebar,
}: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-black">
      {/* Breadcrumbs - matches sidebar logo height */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="h-[68px] px-8 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center text-sm">
            {/* Sidebar Toggle */}
            {onToggleSidebar && (
              <>
                <button
                  onClick={onToggleSidebar}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </button>
                <div className="h-6 w-px bg-gray-700 mx-5" />
              </>
            )}
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-500">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Top Nav Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>

            {/* User Menu */}
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-white">
                U
              </div>
              <span className="text-sm">User</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Title and Status */}
      <div className="px-8 py-6 bg-black">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">{title}</h1>
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>
          {(status || action) && (
            <div className="flex items-center gap-3">
              {status && (
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-medium rounded ${
                    status.variant === "active"
                      ? "bg-green-500/10 text-green-400"
                      : status.variant === "inactive"
                        ? "bg-gray-500/10 text-gray-400"
                        : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {status.label}
                </span>
              )}
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
