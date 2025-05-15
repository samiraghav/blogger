import { useState } from "react";

const BlogFilter = ({ onFilter }) => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ author, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-around gap-4"
    >
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Search by author"
        className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Search by category"
        className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-gray-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
      >
        Search
      </button>
    </form>
  );
};

export default BlogFilter;
