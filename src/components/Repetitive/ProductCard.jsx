import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductCard(props) {
    const categories = useSelector((store) => store.global.categories);
    const history = useHistory();
    const { name, price, images, description, sell_count, category_id, id } = props.data;
    const priceWithoutDiscount = price + (price * 0.3);
    const image = images.length ? images[0].url : ""
    const nameSlug = name.toLowerCase().replaceAll(" ", "-");
    const catCode = categories.find(
        (c) => c.id == category_id
    )?.code;
    const gender = catCode?.slice(0, 1) == 'k' ? 'kadin' : 'erkek'
    const category = catCode?.slice(2)
    const productURL = `/shopping/${gender}/${category}/${id}/${nameSlug}`
    
    return (  
        <div onClick={() => {
            history.push(
                productURL
            );
            window.scrollTo(0, 0);
        }} className="flex flex-col text-center w-[20%] max-w-screen-2xl shadow-sm cursor-pointer">
            <div>
                <img src={image} className="w-[300px] mx-auto" />
            </div>
            <div className="p-6 flex flex-col gap-3">
                <h5 className="text-slate-800 text-base font-bold">{name}</h5>
                <h5 className="text-lighterDark text-sm font-bold truncate w-4/5 mx-auto">{description}</h5>
                <h5 className="text-lighterDark text-sm font-bold truncate">{sell_count} items sold</h5>
                <div className="flex gap-4 justify-center">
                    <h5 className="text-stone-300 text-base font-bold">${priceWithoutDiscount.toFixed(2)}</h5>
                    <h5 className="text-teal-700 text-base font-bold">${price}</h5>
                </div>
                <div className="w-20 h-4 items-center gap-1.5 inline-flex mx-auto">
                    <div className="w-4 h-4 bg-navBlue rounded-full" />
                    <div className="w-4 h-4 bg-teal-700 rounded-full" />
                    <div className="w-4 h-4 bg-orange-400 rounded-full" />
                    <div className="w-4 h-4 bg-darkText rounded-full" />
                </div>
            </div>
        </div>
    )
}