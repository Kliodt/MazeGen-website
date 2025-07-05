import styles from './content-card.module.css';

const ContentCard = ({children, style}) => {
    return <div style={style} className={styles['content-card']}>
        {children}
    </div>
}

export default ContentCard;