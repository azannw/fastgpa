const curriculumData = {
  CS: {
    name: "BS Computer Science",
    totalCredits: 137,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "CL1000", name: "Introduction to ICT", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" },
        { code: "CL1002", name: "Programming Fundamentals - Lab", credits: 1, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "EE1005", name: "Digital Logic Design", credits: 3, type: "Core" },
        { code: "EL1005", name: "Digital Logic Design - Lab", credits: 1, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SL1014", name: "Expository Writing - Lab", credits: 1, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "CS1004", name: "Object Oriented Programming", credits: 3, type: "Core" },
        { code: "CL1004", name: "Object Oriented Programming - Lab", credits: 1, type: "Core" }
      ],
      3: [
        { code: "EE2003", name: "Computer Organization and Assembly Language", credits: 3, type: "Core" },
        { code: "EL2003", name: "Computer Organization and Assembly Language - Lab", credits: 1, type: "Core" },
        { code: "CS2001", name: "Data Structures", credits: 3, type: "Core" },
        { code: "CL2001", name: "Data Structures - Lab", credits: 1, type: "Core" },
        { code: "CS1005", name: "Discrete Structures", credits: 3, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "SSX21", name: "Social Science Elective - I", credits: 2, type: "Elective" },
        { code: "CS3005", name: "Theory of Automata", credits: 3, type: "Core" }
      ],
      4: [
        { code: "AI2002", name: "Artificial Intelligence", credits: 3, type: "Core" },
        { code: "AL2002", name: "Artificial Intelligence - Lab", credits: 1, type: "Core" },
        { code: "CS2005", name: "Database Systems", credits: 3, type: "Core" },
        { code: "CL2005", name: "Database Systems - Lab", credits: 1, type: "Core" },
        { code: "CS2006", name: "Operating Systems", credits: 3, type: "Core" },
        { code: "CL2006", name: "Operating Systems - Lab", credits: 1, type: "Core" },
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" },
        { code: "CS3009", name: "Software Engineering", credits: 3, type: "Core" }
      ],
      5: [
        { code: "CS3014", name: "Applied Human Computer Interaction", credits: 3, type: "Core" },
        { code: "EE3001", name: "Computer Architecture", credits: 3, type: "Core" },
        { code: "CS3001", name: "Computer Networks", credits: 3, type: "Core" },
        { code: "CL3001", name: "Computer Networks - Lab", credits: 1, type: "Core" },
        { code: "CS2009", name: "Design and Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "CS4087", name: "Advanced DBMS", credits: 3, type: "Core" },
        { code: "CS4031", name: "Compiler Construction", credits: 3, type: "Core" },
        { code: "CS2019", name: "Computing Internship", credits: 1, type: "Core" },
        { code: "CSX01", name: "CS Elective - I", credits: 3, type: "Elective" },
        { code: "CSX02", name: "CS Elective - II", credits: 3, type: "Elective" },
        { code: "CS3006", name: "Parallel and Distributed Computing", credits: 3, type: "Core" }
      ],
      7: [
        { code: "CSX03", name: "CS Elective - III", credits: 3, type: "Elective" },
        { code: "CSX04", name: "CS Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "CS4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective - II", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "CSX05", name: "CS Elective - V", credits: 3, type: "Elective" },
        { code: "CSX06", name: "CS Elective - VI", credits: 3, type: "Elective" },
        { code: "CS4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "CS3002", name: "Information Security", credits: 3, type: "Core" },
        { code: "CS4001", name: "Professional Practices in IT", credits: 3, type: "Core" }
      ]
    }
  },
  AI: {
    name: "BS Artificial Intelligence",
    totalCredits: 137,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "CL1000", name: "Introduction to ICT", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" },
        { code: "CL1002", name: "Programming Fundamentals - Lab", credits: 1, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "EE1005", name: "Digital Logic Design", credits: 3, type: "Core" },
        { code: "EL1005", name: "Digital Logic Design - Lab", credits: 1, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SL1014", name: "Expository Writing - Lab", credits: 1, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "CS1004", name: "Object Oriented Programming", credits: 3, type: "Core" },
        { code: "CL1004", name: "Object Oriented Programming - Lab", credits: 1, type: "Core" }
      ],
      3: [
        { code: "EE2003", name: "Computer Organization and Assembly Language", credits: 3, type: "Core" },
        { code: "EL2003", name: "Computer Organization and Assembly Language - Lab", credits: 1, type: "Core" },
        { code: "CS2001", name: "Data Structures", credits: 3, type: "Core" },
        { code: "CL2001", name: "Data Structures - Lab", credits: 1, type: "Core" },
        { code: "CS1005", name: "Discrete Structures", credits: 3, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "AI2001", name: "Introduction to AI", credits: 3, type: "Core" },
        { code: "AL2001", name: "Introduction to AI - Lab", credits: 1, type: "Core" }
      ],
      4: [
        { code: "AI2002", name: "Machine Learning", credits: 3, type: "Core" },
        { code: "AL2002", name: "Machine Learning - Lab", credits: 1, type: "Core" },
        { code: "CS2005", name: "Database Systems", credits: 3, type: "Core" },
        { code: "CL2005", name: "Database Systems - Lab", credits: 1, type: "Core" },
        { code: "CS2006", name: "Operating Systems", credits: 3, type: "Core" },
        { code: "CL2006", name: "Operating Systems - Lab", credits: 1, type: "Core" },
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" }
      ],
      5: [
        { code: "AI3001", name: "Deep Learning", credits: 3, type: "Core" },
        { code: "AL3001", name: "Deep Learning - Lab", credits: 1, type: "Core" },
        { code: "AI3002", name: "Natural Language Processing", credits: 3, type: "Core" },
        { code: "CS3001", name: "Computer Networks", credits: 3, type: "Core" },
        { code: "CL3001", name: "Computer Networks - Lab", credits: 1, type: "Core" },
        { code: "CS2009", name: "Design and Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "AI3003", name: "Computer Vision", credits: 3, type: "Core" },
        { code: "AL3003", name: "Computer Vision - Lab", credits: 1, type: "Core" },
        { code: "AI3004", name: "Reinforcement Learning", credits: 3, type: "Core" },
        { code: "CS2019", name: "Computing Internship", credits: 1, type: "Core" },
        { code: "AIX01", name: "AI Elective - I", credits: 3, type: "Elective" },
        { code: "AIX02", name: "AI Elective - II", credits: 3, type: "Elective" }
      ],
      7: [
        { code: "AIX03", name: "AI Elective - III", credits: 3, type: "Elective" },
        { code: "AIX04", name: "AI Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "AI4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "AIX05", name: "AI Elective - V", credits: 3, type: "Elective" },
        { code: "AIX06", name: "AI Elective - VI", credits: 3, type: "Elective" },
        { code: "AI4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "AI4001", name: "AI Ethics and Governance", credits: 3, type: "Core" },
        { code: "CS4001", name: "Professional Practices in IT", credits: 3, type: "Core" }
      ]
    }
  },
  SE: {
    name: "BS Software Engineering",
    totalCredits: 137,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "CL1000", name: "Introduction to ICT", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" },
        { code: "CL1002", name: "Programming Fundamentals - Lab", credits: 1, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "EE1005", name: "Digital Logic Design", credits: 3, type: "Core" },
        { code: "EL1005", name: "Digital Logic Design - Lab", credits: 1, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SL1014", name: "Expository Writing - Lab", credits: 1, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "CS1004", name: "Object Oriented Programming", credits: 3, type: "Core" },
        { code: "CL1004", name: "Object Oriented Programming - Lab", credits: 1, type: "Core" }
      ],
      3: [
        { code: "CS2001", name: "Data Structures", credits: 3, type: "Core" },
        { code: "CL2001", name: "Data Structures - Lab", credits: 1, type: "Core" },
        { code: "CS1005", name: "Discrete Structures", credits: 3, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "SE2001", name: "Software Requirements Engineering", credits: 3, type: "Core" },
        { code: "SE2002", name: "Software Design and Architecture", credits: 3, type: "Core" },
        { code: "SSX21", name: "Social Science Elective - I", credits: 2, type: "Elective" }
      ],
      4: [
        { code: "CS2005", name: "Database Systems", credits: 3, type: "Core" },
        { code: "CL2005", name: "Database Systems - Lab", credits: 1, type: "Core" },
        { code: "CS2006", name: "Operating Systems", credits: 3, type: "Core" },
        { code: "CL2006", name: "Operating Systems - Lab", credits: 1, type: "Core" },
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" },
        { code: "SE2003", name: "Software Construction", credits: 3, type: "Core" },
        { code: "SE2004", name: "Software Quality Assurance", credits: 3, type: "Core" }
      ],
      5: [
        { code: "SE3001", name: "Software Project Management", credits: 3, type: "Core" },
        { code: "CS3001", name: "Computer Networks", credits: 3, type: "Core" },
        { code: "CL3001", name: "Computer Networks - Lab", credits: 1, type: "Core" },
        { code: "CS2009", name: "Design and Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "SE3002", name: "DevOps and Cloud Computing", credits: 3, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "SE3003", name: "Software Testing", credits: 3, type: "Core" },
        { code: "SE3004", name: "Web Engineering", credits: 3, type: "Core" },
        { code: "CS2019", name: "Computing Internship", credits: 1, type: "Core" },
        { code: "SEX01", name: "SE Elective - I", credits: 3, type: "Elective" },
        { code: "SEX02", name: "SE Elective - II", credits: 3, type: "Elective" },
        { code: "AI2002", name: "Artificial Intelligence", credits: 3, type: "Core" }
      ],
      7: [
        { code: "SEX03", name: "SE Elective - III", credits: 3, type: "Elective" },
        { code: "SEX04", name: "SE Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "SE4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective - II", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "SEX05", name: "SE Elective - V", credits: 3, type: "Elective" },
        { code: "SEX06", name: "SE Elective - VI", credits: 3, type: "Elective" },
        { code: "SE4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "CS3002", name: "Information Security", credits: 3, type: "Core" },
        { code: "CS4001", name: "Professional Practices in IT", credits: 3, type: "Core" }
      ]
    }
  },
  DS: {
    name: "BS Data Science",
    totalCredits: 137,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "CL1000", name: "Introduction to ICT", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" },
        { code: "CL1002", name: "Programming Fundamentals - Lab", credits: 1, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SL1014", name: "Expository Writing - Lab", credits: 1, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "CS1004", name: "Object Oriented Programming", credits: 3, type: "Core" },
        { code: "CL1004", name: "Object Oriented Programming - Lab", credits: 1, type: "Core" },
        { code: "DS1001", name: "Introduction to Data Science", credits: 3, type: "Core" }
      ],
      3: [
        { code: "CS2001", name: "Data Structures", credits: 3, type: "Core" },
        { code: "CL2001", name: "Data Structures - Lab", credits: 1, type: "Core" },
        { code: "CS1005", name: "Discrete Structures", credits: 3, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "DS2001", name: "Data Wrangling", credits: 3, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" },
        { code: "SSX21", name: "Social Science Elective - I", credits: 2, type: "Elective" }
      ],
      4: [
        { code: "CS2005", name: "Database Systems", credits: 3, type: "Core" },
        { code: "CL2005", name: "Database Systems - Lab", credits: 1, type: "Core" },
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "DS2002", name: "Exploratory Data Analysis", credits: 3, type: "Core" },
        { code: "AI2002", name: "Machine Learning", credits: 3, type: "Core" },
        { code: "AL2002", name: "Machine Learning - Lab", credits: 1, type: "Core" },
        { code: "DS2003", name: "Statistical Inference", credits: 3, type: "Core" }
      ],
      5: [
        { code: "DS3001", name: "Big Data Analytics", credits: 3, type: "Core" },
        { code: "AI3001", name: "Deep Learning", credits: 3, type: "Core" },
        { code: "AL3001", name: "Deep Learning - Lab", credits: 1, type: "Core" },
        { code: "DS3002", name: "Data Visualization", credits: 3, type: "Core" },
        { code: "CS2009", name: "Design and Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "DS3003", name: "Data Mining", credits: 3, type: "Core" },
        { code: "AI3002", name: "Natural Language Processing", credits: 3, type: "Core" },
        { code: "CS2019", name: "Computing Internship", credits: 1, type: "Core" },
        { code: "DSX01", name: "DS Elective - I", credits: 3, type: "Elective" },
        { code: "DSX02", name: "DS Elective - II", credits: 3, type: "Elective" },
        { code: "DS3004", name: "Time Series Analysis", credits: 3, type: "Core" }
      ],
      7: [
        { code: "DSX03", name: "DS Elective - III", credits: 3, type: "Elective" },
        { code: "DSX04", name: "DS Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "DS4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective - II", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "DSX05", name: "DS Elective - V", credits: 3, type: "Elective" },
        { code: "DSX06", name: "DS Elective - VI", credits: 3, type: "Elective" },
        { code: "DS4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "DS4001", name: "Data Ethics and Governance", credits: 3, type: "Core" },
        { code: "CS4001", name: "Professional Practices in IT", credits: 3, type: "Core" }
      ]
    }
  },
  CY: {
    name: "BS Cyber Security",
    totalCredits: 137,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "CL1000", name: "Introduction to ICT", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" },
        { code: "CL1002", name: "Programming Fundamentals - Lab", credits: 1, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "EE1005", name: "Digital Logic Design", credits: 3, type: "Core" },
        { code: "EL1005", name: "Digital Logic Design - Lab", credits: 1, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SL1014", name: "Expository Writing - Lab", credits: 1, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "CS1004", name: "Object Oriented Programming", credits: 3, type: "Core" },
        { code: "CL1004", name: "Object Oriented Programming - Lab", credits: 1, type: "Core" }
      ],
      3: [
        { code: "EE2003", name: "Computer Organization and Assembly Language", credits: 3, type: "Core" },
        { code: "EL2003", name: "Computer Organization and Assembly Language - Lab", credits: 1, type: "Core" },
        { code: "CS2001", name: "Data Structures", credits: 3, type: "Core" },
        { code: "CL2001", name: "Data Structures - Lab", credits: 1, type: "Core" },
        { code: "CS1005", name: "Discrete Structures", credits: 3, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "CY2001", name: "Introduction to Cyber Security", credits: 3, type: "Core" },
        { code: "CYL2001", name: "Introduction to Cyber Security - Lab", credits: 1, type: "Core" }
      ],
      4: [
        { code: "CS2005", name: "Database Systems", credits: 3, type: "Core" },
        { code: "CL2005", name: "Database Systems - Lab", credits: 1, type: "Core" },
        { code: "CS2006", name: "Operating Systems", credits: 3, type: "Core" },
        { code: "CL2006", name: "Operating Systems - Lab", credits: 1, type: "Core" },
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" },
        { code: "CY2002", name: "Network Security", credits: 3, type: "Core" },
        { code: "CYL2002", name: "Network Security - Lab", credits: 1, type: "Core" }
      ],
      5: [
        { code: "CS3001", name: "Computer Networks", credits: 3, type: "Core" },
        { code: "CL3001", name: "Computer Networks - Lab", credits: 1, type: "Core" },
        { code: "CS2009", name: "Design and Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "CY3001", name: "Cryptography", credits: 3, type: "Core" },
        { code: "CY3002", name: "Ethical Hacking", credits: 3, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "CY3003", name: "Digital Forensics", credits: 3, type: "Core" },
        { code: "CY3004", name: "Malware Analysis", credits: 3, type: "Core" },
        { code: "CS2019", name: "Computing Internship", credits: 1, type: "Core" },
        { code: "CYX01", name: "Cyber Security Elective - I", credits: 3, type: "Elective" },
        { code: "CYX02", name: "Cyber Security Elective - II", credits: 3, type: "Elective" },
        { code: "AI2002", name: "Artificial Intelligence", credits: 3, type: "Core" }
      ],
      7: [
        { code: "CYX03", name: "Cyber Security Elective - III", credits: 3, type: "Elective" },
        { code: "CYX04", name: "Cyber Security Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "CY4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "CYX05", name: "Cyber Security Elective - V", credits: 3, type: "Elective" },
        { code: "CYX06", name: "Cyber Security Elective - VI", credits: 3, type: "Elective" },
        { code: "CY4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "CY4001", name: "Cyber Law and Policy", credits: 3, type: "Core" },
        { code: "CS4001", name: "Professional Practices in IT", credits: 3, type: "Core" }
      ]
    }
  },
  CE: {
    name: "BS Computer Engineering",
    totalCredits: 140,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "CL1000", name: "Introduction to ICT", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" },
        { code: "CL1002", name: "Programming Fundamentals - Lab", credits: 1, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "EE1005", name: "Digital Logic Design", credits: 3, type: "Core" },
        { code: "EL1005", name: "Digital Logic Design - Lab", credits: 1, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SL1014", name: "Expository Writing - Lab", credits: 1, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "CS1004", name: "Object Oriented Programming", credits: 3, type: "Core" },
        { code: "CL1004", name: "Object Oriented Programming - Lab", credits: 1, type: "Core" }
      ],
      3: [
        { code: "EE2003", name: "Computer Organization and Assembly Language", credits: 3, type: "Core" },
        { code: "EL2003", name: "Computer Organization and Assembly Language - Lab", credits: 1, type: "Core" },
        { code: "CS2001", name: "Data Structures", credits: 3, type: "Core" },
        { code: "CL2001", name: "Data Structures - Lab", credits: 1, type: "Core" },
        { code: "CS1005", name: "Discrete Structures", credits: 3, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "EE2001", name: "Circuit Analysis", credits: 3, type: "Core" },
        { code: "EEL2001", name: "Circuit Analysis - Lab", credits: 1, type: "Core" }
      ],
      4: [
        { code: "CS2005", name: "Database Systems", credits: 3, type: "Core" },
        { code: "CL2005", name: "Database Systems - Lab", credits: 1, type: "Core" },
        { code: "CS2006", name: "Operating Systems", credits: 3, type: "Core" },
        { code: "CL2006", name: "Operating Systems - Lab", credits: 1, type: "Core" },
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" },
        { code: "EE2002", name: "Electronics", credits: 3, type: "Core" },
        { code: "EEL2002", name: "Electronics - Lab", credits: 1, type: "Core" }
      ],
      5: [
        { code: "EE3001", name: "Computer Architecture", credits: 3, type: "Core" },
        { code: "CS3001", name: "Computer Networks", credits: 3, type: "Core" },
        { code: "CL3001", name: "Computer Networks - Lab", credits: 1, type: "Core" },
        { code: "CS2009", name: "Design and Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "EE3002", name: "Embedded Systems", credits: 3, type: "Core" },
        { code: "EEL3002", name: "Embedded Systems - Lab", credits: 1, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "EE3003", name: "VLSI Design", credits: 3, type: "Core" },
        { code: "EEL3003", name: "VLSI Design - Lab", credits: 1, type: "Core" },
        { code: "EE3004", name: "Signal Processing", credits: 3, type: "Core" },
        { code: "CS2019", name: "Computing Internship", credits: 1, type: "Core" },
        { code: "CEX01", name: "CE Elective - I", credits: 3, type: "Elective" },
        { code: "CEX02", name: "CE Elective - II", credits: 3, type: "Elective" }
      ],
      7: [
        { code: "CEX03", name: "CE Elective - III", credits: 3, type: "Elective" },
        { code: "CEX04", name: "CE Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "CE4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "CEX05", name: "CE Elective - V", credits: 3, type: "Elective" },
        { code: "CEX06", name: "CE Elective - VI", credits: 3, type: "Elective" },
        { code: "CE4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "CS3002", name: "Information Security", credits: 3, type: "Core" },
        { code: "CS4001", name: "Professional Practices in IT", credits: 3, type: "Core" }
      ]
    }
  },
  EE: {
    name: "BS Electrical Engineering",
    totalCredits: 140,
    semesters: {
      1: [
        { code: "NS1001", name: "Applied Physics", credits: 3, type: "Core" },
        { code: "MT1003", name: "Calculus and Analytical Geometry", credits: 3, type: "Core" },
        { code: "SS1012", name: "Functional English", credits: 2, type: "Core" },
        { code: "SL1012", name: "Functional English - Lab", credits: 1, type: "Core" },
        { code: "SS1013", name: "Ideology and Constitution of Pakistan", credits: 2, type: "Core" },
        { code: "EE1001", name: "Basic Electrical Engineering", credits: 3, type: "Core" },
        { code: "EEL1001", name: "Basic Electrical Engineering - Lab", credits: 1, type: "Core" },
        { code: "CS1002", name: "Programming Fundamentals", credits: 3, type: "Core" }
      ],
      2: [
        { code: "SS2043", name: "Civics and Community Engagement", credits: 2, type: "Core" },
        { code: "EE1005", name: "Digital Logic Design", credits: 3, type: "Core" },
        { code: "EL1005", name: "Digital Logic Design - Lab", credits: 1, type: "Core" },
        { code: "SS1014", name: "Expository Writing", credits: 2, type: "Core" },
        { code: "SS1007", name: "Islamic Studies/Ethics", credits: 2, type: "Core" },
        { code: "MT1008", name: "Multivariable Calculus", credits: 3, type: "Core" },
        { code: "EE2001", name: "Circuit Analysis", credits: 3, type: "Core" },
        { code: "EEL2001", name: "Circuit Analysis - Lab", credits: 1, type: "Core" }
      ],
      3: [
        { code: "EE2003", name: "Computer Organization and Assembly Language", credits: 3, type: "Core" },
        { code: "EL2003", name: "Computer Organization and Assembly Language - Lab", credits: 1, type: "Core" },
        { code: "MT1004", name: "Linear Algebra", credits: 3, type: "Core" },
        { code: "EE2002", name: "Electronics", credits: 3, type: "Core" },
        { code: "EEL2002", name: "Electronics - Lab", credits: 1, type: "Core" },
        { code: "EE2004", name: "Electromagnetic Theory", credits: 3, type: "Core" },
        { code: "MT2006", name: "Differential Equations", credits: 3, type: "Core" }
      ],
      4: [
        { code: "SS1015", name: "Pakistan Studies", credits: 2, type: "Core" },
        { code: "MT2005", name: "Probability and Statistics", credits: 3, type: "Core" },
        { code: "EE2005", name: "Signals and Systems", credits: 3, type: "Core" },
        { code: "EEL2005", name: "Signals and Systems - Lab", credits: 1, type: "Core" },
        { code: "EE2006", name: "Electric Machines", credits: 3, type: "Core" },
        { code: "EEL2006", name: "Electric Machines - Lab", credits: 1, type: "Core" },
        { code: "EE2007", name: "Network Analysis", credits: 3, type: "Core" }
      ],
      5: [
        { code: "EE3001", name: "Computer Architecture", credits: 3, type: "Core" },
        { code: "EE3002", name: "Embedded Systems", credits: 3, type: "Core" },
        { code: "EEL3002", name: "Embedded Systems - Lab", credits: 1, type: "Core" },
        { code: "EE3004", name: "Digital Signal Processing", credits: 3, type: "Core" },
        { code: "EE3005", name: "Control Systems", credits: 3, type: "Core" },
        { code: "SS2007", name: "Technical and Business Writing", credits: 3, type: "Core" }
      ],
      6: [
        { code: "EE3006", name: "Power Systems", credits: 3, type: "Core" },
        { code: "EE3007", name: "Communication Systems", credits: 3, type: "Core" },
        { code: "EE2019", name: "Engineering Internship", credits: 1, type: "Core" },
        { code: "EEX01", name: "EE Elective - I", credits: 3, type: "Elective" },
        { code: "EEX02", name: "EE Elective - II", credits: 3, type: "Elective" }
      ],
      7: [
        { code: "EEX03", name: "EE Elective - III", credits: 3, type: "Elective" },
        { code: "EEX04", name: "EE Elective - IV", credits: 3, type: "Elective" },
        { code: "MG4011", name: "Entrepreneurship", credits: 3, type: "Core" },
        { code: "EE4091", name: "Final Year Project - I", credits: 3, type: "Core" },
        { code: "SSX32", name: "Social Science Elective", credits: 3, type: "Elective" }
      ],
      8: [
        { code: "EEX05", name: "EE Elective - V", credits: 3, type: "Elective" },
        { code: "EEX06", name: "EE Elective - VI", credits: 3, type: "Elective" },
        { code: "EE4092", name: "Final Year Project - II", credits: 3, type: "Core" },
        { code: "EE4001", name: "Power Electronics", credits: 3, type: "Core" },
        { code: "EE4002", name: "Professional Practices", credits: 3, type: "Core" }
      ]
    }
  },
  GEN: {
    name: "Custom Program",
    totalCredits: 137,
    semesters: {}
  }
};

const courseToProgramMap = {};
Object.keys(curriculumData).forEach(program => {
  if (curriculumData[program].semesters) {
    Object.values(curriculumData[program].semesters).forEach(semesterCourses => {
      semesterCourses.forEach(course => {
        if (!courseToProgramMap[course.code]) {
          courseToProgramMap[course.code] = [];
        }
        if (!courseToProgramMap[course.code].includes(program)) {
          courseToProgramMap[course.code].push(program);
        }
      });
    });
  }
});

function getCourseProgramInfo(courseCode) {
  const programs = courseToProgramMap[courseCode] || [];
  return programs.map(p => curriculumData[p]?.name || p);
}

function getSemesterCourses(program, semester) {
  if (curriculumData[program] && curriculumData[program].semesters[semester]) {
    return curriculumData[program].semesters[semester];
  }
  return [];
}

