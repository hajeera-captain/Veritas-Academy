import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquareText } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'school-6-10',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log to local storage as an admission inquiry lead
    const callbacks = JSON.parse(localStorage.getItem('admissions_callback_requests') || '[]');
    callbacks.push({
      ...formState,
      id: Math.random().toString(36).substr(2, 9),
      source: 'Contact Webpage Form',
      status: 'Pending',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('admissions_callback_requests', JSON.stringify(callbacks));

    setIsSent(true);
    setFormState({ name: '', phone: '', email: '', course: 'school-6-10', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600 dark:text-blue-400">
            Visit Our Center
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
            Let's Start Your Success Story Today
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            Drop by our campus, call our admissions helpline, or message our counselors directly on WhatsApp. We are here to guide your academic aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left panel: Info & Maps */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-850 space-y-6">
              <h3 className="font-display font-bold text-base text-slate-950 dark:text-white">
                Helpline & Campus Hours
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">Our Address</span>
                    <span className="text-slate-400 leading-relaxed block mt-0.5">
                      Sultan enclave, Kankanagar 5th cross, Hebbal, Bengaluru 560045
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">Phone Calls</span>
                    <a href="tel:+919110669897" className="text-blue-600 dark:text-blue-400 font-mono font-bold block hover:underline mt-0.5">
                      +91 9110669897
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">Academic Emails</span>
                    <a href="mailto:admissionsveritas6362@gmail.com" className="text-blue-600 dark:text-blue-400 font-bold block hover:underline mt-0.5 break-all">
                      admissionsveritas6362@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">Office Hours</span>
                    <span className="text-slate-400 block mt-0.5">
                      Daily: 9:00 AM - 8:30 PM (Walk-ins welcome)
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Iframe integration */}
            <div className="h-64 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-850 shadow-inner relative bg-slate-100 dark:bg-slate-950">
              <iframe
                title="Veritas Academy Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9949669619576!2d77.5929!3d13.025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b9b1e9389f%3A0xe74483b8b1a38997!2sHebbal%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/25 p-8 sm:p-10 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-inner relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Send a Detailed Query
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Leave your contact details and our master teachers will map a custom learning path for you.
                </p>
              </div>

              {isSent && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5" />
                  Your query has been logged. Our admissions officer will call you shortly.
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Syed Roshan"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Active Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 9110669897"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="e.g., student@gmail.com"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Course of Interest *
                    </label>
                    <select
                      name="course"
                      value={formState.course}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="school-6-10">School Tuition (Class 6-10)</option>
                      <option value="puc-science">PUC Science (Class 11-12)</option>
                      <option value="puc-commerce">PUC Commerce (Class 11-12)</option>
                      <option value="neet-coaching">NEET Prep (Medical)</option>
                      <option value="jee-coaching">JEE Prep (Engineering)</option>
                      <option value="kcet-coaching">KCET Prep (State Level)</option>
                      <option value="engineering-support">B.E / B.Tech semester tutoring</option>
                      <option value="foundation-course">Early Foundation (Class 8-10)</option>
                      <option value="crash-course">Board/CET Crash Course</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Your Message / Specific Academic Concerns
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Describe any difficult subjects, or request a specific weekend timings orientation..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    id="btn-contact-submit"
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
                  >
                    <Send className="w-4 h-4" />
                    Submit Query
                  </button>

                  <a
                    id="btn-contact-whatsapp"
                    href="https://wa.me/919110669897?text=Hello%20Veritas%20Academy,%20I'm%20submitting%20an%20admission%20interest%20form."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquareText className="w-4.5 h-4.5 animate-pulse" />
                    Connect via WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
