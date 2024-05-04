import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReusableTable from "../FormField/ReusableTable";
import { ServiceWorker } from "@/utils/constant";
import Loader from "../Common/Loader";

function ServiceWorkerList() {
  const [workers, setWorkers] = useState<ServiceWorker[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const router = useRouter();
  const [pagination, setPagination] = useState<any>({});

  const getWorkerList = async () => {
    try {
      setLoading(true);
      const result = await handleResource({
        method: "get",
        endpoint: `servie-worker?page=${page}&limit=${limit}`,
      });
      setWorkers(result.data);
      setPagination(result.page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (row: any, value: string) => {
    try {
      setLoading(true);
      await handleResource({
        method: "patch",
        endpoint: "servie-worker/status",
        data: value === "active" ? { is_active: true } : { is_active: false },
        id: row,
        isMultipart: false,
        popupMessage: true,
        popupText:
          value === "active"
            ? "Service Worker Approved"
            : "Service Worker Suspended",
      });
      setLoading(false);
      getWorkerList();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getWorkerList();
  }, [limit, page]);

  const columns = [
    { name: "Email", selector: "email" },
    {
      name: "Phone",
      selector: "phone_number",
      cell: (row: any) => `(${row.phone_code}) ${row.phone_number}`,
    },
    //     {
    //       name: "Status",
    //       selector: "is_active",
    //       cell: (row: any) => (row.is_active ? "Active" : "Inactive"),
    //     },
    {
      name: "Status",
      selector: "is_active",
      cell: (row: any) => (
        <select
          className={`font-semibold ${
            (row.is_active && "text-green-500") ||
            (!row.is_active && "text-red-500")
          }`}
          value={row.is_active ? "active" : "inactive"}
          onChange={(e) => handleUpdateStatus(row._id, e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      ),
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
    //     {
    //       name: "Action",
    //       cell: (row: any) => (
    //         <>
    //           <button
    //             className="border-2 border-blue-300 px-3 py-1 font-semibold text-blue-500 text-lg mx-1 rounded-lg"
    //             onClick={() => router.push(`/workers/${row._id}`)}
    //           >
    //             <FaEye />
    //           </button>
    //           <button
    //             className="border-2 border-red-300 px-3 py-1 font-semibold text-red-500 text-lg mx-1 rounded-lg"
    //             onClick={() => handleDelete(row._id)}
    //           >
    //             <MdDelete />
    //           </button>
    //         </>
    //       ),
    //     },
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
        <Loader />
      ) : (
        <>
          <div className="px-3">
            {" "}
            <ReusableTable
              data={workers}
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

export default ServiceWorkerList;
