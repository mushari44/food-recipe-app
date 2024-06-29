import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { globalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(globalContext);
  return (
    <>
      <div className="mb-9 p-5 bg-gradient-to-r from-black/50 via-black/75 to-black/50   ">
        <h2 className="text-5xl font-extrabold text-center text-white">
          <NavLink
            to={"/"}
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Food Recipe
          </NavLink>
        </h2>
      </div>
      <nav className="flex justify-center items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-10">
        <form onSubmit={handleSubmit} className="w-full flex justify-center">
          <input
            type="text"
            name="search"
            placeholder="Enter item.."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            className="lg:w-2/3 bg-black/75  p-3 px-8 rounded-full outline-none shadow-lg focus:shadow-xl transition duration-300"
          />
        </form>
        <ul className="flex gap-5">
          <li>
            <NavLink
              to={"/"}
              className="text-black hover:text-gray-700 transition duration-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/favorites"}
              className="text-black hover:text-gray-700 transition duration-300"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
