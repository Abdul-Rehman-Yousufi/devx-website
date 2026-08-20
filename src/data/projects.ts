export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type?: string;
  badge?: string;
  status?: string;
  github?: string;
  live?: string;
  color: string;
  image: string;
  featured?: boolean;
  layoutSize: 'hero' | 'wide' | 'standard';

  // Case Study Extensions
  caseStudy: {
    challenge: string;
    solution: string;
    technicalBreakdown: {
      feature: string;
      insight: string;
      codeSnippet?: string;
    }[];
    outcomes: string[];
    gallery: string[];
  };
}

export const projects: Project[] = [
  {
    id: "fitnesspro-gym",
    title: "FitnessPro - Gym Management System",
    description: "A complete gym management system featuring Admin, Trainer, and Member portals with membership management, attendance tracking, workout plans, diet plans, and secure authentication.",
    tech: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript", "Bootstrap"],
    type: "Full Stack Web Application",
    color: "#3b82f6",
    live: "https://fitnesspro.pythonanywhere.com/",
    github: "https://github.com/FAHAD-ALI-github/FitnessPro",
    image: "/images/projects/GymManagementSystem.jpeg",
    featured: true,
    layoutSize: 'hero',
    caseStudy: {
      challenge: "Managing a gym involves juggling multiple portals for admins, trainers, and members, often leading to disconnected systems.",
      solution: "Developed a centralized Django application that integrates membership tracking, attendance, and personalized diet/workout plans securely.",
      technicalBreakdown: [
        {
          feature: "Role-Based Portals",
          insight: "Implemented strict role-based access control (RBAC) separating Admin, Trainer, and Member functionality.",
        }
      ],
      outcomes: [
        "Streamlined gym operations and member tracking.",
        "Secure and efficient authentication system."
      ],
      gallery: []
    }
  },
  {
    id: "fitnesspro-exercise",
    title: "FitnessPro - Exercise Platform",
    description: "A modern fitness platform where registered users can search exercises, learn proper techniques, view target muscles, equipment, and detailed exercise instructions.",
    tech: ["React", "Django REST Framework", "Clerk Authentication", "ExerciseDB API"],
    type: "React + Django REST Application",
    color: "#10b981",
    live: "https://fitnesspro-fahad.vercel.app/",
    github: "https://github.com/FAHAD-ALI-github/reactjs-fitnesspro",
    image: "/images/projects/Exerciseswebapp.jpeg",
    featured: true,
    layoutSize: 'wide',
    caseStudy: {
      challenge: "Users needed a centralized platform to discover new exercises with detailed instructional guides and target muscle data.",
      solution: "Built a responsive React frontend powered by a Django REST backend and integrated with the ExerciseDB API for comprehensive data.",
      technicalBreakdown: [
        {
          feature: "External API Integration",
          insight: "Seamlessly integrated the ExerciseDB API to fetch and display high-quality exercise data with optimized caching.",
        }
      ],
      outcomes: [
        "Access to a vast database of exercises with visual guides.",
        "Secure user sessions using Clerk Authentication."
      ],
      gallery: []
    }
  },
  {
    id: "whatsapp-flightchatbot",
    title: "Whatsapp - FlightChatbot",
    description: "A conversational WhatsApp chatbot that helps users search flights using natural language and real-time flight information.",
    tech: ["Python", "Flask", "Twilio API", "AviationStack API", "Hugging Face API"],
    type: "AI Chatbot",
    color: "#8b5cf6",
    github: "https://github.com/FAHAD-ALI-github/FlightChatbot_v1",
    image: "/images/projects/flightchatbot.png",
    featured: true,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Flight search processes are often tedious and require navigating complex UI flows.",
      solution: "Engineered a WhatsApp-based conversational bot that parses natural language inputs to query real-time flight data.",
      technicalBreakdown: [
        {
          feature: "Natural Language Processing",
          insight: "Utilized Hugging Face API to understand user intent and extract origin/destination entities from chat messages.",
        }
      ],
      outcomes: [
        "Enabled seamless flight searches directly from WhatsApp.",
        "Real-time data synchronization with AviationStack."
      ],
      gallery: []
    }
  },
  {
    id: "terastore",
    title: "TeraStore",
    description: "A modern e-commerce platform with secure authentication, product browsing, shopping cart, and order management.",
    tech: ["React", "Django REST Framework", "Clerk Authentication", "JavaScript"],
    type: "Full Stack E-Commerce",
    color: "#f59e0b",
    live: "https://tera-tech-store.vercel.app/",
    github: "https://github.com/FAHAD-ALI-github/TeraStore-frontend",
    image: "/images/projects/ecommerce.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Building a scalable e-commerce platform requires robust state management and secure transaction flows.",
      solution: "Developed a decoupled architecture with a React frontend and a Django REST API, implementing robust shopping cart logic.",
      technicalBreakdown: [
        {
          feature: "Shopping Cart State Management",
          insight: "Managed complex client-side state for the shopping cart while keeping it synchronized with the server.",
        }
      ],
      outcomes: [
        "Smooth product browsing and checkout experience.",
        "Secure authentication integrated via Clerk."
      ],
      gallery: []
    }
  },
  {
    id: "shadowlink",
    title: "ShadowLink Chat Application",
    description: "A desktop chat application supporting messaging, private chats, groups, file sharing, voice calls, and video calls.",
    tech: ["Python", "Socket Programming", "Tkinter", "OpenCV", "PyAudio"],
    type: "Networking Application",
    color: "#ec4899",
    github: "https://github.com/FAHAD-ALI-github/ShadowLink-ChatApplication",
    image: "/images/projects/chatApp.png",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Real-time communication requires low latency and handling multiple concurrent multimedia streams.",
      solution: "Utilized Python socket programming combined with OpenCV and PyAudio to create a multi-threaded desktop application.",
      technicalBreakdown: [
        {
          feature: "Multimedia Streaming",
          insight: "Implemented UDP/TCP socket combinations to efficiently transmit audio and video data in real-time.",
        }
      ],
      outcomes: [
        "Functional desktop application with voice and video capabilities.",
        "Support for group and private messaging."
      ],
      gallery: []
    }
  },
  {
    id: "learn-python",
    title: "Learn Python With Fahad",
    description: "An interactive platform designed to teach Python programming through structured lessons and practical examples.",
    tech: ["Python", "Jupyter Book", "HTML", "CSS"],
    type: "Educational Platform",
    color: "#3b82f6",
    live: "https://fahad-ali-github.github.io/Learn-Python-With-Fahad/intro.html",
    github: "https://github.com/FAHAD-ALI-github/Learn-Python-With-Fahad",
    image: "/images/projects/learnpython.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Creating an engaging, easily readable format for programming tutorials and code examples.",
      solution: "Leveraged Jupyter Book to compile interactive Python notebooks into a clean, navigable static website.",
      technicalBreakdown: [
        {
          feature: "Interactive Code Blocks",
          insight: "Compiled Jupyter environments into static HTML while preserving the structure and readability of the code.",
        }
      ],
      outcomes: [
        "A highly accessible educational resource for beginners.",
        "Seamless deployment via GitHub Pages."
      ],
      gallery: []
    }
  },
  {
    id: "context-maker",
    title: "Context Maker for AI",
    description: "A desktop utility that combines multiple project files into a single AI-ready context document for faster development.",
    tech: ["Python", "Tkinter"],
    type: "Developer Productivity Tool",
    color: "#14b8a6",
    github: "https://github.com/FAHAD-ALI-github/context_maker_for-AI",
    image: "/images/projects/contextmaker.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Feeding large codebases into AI models manually is tedious and error-prone.",
      solution: "Created a desktop GUI tool that concatenates and formats project files into a single, structured markdown file.",
      technicalBreakdown: [
        {
          feature: "File Traversal Algorithm",
          insight: "Implemented an efficient directory traversal method that respects ignore patterns and formats code with language tags.",
        }
      ],
      outcomes: [
        "Drastically reduced the time required to prep code for LLM context windows.",
        "Simple and intuitive Tkinter interface."
      ],
      gallery: []
    }
  },
  {
    id: "expertskills",
    title: "ExpertSkills",
    description: "An online learning platform for managing courses, lessons, instructors, and student progress.",
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    type: "E-Learning Platform",
    color: "#f43f5e",
    live: "https://expertskills.pythonanywhere.com/",
    github: "https://github.com/FAHAD-ALI-github/expertskills",
    image: "/images/projects/learningplatform.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "E-learning platforms need complex relationship management between courses, students, and instructors.",
      solution: "Built a robust relational database model using Django's ORM to seamlessly manage the educational ecosystem.",
      technicalBreakdown: [
        {
          feature: "Progress Tracking",
          insight: "Implemented customized Django views and models to track individual student progress across various lesson modules.",
        }
      ],
      outcomes: [
        "Comprehensive dashboard for both instructors and students.",
        "Reliable deployment on PythonAnywhere."
      ],
      gallery: []
    }
  },
  {
    id: "social-media-app",
    title: "Social Media App",
    description: "A social networking platform with authentication, user profiles, posts, likes, comments, and interactions.",
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    type: "Full Stack Web Application",
    color: "#8b5cf6",
    live: "https://fahadwebdev.pythonanywhere.com",
    github: "https://github.com/FAHAD-ALI-github/social_media_project",
    image: "/images/projects/socialMedia.png",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Social networks require efficient querying for timelines, relationships (followers), and interactive features like likes.",
      solution: "Utilized Django's powerful templating and ORM to build a responsive, interactive platform handling complex user relationships.",
      technicalBreakdown: [
        {
          feature: "Feed Generation Algorithm",
          insight: "Optimized database queries to efficiently construct user timelines based on follower relationships.",
        }
      ],
      outcomes: [
        "Fully functional social networking feature set.",
        "Engaging and responsive user interface."
      ],
      gallery: []
    }
  },
  {
    id: "flask-news",
    title: "Flask News App",
    description: "A news application that fetches and displays the latest headlines using external news APIs.",
    tech: ["Python", "Flask", "News API"],
    type: "Web Application",
    color: "#0ea5e9",
    live: "https://fahadali1.pythonanywhere.com/",
    github: "https://github.com/FAHAD-ALI-github/flask-news-app",
    image: "/images/projects/newsapp.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Presenting real-time news data cleanly while handling potential API rate limits or downtime.",
      solution: "Built a lightweight Flask application that acts as a proxy and formatter for the News API data.",
      technicalBreakdown: [
        {
          feature: "API Integration & Templating",
          insight: "Used Jinja2 templates to dynamically render news cards from the JSON payload returned by the external API.",
        }
      ],
      outcomes: [
        "Fast, reliable access to global headlines.",
        "Clean, distraction-free reading interface."
      ],
      gallery: []
    }
  },
  {
    id: "todo-list",
    title: "ToDo List",
    description: "A task management application for organizing, tracking, and managing daily activities.",
    tech: ["Python", "Django"],
    type: "Task Management",
    color: "#eab308",
    live: "https://fahad-ali-github.github.io/ToDoList/",
    github: "https://github.com/FAHAD-ALI-github/ToDoList",
    image: "/images/projects/todoapp.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Building a reliable, accessible interface for daily task management.",
      solution: "Created a straightforward CRUD application utilizing Django's generic views for rapid development and reliability.",
      technicalBreakdown: [
        {
          feature: "CRUD Operations",
          insight: "Leveraged Django's built-in forms and models to securely handle Create, Read, Update, and Delete operations.",
        }
      ],
      outcomes: [
        "An intuitive organizational tool for daily use.",
        "Solid foundation for understanding MVC architectures."
      ],
      gallery: []
    }
  },
  {
    id: "ml-app",
    title: "Machine Learning App",
    description: "A web application that allows users to train, evaluate, and interact with machine learning models through a simple interface.",
    tech: ["Python", "Streamlit", "Scikit-learn", "Pandas"],
    type: "Machine Learning",
    color: "#22c55e",
    live: "https://machinelearning-app.streamlit.app/",
    github: "https://github.com/FAHAD-ALI-github/MachineLearning-WebApp-For-Data-Analysis",
    image: "/images/projects/mlapp.png",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Making machine learning models accessible to non-technical users without requiring them to write code.",
      solution: "Used Streamlit to wrap Scikit-learn models into an interactive, parameter-tweakable web interface.",
      technicalBreakdown: [
        {
          feature: "Interactive Model Parameters",
          insight: "Connected Streamlit UI widgets directly to Scikit-learn model hyperparameters, allowing real-time re-training.",
        }
      ],
      outcomes: [
        "Democratized access to basic machine learning capabilities.",
        "Instant visual feedback on model performance metrics."
      ],
      gallery: []
    }
  },
  {
    id: "data-analysis",
    title: "Data Analysis App",
    description: "A data analysis application for exploring datasets, generating visualizations, and extracting insights.",
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    type: "Data Science",
    color: "#6366f1",
    live: "https://dataanalysis--app.streamlit.app/",
    github: "https://github.com/FAHAD-ALI-github/DataAnalysisApp--Streamlit",
    image: "/images/projects/dataAnalysis.png",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Providing a quick, visually appealing way to perform exploratory data analysis (EDA) without setting up Jupyter environments.",
      solution: "Developed a Streamlit dashboard that ingests CSVs and automatically generates statistical summaries and plots.",
      technicalBreakdown: [
        {
          feature: "Dynamic Visualizations",
          insight: "Integrated Pandas and Matplotlib to dynamically generate charts based on user-selected columns and data types.",
        }
      ],
      outcomes: [
        "Reduced time-to-insight for raw datasets.",
        "Highly interactive and responsive data exploration."
      ],
      gallery: []
    }
  },
  {
    id: "bg-remover",
    title: "Background Remover",
    description: "An AI-powered web application that removes image backgrounds automatically.",
    tech: ["Python", "Streamlit", "OpenCV"],
    type: "AI Image Processing",
    color: "#a855f7",
    live: "https://bgremove-app.streamlit.app/",
    github: "https://github.com/FAHAD-ALI-github/BgRemoveApp--Streamlit",
    image: "/images/projects/bgremove.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Automating the complex task of foreground extraction with high accuracy.",
      solution: "Integrated advanced computer vision techniques and wrapped them in a simple Streamlit UI for drag-and-drop processing.",
      technicalBreakdown: [
        {
          feature: "Computer Vision Pipeline",
          insight: "Utilized OpenCV to process images, identifying contours and separating the subject from the background.",
        }
      ],
      outcomes: [
        "Provided a rapid tool for generating transparent PNGs.",
        "Accessible, one-click interface for a complex operation."
      ],
      gallery: []
    }
  },
  {
    id: "dynamic-calculator",
    title: "Dynamic Calculator",
    description: "A desktop calculator supporting dynamic mathematical operations with a user-friendly interface.",
    tech: ["Python"],
    type: "Desktop Application",
    color: "#64748b",
    live: "https://fahad-ali-github.github.io/scientific-calculator/",
    github: "https://github.com/FAHAD-ALI-github/scientific-calculator",
    image: "/images/projects/calculator.jpeg",
    featured: false,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Creating an error-free, responsive calculator capable of parsing complex mathematical expressions.",
      solution: "Built a Python-based application focusing on robust input validation and evaluation techniques.",
      technicalBreakdown: [
        {
          feature: "Expression Parsing",
          insight: "Implemented safe evaluation methods to accurately calculate results while preventing injection or execution errors.",
        }
      ],
      outcomes: [
        "A reliable and lightweight desktop utility.",
        "Smooth user experience for both simple and scientific calculations."
      ],
      gallery: []
    }
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    description: "A premium, cross-platform project coordination platform designed to help teams track progress, share workloads, and collaborate seamlessly.",
    tech: ["React Native", "PHP", "MySQL", "Android"],
    type: "Cross-Platform Application",
    color: "#6366f1",
    image: "/images/projects/Task Flow/WhatsApp Image 2026-08-18 at 11.14.34 PM.jpeg",
    featured: true,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Teams needed 100% feature and data parity between a Web Dashboard and a native Mobile Application.",
      solution: "Engineered a centralized PHP/MySQL REST API that securely powers both the server-rendered web app and the React Native mobile client.",
      technicalBreakdown: [
        {
          feature: "Unified Architecture",
          insight: "Migrated away from Expo Go and generated custom Android .apk builds locally to support advanced libraries like react-native-reanimated."
        },
        {
          feature: "Advanced RBAC",
          insight: "Implemented strict Role-Based Access Control to ensure projects and tasks are completely sandboxed to approved collaborators."
        }
      ],
      outcomes: [
        "Cross-Platform File Management with secure multipart uploading.",
        "Premium Glassmorphism design system featuring dark mode aesthetics."
      ],
      gallery: [
        "/images/projects/Task Flow/WhatsApp Image 2026-08-18 at 11.14.34 PM (1).jpeg",
        "/images/projects/Task Flow/WhatsApp Image 2026-08-18 at 11.14.36 PM.jpeg",
        "/images/projects/Task Flow/WhatsApp Image 2026-08-18 at 11.14.36 PM (1).jpeg"
      ]
    }
  },
  {
    id: "enterprise-erp",
    title: "Enterprise ERP System",
    description: "Next-generation enterprise management platform centralizing Human Resources, Payroll, Finance, and Operations into one intelligent ecosystem.",
    tech: ["React", "SaaS", "AI Assistant", "Cloud"],
    type: "Enterprise SaaS",
    color: "#0ea5e9",
    image: "/images/projects/Erp/WhatsApp Image 2026-08-18 at 11.14.27 PM.jpeg",
    featured: true,
    layoutSize: 'wide',
    caseStudy: {
      challenge: "Enterprises face bottlenecks, compliance risks, and fragmented spreadsheets managing HR and Operations.",
      solution: "Completely reimagined enterprise management with a blazing-fast React frontend and cloud-deployed ecosystem.",
      technicalBreakdown: [
        {
          feature: "Agentic AI Assistant",
          insight: "Integrated an AI widget allowing users to ask questions like 'Who has an expiring Iqama?' and get instant, data-backed answers."
        },
        {
          feature: "Integrated Modules",
          insight: "Centralized HR, Payroll processing workflows, Inventory management, POS, and EOD reconciliation."
        }
      ],
      outcomes: [
        "Automated Compliance Alert Center for expirations.",
        "Scalable architecture ready for construction, retail, or corporate services."
      ],
      gallery: [
        "/images/projects/Erp/WhatsApp Image 2026-08-18 at 11.14.27 PM (1).jpeg",
        "/images/projects/Erp/WhatsApp Image 2026-08-18 at 11.14.28 PM.jpeg",
        "/images/projects/Erp/WhatsApp Image 2026-08-18 at 11.14.28 PM (1).jpeg"
      ]
    }
  },
  {
    id: "autonomous-outreach",
    title: "Autonomous Outreach & CRM engine",
    description: "A fully autonomous, AI-powered Outreach & CRM engine built entirely in n8n for scaling B2B outreach with hyper-personalization.",
    tech: ["n8n", "OpenAI", "Google Sheets", "NeverBounce API"],
    type: "Automation & CRM",
    color: "#ec4899",
    image: "/images/projects/Outreach & CRM.jpeg",
    featured: true,
    layoutSize: 'standard',
    caseStudy: {
      challenge: "Traditional cold email tools lacked the intelligence to scale B2B outreach with required hyper-personalization and strict sender protection.",
      solution: "Built an autonomous n8n engine featuring deep web scraping, AI Context Engine via GPT-4o-mini, and a custom Google Sheets CRM.",
      technicalBreakdown: [
        {
          feature: "Deep Web Scraping & AI Context Engine",
          insight: "Actively navigates nested directories to hunt down decision-makers, analyzing programs to dynamically write highly personalized emails."
        },
        {
          feature: "Reputation Protection & Inbox Monitoring",
          insight: "Integrates NeverBounce for real-time verification and a secondary n8n workflow monitoring the Outlook inbox 24/7 for sentiment analysis."
        }
      ],
      outcomes: [
        "100% of emails routed to Outlook Drafts for final human review.",
        "System handles research, writing, and pipeline management on autopilot."
      ],
      gallery: []
    }
  }
];
