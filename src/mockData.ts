import { Course, Faculty, Result, Testimonial, Blog, FAQItem, GalleryItem, Notice, Quiz, StudyMaterial } from './types';

export const stats = [
  { value: '5000+', label: 'Students Guided', icon: 'Users' },
  { value: '98%', label: 'Success Rate', icon: 'Award' },
  { value: '150+', label: 'Top Rankers', icon: 'Trophy' },
  { value: '15+', label: 'Years Experience', icon: 'Calendar' }
];

export const coreValues = [
  {
    title: 'Mission',
    desc: 'To provide high-quality, personalized academic instruction that empowers every student to realize their full potential and achieve success in Board and competitive examinations.',
    color: 'from-blue-500 to-indigo-600',
    icon: 'Target'
  },
  {
    title: 'Vision',
    desc: 'To be the most trusted and premium learning center in Bengaluru, known for nurturing conceptual clarity, analytical thinking, and ethical learning practices.',
    color: 'from-purple-500 to-pink-600',
    icon: 'Sparkles'
  },
  {
    title: 'Our Journey',
    desc: 'Started in 2011 with just 10 students, Veritas Academy has grown into a highly revered coaching hub in Hebbal, guiding thousands of board and entrance exam aspirants annually.',
    color: 'from-indigo-500 to-purple-600',
    icon: 'TrendingUp'
  }
];

export const quickFeatures = [
  { title: 'Small Batch Size', desc: 'Maximum 15-20 students per batch to ensure personalized attention and direct interaction with the educator.', icon: 'Users' },
  { title: 'Expert Faculty', desc: 'Highly experienced and passionate educators specialized in competitive curricula like JEE, NEET, and board exams.', icon: 'GraduationCap' },
  { title: 'Weekly Assessments', desc: 'Chapter-wise tests every Sunday, paired with comprehensive performance analysis and doubt clearing classes.', icon: 'ClipboardCheck' },
  { title: 'Smart Classrooms', desc: 'Equipped with interactive audio-visual panels, comfortable seating, and rich multimedia educational software.', icon: 'MonitorPlay' },
  { title: 'Personal Mentorship', desc: 'Dedicated 1-on-1 counseling for students to manage exam stress, track growth, and optimize study strategies.', icon: 'Sparkles' },
  { title: 'Parent Progress Reports', desc: 'Regular updates via digital dashboards, mobile SMS notifications, and bi-monthly parent-teacher interactions.', icon: 'BarChart3' }
];

export const whyChooseUs = [
  { title: 'Affordable Fees', desc: 'Top-tier premium education with flexible monthly installments and merit-based scholarship discounts.', icon: 'Banknote' },
  { title: 'Result-Oriented Teaching', desc: 'Proven syllabus structure mapped strictly to CBSE, state board, and competitive exam blueprints.', icon: 'CheckCircle2' },
  { title: 'Digital Learning Support', desc: 'Access to custom mock tests, recorded video sessions, and digital PDF notes via the Student Portal.', icon: 'Laptop' },
  { title: 'Mock Exams & Drill Tests', desc: 'Strict simulations of JEE, NEET, and PUC Board finals under actual timing constraints.', icon: 'FileText' }
];

