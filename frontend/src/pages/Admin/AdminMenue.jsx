import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenue = () => {
    const [isMenueOpen, setIsMenueOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenueOpen(!isMenueOpen);
    };

    return (
        <>
            <button
                className={`${isMenueOpen ? "top-2 right-2" : "top-5 right-7"} bg-[#232323] p-2 fixed rounded-lg`}
                onClick={toggleMenu}
            >
                {isMenueOpen ? (
                    <FaTimes color="white" />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                    </>
                )}
            </button>

            {isMenueOpen && (
                <section className="bg-[#232323] p-4 fixed right-7 top-5">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink
                                className="list-item py-2 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                to="/admin/dashboard"
                                style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white',
                                })}
                            >
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                to="/admin/categorylist"
                                style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white',
                                })}
                            >
                                Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                to="/admin/productlist"
                                style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white',
                                })}
                            >
                                Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                to="/admin/allproductlist"
                                style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white',
                                })}
                            >
                                All Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                to="/admin/userlist"
                                style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white',
                                })}
                            >
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                to="/admin/orderlist"
                                style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white',
                                })}
                            >
                                Manage Order
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    );
};

export default AdminMenue;
