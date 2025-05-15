import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useDispatch } from 'react-redux';
import { setClickedBlogId } from '../features/blog/blogSlice';
import noImage from  '../assets/no-image.svg'

const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setClickedBlogId(blog._id));
  };

  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="block no-underline text-black"
      onClick={handleCardClick}
    >
      <div className="bg-white rounded shadow p-4 mb-4 h-[500px] w-[325px] flex flex-col justify-between">
        <div className="relative w-full h-[56.25%]">
          <img
            src={blog.image || noImage}
            alt="thumbnail"
            className="absolute top-0 left-0 w-full h-full object-contain rounded"
          />
        </div>
        <h2 className="text-xl text-center font-semibold mt-2">{blog.title}</h2>
        {blog.category && <p className="text-sm text-center text-gray-500 font-semibold mt-1">{blog.category}</p>}
        <p className="text-sm text-center text-gray-500 mt-1">
          By {blog.author || 'Unknown Author'} •{" "}
          {blog.updatedAt
            ? `Modified on ${formatDate(blog.updatedAt)}`
            : `Created on ${formatDate(blog.createdAt)}`} IST
        </p>
        <div className="mt-3 text-sm text-gray-700 overflow-hidden" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + "..." }} />
      </div>
    </Link>
  );
};

export default BlogCard;
