import { IMAGES } from "@/components/common/images";
import Image from "next/image";

const Helpful = () => {
  return (
    <section aria-labelledby="feedback-heading" className="border-2 p-3 my-5">
      <h2 id="feedback-heading" className="text-xl font-bold text-center mb-2">
        Feedback
      </h2>

      <h3 className="text-lg font-semibold text-center mb-1">
        Did you find this helpful?
      </h3>

      <p className="text-sm text-gray-500 text-center mb-4">
        Your feedback helps us improve our product.
      </p>

      <div className="flex justify-center items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-2 border-2 rounded p-2 hover:bg-gray-100"
          aria-label="Yes, this was helpful"
        >
          <Image
            src={IMAGES.THUMBSUP}
            alt="Thumbs up icon"
            className="w-[30px] md:w-[50px]"
          />
          <span className="text-lg md:text-2xl font-bold">Yes</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 border-2 rounded p-2 hover:bg-gray-100"
          aria-label="No, this was not helpful"
        >
          <Image
            src={IMAGES.THUMBSDOWN}
            alt="Thumbs down icon"
            className="w-[30px] md:w-[50px]"
          />
          <span className="text-lg md:text-2xl font-bold">No</span>
        </button>
      </div>
    </section>
  );
};

export default Helpful;
