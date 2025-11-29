# GPA Calculator Deployment Instructions

## Push to GitHub

Since Git is not available in the current PowerShell environment, please run these commands manually:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "Initial commit: GPA Calculator with dark mode and fixed calculations"

# 4. Add remote repository
git remote add origin https://github.com/azannw/gcal.git

# 5. Set branch to main
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

## Alternative: Use GitHub Desktop or Git Bash

If you have GitHub Desktop or Git Bash installed, you can use those instead.

## What's Included

- ✅ Clean, responsive GPA calculator
- ✅ Dark mode toggle with localStorage persistence
- ✅ Accurate CGPA/SGPA calculations
- ✅ Semester 3 target calculator (shows required GPA on remaining courses)
- ✅ Semester 4 planning with course selection
- ✅ Mobile-friendly responsive design
- ✅ No AI-generated styling

## Files

- `index.html` - Main HTML structure
- `styles.css` - Clean, minimal styling with dark mode support
- `script.js` - All calculation logic and dark mode toggle

