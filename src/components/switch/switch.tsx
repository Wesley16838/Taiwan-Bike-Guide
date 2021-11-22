import styles from "./Switch.module.scss"
import { SwitchProps } from "../../types/components";
const Switch = ({isToggle, onToggle, data}: SwitchProps) => {
    return(
        <label className={styles.switch}>
            <input type="checkbox" checked={isToggle} onChange={onToggle}/>
            <span className={styles.slider}>
                <span className={styles.left}>{data[0]}</span>
                <span className={styles.right}>{data[1]}</span>
            </span>
        </label>
    )
}

export default Switch;