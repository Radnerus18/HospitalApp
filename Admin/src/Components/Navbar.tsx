import React from 'react';
import { Link } from 'react-router-dom';
const style = {
    navbar: "navbar bg-gray-800 text-white p-4 flex justify-between items-center",
    menu: "menu flex space-x-6",
    menuItem: "hover:underline hover:underline-offset-4 transition-all duration-300",
    actions: "actions flex items-center space-x-4",
    button: "bg-white hover:font-bold text-[#00008B] px-4 py-2 rounded w-50 h-10  border rounded-[28px] cursor-pointer",
    avatar: "avatar w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white cursor-pointer",
    search_bar:"px-4 py-2 rounded w-[500px]  border rounded-[28px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
};
const Navbar: React.FC = () => {
    return (
        <nav className={style.navbar} style={{backgroundColor:'#00008B'}}>
            <div className={style.menu}>
                <Link to="/" className={style.menuItem}>Home</Link>
                <Link to="/about" className={style.menuItem}>About</Link>
                <Link to="/services" className={style.menuItem}>Services</Link>
                <Link to="/contact" className={style.menuItem}>Contact</Link>
                <Link to="/contact" className={style.menuItem}>Contact</Link>
                <Link to="/faq" className={style.menuItem}>FAQ</Link>
                <Link to="/register" className={style.menuItem}>Register</Link>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className={style.search_bar}
                />
            </div>
            <div className={style.actions}>
                <button className={style.button}>
                    Book Appointment
                </button>
                <div className={style.avatar}>
                    U
                </div>
            </div>
        </nav>
    );
};

export default Navbar;