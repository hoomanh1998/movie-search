import { useScrollToTop } from "@features/movies";
import ArrowUpIcon from "@icons/arrow-up-icon";

const ScrollToTop = () => {
  const { isScrollBtnShown: show } = useScrollToTop();

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTopHandler}
      className={`fixed -bottom-2 left-1/2 -translate-x-1/2 flex justify-center items-center w-12 h-12 bg-gray-900 rounded-full transition-transform duration-300 ease-in-out cursor-pointer sm:hover:scale-125 ring ring-blue-500 z-20 ${
        show
          ? "-translate-y-8 scale-100 sm:-translate-y-10"
          : "translate-y-full scale-50"
      }`}
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
