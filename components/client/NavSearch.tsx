import {Search} from "lucide-react";

const NavSearch = () => {
    // Todo: Implement Search Function
    return (
        <div className="hidden px-3 py-2  items-center gap-x-2 bg-bgSecondary rounded-3xl lg:flex">
            <Search className={"text-gray-500"} />
            <input
                placeholder="Search for products..."
                className={"w-[350px] focus:outline-none bg-bgSecondary"}
            />
        </div>
    );
};

export default NavSearch;