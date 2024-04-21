import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import ImageUploadInput from "../FormField/ImageUploadInput";
import RichTextEditor from "../FormField/RichTextEditor";
import { BsSendPlusFill } from "react-icons/bs";
import { MdCancel, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";

function EnumForm() {
  const [keyValue, setKeyValue] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { formData, handleChange, reset } = useForm({
    key: "",
    value: [],
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
    setLoading(true);
    const response = await handleResource({
      method: "get",
      endpoint: "enum/" + editId,
    });

    // console.log("response.data", response.data);
    if (response.data) {
      reset({
        key: response.data.key,
        values: response.data.values,
      });
      setLoading(false);
    }
  }, [editId, reset]);
  // console.log("formData", formData);
  useEffect(() => {
    getData();
  }, [editId]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const payload = {
          key: formData.key?.trim(),
          values: keyValue,
        };
        await handleResource({
          method: "post",
          endpoint: `enum`,
          data: payload,
          isMultipart: false,
          popupMessage: true,
          popupText: "Enum Created Successfully !",
        });
        router.push("/enums");
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [formData, editId, router]
  );

  // const handleAdd = useCallback(() => {
  //   if (Object.values(formData.value).length) {
  //     setKeyValue((p: any) => [...p, formData.value]);
  //   }
  // }, [formData.value]);

  // const handleRemove = useCallback(
  //   (index: number) => {
  //     setKeyValue((p: any) => {
  //       const temp = [...p];
  //       temp.splice(index, 1);
  //       return temp;
  //     });
  //   },
  //   [keyValue]
  // );

  // const handleUpdate = (name: string, value: string, index: number) => {
  //   const updatedValues = [...formData.values];
  //   updatedValues[index] = value;
  //   handleChange("values", updatedValues);
  // };

  const handleAdd = useCallback(() => {
    if (formData.value.trim() !== "") {
      setKeyValue((prevKeyValue: any) => [...prevKeyValue, formData.value]);
      // reset(); // Reset form after adding
    }
  }, [formData.value, reset]);

  const handleRemove = useCallback((index: number) => {
    setKeyValue((prevKeyValue: any) => {
      const temp = [...prevKeyValue];
      temp.splice(index, 1);
      return temp;
    });
  }, []);

  const handleUpdate = (value: string, index: number) => {
    const updatedValues = [...keyValue];
    updatedValues[index] = value;
    setKeyValue(updatedValues);
  };

  return (
    <>
      <div className="px-5">
        <form onSubmit={handleSubmit} className="">
          <div className="text-2xl font-bold my-3 flex items-center gap-x-3">
            {editId ? "Update" : "Add"} Enum
          </div>
          <hr className="border-gray-300 my-3 border-1" />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <TextField
                placeholder="Example"
                type="text"
                title="Key"
                required={true}
                name="key"
                onChange={(value: string) => handleChange("key", value)}
                value={formData.key}
              />
            </div>

            {/* <div>
              {!editId &&
                keyValue.map((item: any, index: number) => (
                  <>
                    <div className="flex gap-8 items-center">
                      <p className="text-lg">
                        {index + 1}. {item}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="px-3 py-1.5 font-semibold text-red-500 border border-red-500 rounded-lg h-10 mb-3 flex items-center ml-auto gap-4"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </>
                ))}

              {editId &&
                formData?.values?.map((item: any, index: number) => (
                  <>
                    <div className="flex gap-8 items-center">
                      <TextField
                        placeholder="Example"
                        type="text"
                        title={`Value`}
                        required={true}
                        name={`value`}
                        onChange={(value: string) =>
                          handleUpdate(`values`, value, index)
                        }
                        value={item || ""}
                      />
                    </div>
                  </>
                ))}

              {[...Array(keyValue)].map((_, index) => (
                <div key={index} className="flex w-full items-center gap-5">
                  <div className="w-10/12">
                    <TextField
                      placeholder="Example"
                      type="text"
                      title={`Value`}
                      required={true}
                      name={"value"}
                      onChange={(value: string) =>
                        handleChange(`values`, value)
                      }
                      value={formData.value || ""}
                    />
                  </div>
                  <>
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="h-8 px-3 py-1.5 font-semibold  text-blue-700 border border-blue-700 rounded-full flex items-end gap-4"
                    >
                      <FaPlus />
                    </button>
                  </>
                </div>
              ))}
            </div> */}

            <div>
              {!editId &&
                keyValue.map((item: any, index: number) => (
                  <div key={index} className="flex gap-8 items-center">
                    <p className="text-lg">
                      {index + 1}. {item}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="px-3 py-1.5 font-semibold text-red-500 border border-red-500 rounded-lg h-10 mb-3 flex items-center ml-auto gap-4"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}

              {editId &&
                formData?.values?.map((item: any, index: number) => (
                  <div key={index} className="flex gap-8 items-center">
                    <TextField
                      placeholder="Example"
                      type="text"
                      title={`Value`}
                      required={true}
                      name={`value`}
                      onChange={(value: string) => handleUpdate(value, index)}
                      value={item || ""}
                    />
                    {/* Add your button or other elements for editing */}
                    <button
                      type="button"
                      // onClick={() => handleRemove(index)}
                      className="px-3 py-1.5 font-semibold text-red-500 border border-red-500 rounded-lg h-10 mb-3 flex items-center ml-auto gap-4"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}

              <div className="flex w-full items-center gap-5">
                <div className="w-10/12">
                  <TextField
                    placeholder="Example"
                    type="text"
                    title={`Value`}
                    required={true}
                    name={"value"}
                    onChange={(value: string) => handleChange(`value`, value)}
                    value={formData.value || ""}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="h-8 px-3 py-1.5 font-semibold  text-blue-700 border border-blue-700 rounded-full flex items-end gap-4"
                >
                  <FaPlus />
                </button>
              </div>
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
                // editId
                //   ? router.push("/enums/" + editId) :
                router.push("/enums");
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

export default EnumForm;
