import React from "react";
import DataTable from "react-data-table-component";

interface TableColumn {
  name: string;
  selector?: string | ((row: any) => any);
  cell?: (row: any, index: number) => React.ReactNode;
}

interface DynamicTableProps {
  data: any[];
  columns: TableColumn[];
  limit?: number;
  page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (
    currentRowsPerPage: number,
    currentPage: number
  ) => void;
}

function DynamicTable({
  data,
  columns,
  limit,
  page,
  total,
  onChangePage,
  onChangeRowsPerPage,
}: DynamicTableProps) {
  return (
    <DataTable
      columns={columns as any}
      data={data}
      pagination
      responsive
      fixedHeader
      paginationPerPage={limit}
      paginationRowsPerPageOptions={[1,5, 15, 25, 50, 100, 500]}
      paginationTotalRows={total}
      paginationDefaultPage={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
        if (onChangeRowsPerPage) {
          onChangeRowsPerPage(currentRowsPerPage, currentPage);
        }
      }}
    />
  );
}

export default DynamicTable;
