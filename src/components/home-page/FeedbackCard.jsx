"use client";
import Image from "next/image";
import Clientreview from "@/assets/common/client-review-icon.png";
import { useSelector } from "react-redux";
import { tableText } from "@/utils/textFormat";
import OverallRating from "../common/OverallRating";

const FeedbackCard = () => {
  const { sendFeedbackList } = useSelector((state) => state.sendFeedbackData);
  return (
    <>
      <div className="bg-bgclient rounded-md px-10 mt-5">
        <h1 className="font-bold text-xl text-center p-4 md:p-8">
          Our Clients Feedback
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center md:text-left md:px-5 pb-10">
          {sendFeedbackList &&
            sendFeedbackList?.send_feedbacks?.map((feedback, i) => (
              <div className="bg-white rounded-lg p-10 px-5" key={i}>
                <div className="flex mb-4">
                  <div className="flex justify-start bg-red-200 mr-2 rounded-full p-2">
                    <Image
                      src={Clientreview}
                      alt="Client reivew icons"
                      className="w-12 h-12 object-cover "
                    />
                  </div>
                  <div className="justify-end text-center">
                    <h3 className="text-2xl font-bold capitalize">
                      {feedback?.username}
                    </h3>
                    <p>{feedback?.ratingStatus}</p>
                  </div>
                </div>
                <span>{tableText(feedback?.comments, 100)}</span>
                <div className="flex  justify-center mt-6">
                  <h3 className="font-bold pr-1 mt-1 text-sm text-black">
                    {feedback?.rating}
                  </h3>
                  <OverallRating rating={feedback?.rating} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
