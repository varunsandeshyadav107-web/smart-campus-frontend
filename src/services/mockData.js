// Mock campus dataset — Rich realistic data for better visualization & demo

const INITIAL_STUDENTS = [
  // CSE Department
  { id: 1,  rollNumber: "22CSE101", fullName: "Ananya Reddy",        email: "ananya.reddy@campus.edu",       department: "CSE",       yearOfStudy: 3, phoneNumber: "+91 98765 43210" },
  { id: 2,  rollNumber: "22CSE102", fullName: "Rohan Varma",         email: "rohan.varma@campus.edu",        department: "CSE",       yearOfStudy: 3, phoneNumber: "+91 98451 23456" },
  { id: 3,  rollNumber: "23CSE103", fullName: "Kavya Nair",          email: "kavya.nair@campus.edu",         department: "CSE",       yearOfStudy: 2, phoneNumber: "+91 97123 45678" },
  { id: 4,  rollNumber: "21CSE104", fullName: "Siddharth Menon",     email: "siddharth.menon@campus.edu",    department: "CSE",       yearOfStudy: 4, phoneNumber: "+91 98220 11223" },
  { id: 5,  rollNumber: "24CSE105", fullName: "Pooja Iyer",          email: "pooja.iyer@campus.edu",         department: "CSE",       yearOfStudy: 1, phoneNumber: "+91 94455 66778" },
  { id: 6,  rollNumber: "22CSE106", fullName: "Karthik Subramaniam", email: "karthik.sub@campus.edu",        department: "CSE",       yearOfStudy: 3, phoneNumber: "+91 99887 76655" },
  { id: 7,  rollNumber: "21CSE107", fullName: "Divya Krishnamurthy", email: "divya.km@campus.edu",           department: "CSE",       yearOfStudy: 4, phoneNumber: "+91 98123 45678" },
  { id: 8,  rollNumber: "23CSE108", fullName: "Aditya Sharma",       email: "aditya.sharma@campus.edu",      department: "CSE",       yearOfStudy: 2, phoneNumber: "+91 97654 32109" },

  // ECE Department
  { id: 9,  rollNumber: "22ECE201", fullName: "Meghana Pillai",      email: "meghana.pillai@campus.edu",     department: "ECE",       yearOfStudy: 3, phoneNumber: "+91 98765 11111" },
  { id: 10, rollNumber: "23ECE202", fullName: "Arjun Nambiar",       email: "arjun.nambiar@campus.edu",      department: "ECE",       yearOfStudy: 2, phoneNumber: "+91 97890 22222" },
  { id: 11, rollNumber: "21ECE203", fullName: "Shreya Bhat",         email: "shreya.bhat@campus.edu",        department: "ECE",       yearOfStudy: 4, phoneNumber: "+91 96543 33333" },
  { id: 12, rollNumber: "22ECE204", fullName: "Rahul Hegde",         email: "rahul.hegde@campus.edu",        department: "ECE",       yearOfStudy: 3, phoneNumber: "+91 95432 44444" },
  { id: 13, rollNumber: "24ECE205", fullName: "Lakshmi Devi",        email: "lakshmi.devi@campus.edu",       department: "ECE",       yearOfStudy: 1, phoneNumber: "+91 94321 55555" },
  { id: 14, rollNumber: "22ECE206", fullName: "Suresh Pai",          email: "suresh.pai@campus.edu",         department: "ECE",       yearOfStudy: 3, phoneNumber: "+91 93210 66666" },

  // EEE Department
  { id: 15, rollNumber: "22EEE301", fullName: "Neha Sundaram",       email: "neha.sundaram@campus.edu",      department: "EEE",       yearOfStudy: 3, phoneNumber: "+91 98111 77777" },
  { id: 16, rollNumber: "21EEE302", fullName: "Vijay Rajan",         email: "vijay.rajan@campus.edu",        department: "EEE",       yearOfStudy: 4, phoneNumber: "+91 97222 88888" },
  { id: 17, rollNumber: "23EEE303", fullName: "Preethi Shankar",     email: "preethi.shankar@campus.edu",    department: "EEE",       yearOfStudy: 2, phoneNumber: "+91 96333 99999" },
  { id: 18, rollNumber: "24EEE304", fullName: "Mohan Das",           email: "mohan.das@campus.edu",          department: "EEE",       yearOfStudy: 1, phoneNumber: "+91 95444 10101" },
  { id: 19, rollNumber: "22EEE305", fullName: "Sangeetha Raju",      email: "sangeetha.raju@campus.edu",     department: "EEE",       yearOfStudy: 3, phoneNumber: "+91 94555 20202" },

  // IT Department
  { id: 20, rollNumber: "22IT401",  fullName: "Priya Sharma",        email: "priya.sharma@campus.edu",       department: "IT",        yearOfStudy: 3, phoneNumber: "+91 98666 30303" },
  { id: 21, rollNumber: "23IT402",  fullName: "Akash Gupta",         email: "akash.gupta@campus.edu",        department: "IT",        yearOfStudy: 2, phoneNumber: "+91 97777 40404" },
  { id: 22, rollNumber: "21IT403",  fullName: "Sneha Kulkarni",      email: "sneha.kulkarni@campus.edu",     department: "IT",        yearOfStudy: 4, phoneNumber: "+91 96888 50505" },
  { id: 23, rollNumber: "24IT404",  fullName: "Ravi Teja",           email: "ravi.teja@campus.edu",          department: "IT",        yearOfStudy: 1, phoneNumber: "+91 95999 60606" },
  { id: 24, rollNumber: "22IT405",  fullName: "Bhavani Prasad",      email: "bhavani.prasad@campus.edu",     department: "IT",        yearOfStudy: 3, phoneNumber: "+91 94000 70707" },

  // Mechanical Department
  { id: 25, rollNumber: "21ME501",  fullName: "Vikram Patel",        email: "vikram.patel@campus.edu",       department: "Mechanical", yearOfStudy: 4, phoneNumber: "+91 98234 80808" },
  { id: 26, rollNumber: "22ME502",  fullName: "Ganesh Rao",          email: "ganesh.rao@campus.edu",         department: "Mechanical", yearOfStudy: 3, phoneNumber: "+91 97345 90909" },
  { id: 27, rollNumber: "23ME503",  fullName: "Nithya Lakshmi",      email: "nithya.lk@campus.edu",          department: "Mechanical", yearOfStudy: 2, phoneNumber: "+91 96456 01010" },
  { id: 28, rollNumber: "24ME504",  fullName: "Pranav Joshi",        email: "pranav.joshi@campus.edu",       department: "Mechanical", yearOfStudy: 1, phoneNumber: "+91 95567 11111" },
  { id: 29, rollNumber: "21ME505",  fullName: "Anuradha Bose",       email: "anuradha.bose@campus.edu",      department: "Mechanical", yearOfStudy: 4, phoneNumber: "+91 94678 22222" },

  // Civil Department
  { id: 30, rollNumber: "24CIVIL601", fullName: "Arjun Mehta",       email: "arjun.mehta@campus.edu",        department: "Civil",     yearOfStudy: 1, phoneNumber: "+91 99887 33333" },
  { id: 31, rollNumber: "22CIVIL602", fullName: "Swathi Reddy",      email: "swathi.reddy@campus.edu",       department: "Civil",     yearOfStudy: 3, phoneNumber: "+91 98776 44444" },
  { id: 32, rollNumber: "23CIVIL603", fullName: "Manoj Kumar",       email: "manoj.kumar@campus.edu",        department: "Civil",     yearOfStudy: 2, phoneNumber: "+91 97665 55555" },
  { id: 33, rollNumber: "21CIVIL604", fullName: "Deepika Srinivas",  email: "deepika.srinivas@campus.edu",   department: "Civil",     yearOfStudy: 4, phoneNumber: "+91 96554 66666" },
  { id: 34, rollNumber: "22CIVIL605", fullName: "Harish Babu",       email: "harish.babu@campus.edu",        department: "Civil",     yearOfStudy: 3, phoneNumber: "+91 95443 77777" },
];

