import React, { useEffect, useState } from "react";
import ReusableTable from "../FormField/ReusableTable";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import { handleResource } from "@/utils/APIRequester";
import { CiEdit } from "react-icons/ci";

function FuelList() {
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const router = useRouter();
  const [pagination, setPagination] = useState<any>({});

  const getBoatsList = async () => {
    try {
      setLoading(true);
      const result = await handleResource({
        method: "get",
        endpoint: `fuel?page=${page}&limit=${limit}`,
        popupMessage: false,
      });
      setFuels(result.data);
      setPagination(result.page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (deletedId: any) => {
    try {
      setLoading(true);
      await handleResource({
        method: "delete",
        endpoint: "fuel",
        id: deletedId,
        popupMessage: true,
        popupText: "Fuel Deleted Successfully !",
      });
      setLoading(false);
      getBoatsList();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getBoatsList();
  }, [limit, page]);

  const columns = [
    { name: "Title", selector: "title" },
    {
      name: "Price",
      selector: "price",
    },
    {
      name: "Unit(gal)",
      selector: "unit",
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
            onClick={() => router.push(`/fuels/add-form?editId=${row._id}`)}
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
              data={fuels}
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

export default FuelList;
