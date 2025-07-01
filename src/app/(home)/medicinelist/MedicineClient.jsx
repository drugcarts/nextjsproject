"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { getCategoryData } from "@/services/home/categoryService";

const MedicineClient = ({ pageBannerUrl }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [categories, setCategories] = useState({});
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const limit = 18;

  const categroyClick = (cat_url) => {
    router.push(`/catalog/${cat_url}`);
  };
  useEffect(() => {
    // if (firstLetter !== selectedLetter || currentPage !== pageNo) {
    //   const params = new URLSearchParams();
    //   params.set("page", currentPage.toString());
    //   params.set("selectedLetter", selectedLetter);
    // }
    const fetchData = async () => {
      const res = await getCategoryData(selectedLetter, currentPage, limit);
      console.log(res);

      if (res?.categories) {
        setCategories(res);
      }
    };
    fetchData();
  }, [currentPage, selectedLetter]);

  console.log(selectedLetter, currentPage);

  return (
    <section className="max-w-7xl mx-auto">
      <Image
        priority
        src={
          pageBannerUrl?.image
            ? `https://assets1.drugcarts.com/admincolor/homepage/pagebanner/${pageBannerUrl?.image}`
            : IMAGES.NO_IMAGE
        }
        alt="Ayush Banner"
        className="w-[100%] h-[200px] rounded-xl"
        width={500}
        height={100}
      />
      <div className="py-2 text-xl font-bold px-2 md:px-0">
        <h2>A - Z Order Medicine</h2>
        <div className="flex flex-wrap justify-center gap-2 my-4">
          {alphabet.map((letter, i) => (
            <button
              className={`${
                selectedLetter === letter ? "bg-[#B7084B]" : "bg-[#35A24D]"
              } px-2 text-white rounded-md`}
              key={i}
              onClick={() => {
                setSelectedLetter(letter);
                setCurrentPage(1);
              }}
            >
              {letter}
            </button>
          ))}
          <button
            className={`${
              selectedLetter === "" ? "bg-[#B7084B]" : "bg-[#35A24D]"
            } px-2 text-white rounded-md`}
            onClick={() => {
              setSelectedLetter("");
              setCurrentPage(1);
            }}
          >
            View All
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pb-20 px-2 md:px-0">
        {categories?.categories &&
          categories?.categories?.map((category, i) => (
            <div
              className="bg-bgshop rounded-lg p-4 cursor-pointer"
              key={i}
              onClick={() => categroyClick(category?.url)}
            >
              <p className="text-center">
                <Image
                  width={100}
                  height={100}
                  src={
                    category?.cat_img
                      ? `https://assets2.drugcarts.com/category/thumb/${category?.cat_img}`
                      : IMAGES.NO_IMAGE
                  }
                  alt={category?.category_name}
                  className={`mb-3 mx-auto object-cover ${
                    category?.cat_img ? "bg-bgcancer" : "bg-white"
                  } rounded-full p-2`}
                />
                <span className="capitalize">{category?.category_name}</span>
              </p>
            </div>
          ))}
      </div>
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontFamily={"Poppins"}>
          Showing 1-{10} of {categories?.pagination?.totalItems} entries
        </Typography>
        <br />
        <Pagination
          size="large"
          count={categories?.pagination?.totalPages}
          page={currentPage}
          color="secondary"
          onChange={(_, value) => setCurrentPage(value)}
        />
      </Box>
    </section>
  );
};

export default MedicineClient;
