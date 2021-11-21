
import styles from './Buttons.module.scss';
import Image from 'next/image';
import { ButtonProps } from '../../types/components';
import arrowIcon from '../../../public/images/arrow.svg'
const Buttons = ({trigger, onClick}: ButtonProps) => {
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void  => {
        e.preventDefault()
        if(onClick) onClick()
    }
    
    return(
        <button className={`${styles['image-wrapper']} ${!trigger && styles.close}`} onClick={(e) => handleOnClick(e)}>
            <div className={styles['image-container']}>
                <Image
                    src={arrowIcon}
                    alt={'Arrow'}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>
        </button>
    )
     
}

export default Buttons;