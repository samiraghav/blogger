import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { deleteBlog } from "../features/blog/blogAPI";
import noImage from  '../assets/no-image.svg'

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, user?._id]);

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      dispatch(fetchBlogs());
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading your blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 text-lg">{error}</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-6">
      <h2 className="text-3xl text-center font-bold text-gray-700 mb-6 mt-6">My Blogs</h2>

      {blogs.filter(blog => blog.userId === user?._id).length === 0 ? (
        <div className="text-gray-600 text-center text-lg">
          You haven’t written any blogs yet... but your backspace key is warmed up. Let’s fix that.{" "}
          <Link to="/create" className="text-red-600 hover:underline">
            Write it down Champ 
          </Link>
        </div>
      ) : (
        // Render user's blogs in a responsive grid layout
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs
            .filter(blog => blog.userId === user?._id)
            .map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition flex flex-col h-full"
              >
                <h3 className="text-xl text-center font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h3>
                <img
                  src={blog.image || noImage}
                  alt="thumbnail"
                  className="w-full h-[56.25%] object-cover rounded-[20px] mb-3"
                />
                <div
                  className="text-gray-600 text-sm line-clamp-4 mt-5 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 250) + "...",
                  }}
                />
                <div className="mt-auto flex justify-between w-full">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="text-md text-red-600 hover:text-red-800 font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      const confirmed = window.confirm("Are you sure you want to delete this blog?");
                      if (confirmed) {
                        handleDelete(blog._id);
                      }
                    }}
                    className="text-md text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
