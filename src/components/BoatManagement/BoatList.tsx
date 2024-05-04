import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import { handleResource } from "@/utils/APIRequester";
import ReusableTable from "../FormField/ReusableTable";
import { Boat } from "@/utils/constant";

function BoatList() {
  const [boats, setBoats] = useState<Boat[]>([]);
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
        endpoint: `boat/admin?page=${page}&limit=${limit}`,
      });
      setBoats(result.data);
      setPagination(result.page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // const handleDelete = async (row: any) => {
  //   try {
  //     setLoading(true);
  //     await handleResource({
  //       method: "delete",
  //       endpoint: "boats",
  //       id: row,
  //     });
  //     setLoading(false);
  //     getBoatsList();
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  useEffect(() => {
    getBoatsList();
  }, [limit, page]);

  const columns = [
    {
      name: "Image",
      selector: "images",
      cell: (row: any) => (
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${row.images[0]}`}
          className="w-32 h-16 text-center"
          alt={row.title}
        />
      ),
    },
    { name: "Title", selector: "title" },
    { name: "Made By", selector: "made_by" },
    { name: "Model", selector: "model" },
    { name: "License Plate No", selector: "license_plate_no" },
    {
      name: "Status",
      selector: "status",
      cell: (row: any) => (row.is_active ? "Active" : "Inactive"),
    },
    // {
    //   name: "Action",
    //   cell: (row: any) => (
    //     <>
    //       <button
    //         className="border-2 border-blue-300 px-3 py-1 font-semibold text-blue-500 text-lg mx-1 rounded-lg"
    //         onClick={() => router.push(`/boats/${row._id}`)}
    //       >
    //         <FaEye />
    //       </button>
    //       <button
    //         className="border-2 border-red-300 px-3 py-1 font-semibold text-red-500 text-lg mx-1 rounded-lg"
    //         onClick={() => handleDelete(row._id)}
    //       >
    //         <MdDelete />
    //       </button>
    //     </>
    //   ),
    // },
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
              data={boats}
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

export default BoatList;
