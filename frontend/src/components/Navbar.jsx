import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import assets from '../assets/assets';

const Navbar = () => {

    const { language, toggleLanguage } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    const texts = {
        en: {home: "Home", about: "About", projects: "Projects", contact: "Contact", switch: "日本語" },
        jp: {home: "ホーム", about: "紹介", projects: "プロジェクト", contact: "連絡先", switch: "English" },
    };


    return (
        <div className={`flex items-center justify-between text-sm py-2 shadow-md ${showMenu ? 'md:backdrop-blur-lg' : 'backdrop-blur-lg'} text-gray-200 px-2 md:px-[10%]`}>
            <h1 className='logo-font text-5xl'>Shivam</h1>
            <ul className='hidden md:flex items-start gap-5 font-normal'>
                <NavLink to='/'>
                    <li className='py-1 tracking-widest'>{texts[language].home}</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/projects'>
                    <li className='py-1 tracking-widest'>{texts[language].projects}</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 tracking-widest'>{texts[language].about}</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 tracking-widest'>{texts[language].contact}</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            <button
                onClick={toggleLanguage}
                className="bg-white/10 px-4 py-2 rounded-lg hover:bg-secondary transition-all duration-300 cursor-pointer"
            >
                {texts[language].switch}
            </button>

            <div className='flex items-center gap-4 md:hidden'>

                <img onClick={() => setShowMenu(true)} className='w-[25px] md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

                {/*--------Mobile Menu-----------*/}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden transition-all text-gray-200 backdrop-blur-md bg-black/30`}>
                    <div className='flex items-center justify-between px-5 py-4'>
                        <h1 className='logo-font text-4xl'>Shivam</h1>
                        <img className='w-[25px] cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-5 mt-12 px-5 text-lg font-medium w-full'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-10 py-2 rounded-full'>{texts[language].home}</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/projects'><p className='px-10 py-2 rounded-full'>{texts[language].projects}</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-10 py-2 rounded-full'>{texts[language].about}</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-10 py-2 rounded-full'>{texts[language].contact}</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar