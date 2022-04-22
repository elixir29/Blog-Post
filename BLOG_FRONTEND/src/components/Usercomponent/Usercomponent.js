import { useContext, useRef, useState } from "react";
import { PlusCircleIcon, EyeOffIcon, EyeIcon } from "@heroicons/react/outline";
import { Context } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Usercomponent() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("password");
  const imageRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { user, dispatch } = useContext(Context);
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
      userData.append("id", user._id);
      userData.append("userImage", user.userImage);
      const postDataResult = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/user/updateuser/${user._id}`,
        {
          method: "PUT",
          body: userData,
        }
      ).then((data) => data.json());

      if (postDataResult.others) {
        const notify = () =>
          toast.success("Profile updated", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        notify();
        dispatch({ type: "USER_FETCHED", payload: postDataResult.others });
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
      <div className="wrapper w-full p-6">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="parent">
            <div className="profile_image_div">
              <div className="m-2 author flex items-center space-x-2">
                <div className="author_image ">
                  <img
                    className="border-[#7f8da1] border-[1px] h-12 w-12 xs:h-16 xs:w-16 sm:h-20 sm:w-20 rounded-full "
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : `${process.env.REACT_APP_SERVER_URL}${user.userImage}`
                    }
                    alt="author pfp"
                  />
                </div>
                <div className="add_icon ">
                  <label htmlFor="file_input">
                    <PlusCircleIcon className="h-10 w-10 text-red-500 hover:md:cursor-pointer" />
                  </label>
                  <input
                    ref={imageRef}
                    className="hidden bg-transparent "
                    type="file"
                    name="file_input"
                    id="file_input"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <div className="user_name_div flex flex-col mt-6     space-y-2">
              <label
                htmlFor="user_name"
                className="text-indigo-500 font-Pacifico text-xl"
              >
                Username
              </label>
              <input
                ref={usernameRef}
                className="text-[#8996d4] text-xl bg-transparent
                border-b-2 border-[#008080] outline-none focus:border-red-500
                rounded-lg h-10"
                type="text"
                name="user_name"
                id="user_name"
              />
            </div>
            <div className="user_email flex flex-col mt-6     space-y-2">
              <label
                htmlFor="user_email"
                className="text-indigo-500 font-Pacifico text-xl"
              >
                Email
              </label>
              <input
                ref={emailRef}
                className="text-[#8996d4] text-xl bg-transparent border-b-2 border-[#008080] outline-none focus:border-red-500 rounded-lg h-10"
                type="email"
                name="user_email"
                id="user_email"
              />
            </div>
            <div className="relative user_password flex flex-col mt-6     space-y-2">
              <label
                htmlFor="user_password"
                className="text-indigo-500   font-Pacifico text-xl"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                className="text-[#8996d4] text-xl bg-transparent border-b-2 border-[#008080] outline-none focus:border-red-500 rounded-lg h-10"
                type={type}
                name="user_password"
                id="user_password"
              />
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
            <div className="button_div flex justify-center mt-4">
              <button
                className="bg-gradient-to-r from-indigo-500 to-pink-500  text-black font-bold h-12 w-16 rounded-xl "
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Usercomponent;
