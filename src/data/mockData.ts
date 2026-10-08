import { CareerPath, Course, CodingProblem, ProjectItem, Quiz, RoadmapTopic, UserProfile, NotificationItem } from '../types';

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    shortDescription: 'Uncover actionable patterns from complex datasets using statistics, Python, and Machine Learning algorithms.',
    overview: 'Data Scientists combine programming, mathematical modeling, and domain expertise to build predictive models and drive key organizational strategies.',
    requiredSkills: ['Python', 'SQL', 'Statistics & Probability', 'Machine Learning', 'Data Visualization', 'Pandas & NumPy', 'Deep Learning Basics'],
    averageSalary: '₹12 - 24 LPA',
    demandLevel: 'Very High',
    difficulty: 'Challenging',
    requirements: [
      'Strong grasp of Linear Algebra, Calculus & Statistics',
      'Proficiency in Python (Pandas, Scikit-Learn, PyTorch)',
      'Advanced SQL and relational data extraction',
      'Minimum 2 end-to-end ML projects deployed',
    ],
    icon: 'Brain',
    recommendedCertifications: ['TensorFlow Developer Certificate', 'AWS Certified Machine Learning', 'IBM Data Science Professional'],
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    shortDescription: 'Design, write, and maintain robust software systems, enterprise applications, and scalable backend logic.',
    overview: 'Core engineering path focused on algorithms, object-oriented design, distributed architectures, and rock-solid code efficiency.',
    requiredSkills: ['DSA', 'Java / C++', 'OOP Concepts', 'System Design', 'Git & GitHub', 'Operating Systems', 'Computer Networks'],
    averageSalary: '₹10 - 22 LPA',
    demandLevel: 'Very High',
    difficulty: 'Challenging',
    requirements: [
      '300+ LeetCode / Coding problems solved in C++ or Java',
      'Solid command over DBMS, OS threads, and Networking',
      'Clear understanding of Clean Architecture and SOLID principles',
    ],
    icon: 'Code',
    recommendedCertifications: ['Oracle Certified Java Developer', 'AWS Certified Developer Associate'],
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    shortDescription: 'Build, deploy, and scale machine learning and deep neural network models into production infrastructure.',
    overview: 'Bridges data science with production software engineering, focusing on MLOps, model deployment, and generative AI systems.',
    requiredSkills: ['Python', 'Deep Learning', 'PyTorch / TensorFlow', 'MLOps (Docker, MLflow)', 'Transformers & LLMs', 'Cloud AI'],
    averageSalary: '₹14 - 28 LPA',
    demandLevel: 'Very High',
    difficulty: 'Advanced',
    requirements: [
      'Mastery of neural network architectures (CNN, RNN, Transformers)',
      'Experience optimizing model inference latency and GPU utilization',
      'API deployment using FastAPI, Docker, and Kubernetes',
    ],
    icon: 'Cpu',
    recommendedCertifications: ['NVIDIA Deep Learning Institute', 'Google Cloud Professional ML Engineer'],
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    shortDescription: 'Develop end-to-end web applications covering responsive frontend interfaces, RESTful APIs, and databases.',
    overview: 'Master both client and server side development using modern frameworks like React, Node.js, Next.js, and relational/NoSQL databases.',
    requiredSkills: ['React.js', 'Node.js & Express', 'TypeScript', 'Tailwind CSS', 'PostgreSQL / MongoDB', 'REST & GraphQL APIs', 'Docker Basics'],
    averageSalary: '₹8 - 18 LPA',
    demandLevel: 'High',
    difficulty: 'Moderate',
    requirements: [
      '3 full-stack projects with user authentication and payment or complex state',
      'Proficiency in responsive UI/UX and database schema design',
      'CI/CD pipeline and cloud deployment on Vercel/AWS',
    ],
    icon: 'Layers',
    recommendedCertifications: ['Meta Front-End Developer', 'AWS Certified Solutions Architect'],
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    shortDescription: 'Construct reliable ETL data pipelines, data warehouses, and big data streaming architecture.',
    overview: 'Responsible for sourcing, transforming, and staging massive volumes of data for consumption by analysts and ML engineers.',
    requiredSkills: ['Python', 'SQL (Advanced)', 'Apache Spark', 'Airflow', 'Kafka', 'Snowflake / BigQuery', 'Data Modeling'],
    averageSalary: '₹11 - 22 LPA',
    demandLevel: 'High',
    difficulty: 'Challenging',
    requirements: [
      'Batch and streaming data pipeline implementation',
      'Deep knowledge of distributed systems and partition strategies',
      'Cloud storage and warehousing management',
    ],
    icon: 'Database',
    recommendedCertifications: ['Google Cloud Professional Data Engineer', 'Databricks Certified Associate'],
  },
  {
    id: 'cyber-security-engineer',
    title: 'Cyber Security Engineer',
    shortDescription: 'Safeguard computer systems, cloud perimeters, and digital assets from vulnerabilities and cyber threats.',
    overview: 'Focuses on penetration testing, network defense, threat intelligence, cryptography, and application security.',
    requiredSkills: ['Network Security', 'Linux Administration', 'Penetration Testing', 'Cryptography', 'Wireshark', 'Burp Suite', 'Python Scripting'],
    averageSalary: '₹9 - 20 LPA',
    demandLevel: 'High',
    difficulty: 'Challenging',
    requirements: [
      'Demonstrated CTF achievements or vulnerability bounty findings',
      'Deep network protocol inspection and incident response knowledge',
      'Security compliance frameworks and secure code reviews',
    ],
    icon: 'Shield',
    recommendedCertifications: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'OSCP'],
  },
  {
    id: 'cloud-devops-engineer',
    title: 'Cloud / DevOps Engineer',
    shortDescription: 'Automate build, deployment, and infrastructure operations to ensure 99.99% system availability.',
    overview: 'Unites development and IT operations through automated CI/CD pipelines, container orchestration, and Infrastructure as Code.',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS / GCP / Azure', 'Terraform', 'GitHub Actions / Jenkins', 'Prometheus & Grafana'],
    averageSalary: '₹10 - 24 LPA',
    demandLevel: 'Very High',
    difficulty: 'Challenging',
    requirements: [
      'Hands-on Kubernetes cluster configuration and Helm charts',
      'IaC provisioning using Terraform',
      'Automated end-to-end testing and canary deployments',
    ],
    icon: 'Cloud',
    recommendedCertifications: ['AWS Certified Solutions Architect', 'CKA (Certified Kubernetes Administrator)'],
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    shortDescription: 'Craft fluid, high-performance native and cross-platform mobile apps for millions of smartphone users.',
    overview: 'Specializes in mobile UX, offline syncing, device sensors, and native platform capabilities using Flutter or React Native.',
    requiredSkills: ['React Native / Flutter', 'TypeScript / Dart', 'Mobile UI Design', 'State Management (Redux/Zustand)', 'Firebase', 'App Store / Play Store Deployment'],
    averageSalary: '₹8 - 18 LPA',
    demandLevel: 'Growing',
    difficulty: 'Moderate',
    requirements: [
      'At least 2 published apps on Google Play or GitHub with live APK demo',
      'Smooth 60fps gesture handling and local cache synchronization',
      'Integration with device camera, location, and push notification services',
    ],
    icon: 'Smartphone',
    recommendedCertifications: ['Google Associate Android Developer', 'Meta React Native Specialization'],
  },
];

