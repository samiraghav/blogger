import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import BlogFilter from "../components/BlogFilter";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const handleFilter = (filters) => {
    dispatch(fetchBlogs(filters));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
        Explore <span className="text-red-600">Blogs</span>
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Read, filter, and create blogs that matter.
      </p>

      <div className="mb-10 p-6 rounded-xl">
        <BlogFilter onFilter={handleFilter} />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Fetching latest blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-16">
          <svg
            className="w-14 h-14 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          No blogs found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="transition-transform transform hover:scale-[1.02] duration-200"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
