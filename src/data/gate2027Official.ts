// ============================================================
// OFFICIAL GATE 2027 DATA — sourced from gate2027.iitm.ac.in
// Organizing Institute: IIT Madras
// Last verified against official site. All dates per official site.
// ============================================================

export interface ImportantDate {
  label: string;
  date: string; // Human readable
  isoDate: string | null; // ISO for countdown/sorting
  kind: 'registration' | 'admit-card' | 'exam' | 'result' | 'info';
  note?: string;
}

export const GATE_INFO = {
  examName: 'GATE 2027',
  fullForm: 'Graduate Aptitude Test in Engineering',
  organizingInstitute: 'Indian Institute of Technology Madras (IIT Madras)',
  organizingShort: 'IIT Madras',
  totalTestPapers: 30,
  scoreValidity: '3 years',
  newPaper: 'Robotics & Automation (RA)',
  conductingBodies: 'IISc & 7 IITs (on behalf of NCB, MoE, Govt. of India)',
  officialWebsite: 'https://gate2027.iitm.ac.in/',
  applicationPortal: 'https://gate2027.iitm.ac.in/',
  goapsNote: 'GOAPS (GATE Online Application Processing System)',
  digiLocker: {
    required: true,
    note: 'Registration through DigiLocker is MANDATORY for all Indian nationals. Create/verify your DigiLocker account now.',
    url: 'https://www.digilocker.gov.in/',
  },
  helpdesk: {
    email: 'helpdesk@gate.iitm.ac.in',
    phone: '044-22578200',
  },
  officialYoutube: 'https://www.youtube.com/channel/UC1Ti74ZAFexTSfnr05RorLQ',
  csSyllabusPdf: 'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf',
  gaSyllabusPdf: 'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/GA_GATE2027_Syllabus.pdf',
  papersPage: 'https://gate2027.iitm.ac.in/exam_papers_and_syllabus',
  patternPage: 'https://gate2027.iitm.ac.in/question_paper_pattern',
  datesPage: 'https://gate2027.iitm.ac.in/important_dates',
  eligibilityPage: 'https://gate2027.iitm.ac.in/eligibility_criteria',
  twoPaperPage: 'https://gate2027.iitm.ac.in/two_paper_combinations',
};

// Official important dates (from gate2027.iitm.ac.in home page)
export const IMPORTANT_DATES: ImportantDate[] = [
  {
    label: 'Registration Opens (GOAPS)',
    date: '27 August 2026',
    isoDate: '2026-08-27T00:00:00+05:30',
    kind: 'registration',
    note: 'Regular registration (rescheduled)',
  },
  {
    label: 'Regular Registration Closes',
    date: '27 September 2026',
    isoDate: '2026-09-27T23:59:59+05:30',
    kind: 'registration',
    note: 'Without late fee',
  },
  {
    label: 'Extended Registration Closes',
    date: '5 October 2026',
    isoDate: '2026-10-05T23:59:59+05:30',
    kind: 'registration',
    note: 'With late fee',
  },
  {
    label: 'Exam City Allotment',
    date: '4 January 2027',
    isoDate: '2027-01-04T00:00:00+05:30',
    kind: 'admit-card',
    note: 'Admit card download: to be announced',
  },
  {
    label: 'GATE 2027 Exams — Week 1',
    date: '6-7 February 2027',
    isoDate: '2027-02-06T09:30:00+05:30',
    kind: 'exam',
    note: 'Two sessions per day',
  },
  {
    label: 'GATE 2027 Exams — Week 2',
    date: '13-14 February 2027',
    isoDate: '2027-02-13T09:30:00+05:30',
    kind: 'exam',
  },
  {
    label: 'GATE 2027 Exams — Week 3',
    date: '20-21 February 2027',
    isoDate: '2027-02-20T09:30:00+05:30',
    kind: 'exam',
  },
  {
    label: 'Results Announced',
    date: '19 March 2027',
    isoDate: '2027-03-19T00:00:00+05:30',
    kind: 'result',
  },
];

// First exam date — target for the countdown timer
export const FIRST_EXAM_DATE_ISO = '2027-02-06T09:30:00+05:30';

// Official exam pattern (CS paper)
export const EXAM_PATTERN = {
  mode: 'Computer Based Test (CBT)',
  language: 'English',
  duration: '3 hours',
  totalQuestions: 65,
  totalMarks: 100,
  sections: [
    { name: 'General Aptitude (GA)', questions: 10, marks: 15 },
    { name: 'Engineering Mathematics', questions: 'Within subject section', marks: 13 },
    { name: 'CS Subject Questions', questions: 55, marks: 72 },
  ],
  questionTypes: ['MCQ (Multiple Choice)', 'MSQ (Multiple Select)', 'NAT (Numerical Answer Type)'],
  markingScheme: 'Questions carry 1 or 2 marks',
  negativeMarking: [
    'MCQ only: −1/3 for a wrong 1-mark answer, −2/3 for a wrong 2-mark answer',
    'NO negative marking for MSQ or NAT questions',
    'No partial marking in MSQ',
  ],
};

