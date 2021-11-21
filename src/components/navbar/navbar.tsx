import Links from '../links/links'
import Image from 'next/image'
import styles from './Navbar.module.scss'
import logo from '../../../public/images/logo.svg'
import { useEffect, useState } from 'react'
const Navbar = () => {
    console.log('Navbar')
    const [nav, setNav] = useState(false)
    const listenScrollEvent = () => {
        if (window.scrollY > 100) {
            setNav(true)
        } else if(window.scrollY <= 100){
            setNav(false)
        }
      }

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
            
            
            <div className={styles['links-group']}>
                <Links name="單車租借" path="/bikes"/>
                <Links name="單車路線" path="/routes"/>
                <Links name="美食景點" path="/food-scenespot"/>
            </div>
        </div>
    )
}

export default Navbar;