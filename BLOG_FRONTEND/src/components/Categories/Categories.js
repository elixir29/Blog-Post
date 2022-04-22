import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHorizontalScroll } from "./scrollHelper";

function Categories({ categories }) {
  const { search } = useLocation();
  const currentSelected = search.split("=");
  const scrollRef = useHorizontalScroll();
  return (
    <>
      <div className="mx-6">
        <div
          ref={scrollRef}
          className="tags mt-2 mb-2 space-x-4 flex overflow-x-auto scrollbar-hide"
        >
          {categories.map((item, idx) => (
            <Link key={idx} to={`/?categories=${item.name}`}>
              <p
                key={idx}
                className={`hover:cursor-pointer p-2 ${
                  currentSelected[0] === "?categories" &&
                  currentSelected[1] === item.name
                    ? `bg-gradient-to-r from-pink-600 to-purple-600`
                    : `bg-gradient-to-r from-pink-300 to-purple-300`
                } rounded-xl text-black font-bold font-Indie`}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
