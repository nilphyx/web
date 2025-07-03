import { Course, Quiz } from "@/lib/types";

export const quizzes: Quiz[] = [
  {
    id: "quiz-intro-ai-1",
    courseId: "intro-to-ai",
    moduleId: "intro-ai-m1",
    lessonId: "intro-ai-m1-l3",
    title: "AI Fundamentals Quiz",
    questions: [
      {
        id: "q1",
        text: "What does AI stand for?",
        type: "multiple-choice",
        options: [
          { id: "opt1", text: "Artificial Intelligence" },
          { id: "opt2", text: "Automated Interaction" },
          { id: "opt3", text: "Advanced Internet" },
        ],
        correctAnswer: "opt1",
      },
      {
        id: "q2",
        text: "Machine Learning is a subset of AI.",
        type: "true-false",
        correctAnswer: "true",
      },
      {
        id: "q3",
        text: "What is a common application of Natural Language Processing?",
        type: "short-answer",
        correctAnswer: "Chatbots",
      },
    ],
  },
  {
    id: "quiz-ml-basics-1",
    courseId: "machine-learning-basics",
    moduleId: "ml-basics-m1",
    lessonId: "ml-basics-m1-l3",
    title: "Machine Learning Concepts Quiz",
    questions: [
      {
        id: "q1",
        text: "Which of these is a type of supervised learning?",
        type: "multiple-choice",
        options: [
          { id: "opt1", text: "Clustering" },
          { id: "opt2", text: "Regression" },
          { id: "opt3", text: "Dimensionality Reduction" },
        ],
        correctAnswer: "opt2",
      },
      {
        id: "q2",
        text: "Overfitting occurs when a model performs well on training data but poorly on unseen data.",
        type: "true-false",
        correctAnswer: "true",
      },
    ],
  },
];

