import Typewriter from "typewriter-effect";
function Topbar() {
  return (
    <>
      <div className="text-center ">
        <div className="ml-4  font-Pacifico  text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 via-pink-500    to-purple-500 text-3xl  xs:text-4xl sm:text-7xl lg:text-9xl ">
          Blog Point
          <div className="font-Rubik  text-transparent bg-clip-text bg-gradient-to-l from-indigo-500  to-pink-500">
            <Typewriter
              options={{
                strings: ["Express", "Explore", "Learn", "Connect"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
