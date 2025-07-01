import React from 'react'
import Star from '@mui/icons-material/Star';

const FeedbackRating = () => {
  const ratings = [
    { stars: 5, percentage: "w-5/5", color: "bg-green-500" },
    { stars: 4, percentage: "w-4/5", color: "bg-blue-500" },
    { stars: 3, percentage: "w-3/5", color: "bg-yellow-500" },
    { stars: 2, percentage: "w-2/5", color: "bg-purple-500" },
    { stars: 1, percentage: "w-1/5", color: "bg-red-500" },
  ];
  return (
    
      <div className="flex flex-wrap justify-between items-center bg-pink-100 p-6 rounded-lg shadow-md">
        <div className='w-full md:w-1/4'>
          <h3 className="font-semibold text-lg text-center">Feedback</h3>
          <div className="flex mt-2 justify-center items-center">
            <span className="text-3xl font-bold text-pink-700 text-center">4.0</span>
            <div className="ml-2 flex">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
              ))}
              <Star className="text-gray-300 fill-gray-300" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center my-4">Average Rating</p>
        </div>
        <div className='w-full md:w-2/4'>
          {ratings.map((rating, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden my-2">
                <div className={`h-full ${rating.percentage} ${rating.color} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full md:w-1/4'>
          {ratings.map((rating, index) => (
            <div key={index} className="flex justify-center items-center space-x-2 mt-2">
              <div className="flex">
                {[...Array(rating.stars)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default FeedbackRating;