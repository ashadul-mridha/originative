"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

interface PageHeaderProps {
  title: string;
  text: string;
  url?: string;
  module?: string;
  icon?: any;
}

function PageHeader({ title, text, url, module, icon }: PageHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center p-3">
        <div>
          <div className="text-2xl font-bold flex items-center gap-x-3">
            {/* <span className="text-blue-600">{icon}</span> */}
            {text}
          </div>
          {/* <div>{title}</div> */}
        </div>
        {url && (
          <button
            className="px-6 py-2 bg-[#3989d3] rounded-lg text-white flex items-center gap-x-3 font-semibold"
            onClick={() => router.push(url)}
          >
            <FaPlus /> Add {title}
          </button>
        )}
      </div>
      {/* <hr className="border-gray-300 my-3 border-1" /> */}
    </>
  );
}

export default PageHeader;
