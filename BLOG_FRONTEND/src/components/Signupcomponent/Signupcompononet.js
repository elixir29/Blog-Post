import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeOffIcon, EyeIcon, PlusCircleIcon } from "@heroicons/react/outline";

function Signupcompononet() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("password");
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file === null) {
      const notify = () =>
        toast.error("Upload pfp using + icon", {
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
      userData.append("username", usernameRef.current.value);
      userData.append("email", emailRef.current.value);
      userData.append("password", passwordRef.current.value);
      userData.append("userImage", file);
      const postDataResult = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/auth/register`,
        {
          method: "POST",
          body: userData,
        }
      ).then((data) => data.json());

      if (postDataResult.status && postDataResult.status === 200) {
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
        notify("Account created!");
        notify("Redirecting!");
        setTimeout(() => {
          navigate("/login");
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

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex items-center space-x-2">
              <div className="author_image ">
                {file && (
                  <img
                    className="border-[#7f8da1] border-[1px] h-12 w-12 xs:h-16 xs:w-16 sm:h-20 sm:w-20 rounded-full "
                    src={URL.createObjectURL(file)}
                    alt="author pfp"
                  />
                )}
              </div>
              <label htmlFor="file_input">
                <PlusCircleIcon className="mb-4 h-10 w-10 text-indigo-500 hover:md:cursor-pointer" />
              </label>
              <input
                accept="image/png, image/jpeg, image/jpg"
                ref={imageRef}
                className=" hidden bg-transparent "
                type="file"
                name="file_input"
                id="file_input"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div>
              <label
                className="block text-indigo-500 text-xl"
                htmlFor="username"
              >
                Username
              </label>
              <input
                required
                ref={usernameRef}
                className=" w-full p-2 mb-6 text-xl text-[#008080] bg-transparent border-b-2 border-indigo-500 outline-none focus:border-red-500"
                type="text"
                name="username"
                id="username"
              />
            </div>
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
                value="Sign up"
                type="submit"
              />
            </div>
          </form>
          <footer>
            <Link
              className="text-pink-700 text-xl font-bold float-right"
              to="/login"
            >
              Login
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Signupcompononet;