// ============================================================
// GATE 2027 CS SYLLABUS CHANGES vs GATE 2026 (official revision)
// 3 of 10 technical sections changed: Digital Logic, COA, CN
// ============================================================
export interface SyllabusChange {
  subject: string;
  subjectId: string;
  status: 'clarified' | 'refined' | 'reduced' | 'unchanged';
  summary: string;
  added: string[];
  removed: string[];
}

export const SYLLABUS_CHANGES: SyllabusChange[] = [
  {
    subject: 'Digital Logic',
    subjectId: 'digital-logic',
    status: 'clarified',
    summary:
      'Minimization techniques are now explicitly named — algebraic technique, Karnaugh map (K-Map), and tabular method (Quine-McCluskey). "Design" of combinational and sequential circuits is emphasized. No change in scope.',
    added: [
      'Algebraic minimization technique (explicit)',
      'Karnaugh map / K-Map (explicit)',
      'Tabular method — Quine-McCluskey (explicit)',
      'Design of combinational & sequential circuits (emphasized)',
    ],
    removed: [],
  },
  {
    subject: 'Computer Organization & Architecture',
    subjectId: 'coa',
    status: 'refined',
    summary:
      '"Machine instructions" rephrased to "Instruction set". Control unit now explicitly split into Hardwired and Microprogrammed design. Memory hierarchy rephrased around performance and cache memory mapping.',
    added: [
      'Design of control unit — Hardwired control unit',
      'Design of control unit — Microprogrammed control unit',
      'Memory interfacing (explicit)',
      'Memory hierarchy performance & cache memory mapping (explicit)',
    ],
    removed: ['"Main memory and secondary storage" no longer explicitly listed'],
  },
  {
    subject: 'Computer Networks',
    subjectId: 'networks',
    status: 'reduced',
    summary:
      'Considerably reduced. Application layer now covers ONLY DNS and HTTP. Focus on TCP flow/congestion control, socket API, IPv4 fragmentation, CIDR, NAT, distance-vector & link-state routing, error detection, MAC and Ethernet.',
    added: ['Socket API (explicit)', 'Performance metrics under switching (explicit)'],
    removed: [
      'UDP (no longer explicitly mentioned)',
      'ARP, DHCP, ICMP (IP support protocols removed)',
      'SMTP, FTP, Email (application layer trimmed to DNS & HTTP)',
      'Standalone shortest-path routing & flooding',
      'OSI model & TCP/IP stack explicit mentions → "Principles of Layering"',
      'Framing & Ethernet bridging → simplified to "Ethernet"',
    ],
  },
  {
    subject: 'All Other Sections (Math, DS, Algo, TOC, CD, OS, DBMS, GA)',
    subjectId: '',
    status: 'unchanged',
    summary:
      'Engineering Mathematics, Programming & Data Structures, Algorithms, Theory of Computation, Compiler Design, Operating Systems, Databases and General Aptitude are 100% identical to GATE 2026. Existing study material remains fully valid.',
    added: [],
    removed: [],
  },
];

// Verbatim official section text for the changed subjects (GATE CS 2027)
export const OFFICIAL_SYLLABUS_TEXT = {
  'digital-logic':
    'Boolean algebra and minimization — algebraic technique, Karnaugh map (K-Map), tabular method (Quine-McCluskey). Design of combinational and sequential circuits. Number representation and arithmetic (fixed and floating point).',
  coa: 'Instruction set and addressing modes. Design of arithmetic and logic unit (ALU). Design of control unit — hardwired control unit, microprogrammed control unit. Memory interfacing and hierarchy: performance, cache memory mapping. I/O interface (interrupt and DMA). Instruction pipelining, pipeline hazards.',
  networks:
    'Principles of layering. Basics of switching (circuit, packet and virtual circuit) and performance metrics. Data link layer: error detection, Medium Access Control, Ethernet. Distance vector and link state routing. IPv4 — fragmentation, CIDR notation, Network Address Translation (NAT). TCP — flow control and congestion control, socket API. DNS and HTTP.',
};

// Official quick links for the Resources "Official" tab
export const OFFICIAL_LINKS = [
  { name: 'GATE 2027 Official Website', url: 'https://gate2027.iitm.ac.in/', tag: 'Official' },
  { name: 'CS Syllabus PDF (2027)', url: GATE_INFO.csSyllabusPdf, tag: 'Syllabus' },
  { name: 'GA Syllabus PDF (2027)', url: GATE_INFO.gaSyllabusPdf, tag: 'Syllabus' },
  { name: 'Important Dates', url: GATE_INFO.datesPage, tag: 'Dates' },
  { name: 'Question Paper Pattern', url: GATE_INFO.patternPage, tag: 'Pattern' },
  { name: 'Eligibility Criteria', url: GATE_INFO.eligibilityPage, tag: 'Eligibility' },
  { name: 'Two-Paper Combinations', url: GATE_INFO.twoPaperPage, tag: 'Papers' },
  { name: 'GATE 2027 YouTube (IIT Madras)', url: GATE_INFO.officialYoutube, tag: 'Videos' },
  { name: 'DigiLocker (Mandatory)', url: GATE_INFO.digiLocker.url, tag: 'Registration' },
];
