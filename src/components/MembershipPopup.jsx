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

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "22471969-3154-4333-a508-8df6e29518d1",
                    from_name: "SheChampion Membership",
                    subject: "New Member Signup Request",
                    email: email,
                    to_email: "info@shechampion-bbf.org",
                    // Branded HTML notification for the free tier
                    message: `
<div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e8d5c4; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #4A2B2D; color: #F8EDDF; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">SheChampion</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Membership Program</p>
    </div>
    <div style="padding: 20px; line-height: 1.6; color: #1F1516; background-color: #ffffff;">
        <p style="font-size: 18px; color: #4A2B2D;"><strong>New Membership Interest!</strong></p>
        <p>A new user has requested to join the SheChampion Network.</p>
        <div style="height: 1px; background: #e8d5c4; margin: 15px 0;"></div>
        <p><strong>User Email:</strong> <a href="mailto:${email}" style="color: #4A2B2D; font-weight: bold;">${email}</a></p>
        <p>Please reach out to them with onboarding details or program information.</p>
    </div>
    <div style="background-color: #fcf8f3; padding: 15px; text-align: center; font-size: 11px; color: #5f3739;">
        © 2026 SheChampion. Phase 2, Plot 84 Victor B.K. Cres, Abuja, Nigeria.
    </div>
</div>`
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        }
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
