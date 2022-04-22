import { useContext, useRef, useState } from "react";
import {
  HomeIcon,
  PencilAltIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import NavbarSingleItem from "./NavbarSingleItem";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

function Navbar() {
  const { user, dispatch, theme } = useContext(Context);
  const ulRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    if (!isOpen) {
      ulRef.current.classList.remove("translate-x-full");
      ulRef.current.classList.add("translate-x-0");
      setIsOpen(true);
    } else {
      ulRef.current.classList.add("translate-x-full");
      ulRef.current.classList.remove("translate-x-0");
      setIsOpen(false);
    }
  };
  return (
    <header
      className=" fixed
    w-full
    flex
    justify-between
    items-center
    px-4
    md:px-12
    transition-all
    duration-200
    h-24  
    bg-[#231a1a9c]"
    >
      <Link to="/">
        <img className="h-12" src="/logo.svg" alt="logo" />
      </Link>
      <nav>
        <button className="md:hidden" onClick={handleClick}>
          <MenuIcon className="h-10 w-10 text-[#709c9c]" />
        </button>
        <ul
          ref={ulRef}
          className="
          fixed
          left-0
          right-0
          min-h-screen
          px-4
          pt-8
          space-y-12
          transform
          transition
          duration-300
          translate-x-full
          md:relative md:flex md:space-x-10 md:min-h-0 md:px-0 md:py-0 md:space-y-0 md:translate-x-0
        bg-[#231a1a9c]
        md:bg-transparent
        "
        >
          <li onClick={() => handleClick()}>
            <Link to="/">
              <NavbarSingleItem Icon={HomeIcon} title={"Home"} />
            </Link>
          </li>
          <li onClick={() => handleClick()}>
            {user && (
              <Link to="/blog/new">
                <NavbarSingleItem Icon={PencilAltIcon} title={"Write"} />
              </Link>
            )}
          </li>
          <li onClick={() => handleClick()}>
            {user ? (
              <Link to="/login" onClick={() => dispatch({ type: "LOGOUT" })}>
                <NavbarSingleItem Icon={LogoutIcon} title={"Logout"} />
              </Link>
            ) : (
              <Link to="/login">
                <NavbarSingleItem Icon={LoginIcon} title={"Login"} />
              </Link>
            )}
          </li>
          <li onClick={() => handleClick()}>
            {theme === true ? (
              <div onClick={() => dispatch({ type: "LIGHTMODE" })}>
                <NavbarSingleItem Icon={SunIcon} title={"Light"} />
              </div>
            ) : (
              <div onClick={() => dispatch({ type: "DARKMODE" })}>
                <NavbarSingleItem Icon={MoonIcon} title={"Dark"} />
              </div>
            )}
          </li>
          <li onClick={() => handleClick()}>
            {user && (
              <Link to="/user">
                <img
                  className="border-[#fca5a5] border-2 h-12 w-12 sm:h-20 sm:w-20  rounded-full cursor-pointer hover:animate-pulse "
                  src={`${process.env.REACT_APP_SERVER_URL}${user.userImage}`}
                  alt="pfp"
                />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
