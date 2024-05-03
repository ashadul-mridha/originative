import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { BsSendPlusFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import ImageUploadInput from "../FormField/ImageUploadInput";

function AdminForm() {
  const [loading, setLoading] = useState(false);
  const { formData, handleChange, reset } = useForm({
    title: "",
    coupon_code: "",
    discount_value: 0,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 86_400_000 * 15).toISOString(),
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
        title: response.data.title,
        coupon_code: response.data.coupon_code,
        discount_value: response.data.discount_value,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
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
    if (image) {
      const imagesPayload = new FormData();

      image?.forEach((image: any) => {
        if (image.image instanceof File) {
          imagesPayload.append(`image`, image.image);
        }
      });

      try {
        const response = await handleResource({
          method: editId ? "patch" : "post",
          endpoint: editId ? `image-library/${editId}` : "image-library",
          data: imagesPayload,
          isMultipart: true,
        });

        if (response.data) {
          let logo = "";
          let image = "";
          response.data.forEach((item: any) => {
            if (item.fieldName === "logo") {
              logo = item.fileName;
            } else {
              image = item.fileName;
            }
          });
          const payload = {
            title: formData.title?.trim(),
            type: formData.type,
            description: formData.description,
            images: image,
            logo: logo,
          };

          await handleResource({
            method: "post",
            endpoint: "splash",
            data: payload,
            isMultipart: false,
            popupMessage: true,
            popupText: "Splash Created Successfully !",
          });
          setLoading(false);
          router.push("/splash");
        }
      } catch (error) {
        setLoading(false);
      }
    }

    // try {
    //   const payload = {
    //     title: formData.title?.trim(),
    //     description: formData.description,
    //   };
    //   await handleResource({
    //     method: "patch",
    //     endpoint: `admin/${editId}`,
    //     data: payload,
    //     isMultipart: false,
    //     popupMessage: true,
    //     popupText: "Admin Updated Successfully !",
    //   });
    //   setLoading(false);
    //   router.push("/admins");
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  const createData = async () => {
    if (image) {
      const imagesPayload = new FormData();

      image?.forEach((image: any) => {
        if (image.image instanceof File) {
          imagesPayload.append(`image`, image.image);
        }
      });

      try {
        const response = await handleResource({
          method: editId ? "patch" : "post",
          endpoint: editId ? `image-library/${editId}` : "image-library",
          data: imagesPayload,
          isMultipart: true,
        });

        if (response.data) {
          let logo = "";
          let image = "";
          response.data.forEach((item: any) => {
            if (item.fieldName === "logo") {
              logo = item.fileName;
            } else {
              image = item.fileName;
            }
          });
          const payload = {
            title: formData.title?.trim(),
            type: formData.type,
            description: formData.description,
            images: image,
            logo: logo,
          };

          await handleResource({
            method: "post",
            endpoint: "splash",
            data: payload,
            isMultipart: false,
            popupMessage: true,
            popupText: "Splash Created Successfully !",
          });
          setLoading(false);
          router.push("/splash");
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
    [formData, editId, router]
  );

  return (
    <>
      <div className="px-5">
        <form onSubmit={handleSubmit} className="">
          <div className="text-2xl font-bold my-3 flex items-center gap-x-3">
            {editId ? "Update" : "Add"} Coupon
          </div>
          <hr className="border-gray-300 my-3 border-1" />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <TextField
                placeholder="Example"
                type="text"
                title="Title"
                required={true}
                name="title"
                onChange={(value: string) => handleChange("title", value)}
                value={formData.title}
              />
            </div>
            <div>
              <TextField
                placeholder="Example"
                type="text"
                title="Coupon Code"
                required={true}
                name="coupon_code"
                onChange={(value: string) => handleChange("coupon_code", value)}
                value={formData.coupon_code}
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
                    ? [`${process.env.NEXT_PUBLIC_IMAGE_URL}${formData.logo}`]
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
                router.push("/coupons");
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
