import { useState, useEffect } from "react";
import Topbar from "../components/Topbar/Topbar";
import Centerdiv from "../components/Centerdiv/Centerdiv";
import Categories from "../components/Categories/Categories";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Homepage() {
  const fetchBlogs = async () => {
    const fetchedBlogs = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/blog/${search}`
    ).then((data) => data.json());
    if (fetchedBlogs.message) {
      const notify = () =>
        toast.error(fetchedBlogs.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setBlogs(null);
      notify();
    } else {
      setBlogs(fetchedBlogs);
    }
  };
  const fetchCategories = async () => {
    const fetchedCategories = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/categories/`
    ).then((data) => data.json());
    setCategories(fetchedCategories);
  };
  const [blogs, setBlogs] = useState(null);
  const [categories, setCategories] = useState(null);
  const { search } = useLocation();
  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    /* eslint-disable */
  }, [search]);

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
      <Topbar />
      {categories && <Categories categories={categories} />}
      {blogs && <Centerdiv blogs={blogs} />}
    </>
  );
}

export default Homepage;
