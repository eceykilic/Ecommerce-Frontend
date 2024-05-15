import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/userAction/userAction';
import useLocalStorage from '../hooks/useLocalStorage';


export default function LoginForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onBlur" });
    const history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useLocalStorage("Token", "");
    
    const onSubmit = (userData) => {
        dispatch(loginUser(userData,history,setToken));
    }


  
  
    return (
    <div>
      <div className="flex my-20 max-w-screen-2xl mx-auto justify-center">
        <div className="max-w-md w-full flex flex-col gap-10">
          <div className="text-center">
            <h2 className=" text-3xl font-bold text-darkText"> Welcome!</h2>
            <p className="text-sm  text-darkText">
              Please log into your account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="false" />
            <div>
              <label
                htmlFor="email"
                className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
              >
                Email
              </label>
              <input
                autoComplete="true"
                id="email"
                className=" bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                type="email"
                placeholder="Enter your mail"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  minLength: {
                    value: 15,
                    message: "Email must be at least 15 characters long.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Email can not be longer than 100 characters.",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors["email"] && (
                <p
                  role="alert"
                  className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                >
                  {errors["email"]?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                className=" bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
              />
              {errors["password"] && (
                <p
                  role="alert"
                  className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                >
                  {errors["password"]?.message}
                </p>
              )}
            </div>
            {/*}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className=" h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-indigo-400 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
              {*/}
            <div>
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full flex justify-center text-2xl p-3 rounded-full tracking-wide font-semibold cursor-pointer relative ${
                    !isValid 
                      ? "bg-gray-300 text-gray-500"
                      : "bg-navBlue text-white"
                  }`}
              >
                Login
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Don't have an account?</span>
              <Link
                to="/signup"
                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
