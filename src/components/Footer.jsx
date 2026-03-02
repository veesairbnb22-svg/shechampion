import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-primary">
            <div className="container footer-container">

                {/* Brand & Intro */}
                <div className="footer-section brand-section">
                    <Link to="/" className="footer-logo">
                        She<span>Champion</span>
                    </Link>
                    <p className="footer-description">
                        A Women-Led Entrepreneurship, Market Access & Investment Platform. Identifying,
                        preparing, and elevating women entrepreneurs through structured support.
                    </p>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section links-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/challenge">The Challenge</Link></li>
                        <li><Link to="/programs">Programs</Link></li>
                        <li><Link to="/seminars">Seminars</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section contact-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            <MapPin size={18} className="icon" />
                            <span>Phase 2, Plot 84 Victor B.K. Cres, off Idris Garba Street,Kado, Abuja 900108, FCT, Nigeria</span>
                        </li>
                        <li>
                            <Phone size={18} className="icon" />
                            <span>(+234) 703 631 6083</span>
                        </li>
                        <li>
                            <Mail size={18} className="icon" />
                            <span>info@shechampion-bbf.org</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} SheChampion Network. All rights reserved.</p>
                    <p className="implementer">Lead Implementer: Beyond Borders Foundation</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
