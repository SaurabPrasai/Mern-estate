import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/slice/userSlice";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/sign-in')
    } catch (error) {
      dispatch(signInFailure(data.message))
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
        />
        <button
          className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : " Sign up"}
        </button>
        <OAuth/>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
}
