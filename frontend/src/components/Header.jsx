import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import { useGetTopProductQuery } from "../redux/api/productApiSlice";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <div className="flex justify-around">
            <div className="xl:block lg:hidden md:hidden sm:hidden">
                <div className="grid grid-cols-2">
                    {data.map((product) => (
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel />
        </div>
    );
};

export default Header;
