import React, { useState } from 'react';
import { X, Sparkles, ClipboardCheck, Phone, CheckCircle2, Download, ShieldCheck } from 'lucide-react';

interface AdmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourse?: string;
}

export default function AdmissionForm({ isOpen, onClose, preSelectedCourse }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    course: preSelectedCourse || 'puc-science',
    mode: 'offline',
    notes: '',
    downloadBrochure: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate unique registration ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regId = `VERITAS-REG-${randomNum}`;
    setRegistrationId(regId);

    // Write to local storage database
    const leads = JSON.parse(localStorage.getItem('admissions_leads') || '[]');
    leads.push({
      ...formData,
      id: regId,
      status: 'Enrolled - Callback Pending',
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('admissions_leads', JSON.stringify(leads));

    setSubmitted(true);
  };

  const handleDownloadReceipt = () => {
    // Simulated PDF receipt download using standard window print or generating dummy download
    const element = document.createElement("a");
    const file = new Blob([
      `==================================================\n`,
      `          VERITAS ACADEMY BENGALURU            \n`,
      `               ADMISSION SEAT CONFIRMATION         \n`,
      `==================================================\n\n`,
      `Registration ID: ${registrationId}\n`,
      `Date Registered: ${new Date().toLocaleDateString()}\n\n`,
      `STUDENT DETAILS:\n`,
      `----------------\n`,
      `Student Name    : ${formData.studentName}\n`,
      `Parent/Guardian : ${formData.parentName}\n`,
      `Contact Mobile  : ${formData.phone}\n`,
      `Email Address   : ${formData.email}\n`,
      `Chosen Course   : ${formData.course.toUpperCase()}\n`,
      `Selected Mode   : ${formData.mode.toUpperCase()} CLASSROOM\n\n`,
      `IMPORTANT INSTRUCTIONS:\n`,
      `-----------------------\n`,
      `1. Please carry a copy of this seat voucher to our Hebbal center.\n`,
      `2. Bring 2 passport size photos and your previous marks card.\n`,
      `3. Trial classes are scheduled starting Monday (4:30 PM).\n`,
      `4. Direct assistance: +91 9110669897\n\n`,
      `Address: Sultan Enclave, Kankanagar 5th Cross, Hebbal, Bengaluru.\n`,
      `==================================================`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.studentName.replace(/\s+/g, '_')}_Veritas_Admission_Receipt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl relative z-10 overflow-hidden border border-slate-100 dark:border-slate-800 transition-all transform scale-100">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          {!submitted ? (
            <div className="flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-indigo-200 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-xl">Enrollment & Demo Booking</h3>
                <p className="text-xs text-indigo-100 mt-1">
                  Veritas Academy Hebbal • Academic Cycle 2026-2027
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-300 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-xl">Seat Reserved Successfully</h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Registration ID Assigned: {registrationId}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter Student Name"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter Parent Name"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit Phone"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    Target Course *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
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
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    Study Mode
                  </label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                  >
                    <option value="offline">Offline Classroom (Hebbal, BLR)</option>
                    <option value="hybrid">Hybrid Support (Class + Portal)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                  Brief Queries / Previous Academic Scores
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us about last year's grades, or questions on scheduling..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  name="downloadBrochure"
                  id="chk-brochure"
                  checked={formData.downloadBrochure}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="chk-brochure" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer selection:bg-transparent">
                  Yes, I would like to download the full Course Brochure & Formula Sheet (PDF format).
                </label>
              </div>

              <button
                id="btn-admission-submit"
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/10 cursor-pointer active:scale-98"
              >
                Secure Seat & Book Free Trial
              </button>

              <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                Your data is safe under GDPR and Veritas educational compliance guidelines.
              </p>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="inline-flex w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 items-center justify-center border border-emerald-100 dark:border-emerald-900/40 shadow-inner">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">
                  Congratulations, {formData.studentName}!
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  Your entry is successfully logged under key <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{registrationId}</span>.
                </p>
              </div>

              {/* Admission Receipt visual summary */}
              <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 text-left max-w-md mx-auto space-y-3 shadow-inner">
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2.5">
                  <span className="text-xs text-slate-500 font-mono">Veritas Seat Receipt</span>
                  <span className="text-xs text-slate-500 font-mono">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="text-slate-400">Class Type:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-right">{formData.course.toUpperCase()}</span>

                  <span className="text-slate-400">Learning Mode:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-right">{formData.mode.toUpperCase()} CLASSROOM</span>

                  <span className="text-slate-400">Parent Name:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-right">{formData.parentName}</span>

                  <span className="text-slate-400">Contact Number:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-right font-mono">+91 {formData.phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  id="btn-download-voucher"
                  onClick={handleDownloadReceipt}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Seat Voucher
                </button>
                <button
                  id="btn-close-voucher"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all"
                >
                  Done, Return
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Our counselor will contact your registered phone within 2 hours to confirm batch timings and arrange your classroom orientation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
