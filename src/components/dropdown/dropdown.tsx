import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { DropDownProps, DataItemType } from '../../types/components'
import styles from './Dropdown.module.scss'
import dropdownIcon from '../../../public/images/dropdown_icon.svg'
// import { useTourisms } from "../../context/tourismProvider"; //Activity

const Dropdowns = ({data, arrayData, onClick, defaultLabel, defaultValue, label}: DropDownProps) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState({
        value: defaultValue,
        label: defaultLabel,
    });
    const dropdownRef = useRef<any>();

    useEffect(()=>{
        setSelection({
            value: defaultValue,
            label: defaultLabel,
        })
    }, [defaultValue, defaultLabel])
    
    useEffect(() => {
        function handleClickOutside(event: any) {
          if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
            setOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [dropdownRef, setOpen])

    const handleOnToggle = () => {
        setOpen(!open)
    }

    const handleOnClick = (value: string, label: string):void => {
        setSelection({
            value,
            label
        });
        setOpen(false);
        if (onClick) onClick(value);
    };

    return(
        <div className={styles.wrapper} aria-labelledby="action menu" ref={dropdownRef}>
            <div className={`${styles.action} ${open ? styles.open : ''} ${arrayData !== undefined && arrayData.length === 0 ? styles.disabled : ''}`} tabIndex={0} role="button" onClick={() => handleOnToggle()}>
                <p>{selection.label}</p>
                <div className={styles.arrow}>
                    <Image
                    src={dropdownIcon}
                    alt={'Dropdown'}
                    width={12}
                    height={6}
                />
                </div>
                
            </div>
            {open && <ul className={`${styles.menu} ${styles.basic}`}>
                {
                    arrayData === undefined ?
                    data?.listing.map((item: DataItemType) => {
                        return (
                            <li key={item.label} onClick={() => handleOnClick(item.value, item.label)} aria-labelledby={item.label} id={item.value} className={styles.item}>
                                <p>{item.label}</p> {item.label === selection.label && <p>✓</p>}
                            </li>
                        );
                    })
                    :
                    arrayData.map((item: string) => {
                        return (
                            <li key={item} onClick={() => handleOnClick(item, item)} aria-labelledby={item} id={item} className={styles.item}>
                                <p>{item}</p> {item === selection.label && <p>✓</p>}
                            </li>
                        );
                    })
                }
            </ul>}
        </div>
    )
}

export default Dropdowns;