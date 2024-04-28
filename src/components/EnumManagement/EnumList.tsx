import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ReusableTable from "../FormField/ReusableTable";
import { Enum, Pagination } from "@/utils/constant";

function EnumList() {
  const [enums, setEnums] = useState<Enum[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const router = useRouter();
  const [pagination, setPagination] = useState<Pagination>({
    startingIndex: 0,
    endingIndex: 0,
    totalIndex: 0,
  });

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
          {row.value_type === "string"
            ? row.values.map((value: string, index: number) => (
                <span key={index}>
                  {value}
                  {index !== row.values.length - 1 && ","}
                  {index !== row.values.length - 1 && <br />}
                </span>
              ))
            : row.values.map((value: any, index: number) => (
                <span key={index}>
                  {value.type}{" "}
                  <a
                    className="text-blue-600 font-semibold"
                    href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${value.image}`}
                    target="_blank"
                  >
                    Image
                  </a>
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
      name: "Created At",
      selector: "created_at",
      cell: (row: any) => new Date(row.created_at).toLocaleString(),
    },
    {
      name: "Updated At",
      selector: "updated_at",
      cell: (row: any) => new Date(row.updated_at).toLocaleString(),
    },
    {
      name: "Action",
      cell: (row: any) => (
        <>
          <button
            className="border-2 border-blue-300 px-3 py-1 font-semibold text-blue-500 text-lg mx-1 rounded-lg"
            onClick={() =>
              router.push(
                `${
                  row.value_type === "string"
                    ? `/enums/add-boat-enum?editId=${row._id}`
                    : `/enums/add-address-enum?editId=${row._id}`
                }`
              )
            }
          >
            <CiEdit />
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
