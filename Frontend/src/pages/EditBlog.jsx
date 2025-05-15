import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateBlog } from "../features/blog/blogAPI";
import BlogEditor from "../editor/BlogEditor";

const EditBlog = () => {
  const { id: blogId } = useParams();
  const allBlogs = useSelector((state) => state.blog.blogs);
  const blogToEdit = allBlogs.find((b) => b._id === blogId);

  const [formDataState, setFormDataState] = useState({ title: "", category: "", image: null });
  const [editorContent, setEditorContent] = useState("");
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (blogToEdit) {
      setFormDataState({
        title: blogToEdit.title || "",
        category: blogToEdit.category || "",
        image: null,
      });
      setEditorContent(blogToEdit.content || "");
      setPreviewImageURL(blogToEdit.image || "");
    }
  }, [blogToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImageURL(URL.createObjectURL(file));
    setFormDataState({ ...formDataState, image: file });
    setNewImageSelected(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("title", formDataState.title);
      payload.append("category", formDataState.category);
      payload.append("content", editorContent);
      if (newImageSelected && formDataState.image) {
        payload.append("image", formDataState.image);
      }

      await updateBlog(blogId, payload);

      await Swal.fire({
        icon: "success",
        title: "Blog updated",
        text: "Your blog has been successfully updated!",
        confirmButtonColor: "#10b981",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/my-blogs");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error updating blog",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!blogToEdit) {
    return <div className="text-center text-red-600 mt-10">Blog not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
          <input
            type="text"
            value={formDataState.title}
            onChange={(e) => setFormDataState({ ...formDataState, title: e.target.value })}
            placeholder="Update blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={formDataState.category}
            onChange={(e) => setFormDataState({ ...formDataState, category: e.target.value })}
            placeholder="Update blog category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-100 file:text-gray-700 hover:file:bg-red-200"
          />
          {previewImageURL && (
            <img
              src={previewImageURL}
              alt="Preview"
              className="w-full h-auto object-cover rounded-[20px] mt-3"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <BlogEditor content={editorContent} onChange={setEditorContent} />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/my-blogs")}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black font-semibold transition duration-200 shadow-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200 shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
