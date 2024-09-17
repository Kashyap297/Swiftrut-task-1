import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.role);
      // Redirect to home or dashboard
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div class="fixed bottom-6 right-6 z-50" x-data="scrollToTop">
        <template x-if="showTopButton">
          <button
            type="button"
            class="btn btn-outline-primary animate-pulse rounded-full p-2"
          >
            <svg
              width="24"
              height="24"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z"
                fill="currentColor"
              />
              <path
                d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </template>
      </div>

      <div class="main-container min-h-screen text-black dark:text-white-dark">
        <div class="flex min-h-screen items-center justify-center bg-[url('../images/map.svg')] bg-cover bg-center dark:bg-[url('../images/map-dark.svg')]">
          <div class="panel m-6 w-full max-w-lg sm:w-[480px]">
            <h2 class="mb-3 text-2xl font-bold">Sign In</h2>
            <p class="mb-7">Enter your Username and password to login</p>
            <form class="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label for="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter Username"
                />
              </div>
              <div>
                <label for="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" class="btn btn-primary w-full">
                SIGN IN
              </button>
            </form>
            {message && (
              <p className="mt-4 text-red-500 text-center">{message}</p>
            )}
            <p class="text-center mt-5">
              New Account ?{" "}
              <Link
                to="/register"
                className="font-bold text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
