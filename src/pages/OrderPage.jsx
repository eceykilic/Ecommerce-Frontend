import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faInfo,
  faMobileScreenButton,
  faPlus,
  faTrash,
  faUser,
  faChevronRight,
  faCalendarAlt,
  faCreditCard,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../api/axiosInstance";
import {
  removeAddressThunkAction,
  setAddress,
} from "../store/actions/orderAction/orderAction";
import AddressForm from "../components/OrderPage/AddressForm";
import OrderSum from "../components/Repetitive/OrderSum";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "../components/OrderPage/CardForm";
import {
  addCardsThunkAction,
  removeCardThunkAction,
} from "../store/actions/orderAction/orderAction";
import { clearShoppingCart } from "../store/actions/shoppingCart/shoppingCartActions";

export default function OrderPage() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.orderReducer.address);
  const token = localStorage.getItem("Token");
  const [defaultAdress, setDefaultAdress] = useState({});
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [option, setOption] = useState("address");
  const [isAgreed, setIsAgreed] = useState(false);
  const history = useHistory();
  const [orderTotal, setOrderTotal] = useState(0);
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [selectedInstallmentOption, setSelectedInstallmentOption] =
    useState("1");
  const cart = useSelector((store) => store.shoppingCart.cart);
  const shoppingCart = useSelector((store) => store.shoppingCart);
  const [selectedCardInfo, setSelectedCardInfo] = useState(1);

  const removeAddress = (id) => {
    dispatch(removeAddressThunkAction(id));
    console.log(id);
  };

  const editAddress = (address) => {
    setDefaultAdress(address);
    setIsAddressFormOpen(true);
  };

  const handleCheckboxChange = (checked, address) => {
    if (checked && address) {
      setDefaultAdress(address);
    } else {
      setDefaultAdress({});
    }
  };

  const handleCheckboxChange2 = (event) => {
    setIsAgreed(event.target.checked);
  };

  const optionSelect = (e) => {
    setOption(e);
  };

  const openAddress = () => {
    setDefaultAdress({});
    setIsAddressFormOpen(true);
  };

  const closeAddress = async () => {
    try {
      const res = await axiosInstance.get("/user/address", {
        headers: {
          Authorization: token,
        },
      });

      dispatch(setAddress(res.data));

      if (res.data.length > 0) {
        setDefaultAdress(res.data[0]);
      }
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setShouldCloseModal(true);
    }
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeAddress();
    }
  };

  const handleRemoveAddress = async (id) => {
    console.log("Removing address with ID:", id);
    if (window.confirm("Are you sure you want to delete this address?")) {
      await dispatch(removeAddressThunkAction(id));
      // Close the modal after removing the address
      setShouldCloseModal(true);
    }
  };

  //modal kapanma şartları

  const handleOutsideClick = (e) => {
    const modal = document.getElementById("addressFormModal");

    if (modal && !modal.contains(e.target)) {
      closeAddress();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeAddress();
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (shouldCloseModal) {
      setIsAddressFormOpen(false);
      setShouldCloseModal(false);
    }
  }, [shouldCloseModal]);

  // useEffect içinde token kontrolü
  useEffect(() => {
    // Token değeri kontrol ediliyor
    if (!token) {
      console.log("Token is missing or invalid. Redirecting to login page...");
    } else {
      // Token mevcut ve geçerli ise API çağrısı
      axiosInstance
        .get("/user/address", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          dispatch(setAddress(res.data));
          if (res.data.length > 0) {
            setDefaultAdress(res.data[0]);
          }
        })

        .catch((error) => {
          // API çağrısı hata durumu
          console.error("API call failed:", error);
        });
    }
  }, [token, dispatch]);

  const handleOrderTotalChange = (total) => {
    setOrderTotal(total);
  };

  //kart ekleme çıkarma işlemleri

  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleCloseModal = () => {
    setIsAddingCard(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/user/card", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setCards(res.data));
  }, [isAddingCard]); // Trigger the effect when isAddingCard changes

  const handleAddCard = (cardInfo) => {
    // Dispatch addCardsThunkAction to add the new card to the backend
    dispatch(addCardsThunkAction(cardInfo)).then(() => {
      // Fetch the updated list of cards after adding the new card
      axiosInstance
        .get("/user/card", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          // Update the cards state with the updated list of cards
          setCards(res.data);
          setIsAddingCard(false); // Close the modal after adding the card
        })
        .catch((error) => {
          console.error("Error fetching updated cards data:", error);
        });
    });
  };

  useEffect(() => {
    axiosInstance
      .get("/user/card", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setCards(res.data))
      .catch((error) => {
        console.error("Error fetching cards data:", error);
      });
  }, [token]);

  const handleRemoveCard = async (cardId) => {
    try {
      // Dispatch removeCardThunkAction to remove the card from the backend
      await dispatch(removeCardThunkAction(cardId));

      // After successful removal from backend, update local state to reflect the change
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error removing card:", error);
      // Handle error if needed
    }
  };

  const handlePaymentOptionChange = (cardId) => {
    setSelectedPaymentOption(cardId);
    const selectedCard = cards.find((card) => card.id === cardId);
    setSelectedCardInfo(selectedCard);
  };

  const handleInstallmentOptionChange = (option) => {
    setSelectedInstallmentOption(option);
  };

  const products = cart.map((item) => ({
    product_id: item.id,
    count: item.count,
    detail: item.name, // veya başka bir detay
  }));

  const { card_no, expire_month, expire_year, card_ccv } = selectedCardInfo;
  const handlePayment = async () => {
    try {
      // Sipariş verisi oluştur
      const orderData = {
        address_id: defaultAdress.id,
        order_date: new Date().toISOString(), // Şu anki tarih ve saat
        card_no: card_no,
        card_expire_month: expire_month,
        card_expire_year: expire_year,
        card_ccv: card_ccv,
        price: orderTotal,
        products: [...products],
      };

      // Siparişi oluşturmak için POST isteği gönder
      const response = await axiosInstance.post("/order", orderData, {
        headers: {
          Authorization: token,
        },
      });

      // Başarılı olup olmadığını kontrol etmek için response'ı kontrol edin
      console.log("Order created successfully:", response.data);

      // Sipariş oluşturulduktan sonra alışveriş sepetini boşaltabilirsiniz
      // dispatch(clearShoppingCart()); // Eğer bir clearShoppingCart action'ı kullanıyorsanız
      dispatch(clearShoppingCart());

      // Ödeme başarılı olduğunda kullanıcıyı başka bir sayfaya yönlendirebilirsiniz
      history.push("/checkout"); // Ödeme başarılı sayfasına yönlendirme
    } catch (error) {
      console.error("Error creating order:", error);
      // Hata durumunda kullanıcıya uygun bir mesaj gösterebilirsiniz
      // Hata durumunda alınabilecek diğer adımları da burada belirleyebilirsiniz
    }
  };

  return (
    <div className="">
      <div className="flex max-w-screen-2xl justify-between mx-auto mt-14 gap-10 mb-10">
        <div className="flex flex-col gap-8 w-[1200px]">
          <div className="flex justify-between">
            <div
              onClick={() => optionSelect("address")}
              className={`flex flex-col w-full gap-2 border-2 pr-10 ${
                option === "address"
                  ? "border-b-navBlue cursor-pointer bg-lightbg"
                  : "border-b-priceGray cursor-pointer"
              }`}
            >
              <h1 className="text-xl text-navBlue font-medium p-2">
                Shipping Address
              </h1>
              <div className="p-2">
                <p>
                  {defaultAdress?.name} {defaultAdress?.surname}
                </p>
                <p>
                  {defaultAdress?.address} {defaultAdress?.city}{" "}
                  {defaultAdress?.district}
                </p>
              </div>
            </div>
            <div
              onClick={() => optionSelect("payment")}
              className={`flex flex-col gap-2 border-2 w-full pr-10 ${
                option === "payment"
                  ? "border-b-navBlue cursor-pointer bg-lightbg"
                  : "border-b-priceGray cursor-pointer"
              }`}
            >
              <h1 className="text-xl text-navBlue font-medium p-2">
                Payment Methods
              </h1>
              <div className="p-2">
                <p>
                  <span className="font-bold text-darkText">
                    Banka/Kredi Kartı
                  </span>{" "}
                  veya{" "}
                  <span className="font-bold text-darkText">
                    Alışveriş Kredisi
                  </span>{" "}
                  ile ödemenizi güvenle yapabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${
              option === "payment" ? "hidden" : "flex"
            } w-full border-2 py-4 px-4 gap-5 items-center`}
          >
            <FontAwesomeIcon
              className="rounded-full text-white p-1 text-xs border-1 h-4 w-5 bg-navBlue"
              icon={faInfo}
            />
            <p>
              Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese
              Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı kurumsal
              fatura adresinizi seçin.
            </p>
          </div>
          {option === "address" && (
            <div className="flex flex-col border-2 p-5">
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Delivery Address</h1>
                <div className="flex gap-1">
                  <input type="checkbox" />
                  <label htmlFor="">Send my invoice to the same address</label>
                </div>
              </div>
              <div className="flex flex-col gap-2 py-4">
                <div
                  onClick={openAddress}
                  className="flex flex-col items-center gap-2 border-2 border-dashed border-navBlue rounded-md justify-center py-5 hover:bg-priceGray cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-navBlue text-xl"
                    icon={faPlus}
                  />
                  <h1 className="text-lg">Yeni Adres Ekle</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                  {address.map((item, index) => (
                    <div
                      key={index}
                      className="w-[48%] flex flex-col gap-5 p-3 mb-3"
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            checked={defaultAdress?.id === item.id}
                            onChange={(e) =>
                              handleCheckboxChange(e.target.checked, item)
                            }
                          />
                          <label htmlFor="">{item.title}</label>
                        </div>
                        <p
                          onClick={() => editAddress(item)}
                          className="text-sm underline cursor-pointer"
                        >
                          Düzenle
                        </p>
                      </div>
                      <div className="rounded-md flex flex-col gap-5 p-3 h-[150px] justify-center border-2">
                        <div className="flex justify-between">
                          <div className="flex gap-2">
                            <FontAwesomeIcon
                              className="text-navBlue pt-1"
                              icon={faUser}
                            />
                            <h2>
                              {item.name} {""}
                              {item.surname}
                            </h2>
                          </div>
                          <div className="flex gap-2">
                            <FontAwesomeIcon
                              className="text-navBlue"
                              icon={faMobileScreenButton}
                            />
                            <h2 className="text-sm">{item.phone}</h2>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <p>
                            {item.address}
                            <br />
                            {item.neighborhood} <br />
                            {item.district} {item.city}
                          </p>

                          <FontAwesomeIcon
                            onClick={() => handleRemoveAddress(item.id)}
                            className="h-4 w-4 text-lighterDark cursor-pointer pt-14"
                            icon={faTrash}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {option === "payment" && (
            <>
              <div className="flex flex-col border-2 p-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 flex-col">
                    <div className="flex gap-2">
                      <input type="radio" className="w-4" />
                      <h2 className="text-lg font-semibold">Kart ile Öde</h2>
                    </div>
                    <p className="text-md">
                      Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı
                      kullanarak ödemenizi güvenle yapabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-10 p-3 border-2">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium ml-3">Kart Bilgileri</h3>
                    <h4
                      className="text-sm underline pt-1 cursor-pointer"
                      onClick={handleAddCardClick}
                    >
                      Başka bir Kart ile Ödeme Yap
                    </h4>
                  </div>
                  <div>
                    <div className="flex flex-wrap justify-between">
                      {cards.map((card, index) => (
                        <div
                          key={card.id}
                          className="flex flex-col gap-2 p-3 mb-3"
                        >
                          <div className="flex gap-3">
                            <input
                              type="radio"
                              name="selectedCard"
                              className="form-radio"
                              value="card"
                              checked={selectedPaymentOption === card.id}
                              onChange={() =>
                                handlePaymentOptionChange(card.id)
                              }
                            />
                            <span className="text-darkText">
                              {card.name_on_card}
                            </span>
                          </div>
                          <div className="rounded-md flex flex-col h-[180px] w-[350px] justify-center border-2">
                            <div className="flex justify-between pr-4 pl-2">
                              <img
                                src="/creditcard/bonus.jpg"
                                alt=""
                                className="w-20 h-10"
                              />
                              <img
                                src="/creditcard/card.png"
                                alt=""
                                className="w-10 h-10"
                              />
                            </div>
                            <div className="flex flex-col text-right pt-12 pr-4">
                              <p>{card.card_no}</p>
                              <p>
                                {card.expire_month}/{card.expire_year}
                              </p>
                            </div>
                            <div className="pl-4 pb-1 flex gap-2">
                              <FontAwesomeIcon
                                onClick={() => handleRemoveCard(card.id)}
                                className="h-4 w-4 text-lighterDark cursor-pointer pt-3"
                                icon={faTrash}
                              />
                              {/* }
                              <FontAwesomeIcon
                                className="h-4 w-4 text-lighterDark cursor-pointer pt-3"
                                icon={faPenToSquare}
                              />
                      {*/}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Taksit Seçenekleri</h3>
                  <h4 className="text-sm">
                    Kartınıza uygun taksit seçeneğini seçiniz
                  </h4>
                  <div className="max-w-xl mx-auto pt-7 pr-4">
                    <table className="border-gray-200 border-2 rounded-full mx-auto w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border-b border-r py-2 px-4">
                            Taksit Sayısı
                          </th>
                          <th className="border-b py-2 px-4">Aylık Ödeme</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-b border-r py-2 px-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="taksit"
                                className="form-radio"
                                value="1"
                                checked={selectedInstallmentOption === "1"}
                                onChange={() =>
                                  handleInstallmentOptionChange("1")
                                }
                              />
                              <span className="ml-2">1 Taksit</span>
                            </label>
                          </td>
                          <td className="border-b py-2 px-10 border-r">
                            {orderTotal} $
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col border-2 p-4 max-w-[400px] h-[20%]">
          <div className="flex flex-col gap-4 ">
            <button
              onClick={handlePayment}
              className={`text-sm border-1 rounded-md py-2 px-5 ${
                !isAgreed
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-navBlue text-white"
              } `}
              disabled={!isAgreed}
            >
              Ödeme Yap <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="flex flex-col gap-3">
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="cursor-pointer w-8 h-8 mr-3 mb-8"
                  checked={isAgreed}
                  onChange={handleCheckboxChange2}
                />
                <label className="text-sm">
                  <span className="font-bold text-darkText underline cursor-pointer">
                    Ön Bilgilendirme Koşulları
                  </span>
                  'nı ve{" "}
                  <span className="font-bold text-darkText underline cursor-pointer">
                    Mesafeli Satış Sözleşmesi
                  </span>
                  'ni okudum,onaylıyorum.
                </label>
              </div>
            </div>

            <OrderSum onOrderTotalChange={handleOrderTotalChange} />
            <button
              onClick={handlePayment}
              className={`text-sm border-1 rounded-md py-2 px-5 ${
                !isAgreed
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-navBlue text-white"
              } `}
              disabled={!isAgreed}
            >
              Ödeme Yap <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      {isAddressFormOpen && (
        <div
          className="fixed inset-0 overflow-y-auto flex items-center justify-center modal-overlay"
          onClick={handleModalClick}
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg">
            <AddressForm
              address={defaultAdress}
              closeModal={closeAddress}
              onSubmitCallback={() => {
                setShouldCloseModal(true);
              }}
            />
          </div>
        </div>
      )}
      {isAddingCard && (
        <div className="modal">
          <div className="modal-content">
            <CardForm
              closeModal={handleCloseModal}
              handleAddCard={handleAddCard}
            />
          </div>
        </div>
      )}
    </div>
  );
}
