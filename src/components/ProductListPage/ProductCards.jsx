import { faBorderAll, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "./Product";
import Brands from "../Repetitive/Brands";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useQueryParams from "../../hooks/useQueryParams";
import * as fetchTypes from "../../store/actions/fetchStatesTypes";
import {
  addMoreProducts,
  fetchProducts,
} from "../../store/actions/productAction/productAction";
import { Spinner } from "@material-tailwind/react";

// Dışa aktarılan sabitler
const sortingOptions = [
  { value: "", label: "Popularity" },
  { value: "price:desc", label: "Highest Price" },
  { value: "price:asc", label: "Lowest Price" },
  { value: "rating:asc", label: "Lowest Rating" },
  { value: "rating:desc", label: "Highest Rating" },
];

export default function ProductCards() {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.global.categories);
  const products = useSelector((store) => store.products);

  const { gender, category } = useParams();
  const { totalProductCount, productList, fetchState } = products;
  const { register, handleSubmit } = useForm();

  const [queryParams, setQueryParams] = useQueryParams({
    filter: "",
    sort: "",
  });

  //infinite scroll parameters, default 25 ürün

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const infiniteScrollParams = {
    limit: 25,
    offset: offset,
  };

  const [searchTerm, setSearchTerm] = useState(queryParams.filter || "");
  const [sortTerm, setSortTerm] = useState(queryParams.sort || "");

  //filter submit

  const onSubmit = (data) => {
    setOffset(0);
    setQueryParams({
      ...data,
      filter: data.filter,
    });
    setSearchTerm(data.filter); // Arama terimini güncelle
    setSortTerm(data.sort); // Sıralama terimini güncelle
  };

  useEffect(() => {
    // URL parametrelerinden gelen değerlerle formu başlat
    const queryParamsFromUrl = {
      filter: queryParams.filter || "",
      sort: queryParams.sort || "",
    };

    // URL'den alınan arama ve sıralama terimlerini formda tut
    setQueryParams(queryParamsFromUrl);
    setSearchTerm(queryParamsFromUrl.filter);
    setSortTerm(queryParamsFromUrl.sort);
  }, [queryParams.filter, queryParams.sort]); // Sadece 'filter' ve 'sort' değiştiğinde çalışacak

  // kadınsa k erkekse e atanması için: (ilk karakter ataması)

  let categoryId;
  let genderCode;

  if ((gender, category)) {
    genderCode = gender[0];
    categoryId = categories.find(
      (c) => c.code == `${genderCode}:${category}`
    )?.id;
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        ...queryParams,
        limit: infiniteScrollParams.limit,
        offset: offset,
        category: categoryId,
        sort: queryParams.sort,
      })
    );
  }, [queryParams, categoryId]);

  
  //25erli gruplarla renderlama
  
  const nextProducts = () => {
    let lastLimit = Math.min(25, totalProductCount - productList.length);

    if (lastLimit > 0) {
      dispatch(
        addMoreProducts({
          ...queryParams,
          limit: lastLimit,
          offset: offset + 25,
          category: categoryId,
        })
      );
      setOffset(offset + 25);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (totalProductCount && productList.length >= totalProductCount) {
      setOffset(0);
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [totalProductCount, productList.length]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="mt-5">
        <div className="flex max-w-screen-2xl justify-between mx-auto mb-10 sm:flex-col sm:justify-center sm:text-center sm:gap-6">
          <p className="text-lighterDark font-bold pt-2">Showing all results</p>
          <div className="flex gap-2 sm:justify-center sm:text-center sm:gap-4">
            <p className="text-lighterDark text-sm font-bold pt-2">
              Views:
            </p>
            <FontAwesomeIcon
              icon={faBorderAll}
              className="text-darkText p-2 border rounded cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faListCheck}
              className="text-darkText p-2 border rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-3 sm:justify-center sm:text-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-3"
            >
            <input type="search" placeholder="Search" {...register("filter", {})}  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className="bg-white input input-bordered p-2 w-full text-lighterDark text-sm font-semibold" />
              <select
                {...register("sort", {})}
                className="select w-full text-sm p-2"
                value={sortTerm}
                onChange={(e) => setSortTerm(e.target.value)}
              >
                <option
                  className="text-lighterDark text-sm"
                  value=""
                >
                  Popularity
                </option>
                <option
                  className="text-lighterDark text-sm font-semibold"
                  value="price:desc"
                >
                  Highest Price
                </option>

                <option
                  className="text-lighterDark text-sm font-semibold"
                  value="price:asc"
                >
                  Lowest Price
                </option>

                <option
                  className="text-lighterDark text-sm font-semibold"
                  value="rating:asc"
                >
                  Lowest Rating
                </option>
                <option
                  className="text-lighterDark text-sm font-semibold"
                  value="rating:desc"
                >
                  Highest Rating
                </option>
              </select>
              <button
                type="submit"
                className="bg-navBlue px-4 py-2 text-white text-sm font-bold rounded"
              >
                {" "}
                Filter
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mx-auto">
        {fetchState === fetchTypes.FETCHED && (
          <InfiniteScroll
            dataLength={productList.length && 0}
            next={nextProducts}
            hasMore={hasMore}
            endMessage={
              <p className="text-center p-4 text-lighterDark text-lg font-semibold">
                Products not found.
              </p>
            }
            className="flex flex-col overflow-hidden h-full pt-4"
          >
            <Product products={productList} />
          </InfiniteScroll>
        )}
        {fetchState === fetchTypes.FETCHING && (
          <>
            <p className="text-center p-4 text-lighterDark text-lg font-semibold">
              Products not found.
            </p>
            <Spinner className="mx-auto text-navBlue" />
          </>
        )}
      </div>

      <Brands />
    </div>
  );
}
