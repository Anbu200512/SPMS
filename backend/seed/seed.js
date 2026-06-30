const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
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
      Class.deleteMany({}),
      Section.deleteMany({}),
      Subject.deleteMany({}),
      Event.deleteMany({}),
      News.deleteMany({}),
      Settings.deleteMany({}),
    ]);
    console.log('Existing data cleared');

    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'admin@stpauls.com',
      password: 'password123',
      role: 'admin',
      phone: '1234567890',
    });
    console.log('Admin user created: admin@stpauls.com / password123');

    const classes = await Class.insertMany([
      { name: 'Class 1', code: '1', section: 'A,B', description: 'Primary Section Class 1' },
      { name: 'Class 2', code: '2', section: 'A,B', description: 'Primary Section Class 2' },
      { name: 'Class 3', code: '3', section: 'A,B', description: 'Primary Section Class 3' },
      { name: 'Class 4', code: '4', section: 'A,B', description: 'Primary Section Class 4' },
      { name: 'Class 5', code: '5', section: 'A,B', description: 'Primary Section Class 5' },
      { name: 'Class 6', code: '6', section: 'A,B', description: 'Middle School Class 6' },
      { name: 'Class 7', code: '7', section: 'A,B', description: 'Middle School Class 7' },
      { name: 'Class 8', code: '8', section: 'A,B', description: 'Middle School Class 8' },
      { name: 'Class 9', code: '9', section: 'A,B,C', description: 'High School Class 9' },
      { name: 'Class 10', code: '10', section: 'A,B,C', description: 'High School Class 10' },
    ]);
    console.log(`${classes.length} classes created`);

    const sectionData = [];
    for (const cls of classes) {
      const sections = cls.section.split(',');
      for (const sec of sections) {
        sectionData.push({
          name: sec.trim(),
          class: cls._id,
          roomNo: `${cls.code}${sec.trim()}`,
          capacity: 40,
        });
      }
    }
    await Section.insertMany(sectionData);
    console.log(`${sectionData.length} sections created`);

    const subjectNames = [
      { name: 'Mathematics', code: 'MATH' },
      { name: 'English', code: 'ENG' },
      { name: 'Science', code: 'SCI' },
      { name: 'Social Studies', code: 'SOC' },
      { name: 'Hindi', code: 'HIN' },
      { name: 'Computer Science', code: 'CS' },
      { name: 'Physics', code: 'PHY' },
      { name: 'Chemistry', code: 'CHEM' },
      { name: 'Biology', code: 'BIO' },
    ];

    const subjectData = [];
    for (const cls of classes) {
      const numSubjects = cls.code <= '5' ? 5 : 9;
      for (let i = 0; i < numSubjects; i++) {
        subjectData.push({
          name: subjectNames[i].name,
          code: `${subjectNames[i].code}${cls.code}`,
          class: cls._id,
          description: `${subjectNames[i].name} for ${cls.name}`,
        });
      }
    }
    await Subject.insertMany(subjectData);
    console.log(`${subjectData.length} subjects created`);

    const settings = await Settings.insertMany([
      { key: 'schoolName', value: 'St. Paul\'s School', description: 'School display name' },
      { key: 'schoolAddress', value: '123 Education Lane, Knowledge City', description: 'School address' },
      { key: 'schoolPhone', value: '+1-234-567-8900', description: 'School phone number' },
      { key: 'schoolEmail', value: 'info@stpaulsschool.com', description: 'School email address' },
      { key: 'academicYear', value: '2026-2027', description: 'Current academic year' },
      { key: 'website', value: 'https://stpaulsschool.com', description: 'School website URL' },
    ]);
    console.log(`${settings.length} settings created');

    const events = await Event.insertMany([
      {
        title: 'Annual Sports Day',
        description: 'Annual sports and athletics competition',
        date: new Date('2026-12-15'),
        startTime: '08:00',
        endTime: '16:00',
        venue: 'School Sports Ground',
        type: 'Sports',
        isUpcoming: true,
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'Quarterly parent-teacher interaction meeting',
        date: new Date('2026-07-20'),
        startTime: '09:00',
        endTime: '12:00',
        venue: 'School Auditorium',
        type: 'Meeting',
        isUpcoming: true,
      },
      {
        title: 'Independence Day Celebration',
        description: 'Celebration of Independence Day with cultural programs',
        date: new Date('2026-08-15'),
        startTime: '08:30',
        endTime: '11:00',
        venue: 'School Ground',
        type: 'Celebration',
        isUpcoming: true,
      },
    ]);
    console.log(`${events.length} events created`);

    const newsItems = await News.insertMany([
      {
        title: 'Welcome to the New Academic Year 2026-27',
        content: 'We are excited to welcome all students and parents to the new academic year. Classes will commence from July 1st, 2026. Please check the school website for the detailed timetable and class schedules.',
        excerpt: 'New academic year begins July 1st, 2026',
        category: 'Announcement',
        author: 'Administration',
        isPublished: true,
        publishedDate: new Date('2026-06-01'),
      },
      {
        title: 'Annual Examination Results Declared',
        content: 'The results for the annual examinations have been declared. Students can check their results on the student portal using their credentials.',
        excerpt: 'Annual exam results are now available online',
        category: 'ExamNotice',
        author: 'Examination Department',
        isPublished: true,
        publishedDate: new Date('2026-04-15'),
      },
    ]);
    console.log(`${newsItems.length} news items created`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
