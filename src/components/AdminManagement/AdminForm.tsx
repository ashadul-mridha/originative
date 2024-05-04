import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { BsSendPlusFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import ImageUploadInput from "../FormField/ImageUploadInput";
import PasswordField from "../FormField/PasswordField";

function AdminForm() {
  const [loading, setLoading] = useState(false);
  const { formData, handleChange, reset } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    phone_code: "880",
    phone_number: "",
    password: "",
    image: "",
  });
  const router = useRouter();
  const [editId, setEditId] = useState<string | string[] | null>(null);
  const [image, setImage] = useState<any>([]);

  useEffect(() => {
    if (router.query?.editId) {
      setEditId(router.query.editId);
    }
  }, [router.query]);

  const getData = useCallback(async () => {
    if (!editId) return;
    setLoading(true);
    const response = await handleResource({
      method: "get",
      endpoint: "admin/" + editId,
    });

    if (response.data) {
      reset({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        phone_code: response.data.phone_code,
        phone_number: response.data.phone_number,
        image: response.data.image,
      });
      setLoading(false);
    }
  }, [editId, reset]);

  useEffect(() => {
    getData();
  }, [editId]);

  const handleImageChange = (selectedImages: File[]) => {
    const newImages = selectedImages.map((image) => ({
      image,
    }));
    setImage(newImages);
  };

  const updateData = async () => {
    if (image && image.length > 0) {
      const imagesPayload = new FormData();

      image?.forEach((image: any) => {
        if (image.image instanceof File) {
          imagesPayload.append(`image`, image.image);
        }
      });

      try {
        const response = await handleResource({
          method: "post",
          endpoint: "image-library",
          data: imagesPayload,
          isMultipart: true,
        });

        if (response.data) {
          let image = "";
          response.data.forEach((item: any) => {
            image = item.fileName;
          });
          const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_code: formData.phone_code,
            phone_number: formData.phone_number,
            password: formData.password,
            image: image,
          };

          await handleResource({
            method: "patch",
            endpoint: `admin/${editId}`,
            data: payload,
            isMultipart: false,
            popupMessage: true,
            popupText: "Admin Updated Successfully !",
          });
          setLoading(false);
          router.push("/admins");
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      try {
        const payload = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_code: formData.phone_code,
          phone_number: formData.phone_number,
          password: formData.password && formData.password,
        };
        await handleResource({
          method: "patch",
          endpoint: `admin/${editId}`,
          data: payload,
          isMultipart: false,
          popupMessage: true,
          popupText: "Admin Updated Successfully !",
        });
        setLoading(false);
        router.push("/admins");
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const createData = async () => {
    if (image && image.length > 0) {
      const imagesPayload = new FormData();

      image?.forEach((image: any) => {
        if (image.image instanceof File) {
          imagesPayload.append(`image`, image.image);
        }
      });

      try {
        const response = await handleResource({
          method: "post",
          endpoint: "image-library",
          data: imagesPayload,
          isMultipart: true,
        });

        if (response.data) {
          let image = "";
          response.data.forEach((item: any) => {
            image = item.fileName;
          });
          const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_code: formData.phone_code,
            phone_number: formData.phone_number,
            password: formData.password && formData.password,
            image: image,
          };

          await handleResource({
            method: "post",
            endpoint: "admin",
            data: payload,
            isMultipart: false,
            popupMessage: true,
            popupText: "Admin Created Successfully !",
          });
          setLoading(false);
          router.push("/admins");
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      if (editId) {
        updateData();
      } else {
        createData();
      }
    },
    [formData, editId, router, image]
  );

  return (
    <>
      <div className="px-5">
        <form onSubmit={handleSubmit} className="">
          <div className="text-2xl font-bold my-3 flex items-center gap-x-3">
            {editId ? "Update" : "Add"} Admin
          </div>
          <hr className="border-gray-300 my-3 border-1" />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <TextField
                placeholder="Jhon"
                type="text"
                title="First Name"
                required={editId ? false : true}
                name="first_name"
                onChange={(value: string) => handleChange("first_name", value)}
                value={formData.first_name}
              />
            </div>

            <div>
              <TextField
                placeholder="Duo"
                type="text"
                title="Last Name"
                required={editId ? false : true}
                name="last_name"
                onChange={(value: string) => handleChange("last_name", value)}
                value={formData.last_name}
              />
            </div>

            <div>
              <TextField
                placeholder="example@gmail.com"
                type="email"
                title="Email"
                required={editId ? false : true}
                name="email"
                onChange={(value: string) => handleChange("email", value)}
                value={formData.email}
              />
            </div>
            <div>
              <TextField
                placeholder="1xxxxxxxxx"
                type="text"
                title="Phone Number"
                required={editId ? false : true}
                name="phone_number"
                onChange={(value: string) =>
                  handleChange("phone_number", value)
                }
                value={formData.phone_number}
              />
            </div>

            <div>
              <PasswordField
                placeholder="******"
                title="Password"
                required={editId ? false : true}
                name="password"
                onChange={(value: string) => handleChange("password", value)}
                value={formData.password}
              />
            </div>

            <div>
              <ImageUploadInput
                title="Profile Image"
                name="logo"
                required={editId ? false : true}
                allowMultiple={false}
                allowCount={1}
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={handleImageChange}
                value={
                  editId
                    ? [`${process.env.NEXT_PUBLIC_IMAGE_URL}${formData.image}`]
                    : image
                }
              />
            </div>
          </div>

          <div className="flex justify-center my-12">
            <button
              className="bg-blue-700 text-white px-6 py-2 mx-2 font-semibold rounded-md flex items-center gap-x-3"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  <span className="text-2xl">
                    <BsSendPlusFill />
                  </span>{" "}
                  {editId ? "Update" : "Submit"}
                </>
              )}
            </button>

            <button
              className="border border-red-500 text-red-500 px-6 py-2 mx-2 font-semibold rounded-md flex items-center gap-x-3"
              type="button"
              onClick={() => {
                router.push("/admins");
              }}
            >
              <span className="text-2xl">
                <MdCancel />
              </span>{" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminForm;
