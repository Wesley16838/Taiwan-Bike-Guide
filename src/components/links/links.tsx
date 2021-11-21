import Link from 'next/link'
import { LinkProps } from '../../types/components'
import styles from './Links.module.scss'
import Router, { useRouter } from 'next/router'

const Links = ({path, name}: LinkProps) => {
    const { asPath } = useRouter()
    return(
        <button 
            className={`${styles.link} ${asPath.split('/')[1] === path.split('/')[1] ? styles.actived : ""}`}
            onClick={() => {
            Router.push(`${path}`)
          }}>
            {name}
        </button>
    )
}

export default Links;