const INITIAL_FACULTY = [
  // CSE Department
  {
    id: 1, facultyId: "FAC-CSE-01",
    fullName: "Dr. K. Srinivas Rao",
    email: "srinivas.rao@campus.edu",
    department: "CSE",
    designation: "Professor & HOD",
    phoneNumber: "+91 98112 23344"
  },
  {
    id: 2, facultyId: "FAC-CSE-02",
    fullName: "Dr. Revathi Sundaram",
    email: "revathi.sundaram@campus.edu",
    department: "CSE",
    designation: "Associate Professor",
    phoneNumber: "+91 97223 34455"
  },
  {
    id: 3, facultyId: "FAC-CSE-03",
    fullName: "Prof. Naveen Babu",
    email: "naveen.babu@campus.edu",
    department: "CSE",
    designation: "Assistant Professor",
    phoneNumber: "+91 96334 45566"
  },
  {
    id: 4, facultyId: "FAC-CSE-04",
    fullName: "Dr. Supriya Menon",
    email: "supriya.menon@campus.edu",
    department: "CSE",
    designation: "Senior Lecturer",
    phoneNumber: "+91 95445 56677"
  },

  // ECE Department
  {
    id: 5, facultyId: "FAC-ECE-01",
    fullName: "Dr. Meera Nambiar",
    email: "meera.nambiar@campus.edu",
    department: "ECE",
    designation: "Professor & HOD",
    phoneNumber: "+91 98223 34455"
  },
  {
    id: 6, facultyId: "FAC-ECE-02",
    fullName: "Prof. Arun Krishnan",
    email: "arun.krishnan@campus.edu",
    department: "ECE",
    designation: "Associate Professor",
    phoneNumber: "+91 97334 45566"
  },
  {
    id: 7, facultyId: "FAC-ECE-03",
    fullName: "Dr. Padma Venkatesh",
    email: "padma.venkatesh@campus.edu",
    department: "ECE",
    designation: "Assistant Professor",
    phoneNumber: "+91 96445 56677"
  },

  // EEE Department
  {
    id: 8, facultyId: "FAC-EEE-01",
    fullName: "Dr. Rajan Pillai",
    email: "rajan.pillai@campus.edu",
    department: "EEE",
    designation: "Professor & HOD",
    phoneNumber: "+91 98334 45566"
  },
  {
    id: 9, facultyId: "FAC-EEE-02",
    fullName: "Prof. Kavitha Mohan",
    email: "kavitha.mohan@campus.edu",
    department: "EEE",
    designation: "Associate Professor",
    phoneNumber: "+91 97445 56677"
  },

  // IT Department
  {
    id: 10, facultyId: "FAC-IT-01",
    fullName: "Prof. Rajesh Sengupta",
    email: "rajesh.sengupta@campus.edu",
    department: "IT",
    designation: "Professor & HOD",
    phoneNumber: "+91 98556 67788"
  },
  {
    id: 11, facultyId: "FAC-IT-02",
    fullName: "Dr. Anitha Rao",
    email: "anitha.rao@campus.edu",
    department: "IT",
    designation: "Associate Professor",
    phoneNumber: "+91 97667 78899"
  },
  {
    id: 12, facultyId: "FAC-IT-03",
    fullName: "Prof. Bhaskar Reddy",
    email: "bhaskar.reddy@campus.edu",
    department: "IT",
    designation: "Assistant Professor",
    phoneNumber: "+91 96778 89900"
  },

  // Mechanical Department
  {
    id: 13, facultyId: "FAC-ME-01",
    fullName: "Dr. Anand Kulkarni",
    email: "anand.kulkarni@campus.edu",
    department: "Mechanical",
    designation: "Professor & HOD",
    phoneNumber: "+91 98667 78899"
  },
  {
    id: 14, facultyId: "FAC-ME-02",
    fullName: "Prof. Shanthi Devi",
    email: "shanthi.devi@campus.edu",
    department: "Mechanical",
    designation: "Associate Professor",
    phoneNumber: "+91 97778 89900"
  },

  // Civil Department
  {
    id: 15, facultyId: "FAC-CIVIL-01",
    fullName: "Dr. Mahesh Babu",
    email: "mahesh.babu@campus.edu",
    department: "Civil",
    designation: "Professor & HOD",
    phoneNumber: "+91 98889 90011"
  },
  {
    id: 16, facultyId: "FAC-CIVIL-02",
    fullName: "Prof. Usha Rani",
    email: "usha.rani@campus.edu",
    department: "Civil",
    designation: "Assistant Professor",
    phoneNumber: "+91 97990 01122"
  },
];

