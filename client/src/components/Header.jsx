import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className=" bg-slate-200 shadow-md">
      <div className=" flex justify-between items-center max-w-6xl  mx-auto p-3">
        {/* logo */}
        <Link to={"/"}>
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
            <span className=" text-slate-500">Saurab</span>
            <span className=" text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* searchbar */}
        <form className=" bg-slate-100 p-3 rounded-lg flex justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className=" text-slate-500" />
        </form>

        {/* menu */}
        <ul className=" flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                src={currentUser.avatar}
                alt="profile"
                className=" rounded-full h-7 w-7 object-cover"
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <li className="sm:inline text-slate-700 hover:underline">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
