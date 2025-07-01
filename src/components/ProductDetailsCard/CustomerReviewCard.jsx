import Star from "@mui/icons-material/Star";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useSelector } from "react-redux";
import { RelativeFormat } from "@/utils/dateFormat";
import OverallRating from "../common/OverallRating";

const CustomerReviewCard = () => {
  const { sendFeedbackList } = useSelector((state) => state.sendFeedbackData)
  return (
    <>
      <h2 className="text-md md:text-xl font-bold mt-6 border-b-[1.5px] pb-2 m-3">
        Reviews
      </h2>
      {sendFeedbackList && sendFeedbackList?.send_feedbacks?.map((feedback, i) => (
        <div className="flex justify-center items-center mt-4 border-b-[1.5px] p-2 m-3" key={i}>
          <div className="w-full md:w-1/4">
            <div className="flex justify-center items-center">
              <div className="w-1/3">
                <PersonPinIcon
                  style={{ height: "75px", width: "75px", color: "gray" }}
                />
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-[14px] text-gray-300">{RelativeFormat(feedback?.date)}</p>
                <h3 className="font-bold text-md md:text-xl">{feedback?.username}</h3>
                <p className="text-[12px] text-gray-600">{feedback?.ratingStatus}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex">
              <OverallRating rating={feedback?.rating}/>
            </div>
            <p className="text-sm my-2">
             {feedback?.comments}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CustomerReviewCard;
