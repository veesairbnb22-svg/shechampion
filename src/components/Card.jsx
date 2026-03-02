import './Card.css';

const Card = ({ title, description, icon: Icon, className = '', children }) => {
    return (
        <div className={`card ${className}`}>
            {Icon && (
                <div className="card-icon">
                    <Icon size={28} />
                </div>
            )}
            <div className="card-content">
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
                {children}
            </div>
        </div>
    );
};

export default Card;
