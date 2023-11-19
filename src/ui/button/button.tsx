type IButton = {
  title: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, ...props }: IButton) => {
  return (
    <button
      {...props}
      className="bg-indigo-400 text-white py-3 px-5 rounded-md"
    >
      {title}
    </button>
  );
};

export default Button;
