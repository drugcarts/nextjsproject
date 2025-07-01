import Image from "next/image";

function CategoryCard({ imagUrl, imageAlt, title, onClick }) {
  return (
    <div className="bg-bgshop rounded-lg p-4 cursor-pointer" onClick={onClick}>
      <p className="text-center">
        <Image
          width={100}
          height={100}
          src={imagUrl}
          alt={imageAlt}
          className={`mb-3 mx-auto object-cover ${
            imagUrl ? "bg-bgcancer" : "bg-white"
          } rounded-full p-2`}
        />
        <span>{title}</span>
      </p>
    </div>
  );
}

export default CategoryCard;
