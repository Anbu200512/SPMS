const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Subject = require('../models/Subject');
const Event = require('../models/Event');
const News = require('../models/News');
const Settings = require('../models/Settings');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    await Promise.all([
      User.deleteMany({}),
      Teacher.deleteMany({}),
      Student.deleteMany({}),
      Admin.deleteMany({}),
      Class.deleteMany({}),
      Section.deleteMany({}),
      Subject.deleteMany({}),
      Event.deleteMany({}),
      News.deleteMany({}),
      Settings.deleteMany({}),
    ]);
    console.log('Existing data cleared');

    // Admin
    const adminUser = await User.create({ name: 'Super Admin', email: 'admin@stpauls.com', password: 'password123', role: 'admin', phone: '1234567890' });
    await Admin.create({ user: adminUser._id, employeeId: 'ADM001', designation: 'Principal', department: 'Administration' });
    console.log('Admin: admin@stpauls.com / password123');

    // Classes
    const classDocs = await Class.insertMany([
      { name: 'Class 1', code: '1', section: 'A,B', description: 'Primary' },
      { name: 'Class 2', code: '2', section: 'A,B', description: 'Primary' },
      { name: 'Class 3', code: '3', section: 'A,B', description: 'Primary' },
      { name: 'Class 4', code: '4', section: 'A,B', description: 'Primary' },
      { name: 'Class 5', code: '5', section: 'A,B', description: 'Primary' },
      { name: 'Class 6', code: '6', section: 'A,B', description: 'Middle' },
      { name: 'Class 7', code: '7', section: 'A,B', description: 'Middle' },
      { name: 'Class 8', code: '8', section: 'A,B', description: 'Middle' },
      { name: 'Class 9', code: '9', section: 'A,B,C', description: 'High' },
      { name: 'Class 10', code: '10', section: 'A,B,C', description: 'High' },
    ]);
    const classMap = {};
    classDocs.forEach((c) => { classMap[c.name] = c; });
    console.log(`${classDocs.length} classes created`);

    // Sections
    const sectionDocs = [];
    for (const cls of classDocs) {
      const secs = cls.section.split(',');
      for (const sec of secs) {
        sectionDocs.push({ name: sec.trim(), class: cls._id, roomNo: `${cls.code}${sec.trim()}`, capacity: 40 });
      }
    }
    const sectionData = await Section.insertMany(sectionDocs);
    const sectionMap = {};
    sectionData.forEach((s) => {
      const key = `${s.class.toString()}_${s.name}`;
      sectionMap[key] = s;
    });
    console.log(`${sectionDocs.length} sections created`);

    // Subjects
    const subjectNames = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science', 'Physics', 'Chemistry', 'Biology'];
    const subjectCodes = ['MATH', 'ENG', 'SCI', 'SOC', 'HIN', 'CS', 'PHY', 'CHEM', 'BIO'];
    const subjectDocs = [];
    for (const cls of classDocs) {
      const count = parseInt(cls.code) <= 5 ? 5 : 9;
      for (let i = 0; i < count; i++) {
        subjectDocs.push({ name: subjectNames[i], code: `${subjectCodes[i]}${cls.code}`, class: cls._id, description: `${subjectNames[i]} for ${cls.name}` });
      }
    }
    const subjectData = await Subject.insertMany(subjectDocs);
    const subjectMap = {};
    subjectData.forEach((s) => {
      const key = `${s.class.toString()}_${s.name}`;
      subjectMap[key] = s;
    });
    console.log(`${subjectDocs.length} subjects created`);

    const getSection = (className, secName) => sectionMap[`${classMap[className]._id.toString()}_${secName}`];
    const getSubject = (className, subName) => subjectMap[`${classMap[className]._id.toString()}_${subName}`];

    // Teachers
    const t1 = await User.create({ name: 'Priya Sharma', email: 'priya@stpauls.com', password: 'password123', role: 'teacher', phone: '9876543210' });
    await Teacher.create({ user: t1._id, employeeId: 'TCH001', qualification: 'M.Sc. Physics', specialization: 'Science', experience: 8, classes: [classMap['Class 8']._id], subjects: [getSubject('Class 8', 'Science')._id], gender: 'Female', joiningDate: new Date('2020-06-01') });
    console.log('Teacher: priya@stpauls.com / password123 (Priya - Science - Class 8)');

    const t2 = await User.create({ name: 'Rahul Verma', email: 'rahul@stpauls.com', password: 'password123', role: 'teacher', phone: '9876543211' });
    await Teacher.create({ user: t2._id, employeeId: 'TCH002', qualification: 'M.Sc. Mathematics', specialization: 'Mathematics', experience: 5, classes: [classMap['Class 10']._id], subjects: [getSubject('Class 10', 'Mathematics')._id], gender: 'Male', joiningDate: new Date('2021-08-15') });
    console.log('Teacher: rahul@stpauls.com / password123 (Rahul - Maths - Class 10)');

    const t3 = await User.create({ name: 'Ananya Gupta', email: 'ananya@stpauls.com', password: 'password123', role: 'teacher', phone: '9876543212' });
    await Teacher.create({ user: t3._id, employeeId: 'TCH003', qualification: 'M.A. English Literature', specialization: 'English', experience: 12, classes: [classMap['Class 6']._id, classMap['Class 7']._id], subjects: [getSubject('Class 6', 'English')._id, getSubject('Class 7', 'English')._id], gender: 'Female', joiningDate: new Date('2018-04-10') });
    console.log('Teacher: ananya@stpauls.com / password123 (Ananya - English - Class 6,7)');

    const t4 = await User.create({ name: 'Vikram Patel', email: 'vikram@stpauls.com', password: 'password123', role: 'teacher', phone: '9876543213' });
    await Teacher.create({ user: t4._id, employeeId: 'TCH004', qualification: 'B.Tech Computer Science', specialization: 'Computer Science', experience: 6, classes: [classMap['Class 9']._id, classMap['Class 10']._id], subjects: [getSubject('Class 9', 'Computer Science')._id, getSubject('Class 10', 'Computer Science')._id], gender: 'Male', joiningDate: new Date('2019-07-20') });
    console.log('Teacher: vikram@stpauls.com / password123 (Vikram - CS - Class 9,10)');

    // Students for Class 8
    for (let i = 1; i <= 10; i++) {
      const sec = i <= 5 ? getSection('Class 8', 'A') : getSection('Class 8', 'B');
      const su = await User.create({ name: `Student ${i} Class 8`, email: `student8_${i}@stpauls.com`, password: 'password123', role: 'student' });
      await Student.create({ user: su._id, admissionNo: `ADM24${100 + i}`, rollNo: `${i}`, class: classMap['Class 8']._id, section: sec._id, parentName: `Parent ${i}`, parentPhone: `9876500${i}`, parentEmail: `parent8_${i}@email.com` });
    }

    // Students for Class 10
    const sec10C = getSection('Class 10', 'C');
    for (let i = 1; i <= 10; i++) {
      const su = await User.create({ name: `Student ${i} Class 10`, email: `student10_${i}@stpauls.com`, password: 'password123', role: 'student' });
      await Student.create({ user: su._id, admissionNo: `ADM25${100 + i}`, rollNo: `${i}`, class: classMap['Class 10']._id, section: sec10C._id, parentName: `Parent ${i}`, parentPhone: `9876600${i}`, parentEmail: `parent10_${i}@email.com` });
    }
    console.log('Sample students created for Class 8 and Class 10');

    // Settings
    await Settings.insertMany([
      { key: 'schoolName', value: "St. Paul's School", description: 'School display name' },
      { key: 'schoolAddress', value: '123 Education Lane, Knowledge City', description: 'School address' },
      { key: 'schoolPhone', value: '+1-234-567-8900', description: 'School phone number' },
      { key: 'schoolEmail', value: 'info@stpaulsschool.com', description: 'School email address' },
      { key: 'academicYear', value: '2026-2027', description: 'Current academic year' },
      { key: 'website', value: 'https://stpaulsschool.com', description: 'School website URL' },
    ]);
    console.log('Settings created');

    // Events
    await Event.insertMany([
      { title: 'Annual Sports Day', description: 'Annual sports competition', date: new Date('2026-12-15'), startTime: '08:00', endTime: '16:00', venue: 'School Sports Ground', type: 'Sports', isUpcoming: true },
      { title: 'Parent-Teacher Meeting', description: 'Quarterly meeting', date: new Date('2026-07-20'), startTime: '09:00', endTime: '12:00', venue: 'School Auditorium', type: 'Meeting', isUpcoming: true },
      { title: 'Independence Day', description: 'Celebration with cultural programs', date: new Date('2026-08-15'), startTime: '08:30', endTime: '11:00', venue: 'School Ground', type: 'Celebration', isUpcoming: true },
    ]);
    console.log('Events created');

    await News.insertMany([
      { title: 'Welcome to Academic Year 2026-27', content: 'Classes commence from July 1st.', excerpt: 'New academic year begins', category: 'Announcement', author: 'Administration', isPublished: true, publishedDate: new Date('2026-06-01') },
      { title: 'Annual Exam Results Declared', content: 'Results available on student portal.', excerpt: 'Results online', category: 'ExamNotice', author: 'Examination Dept', isPublished: true, publishedDate: new Date('2026-04-15') },
    ]);
    console.log('News created');

    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================');
    console.log('\nLogin Credentials:');
    console.log('  Admin:    admin@stpauls.com / password123');
    console.log('  Teacher:  priya@stpauls.com / password123  (Priya - Science - Class 8)');
    console.log('  Teacher:  rahul@stpauls.com / password123  (Rahul - Mathematics - Class 10)');
    console.log('  Teacher:  ananya@stpauls.com / password123 (Ananya - English - Class 6,7)');
    console.log('  Teacher:  vikram@stpauls.com / password123 (Vikram - CS - Class 9,10)');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

seedData();
