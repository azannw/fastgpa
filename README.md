# FAST NUCES Academic Planner

A comprehensive GPA calculator and degree progression simulator for FAST NUCES students. Plan your entire academic journey with an intuitive, responsive interface.

![FAST GPA Calculator](logo.png)

## 🎯 Features

### Core Functionality
- **Multi-Department Support**: CS, AI, SE, DS, Cyber Security, CE, EE, Civil, BBA, Accounting & Finance, Business Analytics, FinTech, and Generic mode
- **Live GPA Calculation**: SGPA and CGPA update instantly
- **Semester Management**: Add, remove, reorder, and duplicate semesters
- **Course Management**: Full control over courses with grades, credits, and prerequisites

### FAST-Specific Rules
- **Grade Replacement**: When repeating, new grade replaces old in CGPA
- **Internship Exception**: Counts toward CGPA but not semester SGPA
- **Prerequisite Warnings**: Visual alerts for prerequisite violations

### Planning Tools
- **What-If Mode**: Simulate changes without affecting saved data
- **Target Calculator**: Calculate required SGPA to reach your goal
- **Recovery Advisor**: See how many semesters to reach 2.0, 2.5, or 3.0
- **Failure Impact Calculator**: See CGPA drop if a course is failed
- **Repeat Analyzer**: Find which repeat would boost CGPA most
- **Suggested Load**: Smart recommendations based on your standing

### Visualization
- **GPA Progression Chart**: Visual SGPA/CGPA trends over time
- **Timeline View**: See your entire degree journey at a glance
- **Health Indicators**: Color-coded semester performance

### Data Management
- **Auto-Save**: All changes saved to browser localStorage
- **Bulk Import**: Paste multiple courses at once
- **Export**: JSON, text summary, or PDF

## 🚀 Usage

1. Open `index.html` in any modern browser
2. Select your department and enter your current standing
3. Add semesters and courses
4. See live GPA calculations and use planning tools

### Bulk Import Format

```
Data Structures 3 B-
Linear Algebra 3 B
COAL 3 C+
Programming Lab 1 A
```

### Course Flags
- **R**: Repeat course - enter original grade for proper CGPA calculation
- **I**: Internship - included in CGPA but excluded from SGPA

## 📊 Grade Scale

| Grade | Points |
|-------|--------|
| A     | 4.00   |
| A-    | 3.67   |
| B+    | 3.33   |
| B     | 3.00   |
| B-    | 2.67   |
| C+    | 2.33   |
| C     | 2.00   |
| C-    | 1.67   |
| D     | 1.00   |
| F     | 0.00   |

## 🎓 Department Credit Requirements

| Department | Required Credits |
|------------|------------------|
| CS, AI, SE, DS, Cyber | 137 |
| CE, EE, Civil | 140 |
| BBA, Business Analytics | 135 |
| Accounting & Finance, FinTech | 138 |

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Saved to preferences
- **Offline Ready** - No internet required

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔒 Privacy

All calculations happen client-side. No data is sent to any server. Your academic information stays in your browser's localStorage.

## 🔗 Links

- **Live Demo**: [fastgpa.vercel.app](https://fastgpa.vercel.app)
- **Developer**: [Azan](https://linkedin.com/in/azanw)

---

