import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function TermsAndConditionsScreen() {
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
                <h1 className="text-2xl font-bold text-white">Terms and Conditions</h1>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 text-white/80 space-y-6">
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                    <p className="text-sm leading-relaxed">
                        By accessing and using our application, you accept and agree to be bound by the terms and provision of this agreement. 
                        In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
                    <p className="text-sm leading-relaxed">
                        Reliv AI provides users with access to a rich collection of resources, including personalized diet plans, workout routines, 
                        and daily reminders through various communication channels like WhatsApp.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">3. User Conduct</h2>
                    <p className="text-sm leading-relaxed">
                        You agree to use our services only for lawful purposes. You agree not to take any action that might compromise the security of the site, 
                        render the site inaccessible to others or otherwise cause damage to the site or its content.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">4. Disclaimer of Health Information</h2>
                    <p className="text-sm leading-relaxed">
                        The information provided by Reliv AI is for general informational purposes only and is not meant to replace professional medical advice, 
                        diagnosis, or treatment. Always consult with a qualified healthcare provider before starting any new diet or fitness program.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
                    <p className="text-sm leading-relaxed">
                        If you have any questions about these Terms and Conditions, please contact us at support@reliv.com.
                    </p>
                </section>
                
                <div className="pt-6 border-t border-white/10 text-xs text-white/50 text-center">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>
        </Layout>
    );
}
