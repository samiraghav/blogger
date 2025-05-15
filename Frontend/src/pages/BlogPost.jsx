import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { getBlogById } from "../features/blog/blogAPI";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found or unauthorized.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full bg-red-100 animate-ping"></div>
          <div className="w-full h-full border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gray-700 text-lg animate-pulse">Loading your blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center text-red-600 mt-20 text-lg">
        {error || "Blog not found."}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 md:px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg">
        <div className="blog-owner">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
          {blog.category && (
            <p className="text-md text-gray-500 font-semibold mb-2">{blog.category}</p>
          )}
          <p className="text-md text-gray-500 mb-4">
            By{" "}
            <span className="text-red-700 font-medium">
              {blog.author || "Unknown Author"}
            </span>{" "}
            |{" "}
            {blog.updatedAt
              ? `Modified on ${formatDate(blog.updatedAt)}`
              : `Created on ${formatDate(blog.createdAt)}`}{" "}
            IST
          </p>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-[20px] mb-6"
          />
        )}

        <div
          className="prose prose-lg max-w-none text-gray-800 mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
