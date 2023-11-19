export const mapRateNumberToStar = (rate: number) =>
  Array.from({ length: 5 }, (_, i) =>
    i < Math.round(rate / 2) ? "filled" : "empty"
  );

export const formatTime = (time: number) => {
  const hours = Math.round(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export const toCamelCase = (s: string) => {
  const normalizeString = s.toLowerCase();
  return normalizeString[0].toUpperCase() + normalizeString.slice(1);
};

export const extractMovieTitle = (movieTitle: string) => {
  return movieTitle
    .replace(":", "")
    .split(/\W+/)
    .slice(0, 2)
    .map((word) => word.toLowerCase())
    .filter((word) => word !== "the")
    .join(" ")
    .trim();
};
