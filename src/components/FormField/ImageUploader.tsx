import React, { useState, ChangeEvent } from 'react';

interface ImageUploaderProps {
  multiple: boolean;
  imageType: string;
  maxCount: number;
  required: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ multiple, imageType, maxCount, required }) => {
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || []);
    if (!multiple) {
      // If single image upload, replace existing images
      setImages(selectedImages.slice(0, 1));
    } else {
      // If multiple image upload, append to existing images
      const newImages = images.concat(selectedImages.slice(0, maxCount - images.length));
      setImages(newImages);
    }
  };

  const handleRemove = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div>
      <input
        type="file"
        accept={imageType}
        multiple={multiple}
        onChange={handleChange}
        required={required}
      />
      {images.map((image, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} className="w-32 h-32" />
          <button onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
