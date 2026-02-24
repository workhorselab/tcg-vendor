import { Button } from "~/components/ui/Button";
import { TextField } from "~/components/ui/TextField";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  onNew?: () => void;
  newButtonLabel?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export function DataTable<T extends { id: string | number }>({
  title,
  description,
  columns,
  data,
  searchPlaceholder = "Search...",
  onNew,
  newButtonLabel = "New",
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="h-9 pl-9 pr-4 bg-[#1a1a1a] border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-2.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {onNew && (
          <Button
            onPress={onNew}
            className="bg-white hover:bg-gray-100 text-black border-0 h-9 text-sm font-medium flex items-center gap-2"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>{newButtonLabel}</span>
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-[#222] transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 text-sm text-gray-300">
                        {column.render(item)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
              to{" "}
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}{" "}
              of {pagination.totalItems} results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-700 rounded text-sm text-gray-400 hover:bg-gray-800 transition-colors">
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
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="px-3 py-1.5 border border-gray-700 rounded text-sm text-gray-400 hover:bg-gray-800 transition-colors">
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${
                      page === pagination.currentPage
                        ? "bg-blue-600 text-white"
                        : "border border-gray-700 text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {pagination.totalPages > 5 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button className="px-3 py-1.5 border border-gray-700 rounded text-sm text-gray-400 hover:bg-gray-800 transition-colors">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="px-3 py-1.5 border border-gray-700 rounded text-sm text-gray-400 hover:bg-gray-800 transition-colors">
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
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
