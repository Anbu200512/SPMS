const facilitiesData = [
  {
    id: 1,
    title: 'Smart Classrooms',
    category: 'Academic',
    description: 'All classrooms are equipped with interactive smart boards, projectors, and modern audio-visual aids to enhance the learning experience.',
    longDescription: 'Our 50+ smart classrooms feature 86-inch interactive flat panels, document cameras, and sound systems. Teachers use digital content platforms to deliver engaging lessons. Classrooms are designed for collaborative learning with flexible seating arrangements.',
    image: 'https://images.unsplash.com/photo-1580582932473-3f9a7a1f2c6d?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    capacity: '40 per room',
    total: '52 classrooms',
    timing: '8:00 AM - 3:30 PM',
    incharge: 'Mr. Rajesh Kumar',
    phone: '+91 98765 43210',
    location: 'Academic Block A & B',
    features: ['Interactive Flat Panels', 'Lecture Capture', 'WiFi 6', 'Flexible Seating', 'HVAC'],
  },
  {
    id: 2,
    title: 'Computer Lab',
    category: 'Academic',
    description: 'Fully air-conditioned computer labs with 120+ latest systems, high-speed internet, and a wide range of educational software.',
    longDescription: 'Three state-of-the-art computer labs with 120 thin-client systems powered by Intel i7 processors. Labs are equipped with licensed software including Adobe Creative Suite, AutoCAD, Python IDEs, and SQL servers.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    color: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    capacity: '40 per lab',
    total: '3 labs (120 systems)',
    timing: '8:00 AM - 5:00 PM',
    incharge: 'Ms. Priya Sharma',
    phone: '+91 98765 43211',
    location: 'Academic Block B, Floor 2',
    features: ['i7 Systems', 'Adobe Suite', 'AutoCAD', 'High-Speed Internet', 'UPS Backup'],
  },
  {
    id: 3,
    title: 'Science Lab',
    category: 'Academic',
    description: 'Well-equipped physics, chemistry, and biology laboratories with modern apparatus and safety equipment for hands-on learning.',
    longDescription: 'Three dedicated labs for Physics, Chemistry, and Biology spread across 5000 sq ft. Each lab has individual workstations with gas, water, and electrical connections. We have digital microscopes, spectrophotometers, and a fully stocked chemical store.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    capacity: '30 per lab',
    total: '3 labs',
    timing: '8:00 AM - 4:00 PM',
    incharge: 'Dr. Suresh Reddy',
    phone: '+91 98765 43212',
    location: 'Science Block, Floor 1',
    features: ['Digital Microscopes', 'Spectrophotometer', 'Safety Showers', 'Fume Hoods', 'Chemical Store'],
  },
  {
    id: 4,
    title: 'Central Library',
    category: 'Academic',
    description: 'A vast library with over 25,000 books, 100+ journals, and extensive digital resources. Quiet reading zones and group study rooms available.',
    longDescription: 'The 15,000 sq ft central library houses 25,000+ books, 120 national and international journals, and subscribes to 8 online databases including J-Gate and ProQuest. Features include a digital library section with 30 workstations, RFID-enabled checkout, a reference section, and 4 group study pods.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
    capacity: '200 readers',
    total: '25,000+ books',
    timing: '7:30 AM - 7:00 PM',
    incharge: 'Mrs. Lakshmi Nair',
    phone: '+91 98765 43213',
    location: 'Academic Block C, Floor 1-2',
    features: ['Digital Library', 'RFID System', 'Group Study Pods', 'Online Databases', 'Reference Section'],
  },
  {
    id: 5,
    title: 'Sports Complex',
    category: 'Sports',
    description: 'Extensive sports facilities including a football field, basketball court, volleyball court, indoor badminton, and a modern gymnasium.',
    longDescription: 'Our 10-acre sports complex features a FIFA-standard football pitch, 2 basketball courts, 4 volleyball courts, 6 badminton courts, a 400m synthetic athletic track, and a modern indoor gymnasium with cardio and strength training equipment.',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    color: 'from-red-500 to-red-600',
    bgLight: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
    capacity: '2000 spectators',
    total: '10 acre complex',
    timing: '6:00 AM - 6:00 PM',
    incharge: 'Coach Vikram Singh',
    phone: '+91 98765 43214',
    location: 'Sports Zone, East Campus',
    features: ['Football Pitch', 'Athletic Track', 'Basketball Courts', 'Indoor Gym', 'Swimming Pool'],
  },
  {
    id: 6,
    title: 'Transportation',
    category: 'Infrastructure',
    description: 'Safe and reliable fleet of 25 school buses covering all major routes with GPS tracking, CCTV, and trained attendants.',
    longDescription: 'Our fleet of 25 GPS-tracked buses covers 40+ routes across the city. Each bus has CCTV cameras, speed governors, first-aid kits, and a trained attendant. Parents can track bus locations in real-time through our mobile app.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    color: 'from-cyan-500 to-cyan-600',
    bgLight: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
    capacity: '50 per bus',
    total: '25 buses, 40 routes',
    timing: '6:30 AM - 5:00 PM',
    incharge: 'Mr. Anand Joshi',
    phone: '+91 98765 43215',
    location: 'Transport Hub, Main Gate',
    features: ['GPS Tracking', 'CCTV', 'Speed Governors', 'Trained Attendants', 'Mobile App'],
  },
  {
    id: 7,
    title: 'Medical Room',
    category: 'Health',
    description: 'A well-equipped infirmary with a full-time nurse, visiting doctor, first-aid facilities, and regular health check-up camps.',
    longDescription: 'Our 600 sq ft medical room has 4 observation beds, an examination area, and a pharmacy stocked with essential medicines. A full-time registered nurse is available during school hours, and a doctor visits twice a week.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: 'from-pink-500 to-pink-600',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-200',
    capacity: '4 beds',
    total: '24/7 availability',
    timing: '7:30 AM - 4:30 PM',
    incharge: 'Nurse Sarah Thomas',
    phone: '+91 98765 43216',
    location: 'Ground Floor, Admin Block',
    features: ['Observation Beds', 'Pharmacy', 'Visiting Doctor', 'Health Camps', 'Ambulance'],
  },
  {
    id: 8,
    title: 'Cafeteria',
    category: 'Infrastructure',
    description: 'A spacious, hygienic cafeteria serving nutritious and delicious meals prepared under strict quality standards.',
    longDescription: 'Our 500-seat cafeteria serves breakfast, lunch, and snacks prepared in a modern kitchen with steam cooking, proper ventilation, and cold storage. The menu is planned by a nutritionist and changes weekly.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    color: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    capacity: '500 seats',
    total: '3 meals daily',
    timing: '7:30 AM - 6:00 PM',
    incharge: 'Chef Mohan Das',
    phone: '+91 98765 43217',
    location: 'Student Center, Ground Floor',
    features: ['Nutritious Menu', 'Jain Counter', 'Salad Bar', 'Steam Cooking', 'AC Dining'],
  },
  {
    id: 9,
    title: 'Auditorium',
    category: 'Cultural',
    description: 'A grand 1000-seat air-conditioned auditorium with professional acoustics and stage lighting for events and assemblies.',
    longDescription: 'The 1000-seat AC auditorium features a professional-grade sound system, programmable stage lighting, a 20x30 ft LED screen, green room facilities, and a 50-seat VIP balcony.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0-.5292-.4307 49.5 49.5 0 0 0-.475-.388m5.035-.005a60.439 60.439 0 0 0 .529.4307 49.04 49.04 0 0 0 .6.464m-1.129-2.894.759-.652m-.759.652a20.919 20.919 0 0 1-.117.255m6.464-2.824.76.652m-.76-.652a20.926 20.926 0 0 1 .117.255m3.634 9.81-3.634-2.032m0 0-3.634 2.032m0 0 .254 4.128 3.38-2.096m-3.634-2.032L9 16.5m12-4.5a48 48 0 0 0-6.364 3.188M9 16.5a48 48 0 0 1-6.364-3.188M9 16.5v3.375a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V16.5" />
      </svg>
    ),
    color: 'from-indigo-500 to-indigo-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    capacity: '1000 seats',
    total: '20,000 sq ft',
    timing: '8:00 AM - 8:00 PM',
    incharge: 'Mr. Arvind Menon',
    phone: '+91 98765 43218',
    location: 'Cultural Center, Main Campus',
    features: ['LED Screen', 'Pro Sound System', 'Stage Lighting', 'Green Room', 'VIP Balcony'],
  },
  {
    id: 10,
    title: 'Music & Arts Studio',
    category: 'Cultural',
    description: 'Dedicated spaces for music, dance, and visual arts with soundproof rooms and professional-grade instruments.',
    longDescription: 'Our arts block houses a 40-seat music room with 20 keyboard stations, a soundproof drum room, a dance studio with mirrored walls and ballet barres, and a visual arts studio with pottery wheels, kilns, and ample natural lighting.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    color: 'from-violet-500 to-violet-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-200',
    capacity: '40 per session',
    total: '3 studios',
    timing: '8:00 AM - 5:00 PM',
    incharge: 'Ms. Ananya Gupta',
    phone: '+91 98765 43219',
    location: 'Cultural Center, Floor 2',
    features: ['Keyboard Lab', 'Dance Studio', 'Pottery Studio', 'Soundproof Rooms', 'Music Instruments'],
  },
  {
    id: 11,
    title: 'Hostel',
    category: 'Infrastructure',
    description: 'Separate boys and girls hostels with 24/7 security, WiFi, common rooms, and nutritious dining facilities.',
    longDescription: 'Our residential facilities include separate hostels for boys and girls with a combined capacity of 300 students. Rooms are spacious with attached bathrooms, study tables, and wardrobes. Facilities include 24/7 WiFi, RO water purifiers, common rooms with TV, indoor games, a reading room, and a dedicated mess.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-50',
    textColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    capacity: '300 students',
    total: '2 hostels',
    timing: '24/7',
    incharge: 'Mr. Ravi Shankar (Boys), Mrs. Sunita Devi (Girls)',
    phone: '+91 98765 43220',
    location: 'Hostel Complex, West Campus',
    features: ['24/7 Security', 'WiFi', 'Common Room', 'RO Water', 'Mess'],
  },
  {
    id: 12,
    title: 'Swimming Pool',
    category: 'Sports',
    description: 'A 25-meter semi-Olympic swimming pool with trained lifeguards, changing rooms, and regular swimming coaching.',
    longDescription: 'Our semi-Olympic 25m x 12.5m swimming pool has 6 lanes with anti-wave lane ropes, a deep end of 4.5ft to 12ft, and a separate kiddie pool. The pool is heated during winter months and has a state-of-the-art filtration system.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-sky-500 to-sky-600',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-600',
    borderColor: 'border-sky-200',
    capacity: '60 per session',
    total: '25m x 12.5m',
    timing: '6:30 AM - 5:30 PM',
    incharge: 'Coach Rajat Verma',
    phone: '+91 98765 43221',
    location: 'Sports Complex, East Campus',
    features: ['Heated Pool', 'Kiddie Pool', 'Lifeguards', 'Coaching', 'Filtration System'],
  },
];

export default facilitiesData;
