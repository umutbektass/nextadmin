import styles from './footer.module.css'
const Footer = () => {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                Umut Bektas
            </div>
            <div className={styles.text}>
                © All right reserved.
            </div>
        </div>
    )
}

export default Footer;