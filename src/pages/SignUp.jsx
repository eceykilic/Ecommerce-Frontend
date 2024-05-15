import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  signUpUser,
  userSuccess,
  userFailure,
} from "../store/actions/userAction/userAction";
import { updateRoles } from "../store/actions/globalAction/globalAction"

const SignUp = () => {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.global.roles);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onBlur" });
  const history = useHistory();

  useEffect(() => {
    dispatch(updateRoles()); // updateRoles fonksiyonunu kullanarak rolleri güncelle
  }, [dispatch]);

  const onSubmit = (data) => {
    setLoading(true);

    let userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role === "admin" ? 0 : 2,
    };

    if (data.role.toLowerCase() === "store") {
      userData = {
        ...userData,
        role_id: 1,
        store: {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxNumber,
          bank_account: data.storeIBAN,
        },
      };
    }

    dispatch(signUpUser(userData, history, handleSuccess, handleFailure));
  };

  const handleSuccess = (response) => {
    setLoading(false);

    setTimeout(() => {
      history.goBack();
    }, 5000);
  };

  const handleFailure = (error) => {
    setLoading(false);

    console.error("Error signing up:", error);
  };

  return (
    <>
      <div className="flex my-20 max-w-screen-2xl mx-auto justify-center">
        <div className="max-w-md w-full flex flex-col gap-10">
          <div className="text-center">
            <h2 className=" text-3xl font-bold text-darkText"> Welcome!</h2>
            <p className="text-sm  text-darkText">
              Please create your account to sign up
            </p>
          </div>
          <form
            className=" flex flex-col gap-8 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
              >
                Full Name
              </label>
              <input
                id="name"
                className=" bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: { value: true, message: "Full name is required" },
                  minLength: {
                    value: 3,
                    message: "You must enter at least 3 characters",
                  },
                  maxLength: {
                    value: 35,
                    message: "You can enter up to 35 characters.",
                  },
                })}
              />
              {errors["name"] && (
                <p
                  role="alert"
                  className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                >
                  {errors["name"]?.message}
                </p>
              )}
            </div>
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
                className="bg-white w-full content-center text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Password cannot be longer than 30 characters.",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).+$/,
                    message:
                      "Password must contain at least one number, one lower case letter, one upper case letter and a special character.",
                  },
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
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                className="bg-white w-full content-center text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                type="password"
                placeholder="Enter your password"
                {...register("passwordConfirmation", {
                  validate: (fieldValue) => {
                    return (
                      watch("password") === fieldValue ||
                      "Password does not match."
                    );
                  },
                })}
              />
              {errors["passwordConfirmation"] && (
                <p
                  role="alert"
                  className=" text-sm font-bold text-red-600 tracking-wide"
                >
                  {errors["passwordConfirmation"]?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
              >
                Role
              </label>

              <select
                id="role"
                value={watch("role") || "customer"}
                {...register("role")}
                className="bg-white w-1/2 content-center text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
              >
                <option
                  key={3}
                  value={"customer"}
                  defaultValue={"customer"}
                  className="bg-white"
                >
                  Customer
                </option>
                {roles &&
                  roles.map(
                    (role) =>
                      role.code !== "customer" && (
                        <option
                          key={role.id}
                          value={role.code}
                          className="bg-white"
                        >
                          {role.code.charAt(0).toUpperCase() +
                            role.code.slice(1)}
                        </option>
                      )
                  )}
              </select>

              {watch("role")?.toLowerCase() === "store" && (
                <>
                  <div className="flex flex-col gap-8 mt-8">
                    <div>
                      <label
                        htmlFor="storeName"
                        className="ml-1  text-sm font-bold text-lighterDark tracking-wide"
                      >
                        Store Name
                      </label>
                      <input
                        id="storeName"
                        className=" bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                        type="text"
                        placeholder="Enter your store name"
                        {...register("storeName", {
                          required: {
                            value: true,
                            message: "Store name is required",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "Store Name should be at least 3 characters long",
                          },
                          maxLength: {
                            value: 35,
                            message:
                              "Store Name cannot be longer than 30 characters.",
                          },
                        })}
                      />
                      {errors["storeName"] && (
                        <p
                          role="alert"
                          className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                        >
                          {errors["storeName"]?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="storePhone"
                        className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
                      >
                        Store Phone
                      </label>
                      <input
                        id="storePhone"
                        className="bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                        type="tel"
                        placeholder="Enter your store phone | +90XXXXXXXXXX"
                        {...register("storePhone", {
                          required: {
                            value: true,
                            message: "Store phone is required",
                          },
                          pattern: {
                            value:
                              /^((\+|00)90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                      {errors["storePhone"] && (
                        <p
                          role="alert"
                          className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                        >
                          {errors["storePhone"]?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="storeTaxNumber"
                        className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
                      >
                        Store Tax Number
                      </label>
                      <input
                        id="storeTaxNumber"
                        className="bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                        type="text"
                        placeholder="Enter your store tax number | TXXXXVXXXXXX"
                        {...register("storeTaxNumber", {
                          required: {
                            value: true,
                            message: "Store tax number is required",
                          },
                          pattern: {
                            value: /^T\d{4}V\d{6}$/,
                            message: "Invalid tax number",
                          },
                        })}
                      />
                      {errors["storeTaxNumber"] && (
                        <p
                          role="alert"
                          className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                        >
                          {errors["storeTaxNumber"]?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="storeIBAN"
                        className="ml-1 text-sm font-bold text-lighterDark tracking-wide"
                      >
                        Store IBAN:
                      </label>
                      <input
                        id="storeIBAN"
                        className="bg-white w-full text-base px-4 py-2 border-2 border-priceGray rounded-md focus:outline-none focus:border-navBlue"
                        type="text"
                        placeholder="Enter your store IBAN | TRXXXXXXXXXXXXXXXXXXXXXXXX"
                        {...register("storeIBAN", {
                          required: {
                            value: true,
                            message: "Store IBAN is required",
                          },
                          pattern: {
                            value:
                              /^TR\d{2}\s?(\d{4}\s?){1}(\d{1})(\d{3}\s?)(\d{4}\s?){3}(\d{2})\s?$/,
                            message: "Invalid IBAN",
                          },
                        })}
                      />
                      {errors["storeIBAN"] && (
                        <p
                          role="alert"
                          className="ml-1 mt-1 text-sm font-bold text-red-600 tracking-wide"
                        >
                          {errors["storeIBAN"]?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full flex justify-center text-2xl p-3 rounded-full tracking-wide font-semibold cursor-pointer relative ${
                  !isValid || loading
                    ? "bg-gray-300 text-gray-500"
                    : "bg-navBlue text-white"
                }`}
              >
                Sign up
                {loading && <Spinner color="white" size="small" className="" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
