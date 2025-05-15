import { useState } from "react";
import BlogEditor from "../editor/BlogEditor";
import { createBlog } from "../features/blog/blogAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await createBlog(formData);

      Swal.fire({
        icon: 'success',
        title: 'Blog Published!',
        text: 'Your blog has been published successfully.',
        confirmButtonColor: '#3b82f6',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while creating the blog.',
        confirmButtonColor: '#ef4444',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            placeholder="Enter the category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-red-100 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <BlogEditor content={content} onChange={setContent} />
        </div>

        <div className="text-right flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/my-blogs")}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black font-semibold transition duration-200 shadow-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
