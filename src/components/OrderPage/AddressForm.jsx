import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getDistrictsOfEachCity,
  getCityNames,
  getNeighbourhoodsByCityCodeAndDistrict,
  getCityCodes,
} from "turkey-neighbourhoods";
import { useDispatch } from "react-redux";
import {
  setAddressThunkAction,
  updateAddressThunkAction,
} from "../../store/actions/orderAction/orderAction";
import axiosInstance from "../../api/axiosInstance";

export default function AddressForm({ address, closeModal, onSubmitCallback }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
      address: "",
    },
    mode: "onChange",
  });

  const cities = getCityNames();
  const districts = getDistrictsOfEachCity();
  const codes = getCityCodes();
  const [districtsOfCity, setDistrictsOfCity] = useState([districts[""]]);
  const [cityCode, setCityCode] = useState("");
  const [neighborhood, setNeighborhood] = useState([""]);

  const addressInfo = {};
  cities.forEach((city, i) => {
    addressInfo[codes[i]] = city;
  });

  const dispatch = useDispatch();

  //modal submit ayarlaması

  const onFormSubmit = (formData) => {
    const cityName = addressInfo[formData.city];
    const postData = {
      title: formData.title,
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      address: formData.address,
      city: cityName,
      district: formData.district,
      neighborhood: formData.neighborhood,
    };
  
    if (address && address.id) {
      const updatedFormData = {
        ...address,
        ...postData,
      };
      dispatch(updateAddressThunkAction(updatedFormData));
    } else {
      axiosInstance
        .post("/user/address", postData, {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          const newAddress = res.data;
  
          // Update local storage with the new address
          const storedAddresses =
            JSON.parse(localStorage.getItem("addresses")) || [];
          localStorage.setItem(
            "addresses",
            JSON.stringify([...storedAddresses, newAddress])
          );
  
          // Dispatch the action to update the address in the Redux store
          dispatch(setAddressThunkAction(newAddress));
  
          // Close the modal by calling the provided callback function
          closeModal();
  
          // Notify the parent component (OrderPage) about the form submission
          onSubmitCallback();
        })
        .catch((err) => console.log(err));
    }
  };
  
  useEffect(() => {
    setValue("title", address?.title || "");
    setValue("name", address?.name || "");
    setValue("surname", address?.surname || "");
    setValue("phone", address?.phone || "");
    setValue("city", address?.city || "");
    setValue("district", address?.district || "");
    setValue("neighborhood", address?.neighborhood || "");
    setValue("address", address?.address || "");
  }, [address, setValue]);

  const cityHandler = (e) => {
    const value = e.target.value;
    setCityCode(value);
    setDistrictsOfCity(districts[value]);
  };

  const districtHandler = (e) => {
    const selectedDistrict = e.target.value;
    const neighborhoods = getNeighbourhoodsByCityCodeAndDistrict(
      cityCode,
      selectedDistrict
    );

    // Mahalleleri alfabetik sıraya göre sırala
    const sortedNeighborhoods = neighborhoods.sort((a, b) =>
      a.localeCompare(b)
    );

    if (sortedNeighborhoods) {
      setNeighborhood(sortedNeighborhoods);
    } else {
      console.error("Error! Neighborhood's data not found.");
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <div className="form-card m-auto py-2">
      <div className="form-container">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col w-full">
            <div className=" flex flex-col ">
              <label className="font-bold text-lg pb-2">Address Title</label>
              <input
                autoFocus
                placeholder="Address Title"
                className="p-2 rounded-md border-2 text-darkText"
                {...register("title")}
              />
            </div>
          </div>
          <div className="flex justify-between gap-1">
            <div className=" flex flex-col sm:w-2/3 w-full">
              <label className="font-bold text-lg pb-2">Name</label>
              <input
                placeholder="Name"
                className="p-2 rounded-md border-2 text-darkText"
                type="text"
                {...register("name", {
                  required: "Name is required!",
                  minLength: {
                    value: 3,
                    message: "At least 3 char",
                  },
                })}
                invalid={errors.name?.message}
              />
              <span className="text-red-600">{errors.name?.message}</span>
            </div>
            <div className=" flex flex-col sm:w-2/3 w-full">
              <label className="font-bold text-lg pb-2">Surname</label>
              <input
                placeholder="Surname"
                className="p-2 rounded-md border-2 text-darkText"
                type="text"
                {...register("surname", {
                  required: "Surname is required!",
                  minLength: {
                    value: 3,
                    message: "At least 3 char",
                  },
                })}
                invalid={errors.surname?.message}
              />
              <span className="text-red-600">{errors.surname?.message}</span>
            </div>
          </div>

          <div className="flex justify-between gap-1">
            <div className=" flex flex-col w-full ">
              <label className="font-bold text-lg pb-2">Phone</label>
              <input
                placeholder="543 333 22 11"
                className={`p-2 rounded-md border-2 text-darkText`}
                type="text"
                {...register("phone", {
                  required: "Phone number is required.",
                  maxLength: {
                    value: 10,
                    message: "Must be at most 10 characters",
                  },
                })}
              />
              <div className="text-red-600 invalid-feedback">
                {errors.phone?.message}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label className="font-bold text-lg pb-2 pl-2">City</label>
              <select
                className="w-[300px] rounded-md border-2 text-darkText h-[44px]"
                {...register("city")}
                onChange={cityHandler}
              >
                {codes?.map((code, i) => (
                  <option
                    key={i}
                    value={code}
                    id={code}
                    className="w-[300px] text-lg font-bold"
                  >
                    {addressInfo[code]}
                  </option>
                ))}
              </select>
              <div className="text-red-600">{errors.city?.message}</div>
            </div>
          </div>

          <div className="flex justify-between gap-1">
            <div className="w-full flex flex-col ">
              <label className="font-bold text-lg pt-3 pb-2">District</label>
              <select
                className="w-[250px] p-2 rounded-md border-2 text-darkText"
                {...register("district")}
                onChange={districtHandler}
                defaultValue={address?.district || ""} // Set the default value
              >
                {districtsOfCity?.map((district, i) => (
                  <option
                    key={i}
                    value={district}
                    className="w-[250px] text-lg font-bold"
                  >
                    {district}
                  </option>
                ))}
              </select>
              <div className="text-red-600">{errors.district?.message}</div>
            </div>
            <div className="sm:w-2/3 w-full flex flex-col ">
              <label className="font-bold text-lg pt-3 pb-2">Neighborhood</label>
              <select
                placeholder="Neighborhood"
                className="w-[340px] p-2 rounded-md border-2 text-darkText"
                {...register("neighborhood")}
                defaultValue={address?.neighborhood || ""} // Set the default value
              >
                {neighborhood?.map((n, i) => (
                  <option
                    key={i}
                    value={n}
                    className="w-[330px] text-lg font-bold"
                  >
                    {n}
                  </option>
                ))}
              </select>
              <div className="text-red-600">{errors.neighborhood?.message}</div>
            </div>
          </div>

          <div className="w-full flex flex-col ">
            <label className="font-bold text-lg pt-3 pb-2">Address</label>
            <input
              type="text"
              placeholder="Address"
              className="p-4 rounded-md border-2 text-darkText"
              {...register("address", {
                required: "Address is required!",
              })}
              invalid={errors.address?.message}
            />
            <div className="text-red-600">{errors.address?.message}</div>
          </div>

          <button
            className="flex justify-center hover:text-navBlue bg-navBlue text-white px-6 py-3 rounded-md text-lg  mt-6 hover:bg-darkText cursor-pointer text-center"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
