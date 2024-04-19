import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

interface ResourceHandler {
  method: "post" | "get" | "patch" | "delete";
  endpoint: string;
  data?: {};
  id?: string | number;
  isMultipart?: boolean;
  popupMessage?: boolean;
  popupText?: string;
}

export const handleResource = async ({
  method,
  endpoint,
  data,
  id,
  isMultipart,
  popupMessage,
  popupText,
}: ResourceHandler) => {
  const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);

  try {
    if (method === "delete") {
      const confirmDelete = await Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: "Are You Sure To Delete ?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes !",
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
      data: data,
      headers,
    });

    if (response && popupMessage) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: popupText,
        timer: 1500,
      });
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log("error", error);
    if (
      error instanceof Error &&
      "response" in error &&
      error.response !== undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error.response as { data: { message: string } }).data.message,
        timer: 3000,
      });
    }
  }
};
