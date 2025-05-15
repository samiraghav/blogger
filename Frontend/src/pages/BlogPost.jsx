import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";

const BlogPost = () => {
  const navigate = useNavigate();

  const clickedBlogId = useSelector(state => state.blog.clickedBlogId);

  const blogs = useSelector(state => state.blog.blogs);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clickedBlogId) {
      const clickedBlog = blogs.find(blog => blog._id === clickedBlogId);
      if (clickedBlog) {
        setBlog(clickedBlog);
        setLoading(false);
      } else {
        setError("Blog not found");
        setLoading(false);
      }
    }
  }, [clickedBlogId, blogs]);

  {loading && (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full bg-red-100 animate-ping"></div>
        <div className="w-full h-full border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-gray-700 text-lg animate-pulse">Loading your blog...</p>
    </div>
  )}

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">
        Error: {error}
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center mt-10">Blog not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg">
        <div className=" blog-owner">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
          {blog.category && (
            <p className="text-md text-gray-500 font-semibold mb-2">{blog.category}</p>
          )}
          <p className="text-md text-gray-500 mb-4">
            By <span className="text-red-700 font-medium">{blog.author || 'Unknown Author'}</span> |{" "}
            {blog.updatedAt
              ? `Modified on ${formatDate(blog.updatedAt)}`
              : `Created on ${formatDate(blog.createdAt)}`} IST
          </p>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-[20px] mb-6"
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
        
      </div>
    </div>
  );
};

export default BlogPost;
