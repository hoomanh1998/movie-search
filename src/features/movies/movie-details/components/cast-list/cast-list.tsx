import Cast from "./cast";

const CastList = ({ cast }: { cast: string }) => {
  return (
    <div className="flex flex-col mb-8">
      <h3 className="text-3xl font-bold mb-5">Casts</h3>
      <ul className="flex flex-row overflow-x-auto -mx-5 pl-5 scrollbar-hide">
        {cast?.split(",").map((actor, i) => (
          <Cast key={i} name={actor} />
        ))}
      </ul>
    </div>
  );
};

export default CastList;
