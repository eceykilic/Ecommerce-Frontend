import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCardsThunkAction } from "../../store/actions/orderAction/orderAction";

const CardForm = ({ closeModal}) => {
  const dispatch = useDispatch();

  const [cardInfo, setCardInfo] = useState({
    cardName: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    // Kart ismi doğrulaması
    if (cardInfo.cardName.trim() === "") {
      setErrorMessage("Kart ismi boş bırakılamaz.");
      return;
    }

    // Kart numarası doğrulaması
    if (cardInfo.cardNumber.length !== 16 || isNaN(cardInfo.cardNumber)) {
      setErrorMessage("Kart numarası 16 haneli olmalıdır ve sadece rakamlardan oluşmalıdır.");
      return;
    }

    // Ay ve yıl doğrulaması
    const currentYear = new Date().getFullYear();
    if (parseInt(cardInfo.expirationYear) < currentYear || parseInt(cardInfo.expirationYear) > currentYear + 10) {
      setErrorMessage("Geçerli bir son kullanma tarihi seçiniz.");
      return;
    }

    // Kart bilgilerini Redux store'a ekle
    dispatch(addCardsThunkAction({
      card_no: cardInfo.cardNumber,
      expire_month: cardInfo.expirationMonth,
      expire_year: cardInfo.expirationYear,
      name_on_card: cardInfo.cardName
    }));

    closeModal();
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <input
          type="text"
          name="cardName"
          value={cardInfo.cardName}
          onChange={handleChange}
          placeholder="Card Name"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <input
          type="text"
          name="cardNumber"
          value={cardInfo.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <div className="flex mb-3">
          <select
            name="expirationMonth"
            value={cardInfo.expirationMonth}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded-md py-2 px-3 mr-2"
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            name="expirationYear"
            value={cardInfo.expirationYear}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="cvv"
          value={cardInfo.cvv}
          onChange={handleChange}
          placeholder="CVV"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default CardForm;
