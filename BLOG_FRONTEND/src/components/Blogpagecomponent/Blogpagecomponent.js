import { useState, useEffect, useContext } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../Context/Context";

function Blogpagecomponent() {
  const { theme, user } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const fetchPost = async () => {
    const fetchedBlog = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/blog/${id}`
    ).then((data) => data.json());
    if (fetchedBlog.message) {
      const notify = () =>
        toast.error(fetchedBlog.message, {
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
      setBlog([fetchedBlog]);
    }
  };
  const deleteBlog = async (blogImage) => {
    const deletedBlog = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/blog/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorName: user.username,
          blogImage: blogImage,
        }),
      }
    ).then((data) => data.json());
    if (deletedBlog.success) {
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
      notify("Blog deleted!");
      notify("Redirecting!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      const notify = () =>
        toast.error(deletedBlog.message, {
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
  };
  const editHandle = async (id) => {
    navigate(`/blog/edit/${id}`);
  };

  useEffect(() => {
    fetchPost();
    /* eslint-disable */
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
      {blog &&
        blog.map((item) => (
          <div key={item.title} className="container p-2 xs:p-6">
            <div className="blog_image ">
              <img
                className="w-full rounded-xl h-96 xs:h-128"
                src={`${process.env.REACT_APP_SERVER_URL}${item.blogImage}`}
                alt="thumbnail"
              />
            </div>
            <div className="title_edit_delete mt-2 flex flex-col space-y-2 mb-4 md:flex-row md:space-y-0 md:justify-between ">
              <p className="text-4xl md:text-6xl text-purple-500 font-Rubik">
                {item.title}
              </p>
              {item.authorName === user?.username && (
                <p className="text-purple-500 flex space-x-4">
                  <PencilIcon
                    className="h-6 w-6 md:h-8 md:w-8 text-green-500 md:hover:cursor-pointer"
                    onClick={() => editHandle(item._id)}
                  />
                  <TrashIcon
                    className="h-6 w-6 md:h-8 md:w-8 text-red-500 md:hover:cursor-pointer"
                    onClick={() => deleteBlog(item.blogImage)}
                  />
                </p>
              )}
            </div>
            <div className="author_date flex flex-col  mb-4 md:flex-row md:justify-between">
              <Link to={`/?user=${item.authorName}`}>
                <div className="m-2 author flex items-center space-x-2">
                  <div className="author_image ">
                    <img
                      className="border-[#7f8da1] border-[1px] h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full "
                      src={`${process.env.REACT_APP_SERVER_URL}${item.authourImageURL}`}
                      alt="author pfp"
                    />
                  </div>
                  <div className="author_name">
                    <p className="xs:text-xl sm:text-2xl text-[#7f8da1]">
                      {item.authorName}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="date">
                <p className="xs:text-xl sm:text-2xl text-[#7f8da1]">
                  {new Date(item.updatedAt).toDateString()}
                </p>
              </div>
            </div>
            <div className="tags mt-2 mb-2 space-x-4 flex overflow-x-auto scrollbar-hide ">
              {item.categories.split(",").map((item, idx) => (
                <Link to={`/?categories=${item}`}>
                  <p
                    key={idx}
                    className="p-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-xl text-black font-bold font-Indie"
                  >
                    {item}
                  </p>
                </Link>
              ))}
            </div>
            <div className="content">
              <p
                className={`prose ${
                  theme ? `prose-invert` : ``
                } prose-img:rounded-xl prose-headings:text-pink-500 prose-a:text-green-400 prose-code:text-purple-400 prose-strong:font-bold prose-strong:text-red-500 text-[#8996d4] text-4xl
            prose-pre:bg-gradient-to-r from-[#e5b4e480] to-[#a390d47a]
            `}
              >
                <ReactMarkdown
                  children={item.content}
                  remarkPlugins={[remarkGfm]}
                />
              </p>
            </div>
          </div>
        ))}
    </>
  );
}

export default Blogpagecomponent;
