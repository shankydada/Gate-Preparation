// Complete GATE 2027 CSE Data Structure

export interface Resource {
  type: 'video' | 'practice' | 'notes' | 'book' | 'tool';
  name: string;
  url: string;
  icon: string;
}

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
  resources: Resource[];
  importance: 1 | 2 | 3; // Stars
  estimatedHours: number;
}

export interface SubSection {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  weightage: string;
  description: string;
  sections: SubSection[];
}

export interface Phase {
  id: number;
  name: string;
  duration: string;
  months: string;
  description: string;
  subjects: string[];
  color: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  xpReward: number;
}

// Phases Data
export const phases: Phase[] = [
  {
    id: 1,
    name: "Foundation Building",
    duration: "6 months",
    months: "Month 1-6",
    description: "Build strong fundamentals in all core subjects",
    subjects: ["Discrete Mathematics", "C Programming", "Data Structures", "Digital Logic", "Algorithms", "Linear Algebra", "Theory of Computation", "Calculus"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Deep Dive",
    duration: "6 months",
    months: "Month 7-12",
    description: "Master advanced concepts and problem-solving",
    subjects: ["Theory of Computation", "Probability", "Compiler Design", "Operating Systems", "DBMS", "Computer Organization"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Revision + PYQs",
    duration: "4 months",
    months: "Month 13-16",
    description: "Revise all subjects and solve previous year questions",
    subjects: ["Computer Networks", "All Subjects Revision", "25+ Years PYQs"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    name: "Mock Tests",
    duration: "2 months",
    months: "Month 17-18",
    description: "Full-length mock tests and weak area targeting",
    subjects: ["Full Mock Tests", "Error Analysis", "Time Management"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 5,
    name: "Final Sprint",
    duration: "2 weeks",
    months: "Last 2 weeks",
    description: "Light revision, formula sheets, confidence building",
    subjects: ["Formula Sheets", "Short Notes", "Mental Preparation"],
    color: "from-yellow-500 to-orange-500"
  }
];

// Badges Data
export const badges: Badge[] = [
  { id: "first_topic", name: "First Step", description: "Complete your first topic", icon: "🎯", requirement: "complete_1_topic", xpReward: 50 },
  { id: "quiz_master", name: "Quiz Master", description: "Score 100% on any quiz", icon: "🏆", requirement: "perfect_quiz", xpReward: 100 },
  { id: "streak_7", name: "Week Warrior", description: "7-day study streak", icon: "🔥", requirement: "7_day_streak", xpReward: 200 },
  { id: "streak_30", name: "Month Champion", description: "30-day study streak", icon: "⚡", requirement: "30_day_streak", xpReward: 500 },
  { id: "dsa_complete", name: "DSA Master", description: "Complete all DSA topics", icon: "🌟", requirement: "complete_dsa", xpReward: 300 },
  { id: "algo_complete", name: "Algorithm Guru", description: "Complete all Algorithm topics", icon: "🧠", requirement: "complete_algo", xpReward: 300 },
  { id: "math_wizard", name: "Math Wizard", description: "Complete all Math topics", icon: "🔢", requirement: "complete_math", xpReward: 300 },
  { id: "half_way", name: "Halfway Hero", description: "Complete 50% of roadmap", icon: "🏃", requirement: "50_percent", xpReward: 400 },
  { id: "full_complete", name: "GATE Ready", description: "Complete entire roadmap", icon: "👑", requirement: "100_percent", xpReward: 1000 },
  { id: "quiz_streak", name: "Quiz Streak", description: "Pass 10 quizzes in a row", icon: "📚", requirement: "10_quiz_streak", xpReward: 250 },
  { id: "daily_warrior", name: "Daily Warrior", description: "Complete a daily challenge", icon: "🗡️", requirement: "daily_challenge", xpReward: 150 },
  { id: "quiz_10", name: "Quiz Explorer", description: "Take 10 different quizzes", icon: "🔎", requirement: "10_quizzes", xpReward: 200 },
  { id: "quiz_25", name: "Quiz Champion", description: "Take 25 different quizzes", icon: "🎖️", requirement: "25_quizzes", xpReward: 400 },
  { id: "pyq_explorer", name: "PYQ Explorer", description: "Explore 5 PYQ papers", icon: "📜", requirement: "5_pyqs", xpReward: 200 },
  { id: "level_5", name: "Rising Star", description: "Reach Level 5", icon: "⭐", requirement: "level_5", xpReward: 300 },
  { id: "level_10", name: "GATE Warrior", description: "Reach Level 10", icon: "💫", requirement: "level_10", xpReward: 500 },
  { id: "topics_25", name: "Quarter Century", description: "Complete 25 topics", icon: "🎯", requirement: "25_topics", xpReward: 300 },
  { id: "streak_14", name: "Fortnight Fighter", description: "14-day study streak", icon: "🔥", requirement: "14_day_streak", xpReward: 350 },
  { id: "perfect_5", name: "Perfectionist", description: "Get 5 perfect quiz scores", icon: "💎", requirement: "5_perfect", xpReward: 400 }
];

// Complete Subjects Data
export const subjects: Subject[] = [
  {
    id: "engineering-math",
    name: "Engineering Mathematics",
    shortName: "Math",
    icon: "📐",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    weightage: "13%",
    description: "Foundation of GATE - Discrete Math, Linear Algebra, Calculus, Probability",
    sections: [
      {
        id: "discrete-math",
        name: "Discrete Mathematics",
        topics: [
          {
            id: "prop-logic",
            name: "Propositional Logic",
            subtopics: [
              "Propositions, Truth Tables",
              "Logical Connectives (AND, OR, NOT, →, ↔)",
              "Tautology, Contradiction, Contingency",
              "Logical Equivalences (De Morgan's, Contrapositive)",
              "Modus Ponens, Modus Tollens",
              "Validity of Arguments"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Propositional Logic", url: "https://www.youtube.com/watch?v=kj9Jvg3wfyk", icon: "📺" },
              { type: "video", name: "Neso Academy - Logic Playlist", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Propositional Logic", url: "https://gateoverflow.in/tag/propositional-logic", icon: "📝" },
              { type: "practice", name: "GeeksforGeeks - Propositional Logic", url: "https://www.geeksforgeeks.org/proposition-logic/", icon: "📝" },
              { type: "notes", name: "GFG Article", url: "https://www.geeksforgeeks.org/mathematical-logic-propositional-logic/", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 8
          },
          {
            id: "pred-logic",
            name: "Predicate Logic (First Order Logic)",
            subtopics: [
              "Predicates, Quantifiers (∀, ∃)",
              "Nested Quantifiers",
              "Free and Bound Variables",
              "Equivalences in Predicate Logic",
              "Validity and Satisfiability"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Predicate Logic", url: "https://www.youtube.com/watch?v=KqJL3X_S4G8", icon: "📺" },
              { type: "video", name: "Neso Academy - Predicate Logic", url: "https://www.youtube.com/watch?v=gyoqX0W-NH4", icon: "📺" },
              { type: "practice", name: "GATE Overflow - First Order Logic", url: "https://gateoverflow.in/tag/first-order-logic", icon: "📝" },
              { type: "book", name: "Kenneth Rosen - Chapter 1.4, 1.5", url: "https://www.amazon.in/Discrete-Mathematics-Applications-Kenneth-Rosen/dp/0070681880", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "set-theory",
            name: "Set Theory",
            subtopics: [
              "Set Operations, Power Set, Cartesian Product",
              "Venn Diagrams",
              "Laws (Associative, Distributive, Idempotent)",
              "Principle of Inclusion-Exclusion"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Set Theory", url: "https://www.youtube.com/watch?v=tyDKR4FG3Yw", icon: "📺" },
              { type: "video", name: "Neso Academy - Set Theory", url: "https://www.youtube.com/watch?v=5xWhB0fzMXQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Set Theory PYQs", url: "https://gateoverflow.in/tag/set-theory", icon: "📝" },
              { type: "notes", name: "GFG Inclusion-Exclusion", url: "https://www.geeksforgeeks.org/inclusion-exclusion-principle-and-programming-applications/", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 6
          },
          {
            id: "relations",
            name: "Relations",
            subtopics: [
              "Types: Reflexive, Symmetric, Transitive, Antisymmetric",
              "Equivalence Relations and Partitions",
              "Partial Order Relations, Hasse Diagrams",
              "Closures, Warshall's Algorithm"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Relations", url: "https://www.youtube.com/watch?v=JzKx5-ZNXLA", icon: "📺" },
              { type: "video", name: "Neso Academy - Relations", url: "https://www.youtube.com/watch?v=UKtF7WPXJLA", icon: "📺" },
              { type: "video", name: "Warshall's Algorithm", url: "https://www.youtube.com/watch?v=8SPEWS1PAwA", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Relations", url: "https://gateoverflow.in/tag/relations", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "functions",
            name: "Functions",
            subtopics: [
              "Types: Injective, Surjective, Bijective",
              "Composition, Inverse, Pigeonhole Principle",
              "Counting Functions"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Functions", url: "https://www.youtube.com/watch?v=ixbWlCCjb-Y", icon: "📺" },
              { type: "video", name: "Neso Academy - Functions", url: "https://www.youtube.com/watch?v=xXa2gcxzjWA", icon: "📺" },
              { type: "video", name: "Pigeonhole Principle", url: "https://www.youtube.com/watch?v=2-mxYrCNX60", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Functions", url: "https://gateoverflow.in/tag/functions", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 8
          },
          {
            id: "lattices",
            name: "Lattices & Boolean Algebra",
            subtopics: [
              "Posets, Lattices, Bounded/Complemented/Distributive",
              "Boolean Algebra, Boolean Functions, Minimization"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Lattices", url: "https://www.youtube.com/watch?v=2Q8sdmNOiPI", icon: "📺" },
              { type: "video", name: "Neso Academy - Boolean Algebra", url: "https://www.youtube.com/watch?v=Hm4dRTSUbB8", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Boolean Algebra", url: "https://gateoverflow.in/tag/boolean-algebra", icon: "📝" }
            ],
            importance: 1,
            estimatedHours: 8
          },
          {
            id: "combinatorics",
            name: "Combinatorics",
            subtopics: [
              "Permutations, Combinations",
              "Circular Permutations, Derangements",
              "Binomial Theorem",
              "Recurrence Relations",
              "Generating Functions"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Combinatorics", url: "https://www.youtube.com/watch?v=p8vIcmr_Pqo", icon: "📺" },
              { type: "video", name: "Neso Academy - Combinatorics", url: "https://www.youtube.com/watch?v=HqxvZx2cVmU", icon: "📺" },
              { type: "video", name: "Recurrence Relations - Abdul Bari", url: "https://www.youtube.com/watch?v=4V30R3I1vLI", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Combinatorics", url: "https://gateoverflow.in/tag/combinatorics", icon: "📝" },
              { type: "book", name: "Kenneth Rosen - Chapter 6", url: "https://www.amazon.in/Discrete-Mathematics-Applications-Kenneth-Rosen/dp/0070681880", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 15
          },
          {
            id: "graph-theory",
            name: "Graph Theory",
            subtopics: [
              "Basic Terminology, Handshaking Lemma",
              "Paths, Cycles, Connectivity",
              "Euler and Hamiltonian Paths",
              "Trees, Planar Graphs, Graph Coloring",
              "Adjacency Matrix, Isomorphism"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Graph Theory", url: "https://www.youtube.com/watch?v=82zlRaRUsaY", icon: "📺" },
              { type: "video", name: "Neso Academy - Graph Theory", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjcLmqkXkuZHPPxpqzPJVqy", icon: "📺" },
              { type: "video", name: "Euler Path/Circuit", url: "https://www.youtube.com/watch?v=xR4sGgwtR2I", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Graph Theory", url: "https://gateoverflow.in/tag/graph-theory", icon: "📝" },
              { type: "book", name: "Kenneth Rosen - Chapter 10", url: "https://www.amazon.in/Discrete-Mathematics-Applications-Kenneth-Rosen/dp/0070681880", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 15
          },
          {
            id: "group-theory",
            name: "Group Theory",
            subtopics: [
              "Groups, Abelian Groups, Subgroups",
              "Cyclic Groups, Lagrange's Theorem",
              "Cosets, Normal Subgroups, Homomorphism"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Group Theory", url: "https://www.youtube.com/watch?v=DQ5lNvFPIM4", icon: "📺" },
              { type: "video", name: "Neso Academy - Algebraic Structures", url: "https://www.youtube.com/watch?v=FNSFOOELNmg", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Group Theory", url: "https://gateoverflow.in/tag/group-theory", icon: "📝" }
            ],
            importance: 1,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "linear-algebra",
        name: "Linear Algebra",
        topics: [
          {
            id: "matrices",
            name: "Matrices & Determinants",
            subtopics: [
              "Types of Matrices, Matrix Operations, Trace",
              "Properties of Determinants, Cofactor Expansion"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Matrices", url: "https://www.youtube.com/watch?v=0oGJTQCy4cQ", icon: "📺" },
              { type: "video", name: "3Blue1Brown - Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Linear Algebra", url: "https://gateoverflow.in/tag/linear-algebra", icon: "📝" },
              { type: "book", name: "Gilbert Strang - Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "linear-equations",
            name: "Systems of Linear Equations",
            subtopics: [
              "Gaussian Elimination, Row Echelon Form",
              "Rank, Consistency Conditions, Cramer's Rule"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - System of Equations", url: "https://www.youtube.com/watch?v=wRFbFLfJk0w", icon: "📺" },
              { type: "video", name: "Khan Academy - Linear Equations", url: "https://www.khanacademy.org/math/linear-algebra", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Linear Equations", url: "https://gateoverflow.in/tag/linear-algebra", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 8
          },
          {
            id: "eigenvalues",
            name: "Eigenvalues & Eigenvectors",
            subtopics: [
              "Characteristic Equation",
              "Properties, Cayley-Hamilton Theorem",
              "Diagonalization"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Eigenvalues", url: "https://www.youtube.com/watch?v=Nyw2FW7KiHs", icon: "📺" },
              { type: "video", name: "3Blue1Brown - Eigenvalues", url: "https://www.youtube.com/watch?v=PFDu9oVAE-g", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Eigenvalues", url: "https://gateoverflow.in/tag/eigenvalue", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "calculus",
        name: "Calculus",
        topics: [
          {
            id: "limits",
            name: "Limits & Continuity",
            subtopics: [
              "ε-δ Definition, L'Hôpital's Rule",
              "Types of Discontinuity"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Limits", url: "https://www.youtube.com/watch?v=HfACrKJ_Y2w", icon: "📺" },
              { type: "video", name: "Khan Academy - Limits", url: "https://www.khanacademy.org/math/calculus-1", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Calculus", url: "https://gateoverflow.in/tag/calculus", icon: "📝" }
            ],
            importance: 1,
            estimatedHours: 6
          },
          {
            id: "differentiation",
            name: "Differentiation & Applications",
            subtopics: [
              "Rules, Higher Order Derivatives, Leibnitz Theorem",
              "Maxima/Minima, Mean Value Theorems, Taylor/Maclaurin Series"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Differentiation", url: "https://www.youtube.com/watch?v=lzGZfuAqZ-U", icon: "📺" },
              { type: "video", name: "Khan Academy - Derivatives", url: "https://www.khanacademy.org/math/calculus-1/cs1-derivatives-definition-and-basic-rules", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Calculus PYQs", url: "https://gateoverflow.in/tag/calculus", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "integration",
            name: "Integration",
            subtopics: [
              "Indefinite and Definite Integrals",
              "Substitution, By Parts, Partial Fractions",
              "Improper Integrals"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Integration", url: "https://www.youtube.com/watch?v=rfG8ce4nNh0", icon: "📺" },
              { type: "video", name: "Khan Academy - Integration", url: "https://www.khanacademy.org/math/calculus-1/cs1-integrals", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Integration", url: "https://gateoverflow.in/tag/integration", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "probability",
        name: "Probability & Statistics",
        topics: [
          {
            id: "basic-probability",
            name: "Basic Probability & Bayes' Theorem",
            subtopics: [
              "Sample Space, Events, Axioms",
              "Conditional Probability, Bayes' Theorem ⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Probability", url: "https://www.youtube.com/watch?v=5NMxiOGL39M", icon: "📺" },
              { type: "video", name: "3Blue1Brown - Bayes Theorem", url: "https://www.youtube.com/watch?v=HZGCoVF3YvM", icon: "📺" },
              { type: "video", name: "Khan Academy - Probability", url: "https://www.khanacademy.org/math/statistics-probability", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Probability", url: "https://gateoverflow.in/tag/probability", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          },
          {
            id: "random-variables",
            name: "Random Variables & Distributions",
            subtopics: [
              "PMF, PDF, CDF, Expectation, Variance",
              "Bernoulli, Binomial, Poisson, Geometric",
              "Uniform, Exponential, Normal Distributions"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Random Variables", url: "https://www.youtube.com/watch?v=3v9w79NhsfI", icon: "📺" },
              { type: "video", name: "StatQuest - Probability Distributions", url: "https://www.youtube.com/watch?v=oI3hZJqXJuc", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Probability PYQs", url: "https://gateoverflow.in/tag/probability", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          }
        ]
      }
    ]
  },
  {
    id: "digital-logic",
    name: "Digital Logic",
    shortName: "DL",
    icon: "🔌",
    color: "bg-gradient-to-br from-yellow-500 to-orange-600",
    weightage: "3-5%",
    description: "Number systems, Boolean algebra, combinational & sequential circuits",
    sections: [
      {
        id: "number-systems",
        name: "Number Systems & Codes",
        topics: [
          {
            id: "number-conversions",
            name: "Number Systems & Conversions",
            subtopics: [
              "Binary, Octal, Hex conversions",
              "1's, 2's Complement",
              "BCD, Gray Code, Binary Arithmetic"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Number Systems", url: "https://www.youtube.com/watch?v=LpuPe81bc2w", icon: "📺" },
              { type: "video", name: "Neso Academy - Number Systems", url: "https://www.youtube.com/watch?v=cJNm938Xwao", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Digital Logic", url: "https://gateoverflow.in/tag/digital-logic", icon: "📝" },
              { type: "tool", name: "Number System Converter", url: "https://www.rapidtables.com/convert/number/", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 6
          }
        ]
      },
      {
        id: "boolean-algebra",
        name: "Boolean Algebra & Minimization",
        topics: [
          {
            id: "boolean-laws",
            name: "Boolean Algebra & K-Maps",
            subtopics: [
              "Boolean Laws, De Morgan's",
              "SOP, POS, Minterms, Maxterms",
              "Karnaugh Maps (2-5 variables)",
              "Quine-McCluskey Method"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Boolean Algebra", url: "https://www.youtube.com/watch?v=6zB3I-YYYSk", icon: "📺" },
              { type: "video", name: "Neso Academy - K-Map", url: "https://www.youtube.com/watch?v=RO5alU6PpSU", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Boolean Algebra", url: "https://gateoverflow.in/tag/boolean-algebra", icon: "📝" },
              { type: "tool", name: "K-Map Solver", url: "https://www.charlie-coleman.com/experiments/kmap/", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "combinational",
        name: "Combinational Circuits",
        topics: [
          {
            id: "comb-circuits",
            name: "Combinational Circuit Design",
            subtopics: [
              "Logic Gates, Universal Gates",
              "Adders, Subtractors, MUX, DEMUX",
              "Encoders, Decoders, Comparators, Parity"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Combinational Circuits", url: "https://www.youtube.com/watch?v=VPw9vPN-3ac", icon: "📺" },
              { type: "video", name: "Neso Academy - Combinational Circuits", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Combinational", url: "https://gateoverflow.in/tag/combinational-circuit", icon: "📝" },
              { type: "tool", name: "Logic Circuit Simulator", url: "https://logic.ly/demo/", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "sequential",
        name: "Sequential Circuits & FSM",
        topics: [
          {
            id: "seq-circuits",
            name: "Sequential Circuits",
            subtopics: [
              "Latches, Flip-Flops (SR, D, JK, T)",
              "Shift Registers, Counters",
              "Mealy vs Moore Machine",
              "State Minimization, Sequence Detectors"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Sequential Circuits", url: "https://www.youtube.com/watch?v=GhfOHcgqmUc", icon: "📺" },
              { type: "video", name: "Neso Academy - Flip Flops", url: "https://www.youtube.com/watch?v=V_rOjpghnrI", icon: "📺" },
              { type: "video", name: "Gate Smashers - FSM", url: "https://www.youtube.com/watch?v=ehy5FcI_wNc", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Sequential", url: "https://gateoverflow.in/tag/sequential-circuit", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 15
          }
        ]
      }
    ]
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture",
    shortName: "COA",
    icon: "🖥️",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    weightage: "5-8%",
    description: "CPU design, pipelining, memory hierarchy, cache, I/O systems",
    sections: [
      {
        id: "basic-org",
        name: "Basic Organization",
        topics: [
          {
            id: "addressing-modes",
            name: "Addressing Modes & Instruction Formats",
            subtopics: [
              "Von Neumann, Harvard Architecture",
              "Instruction Formats, Addressing Modes",
              "RISC vs CISC"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - COA Playlist", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX", icon: "📺" },
              { type: "video", name: "Neso Academy - COA Playlist", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgLLlzdgiTUKULKJPYc0A4q", icon: "📺" },
              { type: "practice", name: "GATE Overflow - COA", url: "https://gateoverflow.in/tag/co-and-architecture", icon: "📝" },
              { type: "book", name: "Carl Hamacher - Computer Organization", url: "https://www.amazon.in/Computer-Organization-Carl-Hamacher/dp/0071246517", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "alu",
        name: "ALU Design & Arithmetic",
        topics: [
          {
            id: "alu-design",
            name: "ALU & Arithmetic Operations",
            subtopics: [
              "Fixed Point: Booth's Algorithm",
              "Floating Point: IEEE 754",
              "Restoring and Non-restoring Division"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Booth's Algorithm", url: "https://www.youtube.com/watch?v=DIp4GqSdVaY", icon: "📺" },
              { type: "video", name: "Gate Smashers - IEEE 754", url: "https://www.youtube.com/watch?v=8afbTaA-gOQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - COA Arithmetic", url: "https://gateoverflow.in/tag/booth-algorithm", icon: "📝" },
              { type: "tool", name: "IEEE 754 Converter", url: "https://www.h-schmidt.net/FloatConverter/IEEE754.html", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "pipelining",
        name: "Pipelining",
        topics: [
          {
            id: "pipeline-basics",
            name: "Pipelining Concepts & Hazards",
            subtopics: [
              "Pipeline Stages, Throughput, Speedup, Efficiency",
              "Structural, Data, Control Hazards",
              "Forwarding, Stalling, Branch Prediction",
              "Performance Calculations"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Pipelining", url: "https://www.youtube.com/watch?v=eVRdfl4zxfI", icon: "📺" },
              { type: "video", name: "Neso Academy - Pipelining", url: "https://www.youtube.com/watch?v=Ur40bZs7aHQ", icon: "📺" },
              { type: "video", name: "Gate Smashers - Hazards", url: "https://www.youtube.com/watch?v=tgkqMPdirn8", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Pipelining", url: "https://gateoverflow.in/tag/pipelining", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 18
          }
        ]
      },
      {
        id: "memory",
        name: "Memory Organization",
        topics: [
          {
            id: "cache-memory",
            name: "Cache Memory",
            subtopics: [
              "Mapping: Direct, Associative, Set-Associative",
              "Replacement: LRU, FIFO, Random",
              "Write Policies, AMAT Calculation"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Cache Memory", url: "https://www.youtube.com/watch?v=V0wJnYbXWyU", icon: "📺" },
              { type: "video", name: "Neso Academy - Cache Memory", url: "https://www.youtube.com/watch?v=hKhpnlMNWrM", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Cache", url: "https://gateoverflow.in/tag/cache-memory", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "virtual-memory",
            name: "Virtual Memory & TLB",
            subtopics: [
              "Page Table, TLB",
              "Memory Interleaving",
              "Effective Access Time"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Virtual Memory", url: "https://www.youtube.com/watch?v=0r-dLlKS0Yw", icon: "📺" },
              { type: "video", name: "Gate Smashers - TLB", url: "https://www.youtube.com/watch?v=l7HoguhFVQ4", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Memory", url: "https://gateoverflow.in/tag/virtual-memory", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "io",
        name: "I/O Organization",
        topics: [
          {
            id: "io-techniques",
            name: "I/O Techniques",
            subtopics: [
              "Programmed I/O, Interrupt-Driven I/O, DMA",
              "Interrupts, Buses, Daisy Chaining"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - I/O Organization", url: "https://www.youtube.com/watch?v=Fw2H8z8OOX0", icon: "📺" },
              { type: "video", name: "Neso Academy - DMA", url: "https://www.youtube.com/watch?v=F4_vcR5BqNM", icon: "📺" },
              { type: "practice", name: "GATE Overflow - I/O", url: "https://gateoverflow.in/tag/io-system", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 8
          }
        ]
      }
    ]
  },
  {
    id: "programming-ds",
    name: "Programming & Data Structures",
    shortName: "DSA",
    icon: "💻",
    color: "bg-gradient-to-br from-green-500 to-teal-600",
    weightage: "15%",
    description: "C programming, arrays, linked lists, trees, graphs, hashing",
    sections: [
      {
        id: "c-programming",
        name: "C Programming",
        topics: [
          {
            id: "c-basics",
            name: "Basics, Operators, Type Conversion",
            subtopics: [
              "Data Types, Storage Classes, Operators",
              "Operator Precedence, Type Conversion"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - C Programming", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGmiGl_DOuRMJYG8tOVuapB", icon: "📺" },
              { type: "video", name: "Neso Academy - C Programming", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR", icon: "📺" },
              { type: "practice", name: "HackerRank - C Problems", url: "https://www.hackerrank.com/domains/c", icon: "📝" },
              { type: "book", name: "Let Us C - Yashwant Kanetkar", url: "https://www.amazon.in/Let-Us-C-Yashavant-Kanetkar/dp/8183331637", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "recursion",
            name: "Recursion",
            subtopics: [
              "Tail vs Non-tail Recursion",
              "Stack usage, Recursion Tree",
              "Tower of Hanoi, Classic Problems"
            ],
            resources: [
              { type: "video", name: "Abdul Bari - Recursion", url: "https://www.youtube.com/watch?v=kHi1DUhp9kM", icon: "📺" },
              { type: "video", name: "Aditya Verma - Recursion Playlist", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWeT1ffjiImo0sYTcnLzo-wY", icon: "📺" },
              { type: "practice", name: "LeetCode - Recursion", url: "https://leetcode.com/tag/recursion/", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "pointers",
            name: "Pointers",
            subtopics: [
              "Pointer Basics, Arithmetic, Double Pointers",
              "Dynamic Memory, Dangling/NULL/Wild Pointers"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Pointers", url: "https://www.youtube.com/watch?v=mw1qsMieKxs", icon: "📺" },
              { type: "video", name: "Neso Academy - Pointers", url: "https://www.youtube.com/watch?v=zuegQmMdy8M", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Pointers", url: "https://gateoverflow.in/tag/pointers", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "data-structures",
        name: "Data Structures",
        topics: [
          {
            id: "linked-lists",
            name: "Linked Lists",
            subtopics: [
              "SLL, DLL, Circular LL",
              "Floyd's Cycle Detection ⭐",
              "Reversal, Merge Sorted Lists"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Linked Lists", url: "https://www.youtube.com/watch?v=dmb1i4oN5oE", icon: "📺" },
              { type: "video", name: "Abdul Bari - Linked Lists", url: "https://www.youtube.com/watch?v=9YcrmuZ9u9E", icon: "📺" },
              { type: "video", name: "Striver - Linked List Playlist", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0r47RKH7fdWN54AbWFgGuii", icon: "📺" },
              { type: "practice", name: "LeetCode - Linked List", url: "https://leetcode.com/tag/linked-list/", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "stacks-queues",
            name: "Stacks & Queues",
            subtopics: [
              "Stack Operations, Infix/Postfix/Prefix ⭐",
              "Queue, Circular Queue, Deque",
              "Priority Queue"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Stacks", url: "https://www.youtube.com/watch?v=bxRVz8zklWM", icon: "📺" },
              { type: "video", name: "Gate Smashers - Infix to Postfix", url: "https://www.youtube.com/watch?v=dVL6XAoqRVw", icon: "📺" },
              { type: "practice", name: "LeetCode - Stack", url: "https://leetcode.com/tag/stack/", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "trees",
            name: "Trees",
            subtopics: [
              "Binary Trees & Traversals",
              "BST Operations",
              "AVL Trees, Rotations",
              "B-Trees & B+ Trees",
              "Heaps"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Binary Trees", url: "https://www.youtube.com/watch?v=csSP53pMWU0", icon: "📺" },
              { type: "video", name: "Abdul Bari - Trees", url: "https://www.youtube.com/watch?v=EWPgfTvkNVA", icon: "📺" },
              { type: "video", name: "Gate Smashers - AVL Trees", url: "https://www.youtube.com/watch?v=jDM6_TnYIqE", icon: "📺" },
              { type: "practice", name: "LeetCode - Tree", url: "https://leetcode.com/tag/tree/", icon: "📝" },
              { type: "tool", name: "AVL Tree Visualizer", url: "https://visualgo.net/en/bst", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 25
          },
          {
            id: "graphs",
            name: "Graphs",
            subtopics: [
              "BFS & DFS",
              "MST: Kruskal's & Prim's",
              "Dijkstra, Bellman-Ford, Floyd-Warshall",
              "Topological Sort & SCC"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - BFS & DFS", url: "https://www.youtube.com/watch?v=pcKY4hjDrxk", icon: "📺" },
              { type: "video", name: "Abdul Bari - Kruskal's", url: "https://www.youtube.com/watch?v=4ZlRH0eK-qQ", icon: "📺" },
              { type: "video", name: "Abdul Bari - Dijkstra's", url: "https://www.youtube.com/watch?v=XB4MIexjvY0", icon: "📺" },
              { type: "video", name: "Striver - Graph Playlist", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn", icon: "📺" },
              { type: "practice", name: "LeetCode - Graph", url: "https://leetcode.com/tag/graph/", icon: "📝" },
              { type: "tool", name: "Dijkstra Visualizer", url: "https://visualgo.net/en/sssp", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 25
          },
          {
            id: "hashing",
            name: "Hashing",
            subtopics: [
              "Hash Functions, Collision Resolution",
              "Linear Probing, Double Hashing, Chaining",
              "Load Factor, Performance Analysis"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Hashing", url: "https://www.youtube.com/watch?v=BRO7mVIFt08", icon: "📺" },
              { type: "video", name: "Abdul Bari - Hashing", url: "https://www.youtube.com/watch?v=mFY0J5W8Udk", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Hashing", url: "https://gateoverflow.in/tag/hashing", icon: "📝" },
              { type: "tool", name: "Hash Table Visualizer", url: "https://visualgo.net/en/hashtable", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      }
    ]
  },
  {
    id: "algorithms",
    name: "Algorithms",
    shortName: "Algo",
    icon: "⚙️",
    color: "bg-gradient-to-br from-red-500 to-pink-600",
    weightage: "10-12%",
    description: "Sorting, searching, DP, greedy, graph algorithms, complexity",
    sections: [
      {
        id: "analysis",
        name: "Algorithm Analysis",
        topics: [
          {
            id: "asymptotic",
            name: "Asymptotic Analysis & Recurrences",
            subtopics: [
              "Big-O, Omega, Theta Notations",
              "Master Theorem ⭐⭐⭐",
              "Recursion Tree Method"
            ],
            resources: [
              { type: "video", name: "Abdul Bari - Asymptotic Notations", url: "https://www.youtube.com/watch?v=A03oI0znAoc", icon: "📺" },
              { type: "video", name: "Gate Smashers - Master Theorem", url: "https://www.youtube.com/watch?v=OynWkEj0S-s", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Algorithms", url: "https://gateoverflow.in/tag/algorithms", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          }
        ]
      },
      {
        id: "sorting",
        name: "Sorting Algorithms",
        topics: [
          {
            id: "sorting-algos",
            name: "All Sorting Algorithms",
            subtopics: [
              "Bubble, Selection, Insertion, Merge, Quick, Heap Sort",
              "Counting Sort, Radix Sort, Bucket Sort",
              "Stability, In-place, Adaptive Properties"
            ],
            resources: [
              { type: "video", name: "Abdul Bari - Sorting Playlist", url: "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", icon: "📺" },
              { type: "video", name: "Merge Sort - Abdul Bari", url: "https://www.youtube.com/watch?v=mB5HXBb_HY8", icon: "📺" },
              { type: "video", name: "Quick Sort - Abdul Bari", url: "https://www.youtube.com/watch?v=7h1s2SojIRw", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Sorting", url: "https://gateoverflow.in/tag/sorting", icon: "📝" },
              { type: "tool", name: "Sorting Visualizer", url: "https://visualgo.net/en/sorting", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 20
          }
        ]
      },
      {
        id: "paradigms",
        name: "Algorithm Paradigms",
        topics: [
          {
            id: "divide-conquer",
            name: "Divide and Conquer",
            subtopics: [
              "General Paradigm",
              "Strassen's Matrix Multiplication",
              "Closest Pair of Points"
            ],
            resources: [
              { type: "video", name: "Abdul Bari - Divide & Conquer", url: "https://www.youtube.com/watch?v=2Rr2tW9zvRg", icon: "📺" },
              { type: "practice", name: "GATE Overflow - D&C", url: "https://gateoverflow.in/tag/divide-and-conquer", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "greedy",
            name: "Greedy Algorithms",
            subtopics: [
              "Activity Selection, Fractional Knapsack",
              "Huffman Coding ⭐⭐",
              "Job Sequencing with Deadlines ⭐"
            ],
            resources: [
              { type: "video", name: "Abdul Bari - Greedy Playlist", url: "https://www.youtube.com/watch?v=ARvQcqJ_-NY", icon: "📺" },
              { type: "video", name: "Huffman Coding - Abdul Bari", url: "https://www.youtube.com/watch?v=co4_ahEDCho", icon: "📺" },
              { type: "practice", name: "LeetCode - Greedy", url: "https://leetcode.com/tag/greedy/", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 15
          },
          {
            id: "dp",
            name: "Dynamic Programming",
            subtopics: [
              "0/1 Knapsack ⭐⭐",
              "LCS ⭐⭐, LIS ⭐, MCM ⭐⭐",
              "Edit Distance ⭐, Coin Change ⭐, Optimal BST ⭐"
            ],
            resources: [
              { type: "video", name: "Aditya Verma - DP Playlist ⭐⭐⭐", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go", icon: "📺" },
              { type: "video", name: "Abdul Bari - DP Playlist", url: "https://www.youtube.com/watch?v=5dRGRueKU3M", icon: "📺" },
              { type: "video", name: "Striver - DP Playlist", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY", icon: "📺" },
              { type: "practice", name: "LeetCode - DP", url: "https://leetcode.com/tag/dynamic-programming/", icon: "📝" },
              { type: "practice", name: "Atcoder - DP Contest", url: "https://atcoder.jp/contests/dp", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 30
          }
        ]
      },
      {
        id: "string-matching",
        name: "String Matching",
        topics: [
          {
            id: "string-algos",
            name: "String Matching Algorithms",
            subtopics: [
              "Naive, KMP ⭐, Rabin-Karp ⭐"
            ],
            resources: [
              { type: "video", name: "Abdul Bari - KMP Algorithm", url: "https://www.youtube.com/watch?v=V5-7GzOfADQ", icon: "📺" },
              { type: "video", name: "Gate Smashers - KMP", url: "https://www.youtube.com/watch?v=qQ8vS2btsxI", icon: "📺" },
              { type: "practice", name: "LeetCode - String Matching", url: "https://leetcode.com/problems/implement-strstr/", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 8
          }
        ]
      },
      {
        id: "complexity",
        name: "Complexity Classes",
        topics: [
          {
            id: "p-np",
            name: "P, NP, NP-Complete",
            subtopics: [
              "P, NP, NP-Hard, NP-Complete",
              "Reductions, Cook's Theorem"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - P vs NP", url: "https://www.youtube.com/watch?v=e2cF8a5aAhE", icon: "📺" },
              { type: "video", name: "Abdul Bari - NP-Completeness", url: "https://www.youtube.com/watch?v=YX40hbAHx3s", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Complexity", url: "https://gateoverflow.in/tag/np-completeness", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      }
    ]
  },
  {
    id: "toc",
    name: "Theory of Computation",
    shortName: "TOC",
    icon: "🔄",
    color: "bg-gradient-to-br from-cyan-500 to-blue-600",
    weightage: "8-10%",
    description: "Automata, regular languages, CFG, PDA, Turing machines",
    sections: [
      {
        id: "finite-automata",
        name: "Finite Automata",
        topics: [
          {
            id: "dfa",
            name: "DFA — Design & Minimization",
            subtopics: [
              "DFA Formal Definition",
              "Designing DFAs for languages",
              "DFA Minimization ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Ravindrababu Ravula - TOC Playlist ⭐⭐⭐", url: "https://www.youtube.com/playlist?list=PLEbnTDJUr_IfLp5Eo3E7rBiHjLJRmOJaF", icon: "📺" },
              { type: "video", name: "Gate Smashers - DFA", url: "https://www.youtube.com/watch?v=40i4PKpM0cI", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Finite Automata", url: "https://gateoverflow.in/tag/finite-automata", icon: "📝" },
              { type: "tool", name: "JFLAP - Automata Simulator", url: "https://www.jflap.org/", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "nfa",
            name: "NFA & NFA to DFA Conversion",
            subtopics: [
              "NFA Formal Definition",
              "Subset Construction ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - NFA to DFA", url: "https://www.youtube.com/watch?v=i-fk9o46oVY", icon: "📺" },
              { type: "practice", name: "GATE Overflow - NFA", url: "https://gateoverflow.in/tag/nfa", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "regex",
            name: "Regular Expressions & Arden's Theorem",
            subtopics: [
              "RE to NFA conversion",
              "Arden's Theorem ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Regular Expressions", url: "https://www.youtube.com/watch?v=Qhx9Y2umX1c", icon: "📺" },
              { type: "video", name: "Arden's Theorem", url: "https://www.youtube.com/watch?v=wWn9s3bHW_s", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Regular Expressions", url: "https://gateoverflow.in/tag/regular-expression", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "pumping-lemma-regular",
            name: "Pumping Lemma for Regular Languages",
            subtopics: [
              "Statement and Application ⭐⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Pumping Lemma", url: "https://www.youtube.com/watch?v=Ty9tpikilAo", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Pumping Lemma", url: "https://gateoverflow.in/tag/pumping-lemma", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 8
          }
        ]
      },
      {
        id: "cfg",
        name: "Context-Free Grammars",
        topics: [
          {
            id: "cfg-basics",
            name: "CFG, Derivation, Ambiguity",
            subtopics: [
              "CFG Definition, Derivations",
              "Parse Trees, Ambiguity ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - CFG", url: "https://www.youtube.com/watch?v=U4Yzf3Zf-H8", icon: "📺" },
              { type: "practice", name: "GATE Overflow - CFG", url: "https://gateoverflow.in/tag/context-free-grammar", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "normal-forms",
            name: "Normal Forms (CNF, GNF)",
            subtopics: [
              "Chomsky Normal Form ⭐⭐",
              "Greibach Normal Form"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - CNF", url: "https://www.youtube.com/watch?v=RWsrzzRqY_E", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Normal Forms", url: "https://gateoverflow.in/tag/cnf", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "pda",
            name: "Pushdown Automata (PDA)",
            subtopics: [
              "PDA Definition",
              "DPDA vs NPDA ⭐",
              "Acceptance by Final State / Empty Stack"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - PDA", url: "https://www.youtube.com/watch?v=TRfcSAKxZKE", icon: "📺" },
              { type: "practice", name: "GATE Overflow - PDA", url: "https://gateoverflow.in/tag/pushdown-automata", icon: "📝" },
              { type: "tool", name: "JFLAP - PDA Simulator", url: "https://www.jflap.org/", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "turing",
        name: "Turing Machines",
        topics: [
          {
            id: "tm-basics",
            name: "TM Basics & Design",
            subtopics: [
              "TM Formal Definition",
              "Designing TMs",
              "Recursively Enumerable Languages"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Turing Machines", url: "https://www.youtube.com/watch?v=E3keLeMwfHY", icon: "📺" },
              { type: "practice", name: "GATE Overflow - TM", url: "https://gateoverflow.in/tag/turing-machine", icon: "📝" },
              { type: "tool", name: "Turing Machine Simulator", url: "https://turingmachine.io/", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "undecidability",
        name: "Undecidability",
        topics: [
          {
            id: "halting",
            name: "Halting Problem & Rice's Theorem",
            subtopics: [
              "Halting Problem Proof ⭐⭐⭐",
              "Rice's Theorem ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Halting Problem", url: "https://www.youtube.com/watch?v=W67E05GXFWI", icon: "📺" },
              { type: "video", name: "Rice's Theorem", url: "https://www.youtube.com/watch?v=p4LCAqQD4sM", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Undecidability", url: "https://gateoverflow.in/tag/decidability", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      }
    ]
  },
  {
    id: "compiler",
    name: "Compiler Design",
    shortName: "CD",
    icon: "🔨",
    color: "bg-gradient-to-br from-amber-500 to-yellow-600",
    weightage: "5-8%",
    description: "Lexical analysis, parsing, syntax-directed translation, code generation",
    sections: [
      {
        id: "lexical",
        name: "Lexical Analysis",
        topics: [
          {
            id: "lexer",
            name: "Tokens, Patterns, Lexemes",
            subtopics: [
              "Tokens, Patterns, Lexemes",
              "Regular Expressions for Tokens, LEX tool"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Lexical Analysis", url: "https://www.youtube.com/watch?v=SfAGDS9v84s", icon: "📺" },
              { type: "video", name: "Ravindrababu Ravula - Compiler Design", url: "https://www.youtube.com/playlist?list=PLEbnTDJUr_IcPtUXFy2b1sGRPsLFMghhS", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Compiler Design", url: "https://gateoverflow.in/tag/compiler-design", icon: "📝" },
              { type: "book", name: "Dragon Book - Aho, Ullman", url: "https://www.amazon.in/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811", icon: "📚" }
            ],
            importance: 1,
            estimatedHours: 6
          }
        ]
      },
      {
        id: "parsing",
        name: "Syntax Analysis",
        topics: [
          {
            id: "first-follow",
            name: "FIRST & FOLLOW Sets",
            subtopics: [
              "FIRST set computation ⭐⭐",
              "FOLLOW set computation ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - FIRST & FOLLOW", url: "https://www.youtube.com/watch?v=_uSlP91jmTM", icon: "📺" },
              { type: "video", name: "Ravindrababu Ravula - FIRST & FOLLOW", url: "https://www.youtube.com/watch?v=zcqtF5r0ouc", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Parsing", url: "https://gateoverflow.in/tag/parsing", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 10
          },
          {
            id: "ll1",
            name: "LL(1) Parsing",
            subtopics: [
              "Left Recursion Elimination ⭐",
              "Left Factoring ⭐",
              "LL(1) Parse Table"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - LL(1) Parsing", url: "https://www.youtube.com/watch?v=iySn-UiQ7-A", icon: "📺" },
              { type: "video", name: "Left Recursion Elimination", url: "https://www.youtube.com/watch?v=cMmJKnRF6mQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - LL(1)", url: "https://gateoverflow.in/tag/ll-parser", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 12
          },
          {
            id: "lr-parsing",
            name: "SLR, CLR, LALR Parsing",
            subtopics: [
              "LR(0) Items, SLR(1) Table ⭐⭐",
              "LR(1) Items, CLR(1) Table ⭐",
              "LALR(1): Merging States ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - SLR Parsing", url: "https://www.youtube.com/watch?v=A7TdyYGMfw0", icon: "📺" },
              { type: "video", name: "Ravindrababu Ravula - LR Parsing ⭐⭐⭐", url: "https://www.youtube.com/watch?v=b5KhKVHR-2A", icon: "📺" },
              { type: "video", name: "Gate Smashers - CLR Parsing", url: "https://www.youtube.com/watch?v=HPVC_ebMb4o", icon: "📺" },
              { type: "practice", name: "GATE Overflow - LR Parsing", url: "https://gateoverflow.in/tag/lr-parser", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 20
          }
        ]
      },
      {
        id: "sdt",
        name: "SDT & Code Generation",
        topics: [
          {
            id: "sdt-icg",
            name: "Syntax-Directed Translation & ICG",
            subtopics: [
              "Synthesized & Inherited Attributes",
              "Three-Address Code ⭐",
              "Boolean Expressions, Control Flow"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - SDT", url: "https://www.youtube.com/watch?v=LCBDYjHlXQ8", icon: "📺" },
              { type: "video", name: "Gate Smashers - ICG", url: "https://www.youtube.com/watch?v=Bz5Jw7l_tq0", icon: "📺" },
              { type: "practice", name: "GATE Overflow - SDT", url: "https://gateoverflow.in/tag/syntax-directed-translation", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "optimization",
        name: "Code Optimization",
        topics: [
          {
            id: "code-opt",
            name: "Code Optimization & Basic Blocks",
            subtopics: [
              "DAG for Basic Blocks ⭐",
              "Loop Optimization, Peephole Optimization"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Code Optimization", url: "https://www.youtube.com/watch?v=sUj3Dng0lzA", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Code Optimization", url: "https://gateoverflow.in/tag/code-optimization", icon: "📝" }
            ],
            importance: 1,
            estimatedHours: 8
          }
        ]
      },
      {
        id: "runtime",
        name: "Runtime Environments",
        topics: [
          {
            id: "runtime-env",
            name: "Activation Records & Scoping",
            subtopics: [
              "Activation Records",
              "Static vs Dynamic Scoping ⭐",
              "Parameter Passing Mechanisms"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Runtime Environments", url: "https://www.youtube.com/watch?v=Sf5t-WCKe-Q", icon: "📺" },
              { type: "video", name: "Static vs Dynamic Scoping", url: "https://www.youtube.com/watch?v=i2oc5dCPP8E", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Runtime", url: "https://gateoverflow.in/tag/runtime-environment", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      }
    ]
  },
  {
    id: "os",
    name: "Operating Systems",
    shortName: "OS",
    icon: "🖧",
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    weightage: "12-15%",
    description: "Process management, synchronization, deadlocks, memory, file systems",
    sections: [
      {
        id: "cpu-scheduling",
        name: "Process Management & CPU Scheduling",
        topics: [
          {
            id: "scheduling",
            name: "CPU Scheduling Algorithms",
            subtopics: [
              "Process States, PCB, Context Switching",
              "FCFS, SJF, SRTF, Priority, Round Robin ⭐",
              "Gantt Chart, Waiting/Turnaround Time ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - OS Playlist ⭐⭐⭐", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p", icon: "📺" },
              { type: "video", name: "Ravindrababu Ravula - OS Playlist", url: "https://www.youtube.com/playlist?list=PLEbnTDJUr_If_BnzJkkN_J0Tl3iXTL8vq", icon: "📺" },
              { type: "video", name: "Gate Smashers - CPU Scheduling", url: "https://www.youtube.com/watch?v=nzMgmg8lFTo", icon: "📺" },
              { type: "practice", name: "GATE Overflow - OS", url: "https://gateoverflow.in/tag/operating-system", icon: "📝" },
              { type: "book", name: "Galvin - OS Concepts", url: "https://www.amazon.in/Operating-System-Concepts-Abraham-Silberschatz/dp/8126554274", icon: "📚" }
            ],
            importance: 3,
            estimatedHours: 20
          }
        ]
      },
      {
        id: "synchronization",
        name: "Process Synchronization",
        topics: [
          {
            id: "semaphores",
            name: "Semaphores & Classical Problems",
            subtopics: [
              "Critical Section, Peterson's Solution ⭐",
              "Semaphores (Binary & Counting) ⭐⭐⭐",
              "Producer-Consumer, Readers-Writers, Dining Philosophers ⭐⭐⭐",
              "Monitors"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Synchronization", url: "https://www.youtube.com/watch?v=eDU1VLb6TqY", icon: "📺" },
              { type: "video", name: "Gate Smashers - Semaphores", url: "https://www.youtube.com/watch?v=XDIOC2EY5JE", icon: "📺" },
              { type: "video", name: "Producer Consumer", url: "https://www.youtube.com/watch?v=Qx3P2wazwI0", icon: "📺" },
              { type: "video", name: "Readers Writers", url: "https://www.youtube.com/watch?v=rWj-sRBl16M", icon: "📺" },
              { type: "video", name: "Dining Philosophers", url: "https://www.youtube.com/watch?v=NbwbQQB7xNQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Synchronization", url: "https://gateoverflow.in/tag/process-synchronization", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 20
          }
        ]
      },
      {
        id: "deadlocks",
        name: "Deadlocks",
        topics: [
          {
            id: "deadlock-handling",
            name: "Deadlock Detection & Banker's Algorithm",
            subtopics: [
              "Conditions, RAG",
              "Banker's Algorithm ⭐⭐⭐ — Numerical Problems ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Deadlocks", url: "https://www.youtube.com/watch?v=UVo9mGARkhQ", icon: "📺" },
              { type: "video", name: "Gate Smashers - Banker's Algorithm", url: "https://www.youtube.com/watch?v=T0FXvTHcYi4", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Deadlocks", url: "https://gateoverflow.in/tag/deadlock", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          }
        ]
      },
      {
        id: "memory-mgmt",
        name: "Memory Management",
        topics: [
          {
            id: "paging",
            name: "Paging & Multi-level Paging",
            subtopics: [
              "Paging, Multi-level Paging, TLB ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Paging", url: "https://www.youtube.com/watch?v=pJ6qrCB8pDw", icon: "📺" },
              { type: "video", name: "Gate Smashers - Multi-level Paging", url: "https://www.youtube.com/watch?v=6neHHkI0Z0o", icon: "📺" },
              { type: "video", name: "Gate Smashers - TLB", url: "https://www.youtube.com/watch?v=6hHWiwT06eM", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Memory", url: "https://gateoverflow.in/tag/memory-management", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "page-replacement",
            name: "Virtual Memory & Page Replacement",
            subtopics: [
              "FIFO, LRU, Optimal ⭐⭐⭐",
              "Belady's Anomaly"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Page Replacement", url: "https://www.youtube.com/watch?v=16kaPQtYo28", icon: "📺" },
              { type: "video", name: "FIFO, LRU, Optimal", url: "https://www.youtube.com/watch?v=4wLI1kmlJ5o", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Page Replacement", url: "https://gateoverflow.in/tag/page-replacement", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "file-disk",
        name: "File Systems & Disk Scheduling",
        topics: [
          {
            id: "file-system",
            name: "File Allocation & Disk Scheduling",
            subtopics: [
              "Inode, Multi-level Indexed ⭐⭐",
              "FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - File Systems", url: "https://www.youtube.com/watch?v=mzUyMy7Ihk0", icon: "📺" },
              { type: "video", name: "Gate Smashers - Disk Scheduling", url: "https://www.youtube.com/watch?v=HKSZp6r1Chk", icon: "📺" },
              { type: "video", name: "Gate Smashers - Inode", url: "https://www.youtube.com/watch?v=tMVj22EWg6A", icon: "📺" },
              { type: "practice", name: "GATE Overflow - File Systems", url: "https://gateoverflow.in/tag/file-system", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 12
          }
        ]
      }
    ]
  },
  {
    id: "dbms",
    name: "Databases",
    shortName: "DBMS",
    icon: "🗄️",
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
    weightage: "10-12%",
    description: "ER model, SQL, normalization, transactions, concurrency control",
    sections: [
      {
        id: "er-model",
        name: "ER Model & Relational Mapping",
        topics: [
          {
            id: "er-diagram",
            name: "ER Model & Minimum Tables",
            subtopics: [
              "Entity, Attributes, Relationships, Cardinality",
              "Minimum Tables Questions ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - DBMS Playlist ⭐⭐⭐", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y", icon: "📺" },
              { type: "video", name: "Gate Smashers - ER to Relational", url: "https://www.youtube.com/watch?v=O9J-9yIqz-M", icon: "📺" },
              { type: "practice", name: "GATE Overflow - DBMS", url: "https://gateoverflow.in/tag/databases", icon: "📝" },
              { type: "book", name: "Korth - Database System Concepts", url: "https://www.amazon.in/Database-System-Concepts-Abraham-Silberschatz/dp/0078022150", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "relational-algebra",
        name: "Relational Algebra",
        topics: [
          {
            id: "ra-operations",
            name: "RA Operations & Query Writing",
            subtopics: [
              "Selection, Projection, Join, Division ⭐⭐",
              "Outer Joins, Query Writing"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Relational Algebra", url: "https://www.youtube.com/watch?v=E7OVPo7kEO0", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Relational Algebra", url: "https://gateoverflow.in/tag/relational-algebra", icon: "📝" },
              { type: "tool", name: "RA Interpreter", url: "https://dbis-uibk.github.io/relax/", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "sql",
        name: "SQL",
        topics: [
          {
            id: "sql-queries",
            name: "SQL Queries & Output Questions",
            subtopics: [
              "SELECT, JOINs, Subqueries, GROUP BY, HAVING ⭐⭐",
              "Aggregate Functions, NULL Handling",
              "SQL Output Questions ⭐⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - SQL", url: "https://www.youtube.com/watch?v=323H_mOOWQ4", icon: "📺" },
              { type: "practice", name: "HackerRank - SQL ⭐⭐⭐", url: "https://www.hackerrank.com/domains/sql", icon: "📝" },
              { type: "practice", name: "LeetCode - SQL", url: "https://leetcode.com/problemset/database/", icon: "📝" },
              { type: "practice", name: "SQLZoo", url: "https://sqlzoo.net/", icon: "📝" },
              { type: "tool", name: "DB Fiddle", url: "https://www.db-fiddle.com/", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 15
          }
        ]
      },
      {
        id: "normalization",
        name: "Normalization",
        topics: [
          {
            id: "fd-keys",
            name: "Functional Dependencies & Candidate Keys",
            subtopics: [
              "FD, Attribute Closure, Candidate Keys ⭐⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - FDs", url: "https://www.youtube.com/watch?v=dR-jJimWWHA", icon: "📺" },
              { type: "video", name: "Gate Smashers - Candidate Keys", url: "https://www.youtube.com/watch?v=HNNk_XPmqp4", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Normalization", url: "https://gateoverflow.in/tag/normalization", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          },
          {
            id: "normal-forms",
            name: "Normal Forms (1NF to BCNF)",
            subtopics: [
              "1NF, 2NF, 3NF, BCNF ⭐⭐⭐",
              "BCNF vs 3NF ⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Normalization", url: "https://www.youtube.com/watch?v=ABwD8IYByfk", icon: "📺" },
              { type: "video", name: "BCNF vs 3NF", url: "https://www.youtube.com/watch?v=Ub_S0L8edhs", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Normal Forms", url: "https://gateoverflow.in/tag/normal-forms", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          },
          {
            id: "decomposition",
            name: "Decomposition",
            subtopics: [
              "Lossless, Dependency Preserving ⭐⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Lossless Decomposition", url: "https://www.youtube.com/watch?v=nYhFdMhCLNo", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Decomposition", url: "https://gateoverflow.in/tag/decomposition", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "transactions",
        name: "Transactions & Concurrency",
        topics: [
          {
            id: "serializability",
            name: "Schedules & Serializability",
            subtopics: [
              "Conflict Serializability ⭐⭐⭐",
              "Precedence Graph ⭐⭐",
              "View Serializability"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Transactions", url: "https://www.youtube.com/watch?v=eYQwKi7P8MM", icon: "📺" },
              { type: "video", name: "Conflict Serializability", url: "https://www.youtube.com/watch?v=onYjxRcfoto", icon: "📺" },
              { type: "video", name: "Precedence Graph", url: "https://www.youtube.com/watch?v=UgLTjlkdnaQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Transactions", url: "https://gateoverflow.in/tag/transactions", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "2pl",
            name: "2PL & Locking",
            subtopics: [
              "Two Phase Locking ⭐⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Two Phase Locking", url: "https://www.youtube.com/watch?v=wVxJTYvNMDk", icon: "📺" },
              { type: "practice", name: "GATE Overflow - 2PL", url: "https://gateoverflow.in/tag/two-phase-locking", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "indexing",
        name: "Indexing",
        topics: [
          {
            id: "btree-index",
            name: "B Trees & B+ Trees",
            subtopics: [
              "B Tree Properties ⭐",
              "B+ Tree Structure ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Indexing", url: "https://www.youtube.com/watch?v=hT3r-FMNKjA", icon: "📺" },
              { type: "video", name: "Gate Smashers - B+ Trees", url: "https://www.youtube.com/watch?v=K1a2Bk8NrYQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Indexing", url: "https://gateoverflow.in/tag/indexing", icon: "📝" },
              { type: "tool", name: "B+ Tree Visualizer", url: "https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html", icon: "🔧" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      }
    ]
  },
  {
    id: "networks",
    name: "Computer Networks",
    shortName: "CN",
    icon: "🌐",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    weightage: "5-8%",
    description: "OSI/TCP-IP, data link, network, transport, application layers",
    sections: [
      {
        id: "osi-tcp",
        name: "Network Models",
        topics: [
          {
            id: "network-basics",
            name: "OSI/TCP-IP Models & Physical Layer",
            subtopics: [
              "7 Layers of OSI",
              "TCP/IP Model",
              "Physical Layer Basics"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Networks Playlist ⭐⭐⭐", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_", icon: "📺" },
              { type: "video", name: "Neso Academy - Networks Playlist", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Networks", url: "https://gateoverflow.in/tag/computer-networks", icon: "📝" },
              { type: "book", name: "Kurose & Ross", url: "https://www.amazon.in/Computer-Networking-Top-Down-Approach-7th/dp/0133594149", icon: "📚" }
            ],
            importance: 1,
            estimatedHours: 6
          }
        ]
      },
      {
        id: "data-link",
        name: "Data Link Layer",
        topics: [
          {
            id: "error-detection",
            name: "Error Detection: CRC & Hamming",
            subtopics: [
              "CRC ⭐⭐",
              "Hamming Code ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - CRC", url: "https://www.youtube.com/watch?v=A9g6rTMblz4", icon: "📺" },
              { type: "video", name: "Gate Smashers - Hamming Code", url: "https://www.youtube.com/watch?v=373FUw-2U2k", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Error Detection", url: "https://gateoverflow.in/tag/error-detection", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "flow-control",
            name: "Flow Control Protocols",
            subtopics: [
              "Stop & Wait ⭐⭐",
              "Go-Back-N vs Selective Repeat ⭐⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Stop & Wait", url: "https://www.youtube.com/watch?v=LgPJhmDjRYQ", icon: "📺" },
              { type: "video", name: "Gate Smashers - Sliding Window", url: "https://www.youtube.com/watch?v=klGkODhjkPA", icon: "📺" },
              { type: "video", name: "GBN vs SR", url: "https://www.youtube.com/watch?v=QD3oCelHJ20", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Flow Control", url: "https://gateoverflow.in/tag/sliding-window", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "mac",
            name: "MAC Protocols: ALOHA, CSMA/CD",
            subtopics: [
              "Pure ALOHA, Slotted ALOHA ⭐",
              "CSMA/CD ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - ALOHA", url: "https://www.youtube.com/watch?v=6cOb9bLfxgQ", icon: "📺" },
              { type: "video", name: "Gate Smashers - CSMA/CD", url: "https://www.youtube.com/watch?v=iKn0GzF5-IU", icon: "📺" },
              { type: "practice", name: "GATE Overflow - MAC", url: "https://gateoverflow.in/tag/mac", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "network-layer",
        name: "Network Layer",
        topics: [
          {
            id: "ip-addressing",
            name: "IPv4 Addressing & Subnetting",
            subtopics: [
              "Classful Addressing",
              "Subnetting ⭐⭐⭐",
              "CIDR & VLSM"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - IP Addressing", url: "https://www.youtube.com/watch?v=bBLHJSz7R-A", icon: "📺" },
              { type: "video", name: "Gate Smashers - Subnetting ⭐⭐", url: "https://www.youtube.com/watch?v=ecCuyq-Wprc", icon: "📺" },
              { type: "practice", name: "GATE Overflow - IP Addressing", url: "https://gateoverflow.in/tag/ip-addressing", icon: "📝" },
              { type: "tool", name: "Subnet Calculator", url: "https://www.subnet-calculator.com/", icon: "🔧" }
            ],
            importance: 3,
            estimatedHours: 15
          },
          {
            id: "fragmentation",
            name: "IP Fragmentation",
            subtopics: [
              "MTU, Fragment Offset ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - IP Fragmentation", url: "https://www.youtube.com/watch?v=y8JqZ2u7KY8", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Fragmentation", url: "https://gateoverflow.in/tag/fragmentation", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 8
          },
          {
            id: "routing",
            name: "Routing Protocols",
            subtopics: [
              "Distance Vector Routing",
              "Link State Routing"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Distance Vector", url: "https://www.youtube.com/watch?v=00AAnwgl2DI", icon: "📺" },
              { type: "video", name: "Gate Smashers - Link State", url: "https://www.youtube.com/watch?v=nh_bpXAY1pc", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Routing", url: "https://gateoverflow.in/tag/routing", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "transport-layer",
        name: "Transport Layer",
        topics: [
          {
            id: "tcp",
            name: "TCP: 3-Way Handshake, Flow Control",
            subtopics: [
              "TCP Header",
              "Three-Way Handshake ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - TCP", url: "https://www.youtube.com/watch?v=SLY4Ud53UMs", icon: "📺" },
              { type: "practice", name: "GATE Overflow - TCP", url: "https://gateoverflow.in/tag/tcp", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "congestion",
            name: "TCP Congestion Control",
            subtopics: [
              "Slow Start, Congestion Avoidance ⭐⭐⭐",
              "TCP Reno vs Tahoe"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - Congestion Control ⭐⭐", url: "https://www.youtube.com/watch?v=cPLDaypKQkU", icon: "📺" },
              { type: "video", name: "TCP Reno vs Tahoe", url: "https://www.youtube.com/watch?v=VkkK50F0Byo", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Congestion", url: "https://gateoverflow.in/tag/congestion-control", icon: "📝" }
            ],
            importance: 3,
            estimatedHours: 12
          }
        ]
      },
      {
        id: "application-layer",
        name: "Application Layer",
        topics: [
          {
            id: "app-protocols",
            name: "DNS & HTTP",
            subtopics: [
              "DNS Resolution ⭐",
              "HTTP Persistent/Non-persistent ⭐⭐"
            ],
            resources: [
              { type: "video", name: "Gate Smashers - DNS", url: "https://www.youtube.com/watch?v=Rck3BALhI5c", icon: "📺" },
              { type: "video", name: "Gate Smashers - HTTP", url: "https://www.youtube.com/watch?v=0OrmKCB0UrQ", icon: "📺" },
              { type: "practice", name: "GATE Overflow - Application Layer", url: "https://gateoverflow.in/tag/application-layer", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 8
          }
        ]
      }
    ]
  },
  {
    id: "aptitude",
    name: "General Aptitude",
    shortName: "GA",
    icon: "🧩",
    color: "bg-gradient-to-br from-rose-500 to-pink-600",
    weightage: "15%",
    description: "Quantitative aptitude, verbal ability, logical reasoning",
    sections: [
      {
        id: "quant",
        name: "Quantitative Aptitude",
        topics: [
          {
            id: "arithmetic",
            name: "Arithmetic",
            subtopics: [
              "Percentages, Profit/Loss, SI/CI, Averages"
            ],
            resources: [
              { type: "video", name: "Testbook - GATE Aptitude", url: "https://www.youtube.com/watch?v=aYLh5O-KxKk", icon: "📺" },
              { type: "practice", name: "IndiaBix - Quantitative ⭐⭐", url: "https://www.indiabix.com/aptitude/questions-and-answers/", icon: "📝" },
              { type: "practice", name: "GATE Overflow - Aptitude", url: "https://gateoverflow.in/tag/general-aptitude", icon: "📝" },
              { type: "book", name: "RS Aggarwal - Quantitative Aptitude", url: "https://www.amazon.in/Quantitative-Aptitude-Competitive-Examinations-Aggarwal/dp/9352534026", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 15
          },
          {
            id: "algebra",
            name: "Algebra & Progressions",
            subtopics: [
              "Algebra, Progressions, Logarithms"
            ],
            resources: [
              { type: "video", name: "Khan Academy - Algebra", url: "https://www.khanacademy.org/math/algebra", icon: "📺" },
              { type: "practice", name: "IndiaBix - Algebra", url: "https://www.indiabix.com/aptitude/problems-on-numbers/", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          },
          {
            id: "data-interp",
            name: "Data Interpretation",
            subtopics: [
              "Tables, Bar Graphs, Pie Charts"
            ],
            resources: [
              { type: "video", name: "CareerRide - Data Interpretation", url: "https://www.youtube.com/watch?v=zRzHJQXJG14", icon: "📺" },
              { type: "practice", name: "IndiaBix - Data Interpretation ⭐⭐", url: "https://www.indiabix.com/data-interpretation/questions-and-answers/", icon: "📝" }
            ],
            importance: 2,
            estimatedHours: 10
          }
        ]
      },
      {
        id: "verbal",
        name: "Verbal Ability",
        topics: [
          {
            id: "english",
            name: "Grammar & Vocabulary",
            subtopics: [
              "Grammar, Vocabulary, Reading Comprehension"
            ],
            resources: [
              { type: "video", name: "Mahendras - English Grammar", url: "https://www.youtube.com/playlist?list=PLGeYLPghI_tTnKW7fqXUyAEiUzE1-_uCt", icon: "📺" },
              { type: "practice", name: "IndiaBix - Verbal Ability ⭐⭐", url: "https://www.indiabix.com/verbal-ability/questions-and-answers/", icon: "📝" },
              { type: "book", name: "Word Power Made Easy", url: "https://www.amazon.in/Word-Power-Made-Easy-Norman/dp/067174190X", icon: "📚" },
              { type: "book", name: "Wren & Martin", url: "https://www.amazon.in/High-School-English-Grammar-Composition/dp/9352530144", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 15
          }
        ]
      },
      {
        id: "logical",
        name: "Logical Reasoning",
        topics: [
          {
            id: "reasoning",
            name: "Arrangements, Blood Relations, Puzzles",
            subtopics: [
              "Arrangements, Blood Relations, Coding-Decoding, Series"
            ],
            resources: [
              { type: "video", name: "CareerRide - Logical Reasoning", url: "https://www.youtube.com/watch?v=vY_Ry8J_jdw", icon: "📺" },
              { type: "practice", name: "IndiaBix - Logical Reasoning ⭐⭐", url: "https://www.indiabix.com/logical-reasoning/questions-and-answers/", icon: "📝" },
              { type: "practice", name: "Brilliant.org - Logic Puzzles", url: "https://brilliant.org/courses/logic/", icon: "📝" },
              { type: "book", name: "RS Aggarwal - Reasoning", url: "https://www.amazon.in/Modern-Approach-Verbal-Non-Verbal-Reasoning/dp/9352535006", icon: "📚" }
            ],
            importance: 2,
            estimatedHours: 15
          }
        ]
      }
    ]
  }
];

// Sample Quiz Questions
export const quizzes: Quiz[] = [
  // Propositional Logic
  {
    id: "q1",
    topicId: "prop-logic",
    question: "Which of the following is a tautology?",
    options: ["p ∧ q", "p ∨ ¬p", "p → q", "p ↔ q"],
    correctAnswer: 1,
    explanation: "p ∨ ¬p is always true regardless of the truth value of p (Law of Excluded Middle)",
    difficulty: "easy"
  },
  {
    id: "q2",
    topicId: "prop-logic",
    question: "The contrapositive of 'If it rains, then the ground is wet' is:",
    options: [
      "If the ground is wet, then it rains",
      "If it doesn't rain, then the ground is not wet",
      "If the ground is not wet, then it doesn't rain",
      "It rains and the ground is not wet"
    ],
    correctAnswer: 2,
    explanation: "Contrapositive of p → q is ¬q → ¬p. So 'ground not wet → doesn't rain'",
    difficulty: "medium"
  },
  {
    id: "q3",
    topicId: "prop-logic",
    question: "De Morgan's law states that ¬(p ∧ q) is equivalent to:",
    options: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∨ q", "p → q"],
    correctAnswer: 1,
    explanation: "De Morgan's Law: ¬(p ∧ q) ≡ ¬p ∨ ¬q",
    difficulty: "easy"
  },
  // Set Theory
  {
    id: "q4",
    topicId: "set-theory",
    question: "If |A| = 5 and |B| = 3, what is the maximum value of |A ∪ B|?",
    options: ["3", "5", "8", "15"],
    correctAnswer: 2,
    explanation: "Maximum |A ∪ B| occurs when A and B are disjoint, giving |A| + |B| = 5 + 3 = 8",
    difficulty: "easy"
  },
  {
    id: "q5",
    topicId: "set-theory",
    question: "The power set of {1, 2, 3} has how many elements?",
    options: ["3", "6", "8", "9"],
    correctAnswer: 2,
    explanation: "Power set of a set with n elements has 2^n elements. Here 2^3 = 8",
    difficulty: "easy"
  },
  // Relations
  {
    id: "q6",
    topicId: "relations",
    question: "A relation R on set A is an equivalence relation if it is:",
    options: [
      "Reflexive and Symmetric",
      "Symmetric and Transitive",
      "Reflexive, Symmetric, and Transitive",
      "Reflexive and Transitive"
    ],
    correctAnswer: 2,
    explanation: "An equivalence relation must be reflexive, symmetric, AND transitive",
    difficulty: "easy"
  },
  // Functions
  {
    id: "q7",
    topicId: "functions",
    question: "If f: A → B is a bijection and |A| = 5, then |B| = ?",
    options: ["Cannot be determined", "5", "10", "25"],
    correctAnswer: 1,
    explanation: "A bijection means one-to-one and onto. So |A| must equal |B| = 5",
    difficulty: "medium"
  },
  // Graph Theory
  {
    id: "q8",
    topicId: "graph-theory",
    question: "A complete graph K₅ has how many edges?",
    options: ["5", "10", "15", "20"],
    correctAnswer: 1,
    explanation: "Complete graph Kₙ has n(n-1)/2 edges. K₅ has 5(4)/2 = 10 edges",
    difficulty: "easy"
  },
  {
    id: "q9",
    topicId: "graph-theory",
    question: "For a graph to have an Euler circuit, all vertices must have:",
    options: ["Odd degree", "Even degree", "Same degree", "Degree at least 2"],
    correctAnswer: 1,
    explanation: "A graph has an Euler circuit iff all vertices have even degree and it's connected",
    difficulty: "medium"
  },
  // Eigenvalues
  {
    id: "q10",
    topicId: "eigenvalues",
    question: "If λ is an eigenvalue of matrix A, then λ² is an eigenvalue of:",
    options: ["A", "A⁻¹", "A²", "2A"],
    correctAnswer: 2,
    explanation: "If Ax = λx, then A²x = A(λx) = λ(Ax) = λ²x. So λ² is eigenvalue of A²",
    difficulty: "medium"
  },
  // Probability
  {
    id: "q11",
    topicId: "basic-probability",
    question: "Two dice are thrown. What is the probability that the sum is 7?",
    options: ["1/6", "1/12", "5/36", "7/36"],
    correctAnswer: 0,
    explanation: "Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 out of 36. P = 6/36 = 1/6",
    difficulty: "easy"
  },
  // Recursion
  {
    id: "q12",
    topicId: "recursion",
    question: "What is the time complexity of the naive recursive Fibonacci?",
    options: ["O(n)", "O(n²)", "O(2ⁿ)", "O(log n)"],
    correctAnswer: 2,
    explanation: "Naive recursive Fibonacci has exponential time complexity O(2ⁿ) due to overlapping subproblems",
    difficulty: "medium"
  },
  // Linked Lists
  {
    id: "q13",
    topicId: "linked-lists",
    question: "Floyd's cycle detection algorithm uses how many pointers?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "Floyd's algorithm uses two pointers: slow (moves 1 step) and fast (moves 2 steps)",
    difficulty: "easy"
  },
  // Trees
  {
    id: "q14",
    topicId: "trees",
    question: "The minimum number of nodes in an AVL tree of height h is:",
    options: ["h", "h+1", "N(h-1) + N(h-2) + 1", "2^h"],
    correctAnswer: 2,
    explanation: "Min nodes in AVL tree: N(h) = N(h-1) + N(h-2) + 1, similar to Fibonacci",
    difficulty: "hard"
  },
  // Sorting
  {
    id: "q15",
    topicId: "sorting-algos",
    question: "Which sorting algorithm is NOT stable?",
    options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    correctAnswer: 2,
    explanation: "Quick Sort is not stable by default. The others maintain relative order of equal elements",
    difficulty: "easy"
  },
  // Master Theorem
  {
    id: "q16",
    topicId: "asymptotic",
    question: "Using Master Theorem, T(n) = 2T(n/2) + n has complexity:",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "a=2, b=2, f(n)=n. n^(log₂2) = n = f(n). Case 2: T(n) = O(n log n)",
    difficulty: "medium"
  },
  // DP
  {
    id: "q17",
    topicId: "dp",
    question: "0/1 Knapsack can be solved in which time complexity?",
    options: ["O(n)", "O(nW)", "O(2ⁿ)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "0/1 Knapsack using DP takes O(nW) time where n is items and W is capacity",
    difficulty: "medium"
  },
  // DFA
  {
    id: "q18",
    topicId: "dfa",
    question: "The minimum DFA for accepting strings divisible by 3 (in binary) has how many states?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "States represent remainder 0, 1, 2 when divided by 3. So 3 states minimum.",
    difficulty: "medium"
  },
  // Pumping Lemma
  {
    id: "q19",
    topicId: "pumping-lemma-regular",
    question: "Which language is NOT regular?",
    options: ["{aⁿbⁿ | n ≥ 0}", "a*b*", "(ab)*", "{w | |w| is even}"],
    correctAnswer: 0,
    explanation: "{aⁿbⁿ} is not regular as it requires counting, proved using Pumping Lemma",
    difficulty: "easy"
  },
  // CFG
  {
    id: "q20",
    topicId: "cfg-basics",
    question: "A grammar is ambiguous if:",
    options: [
      "It has left recursion",
      "It generates no strings",
      "A string has multiple parse trees",
      "It has ε-productions"
    ],
    correctAnswer: 2,
    explanation: "A grammar is ambiguous if there exists a string with more than one parse tree",
    difficulty: "easy"
  },
  // LR Parsing
  {
    id: "q21",
    topicId: "lr-parsing",
    question: "Which is the most powerful LR parser?",
    options: ["SLR(1)", "LALR(1)", "CLR(1)", "LL(1)"],
    correctAnswer: 2,
    explanation: "CLR(1) is the most powerful. Hierarchy: LL(1) < SLR(1) < LALR(1) < CLR(1)",
    difficulty: "easy"
  },
  // CPU Scheduling
  {
    id: "q22",
    topicId: "scheduling",
    question: "Which scheduling algorithm can cause starvation?",
    options: ["FCFS", "Round Robin", "SJF", "All of the above"],
    correctAnswer: 2,
    explanation: "SJF can cause starvation for long processes as shorter jobs keep arriving",
    difficulty: "easy"
  },
  // Semaphores
  {
    id: "q23",
    topicId: "semaphores",
    question: "In Producer-Consumer problem, how many semaphores are typically used?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation: "3 semaphores: mutex (for CS), empty (counting empty slots), full (counting filled slots)",
    difficulty: "medium"
  },
  // Deadlock
  {
    id: "q24",
    topicId: "deadlock-handling",
    question: "Banker's algorithm is used for:",
    options: [
      "Deadlock prevention",
      "Deadlock avoidance",
      "Deadlock detection",
      "Deadlock recovery"
    ],
    correctAnswer: 1,
    explanation: "Banker's algorithm is a deadlock avoidance algorithm that ensures system stays in safe state",
    difficulty: "easy"
  },
  // Page Replacement
  {
    id: "q25",
    topicId: "page-replacement",
    question: "Belady's anomaly is associated with which page replacement algorithm?",
    options: ["LRU", "Optimal", "FIFO", "LFU"],
    correctAnswer: 2,
    explanation: "FIFO can show Belady's anomaly: more frames can lead to more page faults",
    difficulty: "easy"
  },
  // SQL
  {
    id: "q26",
    topicId: "sql-queries",
    question: "What does SELECT COUNT(*) FROM table WHERE 1=0 return?",
    options: ["NULL", "0", "Error", "Empty result"],
    correctAnswer: 1,
    explanation: "COUNT(*) with no matching rows returns 0, not NULL or empty result",
    difficulty: "medium"
  },
  // Normalization
  {
    id: "q27",
    topicId: "normal-forms",
    question: "If a relation is in BCNF, it is definitely in:",
    options: ["2NF only", "3NF only", "Both 2NF and 3NF", "4NF"],
    correctAnswer: 2,
    explanation: "BCNF implies 3NF which implies 2NF which implies 1NF. So BCNF ⊂ 3NF ⊂ 2NF",
    difficulty: "easy"
  },
  // Serializability
  {
    id: "q28",
    topicId: "serializability",
    question: "A schedule is conflict serializable if its precedence graph is:",
    options: ["Complete", "Cyclic", "Acyclic", "Bipartite"],
    correctAnswer: 2,
    explanation: "A schedule is conflict serializable iff its precedence graph is acyclic",
    difficulty: "easy"
  },
  // Subnetting
  {
    id: "q29",
    topicId: "ip-addressing",
    question: "How many hosts can a /26 subnet support?",
    options: ["26", "62", "64", "30"],
    correctAnswer: 1,
    explanation: "/26 means 32-26=6 host bits. 2^6 - 2 = 62 usable hosts (excluding network and broadcast)",
    difficulty: "medium"
  },
  // TCP
  {
    id: "q30",
    topicId: "congestion",
    question: "In TCP Slow Start, the congestion window:",
    options: [
      "Increases linearly",
      "Decreases exponentially",
      "Increases exponentially (doubles each RTT)",
      "Remains constant"
    ],
    correctAnswer: 2,
    explanation: "In Slow Start, cwnd doubles every RTT (exponential increase) until ssthresh",
    difficulty: "medium"
  },
  // Additional Propositional Logic
  {
    id: "q31",
    topicId: "prop-logic",
    question: "The statement (p → q) ∧ (q → r) → (p → r) is:",
    options: ["Tautology", "Contradiction", "Contingency", "Satisfiable but not valid"],
    correctAnswer: 0,
    explanation: "This is the hypothetical syllogism / transitivity of implication - always true (tautology)",
    difficulty: "medium"
  },
  {
    id: "q32",
    topicId: "prop-logic",
    question: "How many rows does a truth table with 4 propositional variables have?",
    options: ["4", "8", "16", "32"],
    correctAnswer: 2,
    explanation: "A truth table with n variables has 2^n rows. Here 2^4 = 16",
    difficulty: "easy"
  },
  // Additional Set Theory
  {
    id: "q33",
    topicId: "set-theory",
    question: "If A has 3 elements and B has 4 elements, how many functions from A to B exist?",
    options: ["12", "64", "81", "24"],
    correctAnswer: 1,
    explanation: "Number of functions from A to B is |B|^|A| = 4^3 = 64",
    difficulty: "medium"
  },
  // Additional Graph Theory
  {
    id: "q34",
    topicId: "graph-theory",
    question: "A tree with n vertices has how many edges?",
    options: ["n", "n-1", "n+1", "2n"],
    correctAnswer: 1,
    explanation: "A tree with n vertices always has exactly n-1 edges (connected and acyclic)",
    difficulty: "easy"
  },
  {
    id: "q35",
    topicId: "graph-theory",
    question: "The chromatic number of a bipartite graph (with at least one edge) is:",
    options: ["1", "2", "3", "Depends on graph"],
    correctAnswer: 1,
    explanation: "A bipartite graph can be 2-colored, so its chromatic number is 2",
    difficulty: "medium"
  },
  // Additional Combinatorics
  {
    id: "q36",
    topicId: "combinatorics",
    question: "In how many ways can 5 people be seated around a circular table?",
    options: ["120", "24", "60", "720"],
    correctAnswer: 1,
    explanation: "Circular permutations of n objects = (n-1)! = 4! = 24",
    difficulty: "medium"
  },
  // Additional Pointers
  {
    id: "q37",
    topicId: "pointers",
    question: "If int *p and p points to address 1000, after p++ (int is 4 bytes), p points to:",
    options: ["1001", "1004", "1000", "1008"],
    correctAnswer: 1,
    explanation: "Pointer arithmetic scales by data type size. int++ moves 4 bytes: 1000 + 4 = 1004",
    difficulty: "medium"
  },
  {
    id: "q38",
    topicId: "pointers",
    question: "A pointer that points to a deallocated memory location is called:",
    options: ["NULL pointer", "Wild pointer", "Dangling pointer", "Void pointer"],
    correctAnswer: 2,
    explanation: "A dangling pointer points to memory that has been freed/deallocated",
    difficulty: "easy"
  },
  // Additional Recursion
  {
    id: "q39",
    topicId: "recursion",
    question: "Tower of Hanoi with n disks requires how many minimum moves?",
    options: ["n", "2n", "2^n - 1", "n^2"],
    correctAnswer: 2,
    explanation: "Tower of Hanoi needs 2^n - 1 moves minimum for n disks",
    difficulty: "medium"
  },
  // Additional Stacks & Queues
  {
    id: "q40",
    topicId: "stacks-queues",
    question: "The postfix expression for (A+B)*C is:",
    options: ["AB+C*", "ABC+*", "A+BC*", "*+ABC"],
    correctAnswer: 0,
    explanation: "(A+B) becomes AB+, then multiply by C: AB+C*",
    difficulty: "medium"
  },
  {
    id: "q41",
    topicId: "stacks-queues",
    question: "Which data structure is used for BFS traversal?",
    options: ["Stack", "Queue", "Priority Queue", "Tree"],
    correctAnswer: 1,
    explanation: "BFS uses a Queue (FIFO) to explore vertices level by level",
    difficulty: "easy"
  },
  // Additional Trees
  {
    id: "q42",
    topicId: "trees",
    question: "The maximum number of nodes in a binary tree of height h is:",
    options: ["2^h", "2^h - 1", "2^(h+1) - 1", "h^2"],
    correctAnswer: 2,
    explanation: "Max nodes in binary tree of height h = 2^(h+1) - 1 (where height of single node = 0)",
    difficulty: "medium"
  },
  {
    id: "q43",
    topicId: "trees",
    question: "In-order traversal of a BST gives:",
    options: ["Random order", "Sorted ascending order", "Sorted descending order", "Level order"],
    correctAnswer: 1,
    explanation: "In-order traversal (LNR) of a BST always yields elements in sorted ascending order",
    difficulty: "easy"
  },
  // Additional Graphs
  {
    id: "q44",
    topicId: "graphs",
    question: "Dijkstra's algorithm fails with:",
    options: ["Positive weights", "Zero weights", "Negative weights", "Large graphs"],
    correctAnswer: 2,
    explanation: "Dijkstra's algorithm does not work correctly with negative edge weights",
    difficulty: "medium"
  },
  {
    id: "q45",
    topicId: "graphs",
    question: "Time complexity of BFS/DFS using adjacency list is:",
    options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"],
    correctAnswer: 2,
    explanation: "BFS and DFS both take O(V+E) with adjacency list representation",
    difficulty: "easy"
  },
  // Additional DP
  {
    id: "q46",
    topicId: "dp",
    question: "The two key properties for applying DP are:",
    options: [
      "Greedy choice and optimal substructure",
      "Overlapping subproblems and optimal substructure",
      "Divide and conquer",
      "Recursion and iteration"
    ],
    correctAnswer: 1,
    explanation: "DP requires overlapping subproblems and optimal substructure",
    difficulty: "easy"
  },
  {
    id: "q47",
    topicId: "dp",
    question: "LCS of 'ABCBDAB' and 'BDCAB' has length:",
    options: ["3", "4", "5", "2"],
    correctAnswer: 1,
    explanation: "The LCS is 'BCAB' or 'BDAB' with length 4",
    difficulty: "hard"
  },
  // Additional Sorting
  {
    id: "q48",
    topicId: "sorting-algos",
    question: "Which sorting algorithm has the best worst-case time complexity?",
    options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
    correctAnswer: 2,
    explanation: "Merge Sort has O(n log n) worst-case, while Quick Sort has O(n²) worst-case",
    difficulty: "medium"
  },
  {
    id: "q49",
    topicId: "sorting-algos",
    question: "Counting sort has time complexity:",
    options: ["O(n log n)", "O(n²)", "O(n + k)", "O(n)"],
    correctAnswer: 2,
    explanation: "Counting sort runs in O(n + k) where k is the range of input values",
    difficulty: "medium"
  },
  // Additional CPU Scheduling
  {
    id: "q50",
    topicId: "scheduling",
    question: "Which scheduling algorithm gives minimum average waiting time?",
    options: ["FCFS", "Round Robin", "SJF", "Priority"],
    correctAnswer: 2,
    explanation: "SJF (Shortest Job First) is provably optimal for minimizing average waiting time",
    difficulty: "medium"
  },
  {
    id: "q51",
    topicId: "scheduling",
    question: "In Round Robin, if time quantum is very large, it behaves like:",
    options: ["SJF", "FCFS", "Priority", "SRTF"],
    correctAnswer: 1,
    explanation: "Large time quantum in RR means each process completes in one turn, like FCFS",
    difficulty: "medium"
  },
  // Additional Deadlock
  {
    id: "q52",
    topicId: "deadlock-handling",
    question: "How many necessary conditions must hold for a deadlock?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "4 conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
    difficulty: "easy"
  },
  // Additional Page Replacement
  {
    id: "q53",
    topicId: "page-replacement",
    question: "Which page replacement algorithm is optimal but impractical?",
    options: ["FIFO", "LRU", "OPT (Belady's)", "Clock"],
    correctAnswer: 2,
    explanation: "OPT replaces the page used farthest in future - optimal but needs future knowledge",
    difficulty: "easy"
  },
  // Additional Paging
  {
    id: "q54",
    topicId: "paging",
    question: "Paging suffers from which type of fragmentation?",
    options: ["External only", "Internal only", "Both", "Neither"],
    correctAnswer: 1,
    explanation: "Paging causes only internal fragmentation (in the last page). No external fragmentation",
    difficulty: "medium"
  },
  // Additional Semaphores
  {
    id: "q55",
    topicId: "semaphores",
    question: "A binary semaphore can take values:",
    options: ["Any integer", "0 or 1", "0 to n", "-1 to 1"],
    correctAnswer: 1,
    explanation: "A binary semaphore (mutex) can only be 0 or 1",
    difficulty: "easy"
  },
  // Additional SQL
  {
    id: "q56",
    topicId: "sql-queries",
    question: "Which clause is used to filter groups in SQL?",
    options: ["WHERE", "HAVING", "GROUP BY", "FILTER"],
    correctAnswer: 1,
    explanation: "HAVING filters groups after GROUP BY, while WHERE filters rows before grouping",
    difficulty: "easy"
  },
  {
    id: "q57",
    topicId: "sql-queries",
    question: "COUNT(column) vs COUNT(*): the difference is:",
    options: [
      "No difference",
      "COUNT(column) ignores NULLs",
      "COUNT(*) ignores NULLs",
      "COUNT(*) is faster always"
    ],
    correctAnswer: 1,
    explanation: "COUNT(column) counts non-NULL values, COUNT(*) counts all rows including NULLs",
    difficulty: "medium"
  },
  // Additional Normalization
  {
    id: "q58",
    topicId: "fd-keys",
    question: "For relation R(A,B,C) with FD {A→B, B→C}, the candidate key is:",
    options: ["A", "B", "C", "AB"],
    correctAnswer: 0,
    explanation: "A+ = {A,B,C} covers all attributes, so A is the candidate key",
    difficulty: "medium"
  },
  {
    id: "q59",
    topicId: "normal-forms",
    question: "A relation is in 2NF if it is in 1NF and has no:",
    options: [
      "Transitive dependency",
      "Partial dependency on candidate key",
      "Multivalued dependency",
      "Join dependency"
    ],
    correctAnswer: 1,
    explanation: "2NF removes partial dependencies (non-prime attribute depending on part of a key)",
    difficulty: "medium"
  },
  // Additional Serializability
  {
    id: "q60",
    topicId: "serializability",
    question: "Two-Phase Locking (2PL) guarantees:",
    options: [
      "Deadlock freedom",
      "Conflict serializability",
      "No cascading rollbacks",
      "Recoverability"
    ],
    correctAnswer: 1,
    explanation: "2PL guarantees conflict serializability but NOT deadlock freedom",
    difficulty: "medium"
  },
  // Additional DFA
  {
    id: "q61",
    topicId: "dfa",
    question: "The number of states in minimal DFA for strings ending in 'ab' over {a,b} is:",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "3 states needed: initial, seen 'a', seen 'ab' (accepting)",
    difficulty: "medium"
  },
  // Additional NFA
  {
    id: "q62",
    topicId: "nfa",
    question: "An NFA with n states can be converted to a DFA with at most:",
    options: ["n states", "2n states", "2^n states", "n^2 states"],
    correctAnswer: 2,
    explanation: "Subset construction can create up to 2^n states (power set of NFA states)",
    difficulty: "medium"
  },
  // Additional CFG
  {
    id: "q63",
    topicId: "normal-forms",
    question: "In Chomsky Normal Form, productions are of the form:",
    options: [
      "A → aα only",
      "A → BC or A → a",
      "A → α only",
      "A → ε only"
    ],
    correctAnswer: 1,
    explanation: "CNF allows A → BC (two non-terminals) or A → a (single terminal)",
    difficulty: "medium"
  },
  // Additional Pipelining
  {
    id: "q64",
    topicId: "pipeline-basics",
    question: "Speedup of a k-stage pipeline (ideal) for n instructions approaches:",
    options: ["n", "k", "n+k", "nk"],
    correctAnswer: 1,
    explanation: "Ideal pipeline speedup approaches k (number of stages) for large n",
    difficulty: "medium"
  },
  // Additional Cache
  {
    id: "q65",
    topicId: "cache-memory",
    question: "In direct mapping, a memory block maps to:",
    options: [
      "Any cache line",
      "Exactly one cache line",
      "One of two lines",
      "A set of lines"
    ],
    correctAnswer: 1,
    explanation: "Direct mapping: each memory block maps to exactly one specific cache line",
    difficulty: "easy"
  },
  // Additional LR Parsing
  {
    id: "q66",
    topicId: "lr-parsing",
    question: "LALR(1) is created by merging LR(1) states with the same:",
    options: ["Lookahead", "Core (LR(0) items)", "Goto", "Action"],
    correctAnswer: 1,
    explanation: "LALR merges CLR(1) states having identical cores (same LR(0) items)",
    difficulty: "medium"
  },
  // Additional First-Follow
  {
    id: "q67",
    topicId: "first-follow",
    question: "FOLLOW of the start symbol always contains:",
    options: ["ε", "$（end marker)", "First terminal", "Nothing"],
    correctAnswer: 1,
    explanation: "FOLLOW(start symbol) always contains $ (the end-of-input marker)",
    difficulty: "easy"
  },
  // Additional Subnetting
  {
    id: "q68",
    topicId: "ip-addressing",
    question: "The subnet mask for a /27 network is:",
    options: ["255.255.255.0", "255.255.255.224", "255.255.255.192", "255.255.255.240"],
    correctAnswer: 1,
    explanation: "/27 = 27 network bits = 255.255.255.224 (11100000 in last octet)",
    difficulty: "medium"
  },
  // Additional Flow Control
  {
    id: "q69",
    topicId: "flow-control",
    question: "In Go-Back-N with window size W, sequence numbers needed are:",
    options: ["W", "W+1", "2W", "W-1"],
    correctAnswer: 1,
    explanation: "GBN requires at least W+1 sequence numbers to avoid ambiguity",
    difficulty: "hard"
  },
  // Additional Congestion
  {
    id: "q70",
    topicId: "congestion",
    question: "On 3 duplicate ACKs, TCP Reno performs:",
    options: [
      "Slow start from cwnd=1",
      "Fast retransmit and fast recovery",
      "Nothing",
      "Connection reset"
    ],
    correctAnswer: 1,
    explanation: "TCP Reno does fast retransmit + fast recovery (cwnd = ssthresh) on 3 dup ACKs",
    difficulty: "medium"
  },
  // Additional Boolean Algebra
  {
    id: "q71",
    topicId: "boolean-laws",
    question: "A K-map with 4 variables has how many cells?",
    options: ["4", "8", "16", "32"],
    correctAnswer: 2,
    explanation: "A 4-variable K-map has 2^4 = 16 cells",
    difficulty: "easy"
  },
  // Additional Number Systems
  {
    id: "q72",
    topicId: "number-conversions",
    question: "The 2's complement of binary 0101 (4-bit) is:",
    options: ["1010", "1011", "0101", "1101"],
    correctAnswer: 1,
    explanation: "1's complement of 0101 = 1010, add 1 = 1011",
    difficulty: "medium"
  },
  // Additional Hashing
  {
    id: "q73",
    topicId: "hashing",
    question: "Which collision resolution avoids primary clustering?",
    options: ["Linear probing", "Quadratic probing", "Double hashing", "Both B and C"],
    correctAnswer: 3,
    explanation: "Both quadratic probing and double hashing avoid primary clustering (linear probing suffers from it)",
    difficulty: "hard"
  },
  // Additional Eigenvalues
  {
    id: "q74",
    topicId: "eigenvalues",
    question: "The sum of eigenvalues of a matrix equals its:",
    options: ["Determinant", "Trace", "Rank", "Order"],
    correctAnswer: 1,
    explanation: "Sum of eigenvalues = trace (sum of diagonal elements). Product = determinant",
    difficulty: "medium"
  },
  // Additional Probability
  {
    id: "q75",
    topicId: "random-variables",
    question: "The variance of a Bernoulli(p) random variable is:",
    options: ["p", "p(1-p)", "np", "1-p"],
    correctAnswer: 1,
    explanation: "Bernoulli(p): E[X]=p, Var(X)=p(1-p)",
    difficulty: "medium"
  }
];

export const youtubeChannels = [
  { name: "Gate Smashers", specialty: "ALL CS Subjects", url: "https://www.youtube.com/@GateSmashers", importance: 3 },
  { name: "Ravindrababu Ravula", specialty: "TOC, Compiler, OS, DBMS", url: "https://www.youtube.com/@raaborararavulasuds", importance: 3 },
  { name: "Abdul Bari", specialty: "DSA, Algorithms", url: "https://www.youtube.com/@abdul_bari", importance: 3 },
  { name: "Neso Academy", specialty: "Networks, Digital Logic, TOC", url: "https://www.youtube.com/@nesaboratory", importance: 2 },
  { name: "Knowledge Gate", specialty: "OS, DBMS, Compiler", url: "https://www.youtube.com/@KnowledgeGate", importance: 2 },
  { name: "3Blue1Brown", specialty: "Linear Algebra, Probability (Intuition)", url: "https://www.youtube.com/@3blue1brown", importance: 2 },
  { name: "Aditya Verma", specialty: "Dynamic Programming", url: "https://www.youtube.com/@TheAdityaVerma", importance: 2 },
  { name: "Striver (take U forward)", specialty: "DSA, Graphs", url: "https://www.youtube.com/@takeUforward", importance: 2 },
  { name: "Jenny's Lectures", specialty: "C, DSA Basics", url: "https://www.youtube.com/@JennyslecturesCSIT", importance: 1 },
  { name: "StatQuest", specialty: "Statistics, Probability", url: "https://www.youtube.com/@statquest", importance: 1 },
  { name: "GO Classes", specialty: "GATE-specific Content", url: "https://www.youtube.com/@GOClasses", importance: 2 }
];

export const essentialTools = [
  { name: "GATE Overflow", purpose: "PYQs + Discussions", url: "https://gateoverflow.in", importance: 3 },
  { name: "GeeksforGeeks", purpose: "Theory + Practice", url: "https://www.geeksforgeeks.org", importance: 2 },
  { name: "LeetCode", purpose: "DSA Practice", url: "https://leetcode.com", importance: 2 },
  { name: "HackerRank", purpose: "DSA + SQL Practice", url: "https://www.hackerrank.com", importance: 2 },
  { name: "VisuAlgo", purpose: "Algorithm Visualizations", url: "https://visualgo.net", importance: 2 },
  { name: "JFLAP", purpose: "Automata Simulator", url: "https://www.jflap.org", importance: 1 },
  { name: "DB Fiddle", purpose: "SQL Testing", url: "https://www.db-fiddle.com", importance: 1 },
  { name: "Subnet Calculator", purpose: "Subnetting Practice", url: "https://www.subnet-calculator.com", importance: 1 },
  { name: "IndiaBix", purpose: "Aptitude Practice", url: "https://www.indiabix.com", importance: 2 }
];

export const books = [
  { subject: "Algorithms", name: "CLRS - Introduction to Algorithms", url: "https://www.amazon.in/Introduction-Algorithms-Thomas-H-Cormen/dp/8120340078" },
  { subject: "Operating Systems", name: "Galvin - OS Concepts", url: "https://www.amazon.in/Operating-System-Concepts-Abraham-Silberschatz/dp/8126554274" },
  { subject: "DBMS", name: "Korth - Database System Concepts", url: "https://www.amazon.in/Database-System-Concepts-Abraham-Silberschatz/dp/0078022150" },
  { subject: "Computer Networks", name: "Kurose & Ross - Top Down Approach", url: "https://www.amazon.in/Computer-Networking-Top-Down-Approach-7th/dp/0133594149" },
  { subject: "TOC", name: "Peter Linz - Formal Languages", url: "https://www.amazon.in/Introduction-Formal-Languages-Automata-Peter/dp/1284077247" },
  { subject: "Compiler Design", name: "Aho Ullman - Dragon Book", url: "https://www.amazon.in/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811" },
  { subject: "COA", name: "Carl Hamacher", url: "https://www.amazon.in/Computer-Organization-Carl-Hamacher/dp/0071246517" },
  { subject: "Digital Logic", name: "Morris Mano - Digital Design", url: "https://www.amazon.in/Digital-Logic-Computer-Design-Mano/dp/0132145103" },
  { subject: "Discrete Math", name: "Kenneth Rosen", url: "https://www.amazon.in/Discrete-Mathematics-Applications-Kenneth-Rosen/dp/0070681880" },
  { subject: "Aptitude", name: "RS Aggarwal - Quantitative Aptitude", url: "https://www.amazon.in/Quantitative-Aptitude-Competitive-Examinations-Aggarwal/dp/9352534026" },
  { subject: "C Programming", name: "Let Us C - Yashavant Kanetkar", url: "https://www.amazon.in/Let-Us-C-Yashavant-Kanetkar/dp/8183331637" }
];

// PYQ Archives - Previous Year Question Papers
export interface PYQPaper {
  year: number;
  set?: string;
  questions: number;
  url: string;
  solutionUrl: string;
}

export const pyqPapers: PYQPaper[] = [
  { year: 2025, set: "Set 1", questions: 65, url: "https://gateoverflow.in/gate-cse-2025-set-1", solutionUrl: "https://gateoverflow.in/gate-cse-2025-set-1" },
  { year: 2025, set: "Set 2", questions: 65, url: "https://gateoverflow.in/gate-cse-2025-set-2", solutionUrl: "https://gateoverflow.in/gate-cse-2025-set-2" },
  { year: 2024, set: "Set 1", questions: 65, url: "https://gateoverflow.in/gate-cse-2024-set-1", solutionUrl: "https://gateoverflow.in/gate-cse-2024-set-1" },
  { year: 2024, set: "Set 2", questions: 65, url: "https://gateoverflow.in/gate-cse-2024-set-2", solutionUrl: "https://gateoverflow.in/gate-cse-2024-set-2" },
  { year: 2023, questions: 65, url: "https://gateoverflow.in/gate-cse-2023", solutionUrl: "https://gateoverflow.in/gate-cse-2023" },
  { year: 2022, questions: 65, url: "https://gateoverflow.in/gate-cse-2022", solutionUrl: "https://gateoverflow.in/gate-cse-2022" },
  { year: 2021, set: "Set 1", questions: 65, url: "https://gateoverflow.in/gate-cse-2021-set-1", solutionUrl: "https://gateoverflow.in/gate-cse-2021-set-1" },
  { year: 2021, set: "Set 2", questions: 65, url: "https://gateoverflow.in/gate-cse-2021-set-2", solutionUrl: "https://gateoverflow.in/gate-cse-2021-set-2" },
  { year: 2020, questions: 65, url: "https://gateoverflow.in/gate-cse-2020", solutionUrl: "https://gateoverflow.in/gate-cse-2020" },
  { year: 2019, questions: 65, url: "https://gateoverflow.in/gate-cse-2019", solutionUrl: "https://gateoverflow.in/gate-cse-2019" },
  { year: 2018, questions: 65, url: "https://gateoverflow.in/gate-cse-2018", solutionUrl: "https://gateoverflow.in/gate-cse-2018" },
  { year: 2017, set: "Set 1", questions: 65, url: "https://gateoverflow.in/gate-cse-2017-set-1", solutionUrl: "https://gateoverflow.in/gate-cse-2017-set-1" },
  { year: 2016, set: "Set 1", questions: 65, url: "https://gateoverflow.in/gate-cse-2016-set-1", solutionUrl: "https://gateoverflow.in/gate-cse-2016-set-1" },
  { year: 2015, set: "Set 1", questions: 65, url: "https://gateoverflow.in/gate-cse-2015-set-1", solutionUrl: "https://gateoverflow.in/gate-cse-2015-set-1" },
];

// Mock Test Series
export interface MockTest {
  id: string;
  name: string;
  provider: string;
  type: 'subject' | 'full' | 'topic';
  url: string;
  free: boolean;
  rating: number;
}

export const mockTests: MockTest[] = [
  { id: "mt1", name: "GO Classes Test Series", provider: "GO Classes", type: "full", url: "https://www.goclasses.in", free: false, rating: 5 },
  { id: "mt2", name: "Made Easy Test Series", provider: "Made Easy", type: "full", url: "https://www.madeeasy.in", free: false, rating: 5 },
  { id: "mt3", name: "GATE Overflow Test Series", provider: "GATE Overflow", type: "full", url: "https://gateoverflow.in/tests", free: true, rating: 5 },
  { id: "mt4", name: "Testbook GATE Mocks", provider: "Testbook", type: "full", url: "https://testbook.com/gate", free: false, rating: 4 },
  { id: "mt5", name: "Unacademy Mock Tests", provider: "Unacademy", type: "full", url: "https://unacademy.com/goal/gate-cse-and-it", free: false, rating: 4 },
  { id: "mt6", name: "GeeksforGeeks Mock Tests", provider: "GfG", type: "subject", url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/", free: true, rating: 4 },
];

// Formula Sheets & Cheat Sheets
export interface FormulaSheet {
  id: string;
  subject: string;
  icon: string;
  formulas: { name: string; formula: string }[];
}

export const formulaSheets: FormulaSheet[] = [
  {
    id: "fs-algo",
    subject: "Algorithms",
    icon: "⚙️",
    formulas: [
      { name: "Master Theorem", formula: "T(n)=aT(n/b)+f(n); compare n^(log_b a) with f(n)" },
      { name: "Merge Sort", formula: "T(n) = 2T(n/2) + O(n) = O(n log n)" },
      { name: "Binary Search", formula: "T(n) = T(n/2) + O(1) = O(log n)" },
      { name: "Heap Build", formula: "O(n) time, not O(n log n)" },
      { name: "Quick Sort worst", formula: "O(n²) when pivot is min/max always" },
    ]
  },
  {
    id: "fs-os",
    subject: "Operating Systems",
    icon: "🖧",
    formulas: [
      { name: "EMAT (TLB)", formula: "EMAT = h(TLB+Mem) + (1-h)(TLB+2·Mem)" },
      { name: "Waiting Time", formula: "WT = Turnaround Time − Burst Time" },
      { name: "Turnaround Time", formula: "TAT = Completion Time − Arrival Time" },
      { name: "Page Faults (Belady)", formula: "FIFO can increase faults with more frames" },
      { name: "Disk Access", formula: "Seek + Rotational Latency + Transfer Time" },
    ]
  },
  {
    id: "fs-coa",
    subject: "Computer Organization",
    icon: "🖥️",
    formulas: [
      { name: "Pipeline Speedup", formula: "Speedup = (n·k) / (k + n − 1)" },
      { name: "AMAT", formula: "AMAT = Hit Time + Miss Rate × Miss Penalty" },
      { name: "CPU Time", formula: "CPU Time = IC × CPI × Clock Cycle Time" },
      { name: "Cache Lines", formula: "Number of lines = Cache Size / Block Size" },
      { name: "Efficiency", formula: "Efficiency = Speedup / k" },
    ]
  },
  {
    id: "fs-cn",
    subject: "Computer Networks",
    icon: "🌐",
    formulas: [
      { name: "Stop & Wait Eff.", formula: "η = Tt / (Tt + 2·Tp)" },
      { name: "Sliding Window Eff.", formula: "η = (W·Tt) / (Tt + 2·Tp)" },
      { name: "Nyquist", formula: "Max rate = 2·B·log₂(L) bps" },
      { name: "Shannon", formula: "C = B·log₂(1 + SNR) bps" },
      { name: "Pure ALOHA", formula: "Max throughput = 18.4% (S = G·e^(−2G))" },
      { name: "Hosts per subnet", formula: "2^(host bits) − 2" },
    ]
  },
  {
    id: "fs-math",
    subject: "Mathematics",
    icon: "📐",
    formulas: [
      { name: "Bayes' Theorem", formula: "P(A|B) = P(B|A)·P(A) / P(B)" },
      { name: "Binomial Dist.", formula: "P(X=k) = C(n,k)·p^k·(1−p)^(n−k)" },
      { name: "Poisson", formula: "P(X=k) = (λ^k·e^(−λ)) / k!" },
      { name: "Eigenvalue Sum", formula: "Σλ = trace(A); Πλ = det(A)" },
      { name: "Kn edges", formula: "n(n−1)/2 edges in complete graph" },
      { name: "Permutations", formula: "nPr = n!/(n−r)!; nCr = n!/(r!(n−r)!)" },
    ]
  },
  {
    id: "fs-dbms",
    subject: "Databases",
    icon: "🗄️",
    formulas: [
      { name: "Candidate Key", formula: "Compute attribute closure X⁺ = all attributes" },
      { name: "2NF", formula: "1NF + no partial dependency" },
      { name: "3NF", formula: "For X→A: X is superkey OR A is prime" },
      { name: "BCNF", formula: "For every X→A: X must be superkey" },
      { name: "Lossless Join", formula: "R1∩R2 → R1 or R1∩R2 → R2" },
    ]
  },
];

// Daily Study Tips (rotate daily)
export const dailyTips: string[] = [
  "🎯 Solve at least 5 PYQs today from GATE Overflow. Consistency beats intensity!",
  "🧠 Use active recall: close your notes and try to explain a concept aloud.",
  "⏰ Study in 50-minute focused blocks with 10-minute breaks (Pomodoro technique).",
  "📝 Make short handwritten notes for formulas — you'll revise them faster later.",
  "🔄 Revise yesterday's topics for 15 minutes before starting new material.",
  "💪 Attempt the daily challenge quiz to keep your streak alive!",
  "📊 Focus on high-weightage subjects: DSA, Algorithms, OS, DBMS.",
  "🎥 Watch a concept video, then immediately solve 3 problems on it.",
  "🌙 Get 7-8 hours of sleep — memory consolidation happens during sleep.",
  "🏆 Set a small daily goal and celebrate when you achieve it.",
  "📚 Teach a concept to a friend — teaching is the best way to learn.",
  "⚡ Don't skip General Aptitude — it's 15 easy marks!",
  "🔍 When stuck, read the GATE Overflow community discussion for insights.",
  "📈 Track your mock test scores to identify improvement trends.",
];

// Motivational quotes for gamification
export const motivationalQuotes: string[] = [
  "Success is the sum of small efforts repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your only limit is your mind. Push harder!",
  "Great things never come from comfort zones.",
  "The future depends on what you do today.",
  "Dream big. Work hard. Stay focused. Crush GATE!",
  "Every problem you solve makes you stronger.",
];
