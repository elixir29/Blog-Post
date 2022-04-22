import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function NotFoundComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    const notify = () =>
      toast.error("Redirecting!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
    setTimeout(() => {
      navigate("/");
    }, 5000);
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
      <div className="animate-pulse flex flex-col justify-center items-center mt-16 w-full">
        <img
          alt="404.svg"
          layout="intrinsic"
          src="/404.svg"
          height={300}
          width={300}
        />
        <h1 className="text-red-900 text-2xl">OPSS... Not found</h1>
      </div>
    </>
  );
}

export default NotFoundComponent;
