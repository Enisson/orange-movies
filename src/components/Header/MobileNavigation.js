import menu from '../../assets/bx-menu.svg';
import close from '../../assets/bx-menu-alt-left.svg';
import NavLink from './index'

import "./styles.css";


import { useState } from 'react';

export default function MobileNavigation() {

    const [open, setOpen] = useState(false);

    const hamburguerIcon = <img className='hamburguer' src={menu} alt="Menu" onClick={()=> setOpen(!open)}/>

    const closeIcon = <img className='hamburguer' src={close} alt="Menu" onClick={()=> setOpen(!open)}/>

    const closeMobileMenu = () => setOpen(false);
    
    return (
        
        <nav className={`mobileNavigation ${open ? 'mobileNavigation' : 'mobileNavigation-closed'}`}>
            {open ? closeIcon : hamburguerIcon}
            {open && <NavLink isMobile={true} closeMobileMenu={closeMobileMenu} />}
        </nav>
    )
}