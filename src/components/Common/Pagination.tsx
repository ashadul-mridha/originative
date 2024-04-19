import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

interface PaginationProps {
  pagination: {
    total: string;
    startIndex: number;
    endIndex: number;
    page: string;
    limit: string;
  };
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { total, startIndex, endIndex, page, limit } = pagination;

  const totalPages = Math.ceil(parseInt(total) / parseInt(limit));

  return (
    <>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-end items-center gap-3">
        <span className="flex items-center gap-3">
          {" "}
          Showing{" "}
          <span className="">{`${startIndex} - ${endIndex} of ${total}`}</span>{" "}
          Products
        </span>
        <span className="flex items-center gap-3">
          <button
            className={`${
              parseInt(page) === 1
                ? "rounded-full p-3.5 bg-gray-300"
                : "rounded-full p-3 text-blue-400 border border-blue-400"
            }`}
            onClick={() => onPageChange(parseInt(page) - 1)}
            disabled={parseInt(page) === 1}
          >
            <GrFormPreviousLink />
          </button>
          <button
            className={`${
              parseInt(page) === totalPages
                ? "rounded-full p-3.5 bg-gray-300"
                : "rounded-full p-3 text-blue-400 border border-blue-400"
            }`}
            onClick={() => onPageChange(parseInt(page) + 1)}
            disabled={parseInt(page) === totalPages}
          >
            <GrFormNextLink />
          </button>
        </span>
      </div>
    </>
  );
};

export default Pagination;
