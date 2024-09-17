import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
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
        "http://localhost:8000/api/users/register",
        formData
      );
      setMessage(res.data.message); // Show success message
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message); // Show error message
    }
  };

  return (
    <>
      <div class="main-container min-h-screen text-black dark:text-white-dark">
        <div class="flex min-h-screen">
          <div class="hidden min-h-screen w-1/2 flex-col items-center justify-center bg-gradient-to-t from-[#ff1361bf] to-[#44107A] p-4 text-white dark:text-black lg:flex">
            <div class="mx-auto mb-5 w-full">
              <img
                src="assets/images/auth-cover.svg"
                alt="coming_soon"
                class="mx-auto lg:max-w-[370px] xl:max-w-[500px]"
              />
            </div>
            <h3 class="mb-4 text-center text-3xl font-bold">
              Join the community of expert developers
            </h3>
            <p>
              It is easy to setup with great customer experience. Start your
              7-day free trial
            </p>
          </div>
          <div class="relative flex w-full items-center justify-center lg:w-1/2">
            <div class="max-w-[480px] p-5 md:p-10">
              <h2 class="mb-3 text-3xl font-bold">Sign Up</h2>
              <p class="mb-7">Enter your email and password to register</p>
              <form class="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label for="name">Username</label>
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
                {/* <div>
                  <label class="cursor-pointer">
                    <input type="checkbox" class="form-checkbox" />
                    <span class="text-white-dark">
                      I agree the{" "}
                      <a
                        href="javascript:;"
                        class="text-primary hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </div> */}
                <button type="submit" class="btn btn-primary w-full">
                  SIGN UP
                </button>
              </form>
              {message && <p className="mt-4 text-center">{message}</p>}
              <div class="relative my-7 h-5 text-center before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                <div class="relative z-[1] inline-block bg-[#fafafa] px-2 font-bold text-white-dark dark:bg-[#060818]">
                  <span>OR</span>
                </div>
              </div>
              <ul class="mb-5 flex justify-center gap-2 sm:gap-5">
                <li>
                  <button
                    type="button"
                    class="btn flex gap-1 bg-white-dark/30 text-black shadow-none hover:bg-white dark:border-[#253b5c] dark:bg-transparent dark:text-white dark:hover:bg-[#1b2e4b] sm:gap-2"
                  >
                    Google
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="btn flex gap-1 bg-white-dark/30 text-black shadow-none hover:bg-white dark:border-[#253b5c] dark:bg-transparent dark:text-white dark:hover:bg-[#1b2e4b] sm:gap-2"
                  >
                    Github
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="btn flex gap-1 bg-white-dark/30 text-black shadow-none hover:bg-white dark:border-[#253b5c] dark:bg-transparent dark:text-white dark:hover:bg-[#1b2e4b] sm:gap-2"
                  >
                    Twitter
                  </button>
                </li>
              </ul>
              <p class="text-center">
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="font-bold text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
