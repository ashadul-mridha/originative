import React, { useState } from "react";

type WildCardObject = {
  [index: string]: any;
};

function useForm(defaultValue: WildCardObject = {}) {
  const [formData, setFormData] = useState<WildCardObject>(defaultValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<WildCardObject>({});

  function handleChange(fieldName: string, value: any): void {
    setFormData((p) => ({
      ...p,
      [fieldName]: value,
    }));
  }

  function handleChangeFromEvent(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setFormData((p) => ({
      ...p,
      [event.target.name]: event.target.value,
    }));
  }

  function reset(data: WildCardObject): void {
    setFormData(data);
  }

  return {
    formData,
    reset,
    handleChange,
    handleChangeFromEvent,
    loading,
    setLoading,
    errors,
    setErrors,
  };
}
export default useForm;
