import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ReusableTable from "../FormField/ReusableTable";
import { Admin } from "@/utils/constant";

function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const router = useRouter();
  const [pagination, setPagination] = useState<any>({});

  const getAdminList = async () => {
    try {
      setLoading(true);
      const result = await handleResource({
        method: "get",
        endpoint: `admin?page=${page}&limit=${limit}`,
      });
      setAdmins(result.data);
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
        endpoint: "admin",
        id: row,
      });
      setLoading(false);
      getAdminList();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getAdminList();
  }, [limit, page]);

  const columns = [
    {
      name: "Name",
      selector: "first_name",
      cell: (row: any) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: "Email",
      selector: "email",
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
            onClick={() => router.push(`/admins/add-form?editId=${row._id}`)}
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
              data={admins}
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

export default AdminList;
