import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { BsSendPlusFill } from "react-icons/bs";
import { MdCancel, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function EnumBoatForm() {
  const [keyValue, setKeyValue] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { formData, handleChange, reset } = useForm({
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

    if (response.data) {
      reset({
        key: response.data.key,
      });
      setKeyValue(response.data.values);
      setLoading(false);
    }
  }, [editId, reset]);
  useEffect(() => {
    getData();
  }, [editId]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        await handleResource({
          method: "post",
          endpoint: "enum/boat-made-by",
          data: keyValue,
          isMultipart: false,
          popupMessage: true,
          popupText: editId
            ? "Enum Updated Successfully !"
            : "Enum Created Successfully !",
        });
        router.push("/enums");
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [formData, editId, router, keyValue]
  );

  const handleAdd = useCallback(() => {
    if (formData.value.trim() !== "") {
      setKeyValue((prevKeyValue: string[]) => [
        ...prevKeyValue,
        formData.value,
      ]);
      reset({ ...formData, value: "" });
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
                keyValue?.map((item: any, index: number) => (
                  <div key={index} className="flex gap-8 items-center">
                    <TextField
                      placeholder="Example"
                      type="text"
                      title={`Value`}
                      required={editId ? false : true}
                      name={`value`}
                      onChange={(value: string) => handleUpdate(value, index)}
                      value={item || ""}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
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
                    required={editId || keyValue.length > 0 ? false : true}
                    name={"value"}
                    onChange={(value: string) => handleChange(`value`, value)}
                    value={formData.value || ""}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={
                    !formData.value ||
                    typeof formData.value !== "string" ||
                    !formData.value.trim()
                  }
                  className={`h-8 px-3 py-1.5 font-semibold border rounded-full flex items-end gap-4
                  ${
                    !formData.value ||
                    typeof formData.value !== "string" ||
                    !formData.value.trim()
                      ? "text-gray-500 border-gray-400 cursor-not-allowed"
                      : "text-blue-700 border-blue-700 hover:bg-blue-100 hover:text-blue-800"
                  }`}
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
                "Loading..."
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

export default EnumBoatForm;
