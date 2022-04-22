import { useContext, useRef, useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";

function Newblogcomponent() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);
  const categoryRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file === null) {
      const notify = () =>
        toast.error("Upload thumbnail using + icon", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notify();
    } else {
      const userData = new FormData();
      userData.append("title", titleRef.current.value);
      userData.append("description", descriptionRef.current.value);
      userData.append("content", contentRef.current.value);
      userData.append("authorName", user.username);
      userData.append("categories", categoryRef.current.value);
      userData.append("authourImageURL", user.userImage);
      userData.append("blogImage", file);
      const url = id
        ? `${process.env.REACT_APP_SERVER_URL}api/blog/edit/${id}`
        : `${process.env.REACT_APP_SERVER_URL}api/blog/new`;

      const postDataResult = await fetch(url, {
        method: id ? "PUT" : "POST",
        body: userData,
      }).then((data) => data.json());
      if (postDataResult.addedBlog) {
        const notify = (msg) =>
          toast.success(msg, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        categoryRef.current.value.split(",").map(async (item) => {
          await fetch(`${process.env.REACT_APP_SERVER_URL}api/categories/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: item }),
          }).then((data) => data.json());
        });
        notify(id ? "Blog Updated!" : "Blog posted!");
        notify("Redirecting!");
        setTimeout(() => {
          navigate(`/blog/${postDataResult.addedBlog._id}`);
        }, 3000);
      } else {
        const notify = () =>
          toast.error(postDataResult.message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        notify();
      }
    }
  };
  const fetchPost = async () => {
    const fetchedBlog = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/blog/${id}`
    ).then((data) => data.json());
    if (fetchedBlog.message) {
      const notify = () =>
        toast.error("No such blog exist to edit!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notify();
    } else {
      setTitle(fetchedBlog.title);
      setCategory(fetchedBlog.categories);
      setImageURL(fetchedBlog.blogImage);
      setDescription(fetchedBlog.description);
      setContent(fetchedBlog.content);
    }
  };
  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, []);

  return (
    <>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="wrapper w-full p-6">
        {(file || imageURL) && (
          <div>
            <img
              className=" w-full rounded-xl h-96 mb-4 "
              src={
                (file && URL.createObjectURL(file)) ||
                `${process.env.REACT_APP_SERVER_URL}${imageURL}`
              }
              alt="thumbnail"
            />
          </div>
        )}
        <div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="parent space-y-2 ">
              <div className="file_title flex items-center">
                <label htmlFor="file_input">
                  <PlusCircleIcon className="hover:md:cursor-pointer text-red-500 h-10 w-10" />
                </label>
                <input
                  ref={imageRef}
                  className="hidden bg-transparent "
                  type="file"
                  name="file_input"
                  id="file_input"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="grow h-24 scrollbar bg-transparent 
                border-b-2 border-indigo-500 outline-none focus:border-red-500
                rounded-lg p-2 
                text-purple-500 font-Rubik text-xl md:text-3xl"
                  ref={titleRef}
                  name="title_input"
                  id="title_input"
                  placeholder="Write title...."
                />
              </div>
              <div className="category_div ">
                <textarea
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  ref={categoryRef}
                  className="w-full scrollbar h-20 bg-transparent
                border-b-2 border-indigo-500 outline-none focus:border-red-500
                rounded-lg p-2 text-purple-500 font-Indie text-xl md:text-3xl"
                  name="category"
                  id="category"
                  placeholder="Write category (comma(,) seprated in case of multiple)...."
                />
              </div>
              <div className="description_div ">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  ref={descriptionRef}
                  className="w-full scrollbar h-20 bg-transparent
                border-b-2 border-indigo-500 outline-none focus:border-red-500
                rounded-lg p-2 text-purple-500 font-Indie text-xl md:text-3xl"
                  name="description"
                  id="description"
                  placeholder="Write description...."
                />
              </div>
              <div className="content_div">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full scrollbar h-40 bg-transparent 
                border-b-2 border-indigo-500 outline-none focus:border-red-500
                rounded-lg p-2 text-[#8996d4] font-Indie text-xl md:text-3xl"
                  ref={contentRef}
                  name="content"
                  id="content"
                  placeholder="Write your blog (markdown supported)...."
                />
              </div>
            </div>
            <div className="button_div flex justify-center mt-4">
              <button
                className="bg-gradient-to-r from-indigo-500 to-pink-500  text-black font-bold h-12 w-16 rounded-xl "
                type="submit"
              >
                {id ? "Update" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Newblogcomponent;
