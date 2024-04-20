import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { MdCancel } from "react-icons/md";
import { BsSendPlusFill } from "react-icons/bs";
import RichTextEditor from "../FormField/RichTextEditor";
import ImageUploadInput from "../FormField/ImageUploadInput";

function SplashForm() {
  const [loading, setLoading] = useState(false);
  const { formData, handleChange, reset } = useForm({
    title: "",
    description: "",
    images: [],
    logo: "",
  });
  const router = useRouter();
  const [editId, setEditId] = useState<string | string[] | null>(null);
  const [logos, setLogos] = useState<any>([]);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    if (router.query?.editId) {
      setEditId(router.query.editId);
    }
  }, [router.query]);

  const handleImagesChange = (selectedImages: File[]) => {
    const newImages = selectedImages.map((image) => ({
      image,
    }));
    setImages(newImages);
  };
  const handleLogoChange = (selectedImages: File[]) => {
    const newImages = selectedImages.map((image) => ({
      image,
    }));
    setLogos(newImages);
  };

  const getData = useCallback(async () => {
    if (!editId) return;
    setLoading(true);
    const response = await handleResource({
      method: "get",
      endpoint: "splash/" + editId,
    });

    if (response.data) {
      reset({
        title: response.data.title,
        description: response.data.description,
        image: response.data.images,
        logo: response.data.logo,
      });
      setLoading(false);
    }
  }, [editId, reset]);

  useEffect(() => {
    getData();
  }, [editId]);
  const updateData = async () => {
    try {
      const payload = {
        title: formData.title?.trim(),
        description: formData.description,
      };
      await handleResource({
        method: "patch",
        endpoint: `splash/${editId}`,
        data: payload,
        isMultipart: false,
        popupMessage: true,
        popupText: "Splash Updated Successfully !",
      });
      setLoading(false);
      router.push("/splash");
    } catch (error) {
      setLoading(false);
    }
  };
  const createData = async () => {
    if (logos && images) {
      const imagesPayload = new FormData();

      logos?.forEach((logo: any) => {
        if (logo.image instanceof File) {
          imagesPayload.append(`logo`, logo.image);
        }
      });

      images?.forEach((image: any) => {
        if (image.image instanceof File) {
          imagesPayload.append(`images`, image.image);
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
          const imagesArray: string[] = [];
          response.data.forEach((item: any) => {
            if (item.fieldName === "logo") {
              logo = item.fileName;
            } else {
              imagesArray.push(item.fileName);
            }
            handleChange("images", imagesArray);
          });
          const payload = {
            title: formData.title?.trim(),
            description: formData.description,
            images: imagesArray,
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
            {editId ? "Update" : "Add"} Splash
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
              <ImageUploadInput
                title="Image"
                name="image"
                required={editId ? false : true}
                allowMultiple={true}
                allowCount={3}
                value={images}
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={handleImagesChange}
              />
            </div>

            <div>
              <ImageUploadInput
                title="Logo"
                name="logo"
                required={editId ? false : true}
                allowMultiple={false}
                allowCount={1}
                // value={editId? formData.logo:logos}
                value={logos}
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={handleLogoChange}
              />
            </div>
          </div>

          <div className="w-full my-3">
            <div className="my-8">
              <RichTextEditor
                name="description"
                title="Description"
                required={false}
                value={formData.description}
                initialValue={formData.description}
                onChange={(content) => {
                  handleChange("description", content);
                }}
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
                  Submit
                </>
              )}
            </button>

            <button
              className="border border-red-500 text-red-500 px-6 py-2 mx-2 font-semibold rounded-md flex items-center gap-x-3"
              type="button"
              onClick={() => {
                // editId
                //   ? router.push("/splash/" + editId) :
                router.push("/splash");
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

export default SplashForm;
