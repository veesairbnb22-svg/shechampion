import './Hero.css';

const Hero = ({ title, subtitle, bgImage, secondary, children }) => {
    const heroClass = secondary ? 'hero secondary-hero' : 'hero primary-hero';
    const customStyles = bgImage ? { backgroundImage: `linear-gradient(rgba(74, 43, 45, 0.8), rgba(74, 43, 45, 0.8)), url(${bgImage})` } : {};

    return (
        <section className={heroClass} style={customStyles}>
            <div className="container hero-content animate-fade-in">
                <h1>{title}</h1>
                {subtitle && <p className="hero-subtitle">{subtitle}</p>}
                {children && <div className="hero-actions">{children}</div>}
            </div>
        </section>
    );
};

export default Hero;
