import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';

interface LeadFormProps {
  showTourOption?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ showTourOption = false }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [clientId, setClientId] = useState('');
  

  // Helper to get cookie value
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  // Parse UTM from URL and sessionStorage
  React.useEffect(() => {
    // UTM params
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get('utm_source') || sessionStorage.getItem('utm_source') || '';
    const utm_medium = params.get('utm_medium') || sessionStorage.getItem('utm_medium') || '';
    const utm_campaign = params.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || '';
    if (utm_source) sessionStorage.setItem('utm_source', utm_source);
    if (utm_medium) sessionStorage.setItem('utm_medium', utm_medium);
    if (utm_campaign) sessionStorage.setItem('utm_campaign', utm_campaign);
    setUtmSource(utm_source);
    setUtmMedium(utm_medium);
    setUtmCampaign(utm_campaign);
    // GA4 client ID from _ga cookie
    const gaCookie = getCookie('_ga');
    let cid = '';
    if (gaCookie && gaCookie.startsWith('GA1.')) {
      // Format: GA1.2.XXXXXXXXX.YYYYYYYYYY
      const parts = gaCookie.split('.');
      if (parts.length === 4) {
        cid = `${parts[2]}.${parts[3]}`;
      }
    }
    setClientId(cid);
  }, []);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('🚀 Form submission intercepted – form is in preview mode only.');
    setLoading(true);

    // For now, do not send data anywhere – just show a friendly message
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 500);

    return;

    const formData = {
      first_name,
      last_name,
      email,
      phone,
      message,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      client_id: clientId,
    };

    console.log('📤 Form data being sent:', formData);

    try {
      console.log('🌐 Making API request to /api/submit');
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 API response received:', {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok
      });

      const result = await res.json();
      console.log('📋 API response data:', result);

      if (res.ok) {
        console.log('✅ Form submitted successfully');
        alert('Form submitted successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsSubmitted(true);
      } else {
        console.log('❌ Form submission failed:', result);
        alert(`Error: ${result.error || result.message}`);
      }
    } catch (err) {
      console.log('💥 API request failed:', err);
      alert('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      console.log('🏁 Form submission process completed');
      setLoading(false);
    }
  }
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="bg-gray-50 p-8 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <motion.svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <h3 className="text-xl font-light text-black mb-2">Thank you for reaching out</h3>
              <p className="text-gray-600 font-light">
                Our online form is currently in preview mode. For faster assistance, please email us at{' '}
                <a href="mailto:sales@morajinfratech.com" className="underline underline-offset-2 text-black">
                  sales@morajinfratech.com
                </a>
                .
              </p>
            </div>
            <motion.button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-black text-white font-light tracking-wide hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-light text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors font-light"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-light text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors font-light"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors font-light"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors font-light"
              />
            </div>
            

            
            <div>
              <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-2">
                Message
              </label>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors resize-none font-light"
              />
            </div>
            
            <input type="hidden" name="utm_source" value={utmSource} />
            <input type="hidden" name="utm_medium" value={utmMedium} />
            <input type="hidden" name="utm_campaign" value={utmCampaign} />
            <input type="hidden" name="client_id" value={clientId} />

            
            <button type="submit" disabled={loading} className="w-full px-8 py-4 bg-black text-white font-light tracking-wide hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            
            <p className="text-xs text-gray-500 text-center font-light">
              By submitting this form, you agree to our privacy policy.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;