export const coursesData: Course[] = [
  {
    id: 'school-6-10',
    title: 'School Tuition (Class 6 - 10)',
    category: 'School',
    duration: '1 Year (Academic Cycle)',
    eligibility: 'Students of Class 6 to 10 (CBSE/ICSE/State)',
    fees: '₹2,500/month',
    description: 'Comprehensive foundation focusing on core Mathematics, Science, and English. Strong emphasis on conceptual clarity, regular homework help, and school exam readiness.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800',
    subjects: ['Mathematics', 'Science (Physics, Chemistry, Biology)', 'English Literature & Grammar', 'Social Studies'],
    subjectType: 'General',
    gradeLevel: 'Class 6-10',
    targetExam: 'School Boards'
  },
  {
    id: 'puc-science',
    title: 'PUC Science (Class 11 & 12)',
    category: 'PUC',
    duration: '2 Years Integrated',
    eligibility: 'Class 10 completed',
    fees: '₹4,500/month',
    description: 'Rigorous training covering Karnataka State PUC / CBSE curriculum with dual emphasis on board boards and core scientific conceptual foundations.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    subjectType: 'Science',
    gradeLevel: 'PUC',
    targetExam: 'PUC Boards'
  },
  {
    id: 'puc-commerce',
    title: 'PUC Commerce (Class 11 & 12)',
    category: 'Commerce',
    duration: '2 Years',
    eligibility: 'Class 10 completed',
    fees: '₹3,500/month',
    description: 'Expert-led commerce courses guiding students through accountancy rules, business math, and logical financial structures to score maximum marks in Board exams.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
    subjects: ['Accountancy', 'Business Studies', 'Basic Mathematics', 'Economics'],
    subjectType: 'Commerce',
    gradeLevel: 'PUC',
    targetExam: 'PUC Boards'
  },
  {
    id: 'neet-coaching',
    title: 'NEET Medical Coaching',
    category: 'Competitive',
    duration: '1 or 2 Years Course',
    eligibility: 'Class 11/12 Science students',
    fees: '₹5,500/month',
    description: 'Highly competitive and structured course with daily practice sheets (DPPs), standard medical question banks, speed drill tactics, and real exam simulations.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800',
    subjects: ['Physics for NEET', 'Chemistry for NEET', 'Botany & Zoology'],
    subjectType: 'Science',
    gradeLevel: 'PUC',
    targetExam: 'NEET'
  },
  {
    id: 'jee-coaching',
    title: 'JEE Main & Advanced Prep',
    category: 'Competitive',
    duration: '2 Years Program',
    eligibility: 'Class 11/12 Science students',
    fees: '₹6,000/month',
    description: 'Rigorous engineering entrance coaching focusing on critical problem solving, quick analytical tricks, complex calculus, and multi-concept physical mechanics.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800',
    subjects: ['Advanced Mathematics', 'Analytical Physics', 'Organic & Inorganic Chemistry'],
    subjectType: 'Science',
    gradeLevel: 'PUC',
    targetExam: 'JEE'
  },
  {
    id: 'kcet-coaching',
    title: 'KCET Coaching',
    category: 'Competitive',
    duration: '1 Year Program',
    eligibility: 'Karnataka 2nd PUC Science students',
    fees: '₹4,000/month',
    description: 'Specialized state-level syllabus optimization program focused on high-speed answer elimination, past KCET papers, and state-level rank scaling models.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800',
    subjects: ['Physics', 'Chemistry', 'Mathematics / Biology'],
    subjectType: 'Science',
    gradeLevel: 'PUC',
    targetExam: 'CET'
  },
  {
    id: 'engineering-support',
    title: 'Engineering Tuition (B.E/B.Tech)',
    category: 'Engineering',
    duration: 'Semester Wise',
    eligibility: 'Engineering Students (VTU / Autonomous)',
    fees: '₹5,000/semester',
    description: 'Semester-wise tutoring for critical engineering subjects. Clear difficult calculus backlogs, mechanical modules, computer programming algorithms, and electrical circuits.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800',
    subjects: ['Engineering Mathematics (M1, M2, M3, M4)', 'Data Structures & Algorithms', 'Network Analysis', 'Engineering Physics/Chemistry'],
    subjectType: 'Engineering',
    gradeLevel: 'Undergraduate',
    targetExam: 'VTU'
  },
  {
    id: 'foundation-course',
    title: 'Early IIT/NEET Foundation (Class 8-10)',
    category: 'Foundation Course',
    duration: '3 Years Program',
    eligibility: 'Studying in Class 8, 9 or 10',
    fees: '₹3,000/month',
    description: 'Prepares students early for major national Olympiads and future entrance formats. Nurtures supreme analytical reasoning, mental math skill sets, and cognitive learning.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800',
    subjects: ['Advanced Physics/Chemistry', 'Analytical Geometry & Algebra', 'Logical Reasoning & IQ Drills'],
    subjectType: 'Science',
    gradeLevel: 'Class 6-10',
    targetExam: 'Olympiads'
  },
  {
    id: 'crash-course',
    title: 'Board Exam & CET Crash Course',
    category: 'Crash Course',
    duration: '45 Days Intensive',
    eligibility: 'Appearing for 10th/12th Finals',
    fees: '₹12,000 package',
    description: 'Express rapid learning module containing full revision maps, formula memory charts, 10 previous-year question sets, and daily doubt clearance labs prior to the exam.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800',
    subjects: ['All core syllabus revisions', 'Test strategies', 'Time-management modules'],
    subjectType: 'Science',
    gradeLevel: 'PUC',
    targetExam: 'CET'
  }
];

