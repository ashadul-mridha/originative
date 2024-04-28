import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { MdCancel, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { BsSendPlusFill } from "react-icons/bs";
import ImageUploadInput from "../FormField/ImageUploadInput";

interface Field {
  type: string;
  image: File | null;
}

function EnumAddressForm() {
  const [fields, setFields] = useState<Field[]>([{ type: "", image: null }]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [editId, setEditId] = useState<string | string[] | null>(null);

  useEffect(() => {
    if (router.query?.editId) {
      setEditId(router.query.editId);
    }
  }, [router.query]);

  const getData = useCallback(async () => {
    try {
      if (!editId) return;
      setLoading(true);
      const response = await handleResource({
        method: "get",
        endpoint: "enum/" + editId,
      });

      if (response.data) {
        const fieldsData = response.data.values.map((value: any) => ({
          type: value.type,
          image: value.image,
        }));
        setFields(fieldsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [editId]);
  useEffect(() => {
    getData();
  }, [editId]);
  console.log("fields", fields);
  const handleImagesChange = (index: number, selectedImages: File[]) => {
    const updatedFields = [...fields];
    updatedFields[index].image = selectedImages[0];
    setFields(updatedFields);
  };

  const handleChange = (
    index: number,
    key: keyof Field,
    value: string | File | null
  ) => {
    const updatedFields = [...fields];
    if (key === "type" && typeof value === "string") {
      updatedFields[index].type = value;
    } else if (key === "image" && (value === null || value instanceof File)) {
      updatedFields[index].image = value;
    } else {
      throw new Error(`Invalid key or value type: key=${key}, value=${value}`);
    }
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { type: "", image: null }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allFieldsFilled = fields.every(
        (field) => field.type.trim() !== "" && field.image !== null
      );
      if (!allFieldsFilled) {
        throw new Error("Please fill all fields before submitting.");
      }

      const payload = await Promise.all(
        fields.map(async (field) => {
          if (field.image instanceof File) {
            const imageUrl = await handleResource({
              method: "post",
              endpoint: "image-library",
              data: { image: field.image },
              isMultipart: true,
            });
            return {
              type: field.type.trim(),
              image: imageUrl.data[0].fileName,
            };
          } else {
            if (typeof field.image === "string") {
              return { type: field.type.trim(), image: field.image };
            }
          }
        })
      );

      console.log("payload", payload);
      await handleResource({
        method: "post",
        endpoint: "enum/delivery-address",
        data: payload,
        isMultipart: false,
        popupMessage: true,
        popupText: editId
          ? "Enum Updated Successfully !"
          : "Enum Created Successfully !",
      });
      router.push("/enums");
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5">
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div
            key={index}
            className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4"
          >
            <div>
              <ImageUploadInput
                title="Image"
                name={`image-${index}`}
                required={!editId && index === 0}
                allowMultiple={false}
                allowCount={1}
                value={
                  editId
                    ? [`${process.env.NEXT_PUBLIC_IMAGE_URL}${field.image}`]
                    : field.image
                    ? [URL.createObjectURL(field.image)]
                    : []
                }
                allowedExtensions={["jpg", "png", "jpeg"]}
                onImagesChange={(selectedImages: File[]) =>
                  handleImagesChange(index, selectedImages)
                }
              />
            </div>

            <div>
              <TextField
                placeholder="Example"
                type="text"
                title="Type"
                required={!editId && index === 0}
                name={`type-${index}`}
                onChange={(value: string) => handleChange(index, "type", value)}
                value={field.type}
              />
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="px-3 py-1.5 font-semibold text-red-500 border border-red-500 rounded-lg h-10 mb-3 flex items-center ml-auto gap-4"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddField}
            disabled={fields.some((field) => !field.image || !field.type)}
            className={`h-8 px-3 py-1.5 font-semibold border rounded-full flex items-end gap-4 mt-10 ${
              fields.some((field) => !field.image || !field.type)
                ? "text-gray-700 border-gray-700 hover:bg-gray-100 hover:text-gray-800"
                : "text-blue-700 border-blue-700 hover:bg-blue-100 hover:text-blue-800"
            }} `}
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex justify-center my-12">
          <button
            className="bg-blue-700 text-white px-6 py-2 mx-2 font-semibold rounded-md flex items-center gap-x-3"
            type="submit"
            disabled={loading || fields.length === 1}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <BsSendPlusFill /> {editId ? "Update" : "Submit"}
              </>
            )}
          </button>
          <button
            className="border border-red-500 text-red-500 px-6 py-2 mx-2 font-semibold rounded-md flex items-center gap-x-3"
            type="button"
            onClick={() => {
              router.push("/enums");
            }}
          >
            <MdCancel /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnumAddressForm;
