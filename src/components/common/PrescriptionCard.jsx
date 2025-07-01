import Image from "next/image";
import { useEffect, useState } from "react";

const PrescriptionCard = ({ title, image, imageformat, file, onChange, onSubmit, disabled = false }) => {
  const [fileUrl, setFileUrl] = useState("")

  useEffect(() => {
    if (file instanceof Blob) {
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <>
      <div className="flex flex-wrap gap-3 items-center justify-between border p-4 rounded-lg shadow-md w-full bg-white my-7 mx-auto">
        {/* Icon */}
        <div className="flex-shrink-0">
          <Image src={image} alt="Prescription Icons" className="w-28" />
        </div>

        {/* Text */}
        <div>
          <a href={fileUrl} target="_blank" className={`${file ? "text-blue-700" : "text-gray-700"} font-medium`}>{file ? file?.name : title}</a>
          <p className="text-sm text-gray-500">{imageformat}</p>
        </div>

        {/* Upload Button */}
        {file ? <button
          type="submit"
          onClick={onSubmit}
          disabled={disabled}
          className={disabled ? "block": "mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-blue-700"}
        >
          {disabled ? null : "Upload"}
        </button> : <label className="bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600">
          {"Choose"}
          <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={onChange} />
        </label>}
      </div>
    </>
  );
};

export default PrescriptionCard;