export const facultyData: Faculty[] = [
  {
    id: 'f1',
    name: 'Prof. Mohammed Arish',
    qualification: 'M.Tech in Mechanical Engineering (NIT Surathkal)',
    experience: '12+ Years',
    specialization: 'Physics (JEE / NEET Advanced Mechanics & Optics)',
    bio: 'Former senior faculty at a premium national coaching brand. Passionate about visualizing complex physics phenomena using animations and real-world experiments.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400', // Female photo because Hajeera Arish and Captain are female names or professional educators. Let's make the team look diverse and top-tier. Let's use clean professional avatars.
    linkedin: 'https://www.linkedin.com/in/hajeera-arish-983764371/'
  },
  {
    id: 'f2',
    name: 'Dr. Hajeera Arish',
    qualification: 'Ph.D. in Organic Chemistry (IISc Bangalore)',
    experience: '10+ Years',
    specialization: 'Chemistry (Organic Chemistry & Molecular Thermodynamics)',
    bio: 'Renowned researcher and lecturer dedicated to breaking down complicated organic reactions into memorable, logical pathways. Mentored over 50 IITians.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400',
    linkedin: 'https://www.linkedin.com/in/hajeera-arish-983764371/'
  },
  {
    id: 'f3',
    name: 'Prof. Ramesh K. S.',
    qualification: 'M.Sc. in Mathematics (TIFR Mumbai)',
    experience: '15+ Years',
    specialization: 'Advanced Mathematics (Calculus, Probability, Vectors)',
    bio: 'Author of three state-level CET preparation manuals. Known for teaching high-speed calculation hacks and mathematical derivation techniques.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    linkedin: 'https://www.linkedin.com/in/hajeera-arish-983764371/'
  },
  {
    id: 'f4',
    name: 'Mrs. Shabana Begum',
    qualification: 'M.Sc. in Biotechnology, B.Ed.',
    experience: '8+ Years',
    specialization: 'Biology (NEET Genetics, Human Physiology & Ecology)',
    bio: 'Highly popular School & PUC educator who utilizes interactive 3D anatomy and botanical diagrams to spark true enthusiasm in medical aspirants.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    linkedin: 'https://www.linkedin.com/in/hajeera-arish-983764371/'
  }
];

export const resultsData: Result[] = [
  {
    id: 'r1',
    studentName: 'Zainab Fatima',
    score: '98.4%',
    exam: '12th PUC Science State Board',
    achievement: '9th State Rank, 100/100 in Physics & Chemistry',
    college: 'Admitted to BMCRI (Bangalore Medical College)',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    year: '2025'
  },
  {
    id: 'r2',
    studentName: 'Aditya Swamy',
    score: 'AIR 432',
    exam: 'JEE Advanced',
    achievement: 'Top 0.05% nationally, 99.85 Percentile in JEE Main',
    college: 'Admitted to IIT Madras (Computer Science)',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400',
    year: '2025'
  },
  {
    id: 'r3',
    studentName: 'Syed Roshan',
    score: '685 / 720',
    exam: 'NEET UG Medical Entrance',
    achievement: 'State Category Rank 12, Score in Biology 355/360',
    college: 'Admitted to KIMS Bengaluru',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    year: '2024'
  },
  {
    id: 'r4',
    studentName: 'Neha Deshpande',
    score: '97.2%',
    exam: 'CBSE Class 10 Board',
    achievement: 'School Topper, 100/100 in Mathematics',
    college: 'Continuing PUC Science at Veritas Academy',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400',
    year: '2025'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Srinivas Swamy',
    role: 'Parent',
    feedback: 'The small batch size of 15 students was a game changer for my son Aditya. In big institutions, he was lost. Here, Prof. Arish monitored his weak areas in physics, helping him clear the JEE Advanced with an AIR of 432. Truly grateful!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    course: 'JEE Prep'
  },
  {
    id: 't2',
    name: 'Zainab Fatima',
    role: 'Student',
    feedback: 'Veritas Academy provides the best atmosphere for PUC students. The teacher-student bonding here is amazing. Dr. Hajeera chemistry trick sheets made reaction mechanisms feel so simple that I scored 100/100 in my Chemistry PUC exam!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    course: 'PUC Science'
  },
  {
    id: 't3',
    name: 'Farhan Shariff',
    role: 'Alumni',
    feedback: 'I had backlogs in VTU Engineering Mathematics M1 and M2. I was extremely stressed. Joining the semester tutoring here helped me clear both with an S-grade (90%+). The logical approach is super clear!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200',
    course: 'Engineering Support'
  },
  {
    id: 't4',
    name: 'Mrs. Anjali Deshpande',
    role: 'Parent',
    feedback: 'Weekly progress cards, mock tests, and systematic review reports kept us perfectly in sync with Neha preparation. The mental peace we got knowing she was mentored so closely is priceless.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    course: 'Class 10 CBSE'
  }
];

