import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signout() {
  const [formData, setFormData] = useState({});
  const [error, SetError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      SetLoading(true);
      const res = await fetch("/api/auth/signup", {
        // The fetch call triggers the app.use("/api/auth",authRouter) from the index.js in the api side.
        //It send a POST request with a content type header and a body. The body is a strigified json data which in our case is formData that we took as a state.

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); //data is used to extract an error message if the request was not successful (i.e., res.ok is false).
      // If there is an error, it throws an error with the message from data.
      // This error is then caught in the catch block, where SetError is called with the message from the error,
      //allowing it to be displayed to the user. If there is no error, it implies the operation was successful,
      // and the navigation to the sign-in route is triggered.
      console.log(data);
      if (data.success === false) {
        SetLoading(false);
        SetError(data.message);
        return;
      }
      SetLoading(false);
      SetError(null);

      navigate("/sign-in");
    } catch (error) {
      // Set the error message from the catch block
      SetError(error.message);
      SetLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
