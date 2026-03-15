import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function PrivacyPolicyScreen() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full mr-4 hover:bg-white/20 transition-colors"
                >
                    <Icon name="chevron-left" className="text-white" />
                </button>
                <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 text-white/80 space-y-6">
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                    <p className="text-sm leading-relaxed">
                        We collect information you provide directly to us when you create an account, such as your phone number, when you use our authentication services. 
                        This information is processed securely using Google Firebase Authentication.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">2. How We Use Information</h2>
                    <p className="text-sm leading-relaxed">
                        We use the information we collect primarily to provide, maintain, and improve our services, particularly to authenticate your identity 
                        and secure your account via SMS verification.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">3. Third-Party Services</h2>
                    <p className="text-sm leading-relaxed">
                        We use third-party services like Google Cloud and Firebase for backend infrastructure and authentication. 
                        Your phone number may be shared with these services solely for the purpose of sending verification SMS codes and preventing spam/abuse.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">4. Security</h2>
                    <p className="text-sm leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
                    <p className="text-sm leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at support@reliv.com.
                    </p>
                </section>
                
                <div className="pt-6 border-t border-white/10 text-xs text-white/50 text-center">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>
        </Layout>
    );
}
