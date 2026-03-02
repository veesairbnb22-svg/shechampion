import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import './MembershipPopup.css';

const MembershipPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    useEffect(() => {
        // Check if user has already seen/closed the popup in this session
        const hasSeenPopup = sessionStorage.getItem('shechampion_popup_seen');

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('shechampion_popup_seen', 'true');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call for email submission
        setTimeout(() => {
            if (email) {
                setStatus('success');
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay animate-fade-in">
            <div className="popup-container">
                <button className="popup-close" onClick={handleClose} aria-label="Close">
                    <X size={24} />
                </button>

                <div className="popup-content">
                    <div className="popup-icon-wrapper">
                        <Mail size={32} className="text-secondary" />
                    </div>
                    <h3 className="popup-title">Join the Network</h3>
                    <p className="popup-desc">
                        Enter your email to join the SheChampions Membership and get access to exclusive opportunities.
                    </p>

                    {status === 'success' ? (
                        <div className="popup-success animate-fade-in">
                            <CheckCircle size={48} className="success-icon" />
                            <h4>Thank you for joining!</h4>
                            <p>We'll be in touch soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="popup-form">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="popup-input"
                                disabled={status === 'loading'}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary popup-btn"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Submitting...' : 'Join Now'}
                            </button>
                            {status === 'error' && <p className="error-text">Please enter a valid email.</p>}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MembershipPopup;
