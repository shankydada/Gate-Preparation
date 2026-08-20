// GeeksforGeeks — curated per-topic links for the GATE 2027 CSE syllabus.
//
// Source of truth: GeeksforGeeks "GATE CS Notes" index
//   https://www.geeksforgeeks.org/gate-cs-notes-gq/
// (crawled 2026-08-20; URLs re-verified by `scripts/gfg-crawler.mjs` in CI).
//
// GFG publishes dedicated "… notes for GATE exam" hub articles for most
// DSA/Algorithm topics — those are preferred because they are written
// specifically against the GATE syllabus.
//
// Keys are Topic ids from gateData.ts. Links are merged into each topic's
// resource list by the enrichment step at the bottom of gateData.ts.
// Validate/refresh with:  npm run crawl:gfg   (see scripts/gfg-crawler.mjs)

export interface GfgLink {
  /** 'notes' = theory/article, 'practice' = solved GATE questions/quiz */
  type: 'notes' | 'practice';
  name: string;
  url: string;
}

const GFG = 'https://www.geeksforgeeks.org';

export const gfgTopicLinks: Record<string, GfgLink[]> = {
  // ── Engineering Mathematics → Discrete Mathematics ─────────────────────
  'prop-logic': [
    { type: 'notes', name: 'GFG Notes — Propositional Logic', url: `${GFG}/engineering-mathematics/proposition-logic/` },
    { type: 'notes', name: 'GFG — Propositional Equivalences', url: `${GFG}/engineering-mathematics/mathematical-logic-propositional-equivalences/` },
  ],
  'pred-logic': [
    { type: 'notes', name: 'GFG Notes — Predicates & Quantifiers', url: `${GFG}/engineering-mathematics/mathematic-logic-predicates-quantifiers/` },
    { type: 'notes', name: 'GFG — Nested Quantifiers Theorems', url: `${GFG}/engineering-mathematics/mathematics-theorems-nested-quantifiers/` },
  ],
  'set-theory': [
    { type: 'notes', name: 'GFG Notes — Set Theory', url: `${GFG}/maths/set-theory/` },
    { type: 'notes', name: 'GFG — Set Operations', url: `${GFG}/maths/set-operations/` },
  ],
  relations: [
    { type: 'notes', name: 'GFG Notes — Relations & Types', url: `${GFG}/maths/relation-in-maths/` },
    { type: 'notes', name: 'GFG — Closure of Relations', url: `${GFG}/engineering-mathematics/closure-relations/` },
  ],
  functions: [
    { type: 'notes', name: 'GFG Notes — Types of Functions', url: `${GFG}/maths/types-of-functions/` },
    { type: 'notes', name: 'GFG — Total Possible Functions', url: `${GFG}/maths/total-number-possible-functions/` },
  ],
  lattices: [
    { type: 'notes', name: 'GFG Notes — Partial Orders & Lattices', url: `${GFG}/engineering-mathematics/partial-orders-lattices/` },
    { type: 'notes', name: 'GFG — Hasse Diagrams', url: `${GFG}/engineering-mathematics/discrete-mathematics-hasse-diagrams/` },
  ],
  combinatorics: [
    { type: 'notes', name: 'GFG Notes — Combinatorics Basics', url: `${GFG}/engineering-mathematics/mathematics-combinatorics-basics/` },
    { type: 'notes', name: 'GFG — Pigeonhole Principle', url: `${GFG}/engineering-mathematics/discrete-mathematics-the-pigeonhole-principle/` },
  ],
  'graph-theory': [
    { type: 'notes', name: 'GFG Notes — Graph Theory Basics', url: `${GFG}/engineering-mathematics/mathematics-graph-theory-basics/` },
    { type: 'notes', name: 'GFG — Planar Graphs & Coloring', url: `${GFG}/engineering-mathematics/mathematics-planar-graphs-graph-coloring/` },
  ],
  'group-theory': [
    { type: 'notes', name: 'GFG Notes — Groups', url: `${GFG}/engineering-mathematics/groups-discrete-mathematics/` },
    { type: 'notes', name: 'GFG — Subgroup & Order of Group', url: `${GFG}/engineering-mathematics/subgroup-and-order-of-group-mathematics/` },
  ],

  // ── Engineering Mathematics → Linear Algebra ───────────────────────────
  matrices: [
    { type: 'notes', name: 'GFG Notes — Introduction to Matrices', url: `${GFG}/maths/introduction-to-matrices/` },
    { type: 'notes', name: 'GFG — Determinant of a Matrix', url: `${GFG}/maths/what-is-determinant-of-a-matrix/` },
  ],
  'linear-equations': [
    { type: 'notes', name: 'GFG Notes — System of Linear Equations', url: `${GFG}/engineering-mathematics/system-linear-equations/` },
    { type: 'notes', name: 'GFG — Rank of a Matrix', url: `${GFG}/maths/rank-of-matrix/` },
  ],
  eigenvalues: [
    { type: 'notes', name: 'GFG Notes — Eigenvalues & Eigenvectors', url: `${GFG}/engineering-mathematics/eigen-values/` },
    { type: 'notes', name: 'GFG — Cayley-Hamilton Theorem', url: `${GFG}/maths/cayley-hamilton-theorem/` },
  ],

  // ── Engineering Mathematics → Calculus ────────────────────────────────
  limits: [
    { type: 'notes', name: 'GFG Notes — Limits', url: `${GFG}/maths/limits/` },
    { type: 'notes', name: 'GFG — Continuity of Functions', url: `${GFG}/maths/continuity-of-functions/` },
  ],
  differentiation: [
    { type: 'notes', name: 'GFG Notes — Applications of Derivatives', url: `${GFG}/maths/application-of-derivatives/` },
    { type: 'notes', name: 'GFG — Maxima & Minima', url: `${GFG}/maths/absolute-minima-and-maxima/` },
  ],
  integration: [
    { type: 'notes', name: 'GFG Notes — Indefinite Integrals', url: `${GFG}/maths/indefinite-integrals/` },
  ],

  // ── Engineering Mathematics → Probability ──────────────────────────────
  'basic-probability': [
    { type: 'notes', name: 'GFG Notes — Basic Probability', url: `${GFG}/maths/basic-concepts-of-probability/` },
    { type: 'notes', name: "GFG — Bayes' Theorem", url: `${GFG}/maths/bayes-theorem/` },
  ],
  'random-variables': [
    { type: 'notes', name: 'GFG Notes — Random Variables', url: `${GFG}/random-variable/` },
    { type: 'notes', name: 'GFG — Probability Distributions', url: `${GFG}/maths/probability-distribution/` },
  ],

  // ── Digital Logic ──────────────────────────────────────────────────────
  'boolean-laws': [
    { type: 'notes', name: 'GFG Notes — Boolean Algebra Properties', url: `${GFG}/maths/properties-of-boolean-algebra/` },
    { type: 'notes', name: 'GFG — Boolean Functions', url: `${GFG}/digital-logic/boolean-functions/` },
  ],
  'minimization-techniques': [
    { type: 'notes', name: 'GFG Notes — K-Map (Karnaugh Map)', url: `${GFG}/digital-logic/introduction-of-k-map-karnaugh-map/` },
    { type: 'notes', name: 'GFG — Minimization of Boolean Functions', url: `${GFG}/digital-logic/minimization-of-boolean-functions/` },
  ],
  'comb-circuits': [
    { type: 'notes', name: 'GFG Notes — Half & Full Adders', url: `${GFG}/digital-logic/full-adder-in-digital-logic/` },
    { type: 'notes', name: 'GFG — Multiplexers & Decoders', url: `${GFG}/digital-logic/multiplexers-in-digital-logic/` },
  ],
  'seq-circuits': [
    { type: 'notes', name: 'GFG Notes — Sequential Circuits', url: `${GFG}/digital-logic/introduction-of-sequential-circuits/` },
    { type: 'notes', name: 'GFG — Flip-Flops & Conversions', url: `${GFG}/digital-logic/flip-flop-types-their-conversion-and-applications/` },
  ],
  'number-conversions': [
    { type: 'notes', name: 'GFG Notes — Number Systems & Conversions', url: `${GFG}/digital-logic/number-system-and-base-conversions/` },
    { type: 'notes', name: 'GFG — Floating Point Representation', url: `${GFG}/digital-logic/introduction-of-floating-point-representation/` },
  ],

  // ── Computer Organization & Architecture ───────────────────────────────
  'addressing-modes': [
    { type: 'notes', name: 'GFG Notes — Addressing Modes', url: `${GFG}/computer-organization-architecture/addressing-modes/` },
    { type: 'notes', name: 'GFG — Instruction Formats (0/1/2/3 Address)', url: `${GFG}/computer-organization-architecture/computer-organization-instruction-formats-zero-one-two-three-address-instruction/` },
  ],
  'alu-design': [
    { type: 'notes', name: "GFG Notes — Booth's Algorithm", url: `${GFG}/computer-organization-architecture/computer-organization-booths-algorithm/` },
    { type: 'notes', name: 'GFG — Computer Arithmetic', url: `${GFG}/digital-logic/computer-arithmetic-set-1/` },
  ],
  'hardwired-control': [
    { type: 'notes', name: 'GFG Notes — Control Unit & Design', url: `${GFG}/computer-organization-architecture/introduction-of-control-unit-and-its-design/` },
  ],
  'microprogrammed-control': [
    { type: 'notes', name: 'GFG Notes — Hardwired vs Micro-programmed CU', url: `${GFG}/computer-organization-architecture/computer-organization-hardwired-vs-micro-programmed-control-unit/` },
    { type: 'notes', name: 'GFG — Horizontal vs Vertical Microprogramming', url: `${GFG}/computer-organization-architecture/difference-between-horizontal-and-vertical-micro-programmed-control-unit/` },
  ],
  'pipeline-basics': [
    { type: 'notes', name: 'GFG Notes — Pipelining: Stages & Throughput', url: `${GFG}/computer-organization-architecture/computer-organization-and-architecture-pipelining-set-1-execution-stages-and-throughput/` },
    { type: 'notes', name: 'GFG — Pipelining: Data Hazards', url: `${GFG}/computer-organization-architecture/computer-organization-and-architecture-pipelining-set-2-dependencies-and-data-hazard/` },
  ],
  'cache-memory': [
    { type: 'notes', name: 'GFG Notes — Cache Organization', url: `${GFG}/computer-organization-architecture/cache-organization-set-1-introduction/` },
    { type: 'notes', name: 'GFG — Memory Hierarchy Design', url: `${GFG}/computer-organization-architecture/memory-hierarchy-design-and-its-characteristics/` },
  ],
  'memory-interfacing': [
    { type: 'notes', name: 'GFG Notes — Memory Interleaving', url: `${GFG}/computer-organization-architecture/memory-interleaving/` },
    { type: 'notes', name: 'GFG — RAM and ROM Types', url: `${GFG}/computer-organization-architecture/random-access-memory-ram-and-read-only-memory-rom/` },
  ],
  'io-techniques': [
    { type: 'notes', name: 'GFG Notes — I/O: Interrupt & DMA Modes', url: `${GFG}/computer-organization-architecture/io-interface-interrupt-dma-mode/` },
  ],

  // ── Programming & Data Structures ──────────────────────────────────────
  'c-basics': [
    { type: 'notes', name: 'GFG Notes — Getting Started with C', url: `${GFG}/c/getting-started-with-c/` },
    { type: 'notes', name: 'GFG — Operators in C', url: `${GFG}/c/operators-in-c/` },
  ],
  recursion: [
    { type: 'notes', name: 'GFG GATE Notes — Recursion', url: `${GFG}/dsa/recursion-notes-for-gate-exam/` },
  ],
  pointers: [
    { type: 'notes', name: 'GFG Notes — Pointers in C', url: `${GFG}/c/c-pointers/` },
    { type: 'notes', name: 'GFG — Static & Dynamic Scoping', url: `${GFG}/dsa/static-and-dynamic-scoping/` },
  ],
  'linked-lists': [
    { type: 'notes', name: 'GFG GATE Notes — Linked Lists', url: `${GFG}/dsa/linked-list-notes-for-gate-exam/` },
  ],
  'stacks-queues': [
    { type: 'notes', name: 'GFG GATE Notes — Stacks', url: `${GFG}/dsa/stack-notes-for-gate-exam/` },
    { type: 'notes', name: 'GFG GATE Notes — Queues', url: `${GFG}/dsa/queue-notes-for-gate-exam/` },
  ],
  trees: [
    { type: 'notes', name: 'GFG GATE Notes — Trees & BST', url: `${GFG}/dsa/trees-notes-for-gate-exam/` },
    { type: 'notes', name: 'GFG GATE Notes — Binary Heaps', url: `${GFG}/dsa/binary-heap-notes-for-gate-exam/` },
  ],
  graphs: [
    { type: 'notes', name: 'GFG GATE Notes — Graphs (BFS/DFS)', url: `${GFG}/dsa/graphs-notes-for-gate-exam/` },
  ],
  hashing: [
    { type: 'notes', name: 'GFG GATE Notes — Hashing', url: `${GFG}/dsa/hashing-notes-for-gate-exam/` },
  ],

  // ── Algorithms ─────────────────────────────────────────────────────────
  asymptotic: [
    { type: 'notes', name: 'GFG GATE Notes — Asymptotic Analysis', url: `${GFG}/dsa/asymptotic-analysis-of-algorithms-notes-for-gate-exam/` },
    { type: 'notes', name: 'GFG GATE Notes — Recurrence Relations', url: `${GFG}/dsa/recurrence-relations-notes-for-gate-exam/` },
  ],
  'sorting-algos': [
    { type: 'notes', name: 'GFG GATE Notes — Searching & Sorting', url: `${GFG}/dsa/searching-and-sorting-algorithm-notes-for-gate-exam/` },
  ],
  'divide-conquer': [
    { type: 'notes', name: 'GFG GATE Notes — Divide & Conquer', url: `${GFG}/dsa/divide-and-conquer-notes-for-gate-exam/` },
  ],
  greedy: [
    { type: 'notes', name: 'GFG GATE Notes — Greedy Algorithms', url: `${GFG}/dsa/greedy-algorithm-notes-for-gate-exam/` },
    { type: 'notes', name: 'GFG — Graph Algorithms for GATE (Dijkstra/MST)', url: `${GFG}/dsa/graph-based-algorithms-for-gate-exam/` },
  ],
  dp: [
    { type: 'notes', name: 'GFG GATE Notes — Dynamic Programming', url: `${GFG}/dsa/dynamic-programming-notes-for-gate-exam/` },
  ],
  'string-algos': [
    { type: 'notes', name: 'GFG Notes — KMP Pattern Searching', url: `${GFG}/dsa/kmp-algorithm-for-pattern-searching/` },
    { type: 'notes', name: 'GFG — Naive Pattern Searching', url: `${GFG}/dsa/naive-algorithm-for-pattern-searching/` },
  ],
  'p-np': [
    { type: 'notes', name: 'GFG Notes — P, NP, CoNP, NP-Hard/Complete', url: `${GFG}/dsa/types-of-complexity-classes-p-np-conp-np-hard-and-np-complete/` },
    { type: 'notes', name: 'GFG — Introduction to NP-Completeness', url: `${GFG}/dsa/introduction-to-np-completeness/` },
  ],

  // ── Theory of Computation ──────────────────────────────────────────────
  dfa: [
    { type: 'notes', name: 'GFG Notes — Designing DFAs', url: `${GFG}/theory-of-computation/designing-deterministic-finite-automata-set-1/` },
    { type: 'notes', name: 'GFG — Minimization of DFA', url: `${GFG}/theory-of-computation/minimization-of-dfa/` },
  ],
  nfa: [
    { type: 'notes', name: 'GFG Notes — NFA to DFA Conversion', url: `${GFG}/theory-of-computation/conversion-from-nfa-to-dfa/` },
    { type: 'notes', name: 'GFG — Designing NFAs', url: `${GFG}/theory-of-computation/designing-non-deterministic-finite-automata-set-1/` },
  ],
  regex: [
    { type: 'notes', name: 'GFG Notes — RE from Finite Automata', url: `${GFG}/theory-of-computation/generating-regular-expression-from-finite-automata/` },
    { type: 'notes', name: "GFG — Arden's Theorem", url: `${GFG}/theory-of-computation/ardens-theorem-in-theory-of-computation/` },
  ],
  'pumping-lemma-regular': [
    { type: 'notes', name: 'GFG Notes — Pumping Lemma', url: `${GFG}/theory-of-computation/pumping-lemma-in-theory-of-computation/` },
    { type: 'notes', name: 'GFG — Regular vs Non-Regular Languages', url: `${GFG}/theory-of-computation/how-to-identify-if-a-language-is-regular-or-not/` },
  ],
  'cfg-basics': [
    { type: 'notes', name: 'GFG Notes — Introduction to Grammar', url: `${GFG}/theory-of-computation/introduction-to-grammar-in-theory-of-computation/` },
    { type: 'notes', name: 'GFG — Ambiguity in CFG & CFL', url: `${GFG}/theory-of-computation/ambiguity-in-context-free-grammar-and-context-free-languages-2/` },
  ],
  'cnf-gnf': [
    { type: 'notes', name: 'GFG Notes — Chomsky Normal Form', url: `${GFG}/theory-of-computation/converting-context-free-grammar-chomsky-normal-form/` },
    { type: 'notes', name: 'GFG — Greibach Normal Form', url: `${GFG}/theory-of-computation/converting-context-free-grammar-greibach-normal-form/` },
  ],
  pda: [
    { type: 'notes', name: 'GFG Notes — PDA & Acceptance', url: `${GFG}/theory-of-computation/introduction-of-pushdown-automata/` },
  ],
  'tm-basics': [
    { type: 'notes', name: 'GFG Notes — Turing Machine', url: `${GFG}/theory-of-computation/turing-machine-in-toc/` },
  ],
  halting: [
    { type: 'notes', name: 'GFG Notes — Halting Problem', url: `${GFG}/theory-of-computation/halting-problem-in-theory-of-computation/` },
    { type: 'notes', name: 'GFG — Decidability & Undecidability', url: `${GFG}/theory-of-computation/decidability-and-undecidability-in-toc/` },
  ],

  // ── Compiler Design ────────────────────────────────────────────────────
  lexer: [
    { type: 'notes', name: 'GFG Notes — Lexical Analysis', url: `${GFG}/compiler-design/introduction-of-lexical-analysis/` },
    { type: 'practice', name: 'GFG PYQs — Lexical Analysis & Parsing', url: `${GFG}/compiler-design/compiler-design-gate-questions/` },
  ],
  'first-follow': [
    { type: 'notes', name: 'GFG Notes — FIRST Set', url: `${GFG}/compiler-design/first-set-in-syntax-analysis/` },
    { type: 'notes', name: 'GFG — FOLLOW Set', url: `${GFG}/compiler-design/follow-set-in-syntax-analysis/` },
  ],
  ll1: [
    { type: 'notes', name: 'GFG Notes — Classification of Top-Down Parsers', url: `${GFG}/compiler-design/classification-of-top-down-parsers/` },
  ],
  'lr-parsing': [
    { type: 'notes', name: 'GFG Notes — SLR, CLR & LALR Parsers', url: `${GFG}/compiler-design/slr-clr-and-lalr-parsers-set-3/` },
    { type: 'notes', name: 'GFG — Bottom-Up / Shift-Reduce Parsers', url: `${GFG}/compiler-design/bottom-up-or-shift-reduce-parsers-set-2/` },
  ],
  'sdt-icg': [
    { type: 'notes', name: 'GFG Notes — Intermediate Code Generation', url: `${GFG}/compiler-design/intermediate-code-generation-in-compiler-design/` },
    { type: 'notes', name: 'GFG — Three Address Code', url: `${GFG}/compiler-design/three-address-code-compiler/` },
  ],
  'code-opt': [
    { type: 'notes', name: 'GFG Notes — Code Optimization', url: `${GFG}/compiler-design/code-optimization-in-compiler-design/` },
    { type: 'notes', name: 'GFG — Data Flow Analysis', url: `${GFG}/compiler-design/data-flow-analysis-compiler/` },
  ],
  'runtime-env': [
    { type: 'notes', name: 'GFG Notes — Runtime Environments', url: `${GFG}/compiler-design/runtime-environments-in-compiler-design/` },
  ],

  // ── Operating Systems ──────────────────────────────────────────────────
  scheduling: [
    { type: 'notes', name: 'GFG Notes — CPU Scheduling', url: `${GFG}/operating-systems/cpu-scheduling-in-operating-systems/` },
    { type: 'notes', name: 'GFG — Process Synchronization Intro', url: `${GFG}/operating-systems/introduction-of-process-synchronization/` },
  ],
  semaphores: [
    { type: 'notes', name: 'GFG Notes — Semaphores', url: `${GFG}/operating-systems/semaphores-in-process-synchronization/` },
    { type: 'notes', name: 'GFG — Producer-Consumer Problem', url: `${GFG}/operating-systems/producer-consumer-problem-using-semaphores-set-1/` },
    { type: 'notes', name: 'GFG — Dining Philosophers Problem', url: `${GFG}/operating-systems/dining-philosophers-problem/` },
  ],
  'deadlock-handling': [
    { type: 'notes', name: 'GFG Notes — Deadlock Prevention & Avoidance', url: `${GFG}/operating-systems/deadlock-prevention/` },
    { type: 'notes', name: "GFG — Banker's Algorithm", url: `${GFG}/operating-systems/bankers-algorithm-in-operating-system-2/` },
    { type: 'notes', name: 'GFG — Deadlock Detection & Recovery', url: `${GFG}/operating-systems/deadlock-detection-recovery/` },
  ],
  paging: [
    { type: 'notes', name: 'GFG Notes — Paging', url: `${GFG}/operating-systems/paging-in-operating-system/` },
    { type: 'notes', name: 'GFG — Multilevel Paging', url: `${GFG}/operating-systems/multilevel-paging-in-operating-system/` },
  ],
  'page-replacement': [
    { type: 'notes', name: 'GFG Notes — Page Replacement Algorithms', url: `${GFG}/operating-systems/page-replacement-algorithms-in-operating-systems/` },
    { type: 'notes', name: "GFG — Belady's Anomaly", url: `${GFG}/operating-systems/beladys-anomaly-in-page-replacement-algorithms/` },
  ],
  'file-system': [
    { type: 'notes', name: 'GFG Notes — File Allocation Methods', url: `${GFG}/operating-systems/file-allocation-methods/` },
    { type: 'notes', name: 'GFG — Disk Scheduling Algorithms', url: `${GFG}/operating-systems/disk-scheduling-algorithms/` },
  ],

  // ── Databases (DBMS) ───────────────────────────────────────────────────
  'er-diagram': [
    { type: 'notes', name: 'GFG Notes — ER Model', url: `${GFG}/dbms/introduction-of-er-model/` },
    { type: 'notes', name: 'GFG — Minimization of ER Diagrams', url: `${GFG}/dbms/minimization-of-er-diagrams/` },
  ],
  'ra-operations': [
    { type: 'notes', name: 'GFG Notes — Relational Algebra', url: `${GFG}/dbms/introduction-of-relational-algebra-in-dbms/` },
    { type: 'notes', name: 'GFG — Solving RA Problems for GATE', url: `${GFG}/dbms/how-to-solve-relational-algebra-problems-for-gate/` },
  ],
  'sql-queries': [
    { type: 'notes', name: 'GFG Notes — SQL (DDL/DML/DCL)', url: `${GFG}/sql/sql-ddl-dql-dml-dcl-tcl-commands/` },
    { type: 'notes', name: 'GFG — SQL Joins', url: `${GFG}/sql/sql-join-set-1-inner-left-right-and-full-joins/` },
    { type: 'notes', name: 'GFG — Nested Queries in SQL', url: `${GFG}/sql/nested-queries-in-sql/` },
  ],
  'fd-keys': [
    { type: 'notes', name: 'GFG Notes — Functional Dependency & Closure', url: `${GFG}/dbms/functional-dependency-and-attribute-closure/` },
    { type: 'notes', name: 'GFG — Finding Candidate Keys from FDs', url: `${GFG}/dbms/finding-attribute-closure-and-candidate-keys-using-functional-dependencies/` },
  ],
  'dbms-normal-forms': [
    { type: 'notes', name: 'GFG Notes — Normal Forms (1NF–BCNF)', url: `${GFG}/dbms/normal-forms-in-dbms/` },
    { type: 'notes', name: 'GFG — Finding the Highest Normal Form', url: `${GFG}/dbms/how-to-find-the-highest-normal-form-of-a-relation/` },
  ],
  decomposition: [
    { type: 'notes', name: 'GFG Notes — Lossless Decomposition', url: `${GFG}/dbms/lossless-decomposition-in-dbms/` },
    { type: 'notes', name: 'GFG — Lossless Join & Dependency Preserving', url: `${GFG}/dbms/lossless-join-and-dependency-preserving-decomposition/` },
  ],
  serializability: [
    { type: 'notes', name: 'GFG Notes — Conflict Serializability', url: `${GFG}/dbms/conflict-serializability-in-dbms/` },
    { type: 'notes', name: 'GFG — Precedence Graph Testing', url: `${GFG}/dbms/precedence-graph-for-testing-conflict-serializability/` },
  ],
  '2pl': [
    { type: 'notes', name: 'GFG Notes — Two-Phase Locking (2PL)', url: `${GFG}/dbms/two-phase-locking-protocol/` },
    { type: 'notes', name: 'GFG — Categories of 2PL', url: `${GFG}/dbms/categories-of-two-phase-locking-strict-rigorous-conservative/` },
  ],
  'btree-index': [
    { type: 'notes', name: 'GFG Notes — Indexing in Databases', url: `${GFG}/dbms/indexing-in-databases-set-1/` },
    { type: 'notes', name: 'GFG — B-Tree', url: `${GFG}/dsa/introduction-of-b-tree-2/` },
    { type: 'notes', name: 'GFG — B+ Tree', url: `${GFG}/dbms/introduction-of-b-tree/` },
  ],

  // ── Computer Networks ──────────────────────────────────────────────────
  'network-basics': [
    { type: 'notes', name: 'GFG Notes — Basics of Networking', url: `${GFG}/computer-networks/basics-computer-networking/` },
    { type: 'notes', name: 'GFG — OSI Model Layers', url: `${GFG}/computer-networks/open-systems-interconnection-model-osi/` },
    { type: 'notes', name: 'GFG — Circuit vs Packet Switching', url: `${GFG}/computer-networks/difference-between-circuit-switching-and-packet-switching/` },
  ],
  'error-detection': [
    { type: 'notes', name: 'GFG Notes — Error Detection', url: `${GFG}/computer-networks/error-detection-in-computer-networks/` },
    { type: 'notes', name: 'GFG — Hamming Code', url: `${GFG}/computer-networks/hamming-code-in-computer-network/` },
  ],
  mac: [
    { type: 'notes', name: 'GFG Notes — Multiple Access Protocols', url: `${GFG}/computer-networks/multiple-access-protocols-in-computer-network/` },
    { type: 'notes', name: 'GFG — CSMA/CD & Back-off', url: `${GFG}/computer-networks/back-off-algorithm-csmacd/` },
  ],
  ethernet: [
    { type: 'notes', name: 'GFG Notes — Ethernet (LAN)', url: `${GFG}/computer-networks/what-is-ethernet/` },
    { type: 'notes', name: 'GFG — Ethernet Frame Format', url: `${GFG}/computer-networks/ethernet-frame-format/` },
  ],
  'flow-control': [
    { type: 'notes', name: 'GFG Notes — Stop & Wait ARQ', url: `${GFG}/computer-networks/stop-and-wait-arq/` },
    { type: 'notes', name: 'GFG — Sliding Window (GBN)', url: `${GFG}/computer-networks/sliding-window-protocol-set-1/` },
    { type: 'notes', name: 'GFG — Sliding Window (Selective Repeat)', url: `${GFG}/computer-networks/sliding-window-protocol-set-3-selective-repeat/` },
  ],
  routing: [
    { type: 'notes', name: 'GFG Notes — Distance Vector Routing', url: `${GFG}/computer-networks/distance-vector-routing-dvr-protocol/` },
    { type: 'notes', name: 'GFG — Link State Routing', url: `${GFG}/computer-networks/unicast-routing-link-state-routing/` },
  ],
  'ip-addressing': [
    { type: 'notes', name: 'GFG Notes — Classless IP Addressing (CIDR)', url: `${GFG}/computer-networks/ip-addressing-classless-addressing/` },
    { type: 'notes', name: 'GFG — Subnetting', url: `${GFG}/computer-networks/introduction-to-subnetting/` },
  ],
  fragmentation: [
    { type: 'notes', name: 'GFG Notes — IPv4 Fragmentation & Delays', url: `${GFG}/computer-networks/ipv4-datagram-fragmentation-and-delays/` },
    { type: 'notes', name: 'GFG — NAT', url: `${GFG}/computer-networks/network-address-translation-nat/` },
  ],
  tcp: [
    { type: 'notes', name: 'GFG Notes — TCP Segment Structure', url: `${GFG}/computer-networks/services-and-segment-structure-in-tcp/` },
    { type: 'notes', name: 'GFG — TCP 3-Way Handshake', url: `${GFG}/computer-networks/tcp-3-way-handshake-process/` },
  ],
  congestion: [
    { type: 'notes', name: 'GFG Notes — TCP Congestion Control', url: `${GFG}/computer-networks/tcp-congestion-control/` },
    { type: 'notes', name: 'GFG — Leaky Bucket Algorithm', url: `${GFG}/computer-networks/leaky-bucket-algorithm/` },
  ],
  'socket-api': [
    { type: 'notes', name: 'GFG Notes — TCP Client-Server in C', url: `${GFG}/c/tcp-server-client-implementation-in-c/` },
  ],
  'app-protocols': [
    { type: 'notes', name: 'GFG Notes — DNS', url: `${GFG}/computer-networks/domain-name-system-dns-in-application-layer/` },
    { type: 'notes', name: 'GFG — HTTP: Persistent & Non-Persistent', url: `${GFG}/computer-networks/http-non-persistent-persistent-connection/` },
  ],

  // ── General Aptitude ───────────────────────────────────────────────────
  arithmetic: [
    { type: 'notes', name: 'GFG Notes — Ratio & Proportion', url: `${GFG}/maths/ratio-and-proportion/` },
    { type: 'practice', name: 'GFG Practice — Percentages', url: `${GFG}/aptitude/percentage-aptitude-questions/` },
  ],
  algebra: [
    { type: 'notes', name: 'GFG Notes — Sequences & Series', url: `${GFG}/dsa/sequences-and-series/` },
    { type: 'practice', name: 'GFG Practice — Number Series', url: `${GFG}/aptitude/number-series-in-quantitative-aptitude/` },
  ],
  'data-interp': [
    { type: 'practice', name: 'GFG Practice — Table Charts', url: `${GFG}/aptitude/table-charts/` },
    { type: 'notes', name: 'GFG Notes — Pie Charts', url: `${GFG}/maths/pie-charts/` },
  ],
  english: [
    { type: 'notes', name: 'GFG Notes — English Tenses', url: `${GFG}/english/english-tenses/` },
    { type: 'practice', name: 'GFG Practice — Reading Comprehension', url: `${GFG}/english/reading-comprehension-questions/` },
  ],
  reasoning: [
    { type: 'practice', name: 'GFG Practice — Syllogisms', url: `${GFG}/aptitude/syllogism/` },
    { type: 'practice', name: 'GFG Practice — Statement & Conclusions', url: `${GFG}/aptitude/statement-and-conclusion-analytical-and-logical-reasoning/` },
  ],
};

/** GFG links for a topic id (empty array when none curated). */
export const gfgLinksFor = (topicId: string): GfgLink[] => gfgTopicLinks[topicId] ?? [];

/** Subject-level GFG hubs (used by ResourcesView). */
export const gfgSubjectHubs: Record<string, string> = {
  'engineering-math': `${GFG}/engineering-mathematics/last-minute-notes-engineering-mathematics/`,
  'digital-logic': `${GFG}/digital-logic/lmn-digital-electronics/`,
  coa: `${GFG}/computer-organization-architecture/computer-organization-and-architecture-tutorials/`,
  'programming-ds': `${GFG}/dsa/lmns-data-structures/`,
  algorithms: `${GFG}/dsa/lmns-algorithms-gq/`,
  toc: `${GFG}/theory-of-computation/lmn-toc/`,
  compiler: `${GFG}/compiler-design/last-minute-notes-compiler-design-gq/`,
  os: `${GFG}/operating-systems/last-minute-notes-operating-systems/`,
  dbms: `${GFG}/dbms/last-minute-notes-dbms/`,
  networks: `${GFG}/computer-networks/computer-networks-gate-questions/`,
  aptitude: `${GFG}/aptitude/aptitude-questions-and-answers/`,
};
