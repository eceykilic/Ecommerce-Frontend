import ProductCard from "../Repetitive/ProductCard";
export default function Products({products}) {
    const productCards = products.map((item, index) => {
        return <ProductCard data={item} key={index} />
    })
    return (
        <div className="flex flex-wrap gap-10 items-center justify-center">
            {productCards}
        </div>
    )
}