import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface TableProps {
  data: any[];
  columns: any[];
  limit: number;
  page: number;
  pagination: {
    startingIndex: number;
    endingIndex: number;
    totalIndex: number;
  };
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (
    currentRowsPerPage: number,
    currentPage: number
  ) => void;
}

const ReusableTable = ({
  data,
  columns,
  page,
  limit,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
}: TableProps) => {
  return (
    <div className="h-4/5 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 table-fixed">
        {/* column or table head */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-2 px-4 font-bold border-b border-gray-300 whitespace-nowrap text-center"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        {/* data or table body */}
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column: any, colIndex: number) => (
                <td
                  key={colIndex}
                  className="py-2 px-4 border-b border-gray-300 whitespace-nowrap text-center"
                >
                  {(() => {
                    const cellValue =
                      (column.cell && column.cell(row)) ||
                      (typeof column.selector === "function"
                        ? column.selector(row)
                        : column.selector
                            .split(".")
                            .reduce((acc: any, prop: any) => acc?.[prop], row));

                    return cellValue !== undefined ? cellValue : "";
                  })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <div>
          Rows per page:{" "}
          <select
            value={limit}
            onChange={(e) =>
              onChangeRowsPerPage &&
              onChangeRowsPerPage(parseInt(e.target.value), page)
            }
          >
            {[25, 50, 100, 500].map((rowsPerPage) => (
              <option key={rowsPerPage} value={rowsPerPage}>
                {rowsPerPage}
              </option>
            ))}
          </select>
        </div>
        <div>
          {pagination?.startingIndex || 0} -{" "}
          {(pagination?.endingIndex >= pagination?.totalIndex
            ? pagination.totalIndex
            : pagination?.endingIndex) || 0}{" "}
          of {pagination?.totalIndex || 0}
        </div>
        <div className="flex gap-4">
          <button
            className={
              page === 1
                ? "p-2 rounded-full cursor text-gray-400 font-bold"
                : "p-2 hover:bg-gray-300 rounded-full text-black font-bold cursor-pointer"
            }
            onClick={() => onChangePage && onChangePage(page - 1)}
            disabled={page === 1}
          >
            <GrFormPrevious />
          </button>
          <button
            className={
              pagination?.endingIndex >= pagination?.totalIndex
                ? "p-2 rounded-full cursor text-gray-400 font-bold"
                : "p-2 hover:bg-gray-300 rounded-full text-black font-bold cursor-pointer"
            }
            onClick={() => onChangePage && onChangePage(page + 1)}
            disabled={pagination?.endingIndex >= pagination?.totalIndex}
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