export const galleryData: GalleryItem[] = [
  { id: 'g1', title: 'Interactive Physics Class in Session', category: 'Classrooms', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800' },
  { id: 'g2', title: 'State-of-the-Art Biology Lab Experiment', category: 'Laboratories', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800' },
  { id: 'g3', title: 'Career Counselling Seminar 2025', category: 'Seminars', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800' },
  { id: 'g4', title: 'Annual Day Celebrations & Speeches', category: 'Annual Day', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800' },
  { id: 'g5', title: 'Sunday Chess and Brain Drills Activity', category: 'Sports', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800' },
  { id: 'g6', title: 'Award Ceremony for Class 12 Toppers', category: 'Events', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800' }
];

export const blogsData: Blog[] = [
  {
    id: 'b1',
    title: 'Top 7 Time-Management Tips for JEE Mains & NEET Prep',
    category: 'Exam Strategies',
    excerpt: 'Cracking major national competitive entrance tests requires a flawless calendar approach. Find out how to budget hours across theory, drills, and deep revisions.',
    content: `Preparing for JEE Mains or NEET can feel overwhelming, but with structured time management, you can maximize your productivity without burning out. Here is how our high-scoring rankers schedule their prep:
    
1. **Divide Your Day Into 3 Shifts**: Reserve mornings for complex theory topics (Physics derivation/Chemistry mechanisms), afternoons for speed drills/MCQs, and evenings for detailed revisions.
2. **The Pomodoro Formula**: Study in 50-minute blocks followed by 10 minutes of active walking/relaxation. This keeps cognitive retention at peak levels.
3. **Analyze Your Errors Immediately**: Don't just tick correct answers. Spending 20 minutes analyzing why an MCQ was incorrect yields 10x more learning than solving 100 new questions blindly.
4. **Active Recall**: Before starting a chapter, write down everything you remember on a blank sheet. It highlights conceptual gaps immediately.
    
Join Veritas Academy's test simulation series to master timing in actual testing conditions.`,
    author: 'Prof. Mohammed Arish',
    date: 'June 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800'
  },
  {
    id: 'b2',
    title: 'Nurturing Conceptual Clarity: Why Rote Learning Fails in PUC Science',
    category: 'Study Tips',
    excerpt: 'Many students who score 95% in Class 10 boards struggle to pass PUC exams. Learn the structural shift needed to excel in 11th and 12th standard physics and math.',
    content: `Rote learning might get you through middle-school exams, but PUC Science boards require deep understanding of the 'Why' behind every equation.
    
- **First Principles Thinking**: When studying Ohm's Law or Gauss's Law, understand how the principles are derived from elemental electrostatics rather than just memorizing formulas.
- **Concept Mapping**: Create a single-page visual connection mapping chapters. For instance, link Thermodynamics in Chemistry to Thermal Properties in Physics.
- **Avoid Formula Memorization**: If you understand the physical significance of a variable, the math flows naturally. Try explaining the concept to a classmate – if you can explain it simply, you understand it deeply.
    
Our specialized micro-batches (under 15 students) are custom designed to break the reliance on rote learning and build genuine conceptual foundations.`,
    author: 'Dr. Hajeera Arish',
    date: 'May 12, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800'
  },
  {
    id: 'b3',
    title: 'A Parents Guide: Supporting Your Child During Competitive Exams',
    category: 'Admissions',
    excerpt: 'High pressure can cause severe exam anxiety. Discover practical ways parents can create a highly encouraging and stress-free ecosystem at home.',
    content: `The pressure to secure top national ranks often leads to study anxiety and fatigue. As parents, your support is crucial during this demanding period.
    
- **De-emphasize the Mock Scores**: Understand that mock exams are learning tools, not final benchmarks. Focus on progress, not pure grades.
- **Provide a Peaceful Study Space**: Ensure the room is well-lit, quiet, and separated from television or noisy living room discussions.
- **Enforce Sleep Hygiene**: No student can perform with 4 hours of sleep. Ensure your ward sleeps 7 hours before a mock exam to align cognitive recall functions.
- **Schedule Digital-Free Breaks**: Encourage your child to step outdoors or eat dinner with family without digital gadgets.
    
At Veritas Academy, we offer bi-weekly parent counseling to bridge any communication gaps and lower student anxiety.`,
    author: 'Mrs. Shabana Begum',
    date: 'April 08, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800'
  }
];

export const faqData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is the maximum student batch size at Veritas Academy?',
    answer: 'We strictly maintain a maximum batch size of 15 to 20 students. This guarantees that our expert teachers can monitor every single student, clear individual doubts, and provide continuous personal feedback.',
    category: 'General'
  },
  {
    id: 'faq2',
    question: 'Do you offer free trial or demo classes before enrollment?',
    answer: 'Yes! We provide 3 completely free trial/demo classes for all courses. This allows students to experience our smart-classroom setup, inspect the clarity of our educational methods, and interact with the faculty before committing.',
    category: 'Admissions'
  },
  {
    id: 'faq3',
    question: 'How do parents receive updates on student progress and attendance?',
    answer: 'Parents get instant automated SMS notifications upon check-in/out. Every Sunday test result is uploaded to the Parent Portal. We also host 1-on-1 parent-teacher meetings bi-monthly to discuss critical progress.',
    category: 'General'
  },
  {
    id: 'faq4',
    question: 'Are scholarship discounts available for bright or underprivileged students?',
    answer: 'Absolutely. We offer up to 50% merit scholarships based on Class 10 / Class 12 board marks, or our internal Scholarship Test performance. We also offer customized fee relief for economically weaker sections.',
    category: 'Fees'
  },
  {
    id: 'faq5',
    question: 'Do you provide offline coaching, online classes, or a hybrid model?',
    answer: 'We primarily focus on offline classes at our physical center in Hebbal to maintain active, distraction-free study energy. However, all our lectures are recorded, enabling students to revise chapters online from home via the Student Portal.',
    category: 'Online Classes'
  },
  {
    id: 'faq6',
    question: 'What are the batch timings for School Tuitions and PUC Science courses?',
    answer: 'School Tuitions run from 4:30 PM to 6:30 PM (Monday to Saturday). PUC Science & Entrance Batches run in two shifts: Morning (6:30 AM - 8:30 AM) and Evening (5:30 PM - 8:30 PM) to align smoothly with regular college timings.',
    category: 'Academics'
  }
];

export const noticeBoardData: Notice[] = [
  {
    id: 'n1',
    title: 'Admissions Open: JEE & NEET repeaters and crash-course batches',
    date: 'July 10, 2026',
    category: 'Batches',
    content: 'Special batch for medical/engineering crash courses starts July 15, 2026. Registrations are closing fast. Secure your seat via the portal today.',
    isNew: true
  },
  {
    id: 'n2',
    title: 'Scholarship Aptitude Test (SAT-2026) Scheduled on July 13th',
    date: 'July 05, 2026',
    category: 'Exams',
    content: 'Syllabus: Basic Math, Science & IQ reasoning. Register online for free to secure up to 50% fee waivers for all PUC and Foundation courses.',
    isNew: true
  },
  {
    id: 'n3',
    title: 'Parents-Teachers Meeting (PTM) for PUC Science & Commerce',
    date: 'July 02, 2026',
    category: 'Events',
    content: 'PTM scheduled this Saturday (July 5th) between 4:00 PM and 7:00 PM to review June monthly evaluation cards and clear board strategies.',
    isNew: false
  },
  {
    id: 'n4',
    title: 'Formula Sheets and Mock Paper uploads on Student Portal',
    date: 'June 28, 2026',
    category: 'Important',
    content: 'NCERT aligned formula sheets for Class 12 Electrostatics and Organic chemistry reagents have been uploaded. Download now in study materials.',
    isNew: false
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Class 12 Physics: Electrostatics & Coulomb\'s Law',
    subject: 'Physics',
    questions: [
      {
        id: 'q1_1',
        question: 'Two equal point charges separated by distance r repel each other with force F. If distance is halved and charges are doubled, the new force is:',
        options: ['4 F', '8 F', '16 F', '2 F'],
        correctAnswer: 2, // 16 F
        explanation: 'F = k * q1 * q2 / r^2. If charges are doubled (4x) and distance is halved (1/(1/4) = 4x), the force increases by 4 * 4 = 16 times.'
      },
      {
        id: 'q1_2',
        question: 'A hollow conducting sphere of radius R is given a charge +Q. What is the electric field inside the sphere at distance r (r < R)?',
        options: ['kQ / r^2', 'kQ / R^2', 'Zero', 'kQ / (R-r)^2'],
        correctAnswer: 2, // Zero
        explanation: 'Inside a hollow conducting sphere, the electric charge resides entirely on the outer surface. By Gauss\'s Law, the electric field inside is zero.'
      },
      {
        id: 'q1_3',
        question: 'Which of the following is the SI unit of electric permittivity (ε0)?',
        options: ['C^2 N^-1 m^-2', 'N m^2 C^-2', 'C N^-1 m^-1', 'N C^-2 m^2'],
        correctAnswer: 0, // C^2 N^-1 m^-2
        explanation: 'From Coulomb\'s Law, F = (1 / 4πε0) * (q1 q2 / r^2). Rearranging gives ε0 unit as C^2 / (N * m^2) = C^2 N^-1 m^-2.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Class 12 Chemistry: Organic Reagents & Conversions',
    subject: 'Chemistry',
    questions: [
      {
        id: 'q2_1',
        question: 'Which of the following reagents is best suited to convert an alcohol directly to an alkyl chloride with maximum purity?',
        options: ['Conc. HCl + ZnCl2', 'PCl5', 'SOCl2 (Thionyl Chloride)', 'PCl3'],
        correctAnswer: 2, // SOCl2
        explanation: 'Thionyl chloride (SOCl2) is the best reagent because the side products (SO2 and HCl) are gaseous and escape, leaving behind pure alkyl halide.'
      },
      {
        id: 'q2_2',
        question: 'The reaction of an alkyl halide with sodium metal in dry ether to form a symmetrical alkane is known as:',
        options: ['Finkelstein Reaction', 'Wurtz Reaction', 'Sandmeyer Reaction', 'Kolbe\'s Reaction'],
        correctAnswer: 1, // Wurtz Reaction
        explanation: 'Wurtz reaction involves coupling of two alkyl groups in the presence of sodium metal and dry ether to form a higher symmetrical alkane.'
      }
    ]
  },
  {
    id: 'q3',
    title: 'Advanced Mathematics: Limits & Derivatives Practice',
    subject: 'Mathematics',
    questions: [
      {
        id: 'q3_1',
        question: 'Evaluate the limit: lim (x -> 0) [sin(5x) / x]',
        options: ['1', '5', '0', 'Does not exist'],
        correctAnswer: 1, // 5
        explanation: 'Using the standard limit property lim (u->0) sin(u)/u = 1, we multiply and divide by 5: lim (x->0) 5 * [sin(5x) / 5x] = 5 * 1 = 5.'
      },
      {
        id: 'q3_2',
        question: 'What is the derivative of x^x with respect to x?',
        options: ['x * x^(x-1)', 'x^x * ln(x)', 'x^x * (1 + ln(x))', 'x^x * (1 - ln(x))'],
        correctAnswer: 2, // x^x * (1 + ln(x))
        explanation: 'Let y = x^x. Taking natural logs: ln(y) = x ln(x). Differentiating: (1/y)(dy/dx) = ln(x) + x(1/x) = ln(x) + 1. Thus dy/dx = x^x * (1 + ln(x)).'
      }
    ]
  }
];

export const studyMaterialsData: StudyMaterial[] = [
  {
    id: 'sm1',
    title: 'Veritas Comprehensive Center Brochure & Syllabus Guide 2026',
    category: 'Brochure',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    downloadCount: 1245,
    url: '#'
  },
  {
    id: 'sm2',
    title: 'JEE / NEET Formula Booklet - Complete Physics Mechanics & Waves',
    category: 'Formula Sheet',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    downloadCount: 890,
    url: '#'
  },
  {
    id: 'sm3',
    title: 'Class 10 CBSE Math - High Scoring Chapterwise Sample Papers',
    category: 'Notes',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    downloadCount: 612,
    url: '#'
  },
  {
    id: 'sm4',
    title: 'Karnataka 2nd PUC Commerce - Accountancy Revision Kit 2026',
    category: 'Syllabus',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadCount: 430,
    url: '#'
  }
];
