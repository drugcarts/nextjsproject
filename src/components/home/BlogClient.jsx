"use client";
import { useRouter } from "next/navigation";

const BlogClient = ({ blogList }) => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-center md:text-left pb-10">
        {/* px-0 md:px-5  */}
        {blogList?.blogs?.map((blog, i) => (
          <div className="bg-white rounded-lg p-5 border-[1.5px]" key={i}>
            <img
              src={`https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/blogs/${blog?.blogimg}`}
              alt={blog?.blogname}
              className="w-[100%] h-56 object-cover"
              width={200}
              height={200}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://assets2.drugcarts.com/blogs/${blog?.blogimg}`;
              }}
            />
            <h1 className="mt-6 font-bold text-md h-10">{blog?.blogname}</h1>
            {/* <div dangerouslySetInnerHTML={{ __html: blog.description }} /> */}
            <div className="flex justify-center items-center font-bold mt-7 pb-0">
              <span
                className="text-right text-blue-500 cursor-pointer"
                onClick={() => router.push(`blog/blog-details/${blog?.url}`)}
              >
                Read More
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6 font-bold text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogClient;
