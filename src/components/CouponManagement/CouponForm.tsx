import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import TextField from "../FormField/TextField";
import { BsSendPlusFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import DatePickerInput from "../FormField/DatePickerInput";
import NumberInput from "../FormField/NumberInput";

function CouponForm() {
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
      endpoint: "coupon/" + editId,
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        await handleResource({
          method: editId ? "patch" : "post",
          endpoint: editId ? `coupon/${editId}` : "coupon",
          data: formData,
          isMultipart: false,
          popupMessage: true,
          popupText: editId
            ? "Coupon Updated Successfully !"
            : "Coupon Added Successfully !",
        });
        setLoading(false);
        router.push("/coupons");
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
              <DatePickerInput
                name="start_date"
                title="Start Date"
                required={true}
                placeholder="Select Date"
                minDate={new Date()}
                value={new Date(formData.start_date)}
                onChange={(selectedDate) =>
                  handleChange("start_date", selectedDate?.toISOString())
                }
              />
            </div>

            <div>
              <DatePickerInput
                name="end_date"
                title="End Date"
                required={true}
                placeholder="Select Date"
                minDate={new Date(formData.start_date)}
                value={new Date(formData.end_date)}
                onChange={(selectedDate) => {
                  handleChange("end_date", selectedDate?.toISOString());
                }}
              />
            </div>

            <div>
              <NumberInput
                name="price"
                title="Discount Price"
                type="float"
                required={true}
                placeholder="Enter Discount Price"
                value={formData.discount_value}
                onChange={(value) => {
                  handleChange("discount_value", value);
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

export default CouponForm;