const INITIAL_COURSES = [
  // CSE Courses
  { id: 1,  courseCode: "CS101", courseName: "Introduction to Programming (C/C++)",        department: "CSE",       credits: 4, semester: 1, instructor: "Prof. Naveen Babu" },
  { id: 2,  courseCode: "CS201", courseName: "Data Structures & Algorithms",               department: "CSE",       credits: 4, semester: 3, instructor: "Dr. K. Srinivas Rao" },
  { id: 3,  courseCode: "CS301", courseName: "Operating Systems",                          department: "CSE",       credits: 3, semester: 5, instructor: "Dr. Revathi Sundaram" },
  { id: 4,  courseCode: "CS302", courseName: "Computer Networks",                          department: "CSE",       credits: 3, semester: 5, instructor: "Prof. Naveen Babu" },
  { id: 5,  courseCode: "CS401", courseName: "Artificial Intelligence & Machine Learning", department: "CSE",       credits: 4, semester: 7, instructor: "Dr. K. Srinivas Rao" },
  { id: 6,  courseCode: "CS402", courseName: "Cloud Computing & DevOps",                   department: "CSE",       credits: 3, semester: 7, instructor: "Dr. Supriya Menon" },
  { id: 7,  courseCode: "CS403", courseName: "Cybersecurity & Ethical Hacking",            department: "CSE",       credits: 3, semester: 7, instructor: "Dr. Revathi Sundaram" },

  // ECE Courses
  { id: 8,  courseCode: "EC101", courseName: "Basic Electronics Engineering",              department: "ECE",       credits: 3, semester: 1, instructor: "Prof. Arun Krishnan" },
  { id: 9,  courseCode: "EC201", courseName: "Signals & Systems",                         department: "ECE",       credits: 4, semester: 3, instructor: "Dr. Meera Nambiar" },
  { id: 10, courseCode: "EC301", courseName: "Digital Signal Processing",                  department: "ECE",       credits: 4, semester: 5, instructor: "Dr. Padma Venkatesh" },
  { id: 11, courseCode: "EC302", courseName: "VLSI Design",                                department: "ECE",       credits: 3, semester: 5, instructor: "Dr. Meera Nambiar" },
  { id: 12, courseCode: "EC401", courseName: "Wireless Communications & 5G",              department: "ECE",       credits: 4, semester: 7, instructor: "Prof. Arun Krishnan" },

  // EEE Courses
  { id: 13, courseCode: "EE101", courseName: "Electrical Circuit Theory",                  department: "EEE",       credits: 4, semester: 1, instructor: "Prof. Kavitha Mohan" },
  { id: 14, courseCode: "EE201", courseName: "Power Systems Engineering",                  department: "EEE",       credits: 4, semester: 3, instructor: "Dr. Rajan Pillai" },
  { id: 15, courseCode: "EE301", courseName: "Control Systems",                            department: "EEE",       credits: 3, semester: 5, instructor: "Prof. Kavitha Mohan" },
  { id: 16, courseCode: "EE401", courseName: "Renewable Energy Systems",                   department: "EEE",       credits: 3, semester: 7, instructor: "Dr. Rajan Pillai" },

  // IT Courses
  { id: 17, courseCode: "IT101", courseName: "Web Technologies (HTML/CSS/JS)",             department: "IT",        credits: 3, semester: 1, instructor: "Prof. Bhaskar Reddy" },
  { id: 18, courseCode: "IT201", courseName: "Database Management Systems",                department: "IT",        credits: 4, semester: 3, instructor: "Prof. Rajesh Sengupta" },
  { id: 19, courseCode: "IT301", courseName: "Software Engineering & Agile",               department: "IT",        credits: 3, semester: 5, instructor: "Dr. Anitha Rao" },
  { id: 20, courseCode: "IT401", courseName: "Full-Stack Web Development",                 department: "IT",        credits: 4, semester: 7, instructor: "Prof. Rajesh Sengupta" },
  { id: 21, courseCode: "IT402", courseName: "Big Data Analytics",                         department: "IT",        credits: 3, semester: 7, instructor: "Dr. Anitha Rao" },

  // Mechanical Courses
  { id: 22, courseCode: "ME101", courseName: "Engineering Mechanics",                      department: "Mechanical", credits: 4, semester: 1, instructor: "Prof. Shanthi Devi" },
  { id: 23, courseCode: "ME201", courseName: "Thermodynamics",                             department: "Mechanical", credits: 4, semester: 3, instructor: "Dr. Anand Kulkarni" },
  { id: 24, courseCode: "ME301", courseName: "Heat Transfer",                              department: "Mechanical", credits: 3, semester: 5, instructor: "Dr. Anand Kulkarni" },
  { id: 25, courseCode: "ME401", courseName: "Robotics & Automation",                      department: "Mechanical", credits: 4, semester: 7, instructor: "Prof. Shanthi Devi" },

  // Civil Courses
  { id: 26, courseCode: "CE101", courseName: "Engineering Drawing & AutoCAD",              department: "Civil",     credits: 3, semester: 1, instructor: "Prof. Usha Rani" },
  { id: 27, courseCode: "CE201", courseName: "Structural Analysis",                        department: "Civil",     credits: 4, semester: 3, instructor: "Dr. Mahesh Babu" },
  { id: 28, courseCode: "CE301", courseName: "Geotechnical Engineering",                   department: "Civil",     credits: 3, semester: 5, instructor: "Dr. Mahesh Babu" },
  { id: 29, courseCode: "CE401", courseName: "Transportation & Highway Engineering",       department: "Civil",     credits: 4, semester: 7, instructor: "Prof. Usha Rani" },
];

function loadStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch (e) {
    // ignore
  }
  return fallback;
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export const mockStore = {
  getStudents() {
    return loadStorage('sc_students', INITIAL_STUDENTS);
  },
  saveStudents(list) {
    saveStorage('sc_students', list);
  },
  getFaculty() {
    return loadStorage('sc_faculty', INITIAL_FACULTY);
  },
  saveFaculty(list) {
    saveStorage('sc_faculty', list);
  },
  getCourses() {
    return loadStorage('sc_courses', INITIAL_COURSES);
  },
  saveCourses(list) {
    saveStorage('sc_courses', list);
  },
  resetDefaults() {
    saveStorage('sc_students', INITIAL_STUDENTS);
    saveStorage('sc_faculty', INITIAL_FACULTY);
    saveStorage('sc_courses', INITIAL_COURSES);
  }
};
