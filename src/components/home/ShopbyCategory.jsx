import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const categories = [
  {
    title: "Face Care",
    image: IMAGES.FACECARE,
    bg: "#F6A1AC",
  },
  {
    title: "Oral Care",
    image: IMAGES.NATURALCARE,
    bg: "#699BF7",
  },
  {
    title: "Women Care",
    image: IMAGES.FACECARE,
    bg: "#FF0076CC",
  },
  {
    title: "Natural Care",
    image: IMAGES.NATURALCARE,
    bg: "#588345",
  },
  {
    title: "Skin Care",
    image: IMAGES.FACECARE,
    bg: "#A15F3B",
  },
];

const offers = [
  { title: "Order Medicine", image: IMAGES.NEW },
  { title: "Best Product", image: IMAGES.BESTSELLER },
  { title: "Discount Product", image: IMAGES.DISCOUNTOFFER },
  { title: "Trending Product", image: IMAGES.TRANDING },
  { title: "Ayurvedic Product", image: IMAGES.HERBAL },
];

const ShopbyCategory = () => {
  return (
    <section aria-labelledby="shop-by-category" className="px-10 mt-3">
      <header className="p-2 font-semibold mb-2 mt-2 text-lg text-center">
        <h1 id="shop-by-category">Shop by Category</h1>
      </header>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 px-0 md:px-20 gap-3 mb-10">
        {categories.map((cat, i) => (
          <article
            key={i}
            className="p-3 w-40 h-40 shadow-lg mb-10 md:mb-0 rounded-tl-2xl rounded-bl-full"
            style={{ backgroundColor: cat.bg }}
            aria-label={cat.title}
          >
            <h3 className="text-white text-xl text-center">{cat.title}</h3>
            <Image
              priority
              src={cat.image}
              alt={cat.title}
              className="categoryicon object-cover ml-10 mt-5"
            />
          </article>
        ))}
      </div>

      {/* Prescription Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-3">
        <div className="flex bg-pink-200 p-10 rounded-md items-center">
          {/* Prescription Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-24 text-bgcolor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>

          <div className="ml-5">
            <h3 className="text-[#B7084B] font-bold mb-3">
              Upload Prescription
            </h3>
            <p>Upload your prescription and we’ll deliver your medicine.</p>

            <div className="flex flex-wrap mt-5 justify-center gap-4">
              <button className="bg-[#B7084B] text-white px-6 py-3 text-sm rounded-lg">
                Upload Now
              </button>
              <button className="bg-[#B7084B] text-white px-6 py-3 text-sm rounded-lg flex items-center">
                {/* Call Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                CALL US FREE
                <br />
                1-888-567-999
              </button>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gray-200 p-10 rounded-md leading-8">
          <h3 className="text-[#B7084B] font-medium mb-3 text-2xl">
            How it Works?
          </h3>
          <ol className="list-decimal ml-5 text-sm">
            <li>Upload a photo of your prescription</li>
            <li>Add delivery address and place the order</li>
            <li>We will call you to confirm the medicines</li>
            <li>Your medicines will be delivered to your doorstep</li>
          </ol>
        </div>
      </div>

      {/* Generic Medicine */}
      <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-3">
        {[IMAGES.GENERIC1, IMAGES.GENERIC2].map((img, i) => (
          <div
            key={i}
            className={`rounded-md ${
              i === 0 ? "bg-[#4C4C95]" : "bg-[#BD4E2E]"
            }`}
          >
            <div className="flex">
              <div className="w-4/6 p-5">
                <h3 className="text-white text-2xl font-bold mt-7">
                  {i === 0
                    ? "What is Generic Medicine"
                    : "Find my Generic Medicine"}
                </h3>
              </div>
              <div className="w-2/6">
                <Image
                  priority
                  src={img}
                  alt="Generic Medicine Info"
                  className="h-32 w-full object-cover rounded-md mt-3"
                />
              </div>
            </div>
            <div className="flex p-2 justify-center">
              <button className="bg-white text-black font-bold px-5 py-2 text-sm rounded-lg">
                Find Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Products & Offers */}
      <div className="p-2 font-bold mb-2 mt-2 text-center text-lg">
        <h2>Products and Offers</h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 px-2 md:px-20">
        {offers.map((offer, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              priority
              src={offer.image}
              alt={offer.title}
              className="w-28 h-28"
            />
            <p className="mt-2 text-sm font-bold text-gray-700">
              {offer.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopbyCategory;
