import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { BsSendPlusFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import NumberInput from "../FormField/NumberInput";

function FuelForm() {
  const [loading, setLoading] = useState(false);
  const { formData, handleChange, reset } = useForm({
    title: "",
    price: null,
    unit: "",
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
      endpoint: "fuel/" + editId,
    });

    if (response.data) {
      reset({
        title: response.data.title,
        price: response.data.price,
        unit: response.data.unit,
      });
    }
  }, [editId, reset]);

  useEffect(() => {
    getData();
  }, [editId]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        await handleResource({
          method: editId ? "patch" : "post",
          endpoint: editId ? `fuel/${editId}` : "fuel",
          data: formData,
          isMultipart: false,
          popupMessage: true,
          popupText: editId
            ? "Fuel Updated Successfully !"
            : "Fuel Added Successfully !",
        });
        setLoading(false);
        router.push("/fuels");
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
            {editId ? "Update" : "Add"} Fuel
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
              <NumberInput
                placeholder="10"
                type="number"
                title="Unit(Gal)"
                required={true}
                name="unit"
                value={formData.unit}
                onChange={(value: number | string) =>
                  handleChange("unit", value.toString())
                }
              />
            </div>

            <div>
              <NumberInput
                placeholder="10"
                type="number"
                title="Price"
                required={true}
                name="price"
                value={formData.price}
                onChange={(value: number | string) =>
                  handleChange("price", Number(value))
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
                  {editId ? "Update": "Submit"}
                </>
              )}
            </button>

            <button
              className="border border-red-500 text-red-500 px-6 py-2 mx-2 font-semibold rounded-md flex items-center gap-x-3"
              type="button"
              onClick={() => {
                // editId
                //   ? router.push("/fuels/" + editId) : 
                  router.push("/fuels");
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

export default FuelForm;
