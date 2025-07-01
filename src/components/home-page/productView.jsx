import Alovera from "@/assets/product/alovera.png";
import Breathe from "@/assets/product/breathe-eazy.png";
import Honitus from "@/assets/product/honitus.png";
import Wheatgrass from "@/assets/product/wheatgrass-juice.png";
import Image from "next/image";
import FavouriteIcon from "@/assets/Icons/FavouriteIcon";
import CartIcon from "@/assets/Icons/CartIcon";
import discountImg from "@/assets/trendingimg/dealofday.png";

const ProductView = () => {
  const products = [
    {
      id: 1,
      name: "Pankajakasthuri Syrup",
      price: "$400",
      image: Alovera,
      rating: 4.5,
      fav: false,
    },
    {
      id: 2,
      name: "Cough Syrup 100 ml",
      price: "$440",
      image: Breathe,
      rating: 4.0,
      fav: false,
    },
    {
      id: 3,
      name: "Pankajakasthuri Syrup",
      price: "$400",
      image: Honitus,
      rating: 4.5,
      fav: true,
    },
    {
      id: 4,
      name: "Cough Syrup 100 ml",
      price: "$440",
      image: Alovera,
      rating: 4.0,
      fav: false,
    },
    {
      id: 5,
      name: "Cough Syrup 100 ml",
      price: "$440",
      image: Wheatgrass,
      rating: 4.0,
      fav: true,
    },
    {
      id: 6,
      name: "Pankajakasthuri Syrup",
      price: "$400",
      image: Alovera,
      rating: 4.5,
      fav: false,
    },
    {
      id: 7,
      name: "Cough Syrup 100 ml",
      price: "$440",
      image: Breathe,
      rating: 4.0,
      fav: false,
    },
    {
      id: 8,
      name: "Pankajakasthuri Syrup",
      price: "$400",
      image: Honitus,
      rating: 4.5,
      fav: true,
    },
    // Add more products as needed
  ];
  const bestSellers = [
    {
      id: 1,
      name: "Pankajakasthuri Syrup",
      price: "$400",
      image: Alovera,
    },
    {
      id: 2,
      name: "Gel Oil",
      price: "$250",
      image: Honitus,
    },
    {
      id: 3,
      name: "Gel Oil",
      price: "$250",
      image: Wheatgrass,
    },
  ];
  return (
    <section className="px-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[4.5fr_1.5fr] gap-4 mb-10">
        <div>
          <div className="flex flex-wrap justify-between items-center p-3 border border-t-1 ">
            <div className="flex w-full md:w-1/2 mb-4 mg:mb-0">
              <h2 className="text-xl font-bold">Trending This Week</h2>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">
                Top Rate
              </button>
              <button className="px-4 py-2 border rounded-lg">Top Items</button>
              <button className="px-4 py-2 border rounded-lg">
                New Arrivals
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 content-center place-items-center border border-t-0">
            {products?.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-2 bg-white shadow hover:shadow-lg"
              >
                <div className="grid justify-end">
                  <button className="bg-[#FFE5EF] p-1.5 rounded-full shadow hover:bg-gray-200">
                    <FavouriteIcon active={product?.fav} />
                  </button>
                </div>
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-48 h-48 ml-3"
                />
                <h3 className="text-gray-500 font-poppins font-medium text-[13px] w-[60%] line-clamp-1">
                  {product?.name}
                </h3>
                <p className="text-black font-poppins font-medium text-[13px] mt-1 w-[60%] line-clamp-1">
                  {product?.name}
                </p>
                <div className="bg-white mt-1 flex justify-items-center justify-between">
                  <p className="text-black font-poppins font-semibold text-[14px] mt-1">
                    {product?.price}
                  </p>
                  <button>
                    <CartIcon />
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-gray-500">&#9733;</span>
                  {/* <span className="ml-1 text-sm text-gray-600">
                    {product?.rating} Stars
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FFEFF5] rounded-md shadow-md">
          <div className="p-3">
            <h3 className="font-bold text-lg">Best Seller</h3>
            <hr className="border-gray-500 mt-2" />
          </div>
          {bestSellers?.map((item) => (
            <>
              <div className="flex justify-center items-center p-3">
                <div className="w-1/3 bg-red-400">
                  <Image
                    priority
                    src={item?.image}
                    alt={item?.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <div className="w-2/3">
                  <div className="ml-2">
                    <h4 className="text-sm">{item?.name}</h4>
                    <p className="text-black font-poppins text-sm mt-1">
                      {item?.price}
                    </p>
                    <div className="flex justify-center items-center">
                      <div className="w-1/2">
                        <span className="text-yellow-500">&#9733;</span>
                        <span className="text-yellow-500">&#9733;</span>
                        <span className="text-yellow-500">&#9733;</span>
                        <span className="text-yellow-500">&#9733;</span>
                        <span className="text-gray-500">&#9733;</span>
                      </div>
                      <div className="w-1/2">
                        <button className="bg-green-500 hover:bg-blue-600 ml-1 text-white font-poppins font-semibold text-[12px] py-1 px-1 rounded shadow-md">
                          <div className="flex justify-center">
                            <span>Shop Now</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-4"
                            >
                              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <hr className="border-gray-500 mt-2" />
              </div>
            </>
          ))}
          <Image
            src={discountImg}
            alt="Product"
            className="w-76 h-auto mx-auto mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductView;
