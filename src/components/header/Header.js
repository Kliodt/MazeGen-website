import styles from './header.module.css'


const Header = () => {
    return <div className={styles['header']}>

        <ul className={styles['navigation-menu']}>
            <li><h1><a href='/'>MazeGen</a></h1></li>
        </ul>

        <ul className={styles['profile-menu']}>
            <li><a href='/profile' className={styles['profile-menu-item']}>
                <i className="fa-solid fa-circle-user"></i>
            </a></li>
            <li><a href='/' className={styles['profile-menu-item']}>
                <i className="fa-solid fa-house"></i>
            </a></li>
        </ul>
    </div>
}

export default Header;