import React, { useState, ChangeEvent } from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";

interface ImageUploadInputProps {
  allowMultiple: boolean;
  allowedExtensions?: string[];
  allowCount?: number;
  title: string;
  name: string;
  required: boolean;
  value?: string[];
  onImagesChange: (images: File[]) => void;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  allowMultiple,
  allowedExtensions,
  allowCount,
  onImagesChange,
  title,
  name,
  required,
  value,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newSelectedFiles: File[] = [];
    const newPreviewImages: string[] = [];
    let hasInvalidFile = false;

    Array.from(files).forEach((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (
        allowedExtensions &&
        fileExtension &&
        !allowedExtensions.includes(fileExtension)
      ) {
        setValidationError(`Invalid file extension: .${fileExtension}`);
        hasInvalidFile = true;
      } else {
        newSelectedFiles.push(file);
        newPreviewImages.push(URL.createObjectURL(file));
      }
    });

    if (hasInvalidFile) {
      e.target.value = "";
      return;
    }

    if (allowCount && newSelectedFiles.length > allowCount) {
      setValidationError(`You can only upload ${allowCount} images.`);
      return;
    }

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...newSelectedFiles,
    ]);
    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...newPreviewImages,
    ]);
    setValidationError(null);
    onImagesChange([...selectedFiles, ...newSelectedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);

    setSelectedFiles(newSelectedFiles);
    setPreviewImages(newPreviewImages);
    onImagesChange(newSelectedFiles);
  };

  const isFileInputDisabled =
    allowCount !== undefined && selectedFiles.length >= allowCount;

  return (
    <div className="space-y-2">
      <label
        className="block text-gray-700 text-sm font-semibold mb-4"
        htmlFor={name}
      >
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        multiple={allowMultiple}
        onChange={handleFileChange}
        className="hidden"
        id={name}
        accept={
          allowedExtensions
            ? allowedExtensions.map((ext) => `.${ext}`).join(",")
            : undefined
        }
        required={required}
        disabled={isFileInputDisabled}
      />
      <label
        htmlFor={name}
        className={`cursor-pointer block border-dashed border border-gray-400 text-black py-2 px-4 rounded-lg text-center ${
          isFileInputDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <span className="flex items-center justify-center gap-x-3 ">
          <LuImagePlus />
          Select {allowMultiple ? "Images" : "Image"}
        </span>
      </label>
      {validationError && (
        <p className="text-red-500 text-sm">{validationError}</p>
      )}
      <ul className="grid gap-2 ">
        {selectedFiles.map((file, index) => (
          <li key={index} className="flex items-center">
            <img
              src={previewImages[index]}
              alt={file.name}
              className="h-20 w-30 object-fit rounded"
            />
            <span className="ml-2 font-semibold text-end">{file.name}</span>
            <button
              onClick={() => handleRemoveImage(index)}
              className="text-red-500 ml-2"
              title="Remove Image"
            >
              <span className="text-2xl">
                <MdDeleteForever />
              </span>
            </button>
          </li>
        ))}
        {selectedFiles.length <= 0 &&
          value?.map((file, index) => (
            <li key={index} className="flex items-center">
              <img
                src={value && value[index]}
                // alt={file.name}
                className="h-20 w-30 object-fit rounded"
              />
              {/* <span className="ml-2 font-semibold text-end">{file.name}</span> */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="text-red-500 ml-2"
                title="Remove Image"
              >
                <span className="text-2xl">
                  <MdDeleteForever />
                </span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ImageUploadInput;
