import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, ChevronRight, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  choices?: { label: string; action: string }[];
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectingLead, setCollectingLead] = useState<'none' | 'name' | 'phone'>('none');
  const [leadData, setLeadData] = useState({ name: '', phone: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome messages
  useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        sender: 'bot',
        text: "Hello! Welcome to Veritas Academy Hebbal. I'm Saba, your digital admissions guide. 👋",
        timestamp: new Date()
      },
      {
        id: 'init-2',
        sender: 'bot',
        text: "How can I assist you in unlocking your academic potential today?",
        timestamp: new Date(),
        choices: [
          { label: '💰 Course Fees Structure', action: 'fees' },
          { label: '📝 Book Free Trial Class', action: 'demo' },
          { label: '🎓 Scholarship Exam (SAT)', action: 'scholar' },
          { label: '📍 Directions / Address', action: 'address' }
        ]
      }
    ]);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (sender: 'bot' | 'user', text: string, choices?: { label: string; action: string }[]) => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      timestamp: new Date(),
      choices
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handlePredefinedChoice = (action: string, label: string) => {
    addMessage('user', label);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      switch (action) {
        case 'fees':
          addMessage(
            'bot',
            "Our tuition fees are highly affordable, ranging from ₹2,500/month for school classes (6-10) up to ₹5,500/month for high-end JEE/NEET prep. We also offer merit discounts up to 50% through our SAT scholarship tests!",
            [
              { label: 'Register for SAT Scholarship', action: 'scholar' },
              { label: 'Request a Callback', action: 'callback' }
            ]
          );
          break;
        case 'demo':
          addMessage(
            'bot',
            "Excellent! We offer 3 free interactive trial/demo classes in Hebbal so you can experience our small-batch teaching style.",
            []
          );
          setTimeout(() => {
            addMessage('bot', "Could you please tell me your Full Name to register your free demo seat?");
            setCollectingLead('name');
          }, 800);
          break;
        case 'scholar':
          addMessage(
            'bot',
            "Our Scholarship Aptitude Test (SAT) is scheduled for Sunday. It assesses basic IQ, mental math, and general sciences, helping you earn massive fee waivers.",
            [
              { label: 'Book Trial Class', action: 'demo' },
              { label: 'Request Callback', action: 'callback' }
            ]
          );
          break;
        case 'address':
          addMessage(
            'bot',
            "We are located at: Sultan Enclave, Kankanagar 5th Cross, Hebbal, Bengaluru 560045 (near Hebbal Flyover). Under normal hours (9:00 AM - 8:30 PM), we are always open for walks!",
            [
              { label: 'Call Academy Directly', action: 'call' }
            ]
          );
          break;
        case 'callback':
          addMessage('bot', "I'll be happy to set up a direct advisor callback. What is your Full Name?");
          setCollectingLead('name');
          break;
        case 'call':
          addMessage('bot', "You can contact our admissions desk instantly at +91 9110669897. We are happy to help!");
          break;
        default:
          addMessage('bot', "I see. If you would like to speak to an admissions officer, please request a callback.");
      }
    }, 1000);
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputVal.trim();
    if (!text) return;

    addMessage('user', text);
    setInputVal('');

    // Handle interactive lead capturing
    if (collectingLead === 'name') {
      setLeadData(prev => ({ ...prev, name: text }));
      setCollectingLead('phone');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', `Thank you, ${text}! Now, what is the best mobile number for our academic counselor to reach you at?`);
      }, 800);
      return;
    }

    if (collectingLead === 'phone') {
      const updatedData = { ...leadData, phone: text };
      setLeadData(updatedData);
      setCollectingLead('none');
      setIsTyping(true);

      // Save to localStorage database
      const callbacks = JSON.parse(localStorage.getItem('admissions_callback_requests') || '[]');
      callbacks.push({
        ...updatedData,
        id: Math.random().toString(36).substr(2, 9),
        source: 'Live Chatbot Widget',
        status: 'Pending',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('admissions_callback_requests', JSON.stringify(callbacks));

      setTimeout(() => {
        setIsTyping(false);
        addMessage(
          'bot',
          `Perfect! I have logged your request. Our counselor will call you at ${text} shortly to discuss admissions. Welcome to the Veritas family! 🎉`
        );
      }, 1000);
      return;
    }

    // Process general keywords
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();

      if (lower.includes('fee') || lower.includes('cost') || lower.includes('price') || lower.includes('amount')) {
        addMessage('bot', "School courses cost ₹2,500/month. PUC science starts at ₹4,500/month, and JEE/NEET are ₹5,500/month. We offer simple monthly split payments.", [
          { label: 'Register for Scholarship', action: 'scholar' },
          { label: 'Request Call', action: 'callback' }
        ]);
      } else if (lower.includes('time') || lower.includes('batch') || lower.includes('hour') || lower.includes('schedule')) {
        addMessage('bot', "School batches run 4:30 PM - 6:30 PM. College/PUC batches run mornings (6:30 AM - 8:30 AM) and evenings (5:30 PM - 8:30 PM) so they don't clash with college.", [
          { label: 'Request Timetable', action: 'callback' }
        ]);
      } else if (lower.includes('where') || lower.includes('address') || lower.includes('location') || lower.includes('map') || lower.includes('hebbal')) {
        addMessage('bot', "We are situated at Sultan Enclave, Kankanagar 5th Cross, Hebbal, Bengaluru. Landmark: Near Hebbal flyover.", [
          { label: 'Open Map Info', action: 'address' }
        ]);
      } else if (lower.includes('phone') || lower.includes('call') || lower.includes('number') || lower.includes('contact')) {
        addMessage('bot', "Our official admissions desk is +91 9110669897. Or, I can schedule a free call back for you right now!", [
          { label: 'Schedule Call Back', action: 'callback' }
        ]);
      } else if (lower.includes('scholar') || lower.includes('sat') || lower.includes('discount')) {
        addMessage('bot', "Yes, we run the SAT scholarship test weekly on Sundays! You can unlock 10% to 50% tuition fee discounts based on score.", [
          { label: 'Register for SAT', action: 'scholar' }
        ]);
      } else if (lower.includes('online') || lower.includes('zoom') || lower.includes('hybrid')) {
        addMessage('bot', "We hold active in-person offline classes for maximum focus. However, all lectures are recorded and homework assignments can be managed on our Student Portal.", [
          { label: 'Book Demo Class', action: 'demo' }
        ]);
      } else if (lower.includes('neet') || lower.includes('jee') || lower.includes('cet') || lower.includes('entrance')) {
        addMessage('bot', "We provide intensive CBSE & State syllabus integrated coaching for JEE, NEET, and KCET with Daily Practice Sheets (DPPs) and Sunday Mock Drill Tests.", [
          { label: 'Browse Courses', action: 'demo' }
        ]);
      } else {
        addMessage('bot', "I'm not fully sure I understood that specific query, but our Hebbal academic team would love to answer it directly!", [
          { label: 'Book Free Demo', action: 'demo' },
          { label: 'Request a Callback', action: 'callback' }
        ]);
      }
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {/* Expanding Chat Panel */}
      {isOpen ? (
        <div
          id="chat-messenger-window"
          className="w-[330px] sm:w-[360px] h-[480px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-display font-bold">
                  S
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm">Admissions Office</h4>
                <p className="text-[10px] text-indigo-100 flex items-center gap-1">
                  <span>Saba (Academic Counselor)</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex gap-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[10px] font-bold shrink-0 mt-0.5 font-display">
                      S
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="leading-relaxed break-words whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>

                {/* Date stamp */}
                <span className="text-[9px] text-slate-400 mt-1 px-8">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>

                {/* Preset Chips */}
                {msg.sender === 'bot' && msg.choices && msg.choices.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 pl-8 max-w-[95%]">
                    {msg.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePredefinedChoice(choice.action, choice.label)}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100/60 dark:border-indigo-900/40 font-medium transition-all text-left flex items-center cursor-pointer"
                      >
                        {choice.label}
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[10px] font-bold font-display">
                  S
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleUserInput} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
            <input
              id="chat-input-text"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                collectingLead === 'name'
                  ? "Type your name here..."
                  : collectingLead === 'phone'
                  ? "Type mobile number..."
                  : "Ask about timings, fees, scholarships..."
              }
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              id="btn-chat-send"
              type="submit"
              disabled={!inputVal.trim()}
              className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:dark:bg-slate-800 disabled:text-slate-400 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Chat Toggle Orb */
        <button
          id="chat-orb-toggle"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl flex items-center justify-center hover:-translate-y-1 transition-all relative cursor-pointer active:scale-95 group hover:shadow-indigo-500/30"
          title="Chat with Admissions"
        >
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
            Admissions
          </span>
        </button>
      )}
    </div>
  );
}
