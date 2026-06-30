export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    UPDATE_PASSWORD: '/auth/update-password',
    UPDATE_PROFILE: '/auth/update-profile',
  },
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  CLASSES: '/classes',
  SUBJECTS: '/subjects',
  ATTENDANCE: '/attendance',
  EXAMS: '/exams',
  MARKS: '/marks',
  FEES: '/fees',
  TIMETABLE: '/timetable',
  ANNOUNCEMENTS: '/announcements',
  EVENTS: '/events',
  GALLERY: '/gallery',
  NEWS: '/news',
  CONTACT: '/contact',
  ADMISSIONS: '/admissions',
  LEAVE: '/leave',
  NOTIFICATIONS: '/notifications',
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  {
    label: 'Campus Life',
    path: '#',
    children: [
      { label: 'Facilities', path: '/facilities' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Events', path: '/events' },
      { label: 'News', path: '/news' },
    ],
  },
  { label: 'Contact', path: '/contact' },
];
