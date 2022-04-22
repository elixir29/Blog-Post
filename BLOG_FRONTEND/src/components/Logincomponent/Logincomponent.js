import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";
import { Context } from "../../Context/Context";
function Logincomponent() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [type, setType] = useState("password");
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const responseData = await await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    ).then((data) => data.json());
    if (responseData.others) {
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
      dispatch({ type: "USER_FETCHED", payload: responseData.others });
      notify("Logged in successfully!");
      notify("Redirecting!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      const notify = () =>
        toast.error(responseData.message, {
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
      <div className="flex h-screen">
        <div className="w-full max-w-xs m-auto  bg-transparent  rounded p-5">
          <header>
            <img
              className="w-20 mx-auto mb-5"
              src="/logo.svg"
              alt="logo imange"
            />
          </header>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block  text-indigo-500 text-xl" htmlFor="email">
                Email
              </label>
              <input
                required
                ref={emailRef}
                className=" w-full p-2 mb-6 text-xl text-[#008080] bg-transparent border-b-2 border-indigo-500 outline-none focus:border-red-500"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="relative">
              <div>
                <label
                  className="block  text-xl text-indigo-500"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  required
                  ref={passwordRef}
                  className="w-full p-2 mb-6 bg-transparent text-xl text-[#008080] border-b-2 border-indigo-500 outline-none focus:border-red-500"
                  type={type}
                  name="password"
                  id="password"
                />
              </div>
              <div className="text-[#008080] absolute top-10  right-0">
                <p
                  onClick={() =>
                    setType(type === "password" ? "text" : "password")
                  }
                  className="w-6 h-6 hover:cursor-pointer"
                >
                  {type === "password" ? <EyeOffIcon /> : <EyeIcon />}
                </p>
              </div>
            </div>
            <div>
              <input
                className="w-full bg-cyan-900  text-teal-500 hover:cursor-pointer font-bold py-2 px-4 mb-6 rounded"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <footer>
            <Link
              className="text-pink-700 text-xl font-bold float-right"
              to="/signup"
            >
              Create Account
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Logincomponent;