export const courses: Course[] = [];
// [
//   {
//     id: "c8a5d9c3-d3cf-4aa3-879e-86bbfd6cfa8a",
//     slug: "intro-to-ai",
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "Understand the fundamentals of AI, its history, and various applications.",
//     longDescription:
//       "This course provides a comprehensive overview of Artificial Intelligence, covering key concepts, historical milestones, and the impact of AI across different industries. Students will explore various subfields of AI including machine learning, natural language processing, computer vision, and robotics. No prior programming experience is required.",
//     instructor: "Dr. AI Expert",
//     category: "Artificial Intelligence",
//     tags: ["AI", "Beginner", "Fundamentals"],
//     imageUrl: "https://picsum.photos/seed/ai/600/400",
//     difficulty: "Beginner",
//     prerequisites: ["None"],
//     learningOutcomes: [
//       "Define Artificial Intelligence and its main goals.",
//       "Describe the history and evolution of AI.",
//       "Identify different types of AI and their applications.",
//       "Understand basic concepts of machine learning and neural networks.",
//     ],
//     estimatedDuration: "8 hours",
//     modules: [
//       {
//         id: "intro-ai-m1",
//         title: "Module 1: What is AI?",
//         lessons: [
//           {
//             id: "intro-ai-m1-l1",
//             title: "Defining Intelligence",
//             content:
//               "Exploring various definitions of intelligence, both human and artificial.",
//             type: "text",
//           },
//           {
//             id: "intro-ai-m1-l2",
//             title: "History of AI",
//             content: "A journey through the milestones of AI development.",
//             type: "video",
//             videoId: "zL5jueGL1ys",
//           },
//           {
//             id: "intro-ai-m1-l3",
//             title: "AI Concepts Quiz",
//             content: "Test your understanding of AI fundamentals.",
//             type: "quiz",
//             quizId: "quiz-intro-ai-1",
//           },
//         ],
//       },
// {
//   id: "intro-ai-m2",
//   title: "Module 2: Types of AI",
//   lessons: [
// {
//   id: "intro-ai-m2-l1",
//   title: "Narrow vs. General AI",
//   content: "Understanding the difference between ANI, AGI, and ASI.",
//   type: "text",
// },
//     {
//       id: "intro-ai-m2-l2",
//       title: "Machine Learning Overview",
//       content: "Introduction to machine learning concepts.",
//       type: "text",
//     },
//   ],
// },
//     ],
//   },
//   {
//     id: "ff680437-bb41-4d86-b67b-5e2976e1875a",
//     slug: "machine-learning-basics",
//     title: "Machine Learning for Beginners",
//     description:
//       "Learn the core concepts of machine learning, including supervised and unsupervised learning.",
//     longDescription:
//       "Dive into the world of Machine Learning! This course is designed for beginners and covers essential algorithms, techniques, and practical applications. You will learn about supervised learning (regression, classification), unsupervised learning (clustering), and model evaluation.",
//     instructor: "Prof. ML Guru",
//     category: "Machine Learning",
//     tags: ["ML", "Beginner", "Algorithms"],
//     imageUrl: "https://picsum.photos/seed/ml/600/400",
//     difficulty: "Beginner",
//     prerequisites: [
//       "Basic understanding of programming (Python recommended but not mandatory)",
//     ],
//     learningOutcomes: [
//       "Understand the core principles of Machine Learning.",
//       "Differentiate between supervised and unsupervised learning.",
//       "Implement basic ML algorithms.",
//       "Evaluate the performance of ML models.",
//     ],
//     estimatedDuration: "12 hours",
//     modules: [
//       {
//         id: "ml-basics-m1",
//         title: "Module 1: Introduction to ML",
//         lessons: [
//           {
//             id: "ml-basics-m1-l1",
//             title: "What is Machine Learning?",
//             content: "Defining ML and its relevance.",
//             type: "text",
//           },
//           {
//             id: "ml-basics-m1-l2",
//             title: "Types of ML Problems",
//             content: "Classification, Regression, Clustering.",
//             type: "video",
//             videoId: "KNAWp2S3w94",
//           },
//           {
//             id: "ml-basics-m1-l3",
//             title: "ML Concepts Quiz",
//             content: "Test your understanding of ML concepts.",
//             type: "quiz",
//             quizId: "quiz-ml-basics-1",
//           },
//         ],
//       },
//       {
//         id: "ml-basics-m2",
//         title: "Module 2: Supervised Learning",
//         lessons: [
//           {
//             id: "ml-basics-m2-l1",
//             title: "Linear Regression",
//             content: "Understanding and implementing linear regression.",
//             type: "text",
//           },
//           {
//             id: "ml-basics-m2-l2",
//             title: "Logistic Regression",
//             content: "For classification problems.",
//             type: "text",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "6f916a47-b7c2-4d10-97df-6093fa624f8e",
//     slug: "deep-learning-fundamentals",
//     title: "Deep Learning Fundamentals",
//     description:
//       "Explore neural networks, backpropagation, and popular deep learning frameworks.",
//     longDescription:
//       "Uncover the power of Deep Learning. This course covers the foundational concepts of neural networks, including activation functions, backpropagation, and convolutional neural networks (CNNs) for image processing, and recurrent neural networks (RNNs) for sequence data. Hands-on examples using popular frameworks like TensorFlow or PyTorch will be introduced.",
//     instructor: "Dr. Neural Net",
//     category: "Deep Learning",
//     tags: ["DL", "Intermediate", "Neural Networks"],
//     imageUrl: "https://picsum.photos/seed/dl/600/400",
//     difficulty: "Intermediate",
//     prerequisites: [
//       "Machine Learning Basics",
//       "Python programming proficiency",
//     ],
//     learningOutcomes: [
//       "Understand the architecture of neural networks.",
//       "Explain the process of training a deep learning model.",
//       "Implement CNNs and RNNs for specific tasks.",
//       "Get familiar with at least one deep learning framework.",
//     ],
//     estimatedDuration: "20 hours",
//     modules: [
//       {
//         id: "dl-fund-m1",
//         title: "Module 1: Introduction to Neural Networks",
//         lessons: [
//           {
//             id: "dl-fund-m1-l1",
//             title: "The Neuron Model",
//             content: "From biological to artificial neurons.",
//             type: "text",
//           },
//           {
//             id: "dl-fund-m1-l2",
//             title: "Activation Functions",
//             content: "Sigmoid, ReLU, Tanh, etc.",
//             type: "video",
//             videoId: "aircAruvnKk",
//           },
//         ],
//       },
//       {
//         id: "dl-fund-m2",
//         title: "Module 2: Training Neural Networks",
//         lessons: [
//           {
//             id: "dl-fund-m2-l1",
//             title: "Loss Functions",
//             content: "Measuring model performance.",
//             type: "text",
//           },
//           {
//             id: "dl-fund-m2-l2",
//             title: "Backpropagation",
//             content: "The core algorithm for training.",
//             type: "text",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "486e2d5f-e617-4f08-9d46-f4198e8d206a",
//     slug: "nlp-with-transformers",
//     title: "Natural Language Processing with Transformers",
//     description: "Learn about cutting-edge NLP models like BERT and GPT.",
//     longDescription:
//       "This advanced course delves into modern Natural Language Processing techniques, focusing on the Transformer architecture and its variants like BERT, GPT, and T5. You will learn about attention mechanisms, pre-training, fine-tuning, and applying these models to tasks like text classification, question answering, and text generation.",
//     instructor: "Dr. Lingua AI",
//     category: "Natural Language Processing",
//     tags: ["NLP", "Advanced", "Transformers", "BERT", "GPT"],
//     imageUrl: "https://picsum.photos/seed/nlp/600/400",
//     difficulty: "Advanced",
//     prerequisites: [
//       "Deep Learning Fundamentals",
//       "Python programming",
//       "Basic understanding of NLP concepts",
//     ],
//     learningOutcomes: [
//       "Understand the Transformer architecture and attention mechanisms.",
//       "Explain pre-training and fine-tuning of large language models.",
//       "Apply Transformer models to various NLP tasks.",
//       "Stay updated with the latest advancements in NLP.",
//     ],
//     estimatedDuration: "25 hours",
//     modules: [
//       {
//         id: "nlp-trans-m1",
//         title: "Module 1: Foundations of NLP & Attention",
//         lessons: [
//           {
//             id: "nlp-trans-m1-l1",
//             title: "Recap: Traditional NLP",
//             content: "From Bag-of-Words to RNNs/LSTMs.",
//             type: "text",
//           },
//           {
//             id: "nlp-trans-m1-l2",
//             title: "The Attention Mechanism",
//             content: "The key innovation leading to Transformers.",
//             type: "video",
//             videoId: "t_pP4Tj9L3s",
//           },
//         ],
//       },
//       {
//         id: "nlp-trans-m2",
//         title: "Module 2: The Transformer Architecture",
//         lessons: [
//           {
//             id: "nlp-trans-m2-l1",
//             title: "Encoder-Decoder Structure",
//             content: "Dissecting the Transformer model.",
//             type: "text",
//           },
//           {
//             id: "nlp-trans-m2-l2",
//             title: "BERT and its Variants",
//             content:
//               "Understanding Bidirectional Encoder Representations from Transformers.",
//             type: "text",
//           },
//         ],
//       },
//     ],
//   },
// ];
