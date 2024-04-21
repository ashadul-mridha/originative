import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import { handleResource } from "@/utils/APIRequester";
import ReusableTable from "../FormField/ReusableTable";
import { LuClipboardEdit } from "react-icons/lu";

function SplashList() {
  const [splash, setSplash] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const router = useRouter();
  const [pagination, setPagination] = useState<any>({});

  const getSplashList = async () => {
    try {
      setLoading(true);
      const result = await handleResource({
        method: "get",
        endpoint: `splash?page=${page}&limit=${limit}`,
      });
      setSplash(result.data);
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
        endpoint: "splash",
        id: row,
      });
      setLoading(false);
      getSplashList();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getSplashList();
  }, [limit, page]);

  const columns = [
    {
      name: "Image",
      selector: "images",
      cell: (row: any) =>
        row.images.map((image: string, index: number) => (
          <a
            className="text-blue-900 font-semibold"
            href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
            target="_blank"
          >
            Image {index + 1} <br />
          </a>
        )),
    },
    {
      name: "Logo",
      selector: "logo",
      cell: (row: any) => (
        <div style={{ whiteSpace: "pre-line" }}>
          <a
            className="text-blue-900 font-semibold"
            href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${row.logo}`}
            target="_blank"
          >
            Logo
          </a>
        </div>
      ),
    },
    { name: "Title", selector: "title" },
    {
      name: "Description",
      selector: "description",
      cell: (row: any) => (
        <div dangerouslySetInnerHTML={{ __html: row.description }}></div>
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
            onClick={() => router.push(`/splash/add-form?editId=${row._id}`)}
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
              data={splash}
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

export default SplashList;
