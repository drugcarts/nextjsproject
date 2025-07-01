"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { GetCategoryService } from "@/services/categoryService";
import { useEffect } from "react";
const CatalogCard = () => {
  const { categories } = useSelector((state) => state.categoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategoryService(1, 8));
  }, []);
  return (
    <>
      {categories &&
        categories?.categories?.map((category, i) => (
          <div className="border-[1.5px] p-4" key={i}>
            <p className="text-center">
              <Image
                width={100}
                height={100}
                src={`https://assets2.drugcarts.com/category/thumb/${category?.cat_img}`}
                alt={category?.category_name}
                className="mb-3 mx-auto object-cover p-2"
              />
              <span>{category?.category_name}</span>
            </p>
          </div>
        ))}
    </>
  );
};

export default CatalogCard;
