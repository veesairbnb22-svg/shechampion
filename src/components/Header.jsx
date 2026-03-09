import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo-horizontal.png';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'The Challenge', path: '/challenge' },
        { name: 'Programs', path: '/programs' },
        { name: 'The Network', path: '/network' },
        { name: 'Seminars', path: '/seminars' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`header ${isScrolled ? 'header-scrolled glass' : ''} ${location.pathname === '/' ? 'header-home' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo-container">
                    <img src={logo} alt="She Champions" className="logo-img" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link to="/network" className="membership-btn">
                        Membership
                    </Link>
                </nav>

                {/* Mobile menu button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="mobile-nav glass">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to="/network" className="membership-btn-mobile">
                                Membership
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
