'use client';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OverallRating = ({ rating }) => {
    const totalStars = 5;

    return (
        <div className="flex space-x-1">
            {Array.from({ length: totalStars }, (_, index) => {
                const isFilled = index < rating;
                return isFilled ? (
                    <StarIcon key={index} className="text-yellow-400 w-6 h-6" />
                ) : (
                    <StarBorderIcon key={index} className="text-gray-400 w-6 h-6" />
                );
            })}
        </div>
    );
};

export default OverallRating;
