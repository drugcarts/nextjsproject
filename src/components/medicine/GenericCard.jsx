"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import { useSelector, useDispatch } from "react-redux";
import { GetCategoryService } from "@/services/categoryService";
import { useEffect } from "react";

const GenericCard = () => {
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
                src={IMAGES.DUMMYIMAGE}
                alt="Dummy Image"
                className="mb-3 mx-auto object-cover p-2 blur-[2px]"
              />
              <span>{category?.category_name}</span>
            </p>
          </div>
        ))}
    </>
  );
};

export default GenericCard;
