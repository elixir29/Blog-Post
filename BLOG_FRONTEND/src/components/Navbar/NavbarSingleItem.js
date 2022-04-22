function NavbarSingleItem({ Icon, title }) {
  return (
    <div className=" text-[#fca5a5] flex md:flex-col md:items-center w-auto md:w-14  group hover:text-pink-400 hover:cursor-pointer ">
      <Icon className="h-8 sm:h-12 group-hover:animate-bounce" />
      <p className="font-Indie text-red-500 text-xl  md:tracking-widest opacity-100 md:opacity-0 group-hover:opacity-100 mx-5 mt-3 md:mx-0 md:mt-0">
        {title}
      </p>
    </div>
  );
}

export default NavbarSingleItem;
