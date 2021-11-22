import Links from '../links/links'
import Image from 'next/image'
import styles from './Navbar.module.scss'
import logo from '../../../public/images/logo.svg'
import list from '../../../public/images/list.svg'
import close from '../../../public/images/close.svg'
import { useCallback, useEffect, useState } from 'react'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [nav, setNav] = useState(false)
    const listenScrollEvent = useCallback(() => {
        if (window.scrollY > 100) {
            setNav(true)
        } else if(window.scrollY <= 100){
            setNav(false)
        }
      }, [])

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return (() => window.removeEventListener('scroll', listenScrollEvent))
      }, [listenScrollEvent])
    
    return(
        <div className={`${styles.wrapper} ${nav ? styles.small : ''}`}>
            <div className={styles['image-container']}>
                <Image
                    src={logo}
                    alt="Logo"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            
            
            <div className={`${styles['links-group']} ${isOpen && styles['open']}`}>
                <Links name="單車租借" path="/bikes"/>
                <Links name="單車路線" path="/routes"/>
                <Links name="美食景點" path="/food-scenespot"/>
            </div>
            <button className={`${styles['image-wrapper']}`} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles['image-container-list']}>
                    <Image
                        src={isOpen ? close : list}
                        alt="Open Icon"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </button>
        </div>
    )
}

export default Navbar;