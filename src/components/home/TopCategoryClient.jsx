"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TopCategoryClient = ({ categories }) => {
  const router = useRouter();

  const CategoryImage = ({ cat_img, category_name }) => {
    const [src, setSrc] = useState(
      `https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/category/thumb/${cat_img}`
    );

    const handleError = () => {
      if (src.includes("s3")) {
        setSrc(`https://assets2.drugcarts.com/category/thumb/${cat_img}`);
      } else {
        setSrc("/assets/no_image.png");
      }
    };

    return (
      <img
        src={src}
        onError={handleError}
        width={100}
        height={100}
        alt={category_name}
        className="mb-3 mx-auto object-cover bg-bgcancer rounded-full p-2 w-24 h-24"
      />
    );
  };
  return (
    <>
      {categories?.map((category, i) => {
        return (
          <div
            className="bg-bgshop rounded-lg p-4 cursor-pointer"
            key={i}
            onClick={() => router.push(`/catalog/${category?.url}`)}
          >
            <p className="text-center">
              <CategoryImage
                cat_img={category?.cat_img}
                category_name={category?.category_name}
              />
              <span>{category?.category_name}</span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default TopCategoryClient;
