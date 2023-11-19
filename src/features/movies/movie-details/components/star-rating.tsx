import { mapRateNumberToStar } from "@utils/helper";
import FillStarIcon from "@icons/fill-star-icon";
import StarIcon from "@icons/star-icon";

const StarRating = ({ rate }: { rate: number }) => {
  const stars = mapRateNumberToStar(rate);

  return (
    <div className="flex flex-row items-center">
      <span className="font-bold mr-1.5">{rate}</span>
      <div className="flex flex-row space-x-px">
        {stars.map((star, i) =>
          star === "filled" ? <FillStarIcon key={i} /> : <StarIcon key={i} />
        )}
      </div>
    </div>
  );
};

export default StarRating;
