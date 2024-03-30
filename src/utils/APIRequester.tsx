import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

interface ResourceHandler {
  method: "post" | "get" | "patch" | "delete";
  endpoint: string;
  data?: {};
  id?: string | number;
  isMultipart?: boolean;
}

export const handleResource = async ({
  method,
  endpoint,
  data,
  id,
  isMultipart,
}: ResourceHandler) => {
  const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);

  try {
    if (method === "delete") {
      const confirmDelete = await Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: "Are you sure you want to delete?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!confirmDelete.isConfirmed) {
        return;
      }
    }

    const baseURL = process.env.NEXT_PUBLIC_BASE_API;

    let url = baseURL + endpoint;

    if (id) {
      url += `/${id}`;
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (isMultipart) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const response = await axios.request({
      method,
      url,
      data: data && (isMultipart ? JSON.stringify(data) : data),
      headers,
    });

    if (method !== "get") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Operation Completed Successfully !",
        timer: 1500,
      });
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (endpoint !== "admin/profile") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Operation Failed. Please Try Again !",
        timer: 2000,
      });
    }
    throw error;
  }
};
