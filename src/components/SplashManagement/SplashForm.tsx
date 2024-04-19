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
    image: "",
    logo: "",
  });

  const router = useRouter();
  const [editId, setEditId] = useState<string | string[] | null>(null);

  useEffect(() => {
    if (router.query?.editId) {
      setEditId(router.query.editId);
    }
  }, [router.query]);

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
                required={false}
                allowMultiple={true}
                allowCount={5}
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={(images) => {
                  if (images.length > 0) {
                    const firstImage: any = images[0];
                    handleChange("image", firstImage);
                  }
                }}
              />
            </div>

            <div>
              <ImageUploadInput
                title="Logo"
                name="logo"
                required={false}
                allowMultiple={false}
                allowCount={2}
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={(images) => {
                  if (images.length > 0) {
                    const firstImage: any = images[0];
                    handleChange("logo", firstImage);
                  }
                }}
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
                editId
                  ? router.push("/splash/" + editId)
                  : router.push("/splash");
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
