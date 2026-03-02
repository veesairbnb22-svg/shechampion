import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Hero from '../components/Hero';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Using Web3Forms API to send email to info@shechampion-bbf.org
            // The access key will be managed via environment variables on Vercel
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "22471969-3154-4333-a508-8df6e29518d1",
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || "New Message from SheChampion Website",
                    from_name: "SheChampion Web Contact",
                    to_email: "info@shechampion-bbf.org",
                    // Sending full HTML template in the message field for a premium look on the free tier
                    message: `
<div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e8d5c4; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #4A2B2D; color: #F8EDDF; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">SheChampion</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Contact Form Submission</p>
    </div>
    <div style="padding: 20px; line-height: 1.6; color: #1F1516; background-color: #ffffff;">
        <p><strong>Sender:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject || 'General Inquiry'}</p>
        <div style="height: 1px; background: #e8d5c4; margin: 15px 0;"></div>
        <p><strong>Message:</strong></p>
        <p style="background: #fdfaf7; padding: 15px; border-left: 4px solid #4A2B2D;">${formData.message}</p>
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
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="contact-page animate-fade-in">
            <Hero
                title="Get in Touch"
                subtitle="We'd love to hear from you. Reach out with any questions, partnership inquiries, or feedback."
                secondary={true}
            />

            <section className="py-section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Information */}
                        <div className="contact-info glass-dark bg-primary text-light">
                            <h2 className="text-white mb-4">Contact Information</h2>
                            <p className="mb-8 opacity-90">
                                Fill up the form and our team will get back to you within 24 hours.
                            </p>

                            <div className="info-item">
                                <Phone className="info-icon" />
                                <div>
                                    <h4>Phone</h4>
                                    <p>(+234) 703 631 6083</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <Mail className="info-icon" />
                                <div>
                                    <h4>Email</h4>
                                    <p>info@shechampion-bbf.org</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <MapPin className="info-icon" />
                                <div>
                                    <h4>Location</h4>
                                    <p>Phase 2, Plot 84 Victor B.K. Cres, off Idris Garba Street,Kado, Abuja 900108, FCT, Nigeria</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-container">
                            {status === 'success' ? (
                                <div className="success-message text-center animate-fade-in">
                                    <CheckCircle size={64} className="text-secondary mx-auto mb-4" />
                                    <h3 className="text-primary mb-2">Message Sent!</h3>
                                    <p className="text-dark">Thank you for reaching out to us. We will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <h3 className="text-primary mb-6">Send us a Message</h3>

                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Jane Doe"
                                            disabled={status === 'loading'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="jane@example.com"
                                            disabled={status === 'loading'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Partnership Inquiry"
                                            disabled={status === 'loading'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="How can we help you?"
                                            disabled={status === 'loading'}
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <div className="error-text mb-4">
                                            Please fill out all required fields correctly.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary submit-btn"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Sending...' : (
                                            <>Send Message <Send size={18} className="ml-2" /></>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