export const ROADMAP_TOPICS: RoadmapTopic[] = [
  // Year 1 - Sem 1
  {
    id: 'topic-c-prog',
    title: 'Programming Fundamentals (C / C++)',
    category: 'Programming',
    year: 1,
    semester: 1,
    description: 'Understand memory models, pointers, arrays, functions, and control flow in foundational compiled languages.',
    estimatedHours: 40,
    skillLevel: 'Beginner',
    linkedCourseId: 'course-c-cpp',
    linkedQuizId: 'quiz-dsa-arrays',
    linkedProblemId: 'prob-two-sum',
    keyConcepts: ['Variables & Pointers', 'Memory Allocation (malloc/free)', 'Control Flow', 'Functions & Recursion'],
  },
  {
    id: 'topic-eng-math-1',
    title: 'Engineering Mathematics & Calculus',
    category: 'Mathematics',
    year: 1,
    semester: 1,
    description: 'Matrix algebra, determinants, limits, continuity, and partial derivatives essential for computer vision and algorithms.',
    estimatedHours: 35,
    skillLevel: 'Beginner',
    keyConcepts: ['Linear Equations', 'Eigenvalues & Eigenvectors', 'Calculus', 'Coordinate Geometry'],
  },
  {
    id: 'topic-comp-fund',
    title: 'Computer Organization Fundamentals',
    category: 'Core CS',
    year: 1,
    semester: 1,
    description: 'Binary logic, logic gates, CPU architecture, registers, instruction cycle, and cache memory layout.',
    estimatedHours: 25,
    skillLevel: 'Beginner',
    keyConcepts: ['Boolean Algebra', 'Logic Gates', 'ALU & Control Unit', 'Memory Hierarchy'],
  },

  // Year 1 - Sem 2
  {
    id: 'topic-oop-java',
    title: 'Object Oriented Programming (OOP)',
    category: 'Programming',
    year: 1,
    semester: 2,
    description: 'Encapsulation, Inheritance, Polymorphism, and Abstraction. Design modular, reusable enterprise systems.',
    estimatedHours: 35,
    skillLevel: 'Beginner',
    linkedCourseId: 'course-python',
    keyConcepts: ['Classes & Objects', 'Polymorphism', 'Interfaces & Abstract Classes', 'Exception Handling'],
  },
  {
    id: 'topic-dsa-basics',
    title: 'Data Structures Basics',
    category: 'DSA',
    year: 1,
    semester: 2,
    description: 'Linear data structures: dynamic arrays, singly and doubly linked lists, stacks, and circular queues.',
    estimatedHours: 45,
    skillLevel: 'Beginner',
    linkedQuizId: 'quiz-dsa-arrays',
    linkedProblemId: 'prob-valid-parentheses',
    linkedProjectId: 'proj-student-perf',
    keyConcepts: ['Time & Space Complexity', 'Arrays & Two Pointers', 'Singly Linked Lists', 'Stack & Queue Applications'],
  },
  {
    id: 'topic-git-web',
    title: 'Git, GitHub & Web Basics',
    category: 'Tools',
    year: 1,
    semester: 2,
    description: 'Version control workflows, branching, pull requests, semantic HTML5, CSS layout with flexbox and modern JS.',
    estimatedHours: 20,
    skillLevel: 'Beginner',
    keyConcepts: ['Git Branches & Merging', 'Pull Requests', 'HTML5 & CSS Grid', 'DOM Manipulation'],
  },

  // Year 2 - Sem 3
  {
    id: 'topic-adv-dsa',
    title: 'Advanced Data Structures & Algorithms',
    category: 'DSA',
    year: 2,
    semester: 3,
    description: 'Trees, Binary Search Trees, Heaps, Graphs (BFS/DFS, Dijkstra), Greedy, and Dynamic Programming foundations.',
    estimatedHours: 60,
    skillLevel: 'Intermediate',
    linkedCourseId: 'course-dsa-adv',
    linkedQuizId: 'quiz-dsa-arrays',
    linkedProblemId: 'prob-max-subarray',
    keyConcepts: ['Tree Traversals', 'Graph Algorithms', 'Heap Sort & Priority Queues', 'Dynamic Programming Patterns'],
  },
  {
    id: 'topic-dbms',
    title: 'Database Management Systems (DBMS)',
    category: 'Database',
    year: 2,
    semester: 3,
    description: 'Relational data models, ER diagrams, normalization (1NF to BCNF), indexing, transactions, and ACID properties.',
    estimatedHours: 40,
    skillLevel: 'Intermediate',
    linkedCourseId: 'course-dbms-sql',
    linkedQuizId: 'quiz-sql-dbms',
    linkedProblemId: 'prob-sql-second-highest',
    keyConcepts: ['Relational Algebra', 'Normalization', 'ACID Transactions', 'B-Tree Indexing'],
  },
  {
    id: 'topic-os',
    title: 'Operating Systems & Concurrency',
    category: 'Core CS',
    year: 2,
    semester: 3,
    description: 'Process states, CPU scheduling algorithms, mutexes, semaphores, deadlock detection, and virtual memory paging.',
    estimatedHours: 40,
    skillLevel: 'Intermediate',
    keyConcepts: ['Process vs Threads', 'CPU Scheduling (Round Robin)', 'Deadlock Handling', 'Paging & TLB'],
  },

  // Year 2 - Sem 4
  {
    id: 'topic-computer-networks',
    title: 'Computer Networks (OSI & TCP/IP)',
    category: 'Core CS',
    year: 2,
    semester: 4,
    description: 'Network protocol layers, sockets, TCP vs UDP, DNS resolution, HTTP/HTTPS, routing protocols, and subnetting.',
    estimatedHours: 35,
    skillLevel: 'Intermediate',
    keyConcepts: ['OSI 7 Layers', 'TCP Handshake & Congestion Control', 'IP Subnetting & CIDR', 'HTTP/3 & TLS'],
  },
  {
    id: 'topic-sql-adv',
    title: 'Advanced SQL & Query Optimization',
    category: 'Database',
    year: 2,
    semester: 4,
    description: 'Complex window functions, CTEs, subqueries, query execution plans, and transaction isolation levels.',
    estimatedHours: 30,
    skillLevel: 'Intermediate',
    linkedCourseId: 'course-dbms-sql',
    linkedQuizId: 'quiz-sql-dbms',
    linkedProblemId: 'prob-sql-second-highest',
    keyConcepts: ['Window Functions (ROW_NUMBER, RANK)', 'Common Table Expressions', 'EXPLAIN ANALYZE', 'Views & Triggers'],
  },

  // Year 3 - Sem 5 (Specialization: Data Science & AI track)
  {
    id: 'topic-ml-foundations',
    title: 'Machine Learning Fundamentals',
    category: 'AI/ML',
    year: 3,
    semester: 5,
    description: 'Supervised vs unsupervised learning, gradient descent, linear and logistic regression, decision trees, and overfitting.',
    estimatedHours: 50,
    skillLevel: 'Intermediate',
    linkedCourseId: 'course-ml',
    linkedQuizId: 'quiz-ml',
    linkedProjectId: 'proj-customer-churn',
    keyConcepts: ['Cost Functions & Gradient Descent', 'Linear & Logistic Regression', 'Bias-Variance Tradeoff', 'Cross-Validation'],
  },
  {
    id: 'topic-statistics-ds',
    title: 'Statistics & Probability for Data Science',
    category: 'Data Science',
    year: 3,
    semester: 5,
    description: 'Probability distributions, Bayes theorem, hypothesis testing (p-values, z-test, t-test), and statistical inferences.',
    estimatedHours: 40,
    skillLevel: 'Intermediate',
    linkedCourseId: 'course-ml',
    linkedProjectId: 'proj-customer-churn',
    keyConcepts: ['Normal & Binomial Distributions', 'Central Limit Theorem', 'Hypothesis Testing & p-value', 'Confidence Intervals'],
  },
  {
    id: 'topic-data-viz',
    title: 'Data Wrangling & Visualization',
    category: 'Data Science',
    year: 3,
    semester: 5,
    description: 'Manipulate messy real-world datasets with Pandas, NumPy, and craft publication-quality interactive charts with Seaborn.',
    estimatedHours: 35,
    skillLevel: 'Intermediate',
    linkedCourseId: 'course-python',
    linkedProjectId: 'proj-student-perf',
    keyConcepts: ['Pandas GroupBy & Aggregations', 'Handling Missing Values', 'Seaborn & Plotly Charts', 'Feature Scaling'],
  },

  // Year 3 - Sem 6
  {
    id: 'topic-adv-ml-dl',
    title: 'Deep Learning & Neural Networks',
    category: 'AI/ML',
    year: 3,
    semester: 6,
    description: 'Multi-layer perceptrons, backpropagation, convolutional networks for images, recurrent networks, and PyTorch.',
    estimatedHours: 60,
    skillLevel: 'Advanced',
    linkedProjectId: 'proj-fraud-detection',
    keyConcepts: ['Activation Functions', 'Backpropagation Calculus', 'CNNs & Pooling', 'PyTorch Tensors & Training Loops'],
  },
  {
    id: 'topic-cloud-mlops',
    title: 'MLOps & Model Deployment',
    category: 'Cloud',
    year: 3,
    semester: 6,
    description: 'Turn trained notebooks into reliable production microservices using FastAPI, Docker containers, and CI/CD pipelines.',
    estimatedHours: 40,
    skillLevel: 'Advanced',
    linkedProjectId: 'proj-customer-churn',
    keyConcepts: ['FastAPI REST Endpoints', 'Dockerizing ML Models', 'Model Registry with MLflow', 'Cloud Serverless Inference'],
  },

  // Year 4 - Sem 7
  {
    id: 'topic-major-project',
    title: 'Major Industry Capstone Project',
    category: 'Projects',
    year: 4,
    semester: 7,
    description: 'Build, benchmark, and deploy a comprehensive full-scale application that solves an actual real-world industry problem.',
    estimatedHours: 80,
    skillLevel: 'Advanced',
    linkedProjectId: 'proj-fraud-detection',
    keyConcepts: ['System Architecture Design', 'Production Data Pipeline', 'Model Benchmarking', 'Live Demo & Documentation'],
  },
  {
    id: 'topic-placement-prep-dsa',
    title: 'Placement DSA Revision & Mock Coding',
    category: 'DSA',
    year: 4,
    semester: 7,
    description: 'Intensive timed problem solving covering Top 150 interview patterns (Blind 75, NeetCode 150) for tier-1 tech hiring.',
    estimatedHours: 50,
    skillLevel: 'Advanced',
    linkedProblemId: 'prob-two-sum',
    keyConcepts: ['Sliding Window', 'Dynamic Programming Intervals', 'Graph Shortest Paths', 'Trie & Segment Trees'],
  },

  // Year 4 - Sem 8
  {
    id: 'topic-mock-interviews',
    title: 'System Design & HR / Tech Mock Interviews',
    category: 'Career',
    year: 4,
    semester: 8,
    description: 'High-level system design (load balancers, caching, sharding) and behavioural behavioral interview simulations.',
    estimatedHours: 35,
    skillLevel: 'Advanced',
    keyConcepts: ['Scalability & Caching (Redis)', 'Database Sharding', 'STAR Method for HR', 'Negotiation & Offer Evaluation'],
  },
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-ml',
    title: 'Machine Learning Fundamentals',
    category: 'AI/ML & Data Science',
    description: 'Master core supervised and unsupervised algorithms, mathematical intuition, and practical Python implementations.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80',
    level: 'Intermediate',
    totalChapters: 7,
    estimatedHours: 18,
    chapters: [
      {
        id: 'ml-chap-1',
        title: 'Introduction to Machine Learning',
        duration: '14:20',
        videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU', // StatQuest / Andrew Ng style topic
        summary: 'Understand what machine learning is, how it differs from traditional rule-based coding, and the three main paradigms: Supervised, Unsupervised, and Reinforcement Learning.',
        objectives: [
          'Differentiate between heuristic programming and ML',
          'Identify suitable problem statements for machine learning',
          'Understand feature matrices and target vectors (X and y)',
        ],
        conceptExplanation: `Machine Learning is a subset of Artificial Intelligence that focuses on building applications that learn from data and improve their accuracy over time without being explicitly programmed.\n\nIn classical programming, humans write code (rules) and supply data to generate answers. In Machine Learning, humans provide data and answers (labels) to train a model that synthesizes the underlying rules.`,
        codeSnippet: {
          language: 'python',
          code: `# Supervised Learning Concept in Python
import numpy as np

# Feature matrix X: [Study hours, Attendance %]
X = np.array([
    [2, 60],
    [5, 80],
    [8, 95],
    [1, 50]
])

# Target vector y: Exam score (0-100)
y = np.array([55, 78, 94, 42])

print(f"Dataset shape: X={X.shape}, y={y.shape}")`,
        },
        exercise: 'Write down three examples of classification problems and three examples of regression problems from everyday campus life.',
      },
      {
        id: 'ml-chap-2',
        title: 'Supervised Learning & Data Splitting',
        duration: '16:45',
        videoUrl: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
        summary: 'Learn why training on all your data causes data leakage and overfitting. Master train-test splits and cross-validation techniques.',
        objectives: [
          'Master train_test_split from scikit-learn',
          'Understand stratification in classification targets',
          'Avoid target leakage and test-set contamination',
        ],
        conceptExplanation: `A machine learning model must perform well on unseen real-world data, not just memorize historical data. We partition our historical data into Training (typically 70-80%) and Testing (20-30%) subsets.\n\nStratified sampling ensures the proportion of target classes remains identical across both train and test splits, preventing model bias in imbalanced datasets.`,
        codeSnippet: {
          language: 'python',
          code: `from sklearn.model_selection import train_test_split
import numpy as np

X = np.random.randn(100, 4)
y = np.random.randint(0, 2, size=100)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training samples: {len(X_train)}, Testing samples: {len(X_test)}")`,
        },
        exercise: 'Explain why evaluating your model on the same data it was trained on gives an overly optimistic score.',
      },
      {
        id: 'ml-chap-3',
        title: 'Linear & Logistic Regression',
        duration: '12:45',
        videoUrl: 'https://www.youtube.com/embed/zPG4NjLkCjc',
        summary: 'Explore the mathematical foundation of Ordinary Least Squares (OLS) regression, cost function minimization via Gradient Descent, and Sigmoid probability mapping.',
        objectives: [
          'Formulate the hypothesis function y = wx + b',
          'Compute Mean Squared Error (MSE) loss and its partial derivatives',
          'Apply the Sigmoid function for binary classification thresholds',
          'Interpret regression coefficients and p-values',
        ],
        conceptExplanation: `Linear Regression attempts to model the relationship between two variables by fitting a linear equation to observed data. One variable is considered to be an explanatory variable (feature), and the other is a dependent variable (target).\n\nThe line equation is:\nŷ = w₁x₁ + w₂x₂ + ... + wₙxₙ + b\n\nGradient Descent iteratively updates weights:\nw := w - α * (∂J/∂w)\nwhere α is the learning rate and J is the cost function (Mean Squared Error).`,
        codeSnippet: {
          language: 'python',
          code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Sample feature: Years of Experience
X = np.array([[1], [2], [3], [4], [5], [6]])
# Sample target: Salary (in LPA)
y = np.array([4.5, 5.8, 7.2, 9.0, 11.5, 14.0])

model = LinearRegression()
model.fit(X, y)

predicted = model.predict([[4.5]])
print(f"Estimated Salary for 4.5 years: ₹{predicted[0]:.2f} LPA")
print(f"Slope (weight): {model.coef_[0]:.2f}, Intercept: {model.intercept_:.2f}")`,
        },
        exercise: 'Using Python and numpy, implement a gradient descent loop for 100 iterations to find slope w starting from 0.0.',
      },
      {
        id: 'ml-chap-4',
        title: 'Classification & Decision Trees',
        duration: '18:10',
        videoUrl: 'https://www.youtube.com/embed/_L39rN6gz7Y',
        summary: 'How decision trees split feature spaces using Gini Impurity and Entropy Information Gain. Learn pruning to prevent deep-tree overfitting.',
        objectives: [
          'Calculate Gini Impurity and Entropy manually',
          'Tune max_depth, min_samples_split hyperparameters',
          'Visualize decision trees with export_text and plot_tree',
        ],
        conceptExplanation: `Decision Trees are intuitive non-parametric supervised learning models used for both classification and regression. The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.`,
        codeSnippet: {
          language: 'python',
          code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris

iris = load_iris()
clf = DecisionTreeClassifier(max_depth=3, random_state=42)
clf.fit(iris.data, iris.target)

print(f"Tree depth: {clf.get_depth()}, Number of leaves: {clf.get_n_leaves()}")`,
        },
        exercise: 'Calculate the Gini impurity of a node containing 4 spam emails and 6 non-spam emails.',
      },
      {
        id: 'ml-chap-5',
        title: 'Model Evaluation & Confusion Matrix',
        duration: '15:30',
        videoUrl: 'https://www.youtube.com/embed/Kdsp6soqA7o',
        summary: 'Accuracy paradox in imbalanced data, Precision, Recall, F1-Score, ROC curves, and AUC metrics explained clearly.',
        objectives: [
          'Construct a 2x2 confusion matrix (TP, FP, TN, FN)',
          'Choose between High Precision vs High Recall based on business impact',
          'Calculate ROC-AUC score and plot trade-off curves',
        ],
        conceptExplanation: `In healthcare diagnostics or fraud detection, accuracy is misleading. A model predicting 'healthy' for 100% of patients has 99% accuracy if only 1% are ill, but detects 0 cases!\n\nPrecision = TP / (TP + FP)\nRecall = TP / (TP + FN)\nF1 = 2 * (Precision * Recall) / (Precision + Recall)`,
        codeSnippet: {
          language: 'python',
          code: `from sklearn.metrics import classification_report, confusion_matrix

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

print("Confusion Matrix:\n", confusion_matrix(y_true, y_pred))
print("\nClassification Report:\n", classification_report(y_true, y_pred))`,
        },
        exercise: 'Explain why a cancer detection system should prioritize Recall over Precision.',
      },
      {
        id: 'ml-chap-6',
        title: 'Hyperparameter Tuning & Cross-Validation',
        duration: '17:00',
        videoUrl: 'https://www.youtube.com/embed/Gol_qOfhft4',
        summary: 'GridSearchCV vs RandomizedSearchCV, K-Fold cross validation, avoiding overfitting on test folds, and Bayesian optimization.',
        objectives: [
          'Implement 5-Fold Stratified Cross Validation',
          'Set up hyperparameter search spaces using GridSearchCV',
          'Extract best_estimator_ and analyze cv_results_',
        ],
        conceptExplanation: `Hyperparameters are parameters whose values are set before the learning process begins (e.g. learning rate, tree depth), whereas model parameters are learned directly during training (e.g. weights, biases).`,
        codeSnippet: {
          language: 'python',
          code: `from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 10]
}
grid = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
print("GridSearchCV configured with 9 parameter combinations.")`,
        },
        exercise: 'When would you prefer RandomizedSearchCV over GridSearchCV?',
      },
      {
        id: 'ml-chap-7',
        title: 'End-to-End Mini Project: Salary Predictor',
        duration: '22:15',
        videoUrl: 'https://www.youtube.com/embed/4b5d3muPQmA',
        summary: 'Build a production-grade regression model pipeline, serialize it with joblib, and serve predictions via a lightweight Python script.',
        objectives: [
          'Build an end-to-end scikit-learn Pipeline with StandardScaler',
          'Serialize trained model with joblib.dump()',
          'Write a CLI prediction script taking user parameters',
        ],
        conceptExplanation: `An end-to-end ML project requires data preprocessing, missing value imputation, categorical encoding, feature scaling, model fitting, and export for deployment.`,
        codeSnippet: {
          language: 'python',
          code: `import joblib
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Ridge(alpha=1.0))
])

# Save pipeline
# joblib.dump(pipeline, 'salary_model.pkl')
print("Complete pipeline compiled successfully!")`,
        },
        exercise: 'Deploy the saved model into a simple Flask or FastAPI route.',
      },
    ],
  },
  {
    id: 'course-python',
    title: 'Python for Data Science & Engineering',
    category: 'Programming & Data Science',
    description: 'Learn modern Python 3.12 syntax, data structures, list comprehensions, NumPy vectorized math, and Pandas analytics.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    level: 'Beginner',
    totalChapters: 6,
    estimatedHours: 14,
    chapters: [
      {
        id: 'py-chap-1',
        title: 'Python Basics & Variables',
        duration: '11:15',
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
        summary: 'Dynamic typing, fundamental data types (int, float, str, bool), f-strings, and basic arithmetic in Python.',
        objectives: ['Declare typed variables', 'Format strings using f-strings', 'Work with type casting'],
        conceptExplanation: `Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with use of significant indentation.`,
        codeSnippet: {
          language: 'python',
          code: `name: str = "Areeba"
year: int = 2
cgpa: float = 9.15
print(f"Student {name} is in Year {year} with CGPA {cgpa}")`,
        },
        exercise: 'Write a program to calculate the hypotenuse of a right triangle given two sides a and b.',
      },
      {
        id: 'py-chap-2',
        title: 'Control Flow & Loops',
        duration: '15:20',
        videoUrl: 'https://www.youtube.com/embed/6iF8Xb7Z3wQ',
        summary: 'if/elif/else conditions, while loops, for loops with enumerate(), and list comprehensions.',
        objectives: ['Master loop patterns', 'Use list comprehensions effectively', 'Understand break, continue, pass'],
        conceptExplanation: `Control flow allows your program to make decisions and execute specific blocks of code conditionally or repeatedly.`,
        codeSnippet: {
          language: 'python',
          code: `squares = [x**2 for x in range(10) if x % 2 == 0]
print("Even squares:", squares)`,
        },
        exercise: 'Find all prime numbers between 1 and 50 using a Python loop.',
      },
    ],
  },
  {
    id: 'course-dbms-sql',
    title: 'Database Management & Advanced SQL',
    category: 'Databases & Backend',
    description: 'Master relational database theory, normal forms, ACID guarantees, complex JOINs, CTEs, and window functions.',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
    level: 'Intermediate',
    totalChapters: 5,
    estimatedHours: 16,
    chapters: [
      {
        id: 'sql-chap-1',
        title: 'SQL Fundamentals & Relational Algebra',
        duration: '13:40',
        videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        summary: 'SELECT, WHERE, ORDER BY, GROUP BY, HAVING, and relational algebra selection/projection operations.',
        objectives: ['Write declarative SQL queries', 'Filter data using complex predicates', 'Aggregate data with GROUP BY'],
        conceptExplanation: `SQL (Structured Query Language) is the standard language for dealing with Relational Databases.`,
        codeSnippet: {
          language: 'sql',
          code: `SELECT department, COUNT(*) AS employee_count, AVG(salary) AS avg_salary
FROM employees
WHERE is_active = TRUE
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY avg_salary DESC;`,
        },
        exercise: 'Write a query to list all students who scored above average in the Midterm examination.',
      },
    ],
  },
  {
    id: 'course-dsa-adv',
    title: 'Data Structures & Algorithms in Depth',
    category: 'Computer Science Core',
    description: 'Ace technical interviews with masterclasses on Arrays, Trees, Graphs, Greedy, and Dynamic Programming.',
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc665f24204?auto=format&fit=crop&w=600&q=80',
    level: 'Advanced',
    totalChapters: 6,
    estimatedHours: 24,
    chapters: [
      {
        id: 'dsa-chap-1',
        title: 'Arrays & Two-Pointer Patterns',
        duration: '18:50',
        videoUrl: 'https://www.youtube.com/embed/-GJxg6tU81g',
        summary: 'Master two-pointer techniques, sliding windows, prefix sums, and fast/slow pointer cycle detection.',
        objectives: ['Identify two-pointer problems', 'Reduce O(N^2) loops to O(N) linear time', 'Solve 3Sum and Container With Most Water'],
        conceptExplanation: `The two-pointer technique uses two indices to traverse an array simultaneously—often moving towards each other or in the same direction at differing speeds.`,
        codeSnippet: {
          language: 'python',
          code: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
        },
        exercise: 'Explain why two-pointer approach requires the input array to be sorted.',
      },
    ],
  },
];

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    acceptance: '52.4%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    inputFormat: 'An integer array nums and an integer target.',
    outputFormat: 'An array of two integers representing indices.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (mp.count(comp)) return {mp[comp], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                return new int[]{map.get(comp), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (seen.has(diff)) {
            return [seen.get(diff), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`,
    },
    testCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0, 1]',
        explanation: '2 + 7 = 9',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1, 2]',
        explanation: '2 + 4 = 6',
      },
      {
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0, 1]',
        explanation: '3 + 3 = 6',
      },
    ],
    hints: [
      'A brute force O(N^2) checks every pair. Can we do better with auxiliary memory?',
      'Can you use a Hash Table (dict/Map) to look up whether (target - current_number) has already been seen in O(1) time?',
    ],
    optimalComplexity: 'Time: O(N), Space: O(N)',
    xpReward: 50,
  },
  {
    id: 'prob-valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack & Queue',
    acceptance: '40.8%',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    inputFormat: 'A string s containing bracket characters.',
    outputFormat: 'Boolean true or false.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"',
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return true;
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return true;
    }
}`,
      javascript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const ch of s) {
        if (map[ch]) {
            if (stack.pop() !== map[ch]) return false;
        } else {
            stack.push(ch);
        }
    }
    return stack.length === 0;
};`,
    },
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "([)]"', expectedOutput: 'false' },
    ],
    hints: [
      'Use a Last-In First-Out (LIFO) Stack data structure.',
      'Whenever you encounter a closing bracket, check if the stack top matches its corresponding opening bracket.',
    ],
    optimalComplexity: 'Time: O(N), Space: O(N)',
    xpReward: 50,
  },
  {
    id: 'prob-max-subarray',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptance: '50.3%',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    inputFormat: 'An integer array nums.',
    outputFormat: 'An integer representing the maximum contiguous subarray sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: {
      python: `def maxSubArray(nums: list[int]) -> int:
    max_sum = nums[0]
    curr_sum = 0
    for n in nums:
        curr_sum = max(n, curr_sum + n)
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = nums[0], curr = 0;
        for (int n : nums) {
            curr = max(n, curr + n);
            max_sum = max(max_sum, curr);
        }
        return max_sum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int max = nums[0], curr = 0;
        for (int n : nums) {
            curr = Math.max(n, curr + n);
            max = Math.max(max, curr);
        }
        return max;
    }
}`,
      javascript: `var maxSubArray = function(nums) {
    let max = nums[0];
    let curr = 0;
    for (const n of nums) {
        curr = Math.max(n, curr + n);
        max = Math.max(max, curr);
    }
    return max;
};`,
    },
    testCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: 'nums = [1]', expectedOutput: '1' },
      { input: 'nums = [5,4,-1,7,8]', expectedOutput: '23' },
    ],
    hints: [
      'If the current subarray sum drops below 0, it won\'t contribute positively to any subsequent subarray.',
      'Kadane\'s algorithm calculates the maximum sum ending at each position in a single pass.',
    ],
    optimalComplexity: 'Time: O(N), Space: O(1)',
    xpReward: 80,
  },
  {
    id: 'prob-sql-second-highest',
    title: 'Second Highest Salary',
    difficulty: 'Medium',
    category: 'SQL',
    acceptance: '37.1%',
    description: `Write a SQL query to find the second highest distinct salary from the \`Employee\` table. If there is no second highest salary, the query should report \`null\`.\n\nTable: Employee\n+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| id          | int  |\n| salary      | int  |\n+-------------+------+`,
    inputFormat: 'Employee table with id and salary columns.',
    outputFormat: 'Result table with column SecondHighestSalary.',
    examples: [
      {
        input: 'Employee = [[1, 100], [2, 200], [3, 300]]',
        output: '200',
        explanation: '300 is the highest, 200 is the second highest.',
      },
      {
        input: 'Employee = [[1, 100]]',
        output: 'null',
        explanation: 'There is only one salary, so second highest is null.',
      },
    ],
    constraints: [
      'id is the primary key',
      'salary >= 0',
    ],
    starterCode: {
      python: `# SQL Query Solution:
SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
      cpp: `-- SQL query:
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
      java: `-- SQL query using DENSE_RANK():
WITH Ranked AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rk
    FROM Employee
)
SELECT MAX(salary) as SecondHighestSalary FROM Ranked WHERE rk = 2;`,
      javascript: `SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    },
    testCases: [
      { input: 'Employee: [100, 200, 300]', expectedOutput: '200' },
      { input: 'Employee: [100]', expectedOutput: 'null' },
      { input: 'Employee: [200, 200, 100]', expectedOutput: '100' },
    ],
    hints: [
      'Use DISTINCT to avoid duplicate salary values from taking multiple ranks.',
      'Subqueries or Window functions (DENSE_RANK) handle edge cases smoothly.',
    ],
    optimalComplexity: 'Time: O(N log N) or O(N), Space: O(1)',
    xpReward: 80,
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-student-perf',
    title: 'Student Performance Prediction System',
    difficulty: 'Beginner',
    careerCategory: 'Data Science',
    description: 'Analyze academic factors, attendance records, study hours, and socioeconomic indicators to forecast student semester GPA and graduation risks.',
    problemStatement: 'Educational institutions struggle to identify at-risk students before final semester exams. By analyzing continuous assessment and attendance trends, early interventions can significantly reduce college dropout rates.',
    objectives: [
      'Perform Exploratory Data Analysis (EDA) on student demographics & study habits',
      'Cleanse missing values and encode categorical data',
      'Train multiple regression models (Linear Regression, Ridge, Random Forest)',
      'Deploy an interactive dashboard to predict future GPA based on inputs',
    ],
    requiredSkills: ['Python', 'Pandas', 'NumPy', 'Matplotlib / Seaborn', 'Scikit-Learn', 'Streamlit'],
    techStack: ['Python 3.11', 'Pandas', 'Scikit-Learn', 'Seaborn', 'Streamlit UI', 'Jupyter Lab'],
    folderStructure: `student-performance-system/
├── data/
│   ├── raw_students.csv
│   └── cleaned_students.csv
├── notebooks/
│   ├── 01_eda_and_cleaning.ipynb
│   └── 02_model_training.ipynb
├── src/
│   ├── data_loader.py
│   ├── preprocessor.py
│   └── train.py
├── app.py
├── requirements.txt
└── README.md`,
    sampleDataset: {
      name: 'campus_student_records.csv',
      size: '1.2 MB (2,500 records)',
      columns: ['student_id', 'attendance_pct', 'midterm_score', 'study_hours_weekly', 'assignments_done', 'target_final_gpa'],
      sampleRows: [
        { student_id: 'CS2024-001', attendance_pct: 94, midterm_score: 88, study_hours_weekly: 16, assignments_done: 10, target_final_gpa: 8.9 },
        { student_id: 'CS2024-002', attendance_pct: 71, midterm_score: 54, study_hours_weekly: 6, assignments_done: 5, target_final_gpa: 6.2 },
        { student_id: 'CS2024-003', attendance_pct: 85, midterm_score: 76, study_hours_weekly: 12, assignments_done: 9, target_final_gpa: 8.1 },
        { student_id: 'CS2024-004', attendance_pct: 60, midterm_score: 42, study_hours_weekly: 4, assignments_done: 3, target_final_gpa: 5.1 },
      ],
    },
    videoTutorialTitle: 'Complete Student Performance ML Project Walkthrough',
    videoTutorialDuration: '45:30',
    steps: [
      {
        id: 1,
        title: 'Understand the Problem & Dataset',
        description: 'Read the problem brief, identify target variable (final GPA), and understand feature distributions.',
        checklist: ['Download raw CSV dataset', 'Inspect data types and null counts', 'Establish baseline evaluation metric (RMSE)'],
        resources: [{ title: 'Dataset Documentation', url: '#' }, { title: 'Problem Formulation Guide', url: '#' }],
        completed: true,
      },
      {
        id: 2,
        title: 'Data Cleaning & Exploratory Data Analysis',
        description: 'Remove anomalous values, impute missing entries with median strategies, and plot correlation heatmaps.',
        checklist: ['Fill nulls in attendance with median', 'Detect outliers using box plots', 'Plot Seaborn heatmap of correlations'],
        resources: [{ title: 'Pandas Data Cleaning Cheatsheet', url: '#' }],
        completed: true,
      },
      {
        id: 3,
        title: 'Feature Engineering & Scaling',
        description: 'Create ratio features (e.g. study-to-attendance ratio), standardize continuous inputs with StandardScaler.',
        checklist: ['One-Hot encode categorical features', 'Apply StandardScaler to numerical features', 'Split train/test (80/20)'],
        resources: [{ title: 'Scikit-Learn Preprocessing Guide', url: '#' }],
        completed: false,
      },
      {
        id: 4,
        title: 'Model Training & Hyperparameter Tuning',
        description: 'Train Linear Regression, Decision Tree Regressor, and Random Forest Regressor. Compare R2 score and RMSE.',
        checklist: ['Fit models on X_train', 'Tune max_depth using GridSearchCV', 'Record cross-validation scores'],
        resources: [{ title: 'Model Selection Strategies', url: '#' }],
        completed: false,
      },
      {
        id: 5,
        title: 'Build Web UI & Deployment',
        description: 'Create a responsive web interface where a mentor can enter student metrics and view real-time predicted GPA.',
        checklist: ['Write Streamlit or React frontend', 'Connect Python model inference', 'Deploy to Hugging Face or Render'],
        resources: [{ title: 'Streamlit in 15 Minutes', url: '#' }],
        completed: false,
      },
    ],
  },
  {
    id: 'proj-customer-churn',
    title: 'Customer Churn Prediction & Retention Engine',
    difficulty: 'Intermediate',
    careerCategory: 'Data Science',
    description: 'Predict telecommunications customer churn using ensemble classification, explain feature importance with SHAP, and build an automated retention alert system.',
    problemStatement: 'Acquiring a new telecom customer costs 5x more than retaining an existing one. Identifying high-risk customers 30 days before contract expiration empowers customer success teams to offer personalized loyalty promotions.',
    objectives: [
      'Analyze churn drivers (contract type, monthly charges, customer support tickets)',
      'Address severe class imbalance using SMOTE oversampling',
      'Train XGBoost and Random Forest classifiers with ROC-AUC > 0.85',
      'Compute SHAP values to explain individual prediction decisions',
      'Build a FastAPI microservice and web dashboard',
    ],
    requiredSkills: ['Python', 'SQL', 'XGBoost', 'Scikit-Learn', 'SHAP Explainability', 'FastAPI', 'Docker'],
    techStack: ['Python 3.11', 'XGBoost', 'LightGBM', 'FastAPI', 'Docker', 'React / Tailwind', 'PostgreSQL'],
    folderStructure: `telecom-churn-engine/
├── data/
│   ├── telco_churn_raw.csv
│   └── telco_churn_processed.parquet
├── src/
│   ├── pipelines/
│   │   ├── feature_engineering.py
│   │   └── training_pipeline.py
│   ├── models/
│   │   └── churn_xgboost_v1.pkl
│   └── api/
│       ├── main.py
│       └── schemas.py
├── tests/
│   └── test_api.py
├── Dockerfile
├── docker-compose.yml
└── README.md`,
    sampleDataset: {
      name: 'telecom_customer_churn.csv',
      size: '2.4 MB (7,043 customer accounts)',
      columns: ['customer_id', 'tenure_months', 'monthly_charges', 'contract_type', 'tech_support', 'churn_label'],
      sampleRows: [
        { customer_id: '7590-VHVEG', tenure_months: 1, monthly_charges: 29.85, contract_type: 'Month-to-month', tech_support: 'No', churn_label: 'Yes' },
        { customer_id: '5575-GNVDE', tenure_months: 34, monthly_charges: 56.95, contract_type: 'One year', tech_support: 'Yes', churn_label: 'No' },
        { customer_id: '3668-QPYBK', tenure_months: 2, monthly_charges: 53.85, contract_type: 'Month-to-month', tech_support: 'No', churn_label: 'Yes' },
        { customer_id: '7795-CFOCW', tenure_months: 45, monthly_charges: 42.30, contract_type: 'One year', tech_support: 'Yes', churn_label: 'No' },
      ],
    },
    videoTutorialTitle: 'Industry Masterclass: Building Telco Churn Engine from Scratch',
    videoTutorialDuration: '1h 12m',
    steps: [
      {
        id: 1,
        title: 'Understand the Business Problem & Churn Metrics',
        description: 'Quantify financial losses from churn. Understand cohort analysis and contract lifecycle.',
        checklist: ['Read telecommunications domain brief', 'Define churn criteria (involuntary vs voluntary)', 'Formulate business ROI metric'],
        resources: [{ title: 'Telecom Churn Domain Guide', url: '#' }],
        completed: true,
      },
      {
        id: 2,
        title: 'Collect & Ingest Raw Dataset into SQL',
        description: 'Load CSV into PostgreSQL, write exploratory SQL queries for customer cohorts and lifetime value.',
        checklist: ['Create SQL schema for customer records', 'Calculate churn rates by tenure groups in SQL', 'Export clean analytical base table'],
        resources: [{ title: 'PostgreSQL Import Tutorial', url: '#' }],
        completed: true,
      },
      {
        id: 3,
        title: 'Data Cleaning & Preprocessing Pipeline',
        description: 'Handle missing values in TotalCharges, encode categorical features, and split test sets.',
        checklist: ['Convert TotalCharges object to numeric', 'Impute 11 blank spaces with 0', 'Verify no data leakage in scaling'],
        resources: [{ title: 'Data Cleaning Best Practices', url: '#' }],
        completed: false,
      },
      {
        id: 4,
        title: 'Exploratory Data Analysis & Churn Insights',
        description: 'Find key patterns: customers without tech support churn 3x more frequently.',
        checklist: ['Plot churn probability vs tenure curve', 'Analyze payment method vs churn', 'Generate pairplots of continuous features'],
        resources: [{ title: 'Seaborn Advanced Plotting', url: '#' }],
        completed: false,
      },
      {
        id: 5,
        title: 'Feature Engineering & Handling Imbalance (SMOTE)',
        description: 'Create ratio features (MonthlyCharges / TotalCharges), balance target classes with SMOTE.',
        checklist: ['Synthesize synthetic samples for minority class', 'Select top 15 features using mutual information', 'Standardize continuous variables'],
        resources: [{ title: 'Imbalanced-Learn SMOTE Documentation', url: '#' }],
        completed: false,
      },
      {
        id: 6,
        title: 'Train ML Models (Random Forest & XGBoost)',
        description: 'Train ensemble models, optimize hyper-parameters using Bayesian / Random search for ROC-AUC.',
        checklist: ['Train Logistic Regression baseline (AUC 0.78)', 'Train Random Forest (AUC 0.83)', 'Train tuned XGBoost (AUC 0.87)'],
        resources: [{ title: 'XGBoost Tuning Guide', url: '#' }],
        completed: false,
      },
      {
        id: 7,
        title: 'Model Evaluation & SHAP Explainability',
        description: 'Evaluate precision-recall trade-offs. Generate SHAP summary plots to explain model decisions.',
        checklist: ['Plot ROC and Precision-Recall Curves', 'Generate SHAP force plot for individual high-risk customer', 'Set optimal decision threshold (e.g. 0.42 instead of 0.5)'],
        resources: [{ title: 'SHAP Python Library Guide', url: '#' }],
        completed: false,
      },
      {
        id: 8,
        title: 'Build FastAPI Microservice',
        description: 'Wrap the trained model in a high-performance REST API with input validation using Pydantic.',
        checklist: ['Define CustomerProfile Pydantic schema', 'Create POST /predict_churn endpoint', 'Add health check and latency logging'],
        resources: [{ title: 'FastAPI Tutorial', url: '#' }],
        completed: false,
      },
      {
        id: 9,
        title: 'Containerize with Docker & Deploy',
        description: 'Write Dockerfile, build multi-stage image, and deploy API to cloud platform.',
        checklist: ['Write production Dockerfile', 'Test container locally on port 8000', 'Deploy and verify live endpoint'],
        resources: [{ title: 'Docker for Data Scientists', url: '#' }],
        completed: false,
      },
    ],
  },
  {
    id: 'proj-fraud-detection',
    title: 'Financial Transaction Fraud Detection',
    difficulty: 'Advanced',
    careerCategory: 'AI/ML & Data Science',
    description: 'Detect fraudulent credit card charges in real-time under extreme class imbalance (0.17% fraud rate) using Isolation Forests, Autoencoders, and Graph Networks.',
    problemStatement: 'Credit card companies process billions of transactions per day. Detecting fraudulent charges in milliseconds without declining legitimate customer purchases is crucial for security and user trust.',
    objectives: [
      'Work with highly imbalanced anonymized PCA credit card datasets',
      'Train Anomaly Detection algorithms (Isolation Forest, One-Class SVM)',
      'Build a Deep Learning Autoencoder for reconstruction error scoring',
      'Benchmark false positive cost vs financial fraud savings',
    ],
    requiredSkills: ['Python', 'Deep Learning (PyTorch)', 'Autoencoders', 'Anomaly Detection', 'Kafka', 'Redis'],
    techStack: ['PyTorch', 'Scikit-Learn', 'Kafka', 'Redis', 'FastAPI', 'Docker'],
    folderStructure: `fraud-detection-system/
├── src/
│   ├── autoencoder.py
│   ├── isolation_forest.py
│   └── streaming_listener.py
├── config.yaml
└── README.md`,
    sampleDataset: {
      name: 'creditcard_transactions.csv',
      size: '143 MB (284,807 transactions)',
      columns: ['Time', 'V1', 'V2', 'V3', 'Amount', 'Class'],
      sampleRows: [
        { Time: 0, V1: -1.3598, V2: -0.0727, V3: 2.5363, Amount: 149.62, Class: 0 },
        { Time: 1, V1: 1.1918, V2: 0.2661, V3: 0.1664, Amount: 2.69, Class: 0 },
        { Time: 406, V1: -2.3122, V2: 1.9519, V3: -1.6098, Amount: 0.00, Class: 1 },
      ],
    },
    videoTutorialTitle: 'Mastering Extreme Anomaly Detection in Finance',
    videoTutorialDuration: '1h 35m',
    steps: [
      {
        id: 1,
        title: 'Understand Asymmetric Cost Matrix',
        description: 'Understand why a False Negative (missed fraud) costs $500 while a False Positive costs $5 in customer friction.',
        checklist: ['Establish cost-sensitive evaluation metric', 'Verify class distribution (284,315 normal vs 492 fraud)', 'Configure train/val/test splits with stratification'],
        resources: [{ title: 'Cost-Sensitive Machine Learning', url: '#' }],
        completed: false,
      },
      {
        id: 2,
        title: 'Deep Autoencoder Implementation in PyTorch',
        description: 'Train an unsupervised neural network solely on legitimate transactions to reconstruct inputs. Fraudulent transactions result in high reconstruction error.',
        checklist: ['Define encoder-decoder architecture', 'Train using MSE reconstruction loss', 'Compute threshold at 99.8th percentile error'],
        resources: [{ title: 'PyTorch Autoencoders', url: '#' }],
        completed: false,
      },
    ],
  },
];

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'quiz-dsa-arrays',
    title: 'DSA Quiz — Arrays & Complexity Analysis',
    category: 'Data Structures & Algorithms',
    durationMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the time complexity of accessing an arbitrary element by its index in a contiguous dynamic array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 0,
        explanation: 'Arrays store elements in contiguous memory locations. Indexing uses direct base memory address pointer arithmetic (base + index * element_size), executing in O(1) constant time.',
        topicTag: 'Array Memory Architecture',
      },
      {
        id: 'q2',
        question: 'In the worst-case scenario, what is the time complexity of searching for an element in an unsorted array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctIndex: 2,
        explanation: 'Linear search must inspect every element from index 0 to N-1 if the target is at the end or absent, resulting in O(N) operations.',
        topicTag: 'Linear Search',
      },
      {
        id: 'q3',
        question: 'Which technique reduces the time complexity of finding a pair with a target sum in a sorted array from O(N^2) to O(N)?',
        options: ['Binary Exponentiation', 'Two-Pointer Technique', 'Prefix Tree (Trie)', 'Disjoint Set Union'],
        correctIndex: 1,
        explanation: 'The Two-Pointer approach places one pointer at the start and one at the end, shifting them inwards based on whether the current sum is less than or greater than the target.',
        topicTag: 'Two Pointers',
      },
      {
        id: 'q4',
        question: 'What is the amortized time complexity of appending an element to the end of a dynamic array (like std::vector in C++ or list in Python)?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctIndex: 0,
        explanation: 'Although array resizing requires O(N) copy operations occasionally, doubling capacity ensures that over N operations, average time per append is O(1) amortized.',
        topicTag: 'Amortized Analysis',
      },
      {
        id: 'q5',
        question: 'What is the space complexity of an in-place array reversal algorithm?',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
        correctIndex: 1,
        explanation: 'In-place reversal swaps elements between start and end pointers using a single temporary variable, utilizing O(1) auxiliary space.',
        topicTag: 'Space Complexity',
      },
    ],
  },
  {
    id: 'quiz-sql-dbms',
    title: 'SQL & DBMS Queries Quiz',
    category: 'Databases & SQL',
    durationMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: 'sql-q1',
        question: 'Which SQL clause is used to filter aggregated group records calculated by GROUP BY?',
        options: ['WHERE', 'HAVING', 'FILTER BY', 'ORDER BY'],
        correctIndex: 1,
        explanation: 'WHERE filters rows before aggregation, whereas HAVING filters grouped results after GROUP BY calculations have executed.',
        topicTag: 'SQL Aggregations',
      },
      {
        id: 'sql-q2',
        question: 'Which Normal Form eliminates transitive functional dependencies on non-prime attributes?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctIndex: 2,
        explanation: 'Third Normal Form (3NF) requires 2NF plus ensuring that no non-prime attribute is transitively dependent on the primary key.',
        topicTag: 'Database Normalization',
      },
      {
        id: 'sql-q3',
        question: 'What does the ACID property "Isolation" ensure in a relational database?',
        options: [
          'Transactions survive hardware crashes',
          'Concurrent transactions do not interfere with each other',
          'All changes in a transaction are committed or all rolled back',
          'Data follows relational schema constraints',
        ],
        correctIndex: 1,
        explanation: 'Isolation ensures that the concurrent execution of transactions leaves the database in the same state as if they were executed serially.',
        topicTag: 'ACID Properties',
      },
    ],
  },
  {
    id: 'quiz-ml',
    title: 'Machine Learning Concepts & Algorithms',
    category: 'AI / Machine Learning',
    durationMinutes: 12,
    passingScore: 70,
    questions: [
      {
        id: 'ml-q1',
        question: 'What happens to the model when the Bias is very high and Variance is very low?',
        options: ['Overfitting', 'Underfitting', 'Optimal generalization', 'Gradient Explosion'],
        correctIndex: 1,
        explanation: 'High bias implies the model makes oversimplified assumptions about the data structure, leading to underfitting both training and testing datasets.',
        topicTag: 'Bias-Variance Tradeoff',
      },
      {
        id: 'ml-q2',
        question: 'Which evaluation metric is most critical when diagnosing rare diseases with severe penalties for false negatives?',
        options: ['Accuracy', 'Precision', 'Recall (Sensitivity)', 'Specificity'],
        correctIndex: 2,
        explanation: 'Recall measures the proportion of actual positives correctly identified (TP / (TP + FN)). Missing a sick patient is catastrophic, making high recall vital.',
        topicTag: 'Evaluation Metrics',
      },
      {
        id: 'ml-q3',
        question: 'What is the role of the learning rate parameter (alpha) in Gradient Descent optimization?',
        options: [
          'Determines the size of the weight update step taken towards the minimum of the loss function',
          'Defines the number of layers in a neural network',
          'Specifies the percentage of data used for testing',
          'Calculates the correlation coefficient between features',
        ],
        correctIndex: 0,
        explanation: 'The learning rate scales the gradient vector: a rate too high causes oscillation or divergence, while a rate too small converges sluggishly.',
        topicTag: 'Optimization Algorithms',
      },
    ],
  },
];

export const INITIAL_USER: UserProfile = {
  id: 'usr_rahul_9921',
  fullName: 'Areeba Khan',
  email: 'areebakhan28238@gmail.com',
  phone: '+91 98765 43210',
  college: 'Delhi Technological University',
  university: 'Delhi Technological University',
  branch: 'Computer Science & Engineering',
  currentYear: '2nd Year',
  currentSemester: 'Semester 4',
  targetCareer: 'Data Scientist',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  bio: 'B.Tech CSE student passionate about statistical machine learning, predictive analytics, and building scalable data systems.',
  dailyStudyTime: '2 hours',
  skills: [
    { name: 'Python', category: 'Programming', score: 82, level: 'Advanced' },
    { name: 'SQL', category: 'Database', score: 44, level: 'Beginner' },
    { name: 'DSA', category: 'DSA', score: 63, level: 'Intermediate' },
    { name: 'Statistics & Probability', category: 'AI/ML', score: 51, level: 'Intermediate' },
    { name: 'Machine Learning', category: 'AI/ML', score: 31, level: 'Beginner' },
    { name: 'DBMS', category: 'Database', score: 70, level: 'Intermediate' },
    { name: 'Web Fundamentals', category: 'Web', score: 65, level: 'Intermediate' },
    { name: 'Git & GitHub', category: 'Core CS', score: 75, level: 'Intermediate' },
  ],
  roadmapProgress: 45,
  careerReadinessScore: 68,
  learningStreak: 7,
  xp: 840,
  badges: [
    { id: 'b1', title: 'Python Prodigy', description: 'Scored 80%+ on Python assessment', icon: 'Code', unlockedAt: '2026-09-15' },
    { id: 'b2', title: 'DSA Starter', description: 'Solved your first 10 data structures problems', icon: 'Award', unlockedAt: '2026-09-22' },
    { id: 'b3', title: '7-Day Streak', description: 'Maintained uninterrupted daily study momentum', icon: 'Flame', unlockedAt: '2026-10-06' },
    { id: 'b4', title: 'SQL Explorer', description: 'Completed database fundamentals course', icon: 'Database', unlockedAt: '2026-09-28' },
    { id: 'b5', title: 'Project Builder', description: 'Initiated first machine learning capstone', icon: 'Sparkles', unlockedAt: '2026-10-02' },
    { id: 'b6', title: 'Quiz Master', description: 'Achieved high marks across consecutive quizzes', icon: 'CheckCircle', unlockedAt: '2026-10-04' },
  ],
  completedCourses: ['course-python'],
  completedChapters: ['py-chap-1', 'py-chap-2', 'ml-chap-1', 'ml-chap-2'],
  completedProjects: ['proj-student-perf'],
  solvedProblems: ['prob-two-sum', 'prob-valid-parentheses'],
  quizScores: {
    'quiz-dsa-arrays': 80,
    'quiz-sql-dbms': 66,
  },
  videoProgress: {
    'ml-chap-1': 100,
    'ml-chap-2': 100,
    'ml-chap-3': 60,
  },
  videoTimestamps: {
    'ml-chap-1': 860,
    'ml-chap-2': 1005,
    'ml-chap-3': 459, // 7m 39s out of 12m 45s (60%)
  },
  resumeLearning: {
    courseId: 'course-ml',
    chapterId: 'ml-chap-3',
    chapterTitle: 'Linear & Logistic Regression',
    courseTitle: 'Machine Learning Fundamentals',
    timestampSeconds: 459,
    totalDurationSeconds: 765,
    percentageWatched: 60,
    lastWatchedAt: '2026-10-08T06:10:00.000Z',
  },
  certificates: [
    {
      id: 'cert-python-101',
      title: 'Python for Data Science & Engineering',
      courseId: 'course-python',
      issueDate: '2026-09-30',
      credentialId: 'RAAH-CERT-882194',
      grade: '92% Distinction',
    },
  ],
  createdAt: '2026-08-01T10:00:00.000Z',
  updatedAt: '2026-10-08T06:10:00.000Z',
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Streak Active! 🔥',
    message: 'You have a 7-day study streak. Complete today’s SQL lesson to keep the fire burning!',
    time: '2 hours ago',
    read: false,
    type: 'streak',
  },
  {
    id: 'n2',
    title: 'Career Readiness +8% 🚀',
    message: 'Your Career Readiness Score increased from 60% to 68% after completing DSA problems.',
    time: 'Yesterday',
    read: false,
    type: 'career',
  },
  {
    id: 'n3',
    title: 'Skill Gap Recommendation 💡',
    message: 'Target role Data Scientist requires strong SQL. Start the "SQL JOINs" module today.',
    time: '2 days ago',
    read: true,
    type: 'recommendation',
  },
];
