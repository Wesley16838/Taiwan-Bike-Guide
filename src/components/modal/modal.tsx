import styles from './Modal.module.scss';
import { ModalProps } from '../../types/components'
import Image from 'next/image'
import Buttons from '../../components/buttons/buttons'
import locationIcon from "../../../public/images/location_light.svg"
import phone from "../../../public/images/phone.svg"
import time from "../../../public/images/time.svg"
import { Fragment } from 'react';

const Modal = ({select, onClick, isShow}: ModalProps) => {
    const handleOnClick = () => {
        if(onClick) onClick()
    }
    return(
    <Fragment>
        {
            <div 
                className={`${styles.modal} ${isShow ? styles.modalOpen : styles.modalClosed}`}
                onAnimationEnd={event => 
                    {event.animationName == "closeModal"}
                }
            >
                <Buttons trigger={isShow} onClick={()=>handleOnClick()} />
                <div className={styles.detail}>
                    <div className={styles['modal-title']}>
                        {select.name}
                    </div>
                    <div className={styles['modal-info']}>
                        <Image
                            src={locationIcon}
                            width={12}
                            height={12}
                        />
                        {select.address}
                    </div>
                    <div className={styles['modal-info']}>
                        <Image
                            src={time}
                            width={12}
                            height={12}
                        />
                        {select.time}
                    </div>
                    <div className={styles['modal-info']}>
                        <Image
                            src={phone}
                            width={12}
                            height={12}
                        />
                        {select.phone}
                    </div>
                    <div className={styles['modal-detail']}>
                        {select.description}
                    </div>
                </div>
                <div className={styles['modal-image']}>
                {
                    select.image !== '' && 
                    <Image
                        src={select.image}
                        alt={select.imageAlt}    
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                }
                
                </div>
            </div>
        }
    </Fragment>
    )
}

export default Modal;