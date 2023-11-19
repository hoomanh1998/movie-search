import Badge from "./badge";

const Badges = ({ genre }: { genre: string }) => {
  return (
    <ul className="flex flex-row flex-wrap gap-3 mb-5">
      {genre?.split(",").map((g, i) => (
        <Badge key={i} title={g} />
      ))}
    </ul>
  );
};

export default Badges;
