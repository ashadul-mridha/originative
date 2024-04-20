import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import ReusableTable from "../FormField/ReusableTable";

function EnumList() {
  const [enums, setEnums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const router = useRouter();
  const [pagination, setPagination] = useState<any>({});

  const getList = async () => {
    try {
      setLoading(true);
      const result = await handleResource({
        method: "get",
        endpoint: `enum?page=${page}&limit=${limit}`,
      });
      setEnums(result.data);
      setPagination(result.page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (row: any) => {
    try {
      setLoading(true);
      await handleResource({
        method: "delete",
        endpoint: "enum",
        id: row,
        popupMessage: true,
        popupText: "Enum Deleted Successfully!",
      });
      setLoading(false);
      getList();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getList();
  }, [limit, page]);

  const columns = [
    {
      name: "Key",
      selector: "key",
    },
    {
      name: "Values",
      selector: "values",
      cell: (row: any) => (
        <div style={{ whiteSpace: "pre-line" }}>
          {row.values.map((value: string, index: number) => (
            <span key={index}>
              {value}
              {index !== row.values.length - 1 && ","}
              {index !== row.values.length - 1 && <br />}
            </span>
          ))}
        </div>
      ),
    },
    {
      name: "Status",
      selector: "is_active",
      cell: (row: any) => (row.is_active === true ? "Active" : "Inactive"),
    },
    {
      name: "Action",
      cell: (row: any) => (
        <>
          <button
            className="border-2 border-blue-300 px-3 py-1 font-semibold text-blue-500 text-lg mx-1 rounded-lg"
            onClick={() => router.push(`/enums/add-form?editId=${row._id}`)}
          >
            <LuClipboardEdit />
          </button>
          <button
            className="border-2 border-red-300 px-3 py-1 font-semibold text-red-500 text-lg mx-1 rounded-lg"
            onClick={() => handleDelete(row._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newLimit: number, newPage: number) => {
    setLimit(newLimit);
    setPage(newPage);
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="px-3">
            {" "}
            <ReusableTable
              data={enums}
              columns={columns}
              limit={limit}
              page={page}
              pagination={pagination}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
            />
          </div>
        </>
      )}
    </>
  );
}

export default EnumList;
