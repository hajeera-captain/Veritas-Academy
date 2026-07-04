export interface Course {
  id: string;
  title: string;
  category: 'School' | 'PUC' | 'Competitive' | 'Engineering' | 'Crash Course' | 'Commerce' | 'Foundation Course';
  duration: string;
  eligibility: string;
  fees: string;
  description: string;
  image: string;
  subjects: string[];
  subjectType: 'Science' | 'Commerce' | 'Engineering' | 'General';
  gradeLevel: 'Class 6-10' | 'PUC' | 'Undergraduate';
  targetExam: 'NEET' | 'JEE' | 'CET' | 'School Boards' | 'PUC Boards' | 'VTU' | 'Olympiads';
}

export interface Faculty {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialization: string;
  bio: string;
  image: string;
  linkedin: string;
}

export interface Result {
  id: string;
  studentName: string;
  score: string;
  exam: string;
  achievement: string;
  college: string;
  image: string;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent' | 'Alumni';
  feedback: string;
  rating: number;
  avatar: string;
  course: string;
}

export interface Blog {
  id: string;
  title: string;
  category: 'Study Tips' | 'Exam Strategies' | 'Admissions' | 'News';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Fees' | 'Academics' | 'Online Classes' | 'General';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classrooms' | 'Events' | 'Seminars' | 'Annual Day' | 'Sports' | 'Laboratories';
  image: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Important' | 'Batches' | 'Exams' | 'Events';
  content: string;
  isNew?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  category: 'Syllabus' | 'Notes' | 'Brochure' | 'Formula Sheet';
  fileType: 'PDF' | 'ZIP' | 'DOCX';
  fileSize: string;
  downloadCount: number;
  url: string;
}
