// Search.tsx
import { FaSearch } from "react-icons/fa";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Search = ({ value, onChange }: Props) => {
  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search product..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-100 text-black placeholder-gray-600 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default Search;
