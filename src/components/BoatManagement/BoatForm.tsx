import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { MdCancel } from "react-icons/md";
import { BsSendPlusFill } from "react-icons/bs";
import RichTextEditor from "../FormField/RichTextEditor";
import ImageUploadInput from "../FormField/ImageUploadInput";

function BoatForm() {
  const [loading, setLoading] = useState(false);
  const [images,setImages]=useState<any>([])
  const { formData, handleChange, reset } = useForm({
    user_id: "",
    title: "",
    made_by: "",
    model: "",
    license_plate_no: "",
    fuel_id: "",
    images: [""],
  });

  const router = useRouter();
  const [editId, setEditId] = useState<string | string[] | null>(null);

  useEffect(() => {
    if (router.query?.editId) {
      setEditId(router.query.editId);
    }
  }, [router.query]);

  const handleImagesChange = (selectedImages: File[]) => {
    const newImages = selectedImages.map((image) => ({
      image,
    }));
    setImages( newImages);
  };

  const getData = useCallback(async () => {
    if (!editId) return;
    const response = await handleResource({
      method: "get",
      endpoint: "splash/" + editId,
    });

    if (response.data) {
      reset({
        title: response.title,
        description: response.description,
        image: response.image,
        logo: response.logo,
      });
    }
  }, [editId, reset]);

  useEffect(() => {
    getData();
  }, [editId]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload = {
        title: formData.title?.trim(),
        description: formData.description,
        image: formData.image,
        logo: formData.logo,
      };
      try {
        setLoading(true);
        await handleResource({
          method: editId ? "patch" : "post",
          endpoint: editId ? `splash/${editId}` : "splash",
          data: payload,
          isMultipart: false,
        });
        setLoading(false);
        router.push("/splash");
      } catch (error) {
        setLoading(false);
      }
    },
    [formData, editId, router]
  );

  return (
    <>
      <div className="px-5">
        <form onSubmit={handleSubmit} className="">
          <div className="text-2xl font-bold my-3 flex items-center gap-x-3">
            {editId ? "Update" : "Add"} Boat
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
                title="Model"
                required={true}
                name="model"
                onChange={(value: string) => handleChange("model", value)}
                value={formData.model}
              />
            </div>

            <div>
              <TextField
                placeholder="Example"
                type="text"
                title="License Plate"
                required={true}
                name="license_plate_no"
                onChange={(value: string) =>
                  handleChange("license_plate_no", value)
                }
                value={formData.license_plate_no}
              />
            </div>

            <div>
              <ImageUploadInput
                title="Image"
                name="image"
                required={editId ? false : true}
                allowMultiple={false}
                allowCount={1}
                value={formData?.images}
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={handleImagesChange}
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
                editId
                  ? router.push("/flight/" + editId)
                  : router.push("/flight");
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

export default BoatForm;
