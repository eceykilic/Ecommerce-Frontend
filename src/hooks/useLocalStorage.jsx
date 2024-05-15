import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        
        // başlangıç değerini ayarladık useState ile:
        const item = localStorage.getItem(key);
        if (item) {

            // json parse ile json formatına çevrilmeye çalışılır (try) dönüşemezse initial dönüşürse bu veri kullanılır.
            try {
                return JSON.parse(item);
            } catch (e) {
                return item;
            }
        } else return initialValue;
    });
    const setValue = (value) => {
        //soredValue güncellenir ve güncellenmiş değer localde kaydedilir.
        setStoredValue(value);
        if (

            // string number veya boolean ise direkt kaydet
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            localStorage.setItem(key, value);
        } else {
            //değil ise (nesne veya obje ise) stringe dönüştür kaydet
            localStorage.setItem(key, JSON.stringify(value));
        }
    };
    return [storedValue, setValue];
};

export default useLocalStorage;