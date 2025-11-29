const DEPARTMENTS = {
  'CS': { name: 'BS Computer Science', credits: 137 },
  'AI': { name: 'BS Artificial Intelligence', credits: 137 },
  'SE': { name: 'BS Software Engineering', credits: 137 },
  'DS': { name: 'BS Data Science', credits: 137 },
  'CY': { name: 'BS Cyber Security', credits: 137 },
  'CE': { name: 'BS Computer Engineering', credits: 140 },
  'EE': { name: 'BS Electrical Engineering', credits: 140 },
  'CV': { name: 'BS Civil Engineering', credits: 140 },
  'BBA': { name: 'BS Business Administration', credits: 135 },
  'AF': { name: 'BS Accounting and Finance', credits: 138 },
  'BA': { name: 'BS Business Analytics', credits: 135 },
  'FT': { name: 'BS Financial Technology', credits: 138 },
  'GEN': { name: 'Custom Program', credits: 137 }
};

const GRADE_POINTS = {
  'A': 4.00, 'A-': 3.67,
  'B+': 3.33, 'B': 3.00, 'B-': 2.67,
  'C+': 2.33, 'C': 2.00, 'C-': 1.67,
  'D': 1.00, 'F': 0.00
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

const COURSE_ABBREVIATIONS = {
  'OOP': ['OBJECT ORIENTED PROGRAMMING', 'OBJECT-ORIENTED PROGRAMMING', 'OOP'],
  'PF': ['PROGRAMMING FUNDAMENTALS', 'PROGRAMMING FUNDAMENTAL'],
  'DSA': ['DATA STRUCTURES', 'DATA STRUCTURE', 'DATA STRUCTURES AND ALGORITHMS'],
  'DS': ['DATA STRUCTURES', 'DATA STRUCTURE', 'DATA SCIENCE'],
  'DB': ['DATABASE', 'DATABASE SYSTEMS', 'DATABASE MANAGEMENT', 'DBMS'],
  'DBMS': ['DATABASE MANAGEMENT SYSTEM', 'DATABASE MANAGEMENT SYSTEMS', 'DATABASE'],
  'OS': ['OPERATING SYSTEMS', 'OPERATING SYSTEM'],
  'CN': ['COMPUTER NETWORKS', 'COMPUTER NETWORK', 'NETWORKING'],
  'AI': ['ARTIFICIAL INTELLIGENCE'],
  'ML': ['MACHINE LEARNING'],
  'DL': ['DEEP LEARNING'],
  'SE': ['SOFTWARE ENGINEERING'],
  'HCI': ['HUMAN COMPUTER INTERACTION', 'HUMAN-COMPUTER INTERACTION'],
  'HPC': ['HIGH PERFORMANCE COMPUTING'],
  'AP': ['APPLIED PHYSICS', 'PHYSICS'],
  'DLD': ['DIGITAL LOGIC DESIGN', 'DIGITAL LOGIC'],
  'COA': ['COMPUTER ORGANIZATION', 'COMPUTER ORGANIZATION AND ASSEMBLY', 'COMPUTER ARCHITECTURE'],
  'CA': ['COMPUTER ARCHITECTURE'],
  'TOC': ['THEORY OF COMPUTATION', 'THEORY OF AUTOMATA', 'AUTOMATA THEORY'],
  'GT': ['GRAPH THEORY'],
  'DM': ['DISCRETE MATHEMATICS', 'DISCRETE MATH'],
  'LA': ['LINEAR ALGEBRA'],
  'CALC': ['CALCULUS'],
  'CAL': ['CALCULUS'],
  'PROB': ['PROBABILITY', 'PROBABILITY AND STATISTICS'],
  'STATS': ['STATISTICS', 'PROBABILITY AND STATISTICS'],
  'ICT': ['INFORMATION AND COMMUNICATION TECHNOLOGY', 'ICT'],
  'IRS': ['INTRODUCTION TO RELIGIOUS STUDIES', 'ISLAMIC STUDIES'],
  'ENG': ['ENGLISH', 'ENGLISH COMPOSITION', 'TECHNICAL WRITING'],
  'TBW': ['TECHNICAL AND BUSINESS WRITING', 'TECHNICAL WRITING'],
  'WEB': ['WEB DEVELOPMENT', 'WEB ENGINEERING', 'WEB TECHNOLOGIES'],
  'ALGO': ['ALGORITHMS', 'DESIGN AND ANALYSIS OF ALGORITHMS', 'ALGORITHM'],
  'DAA': ['DESIGN AND ANALYSIS OF ALGORITHMS'],
  'CP': ['COMPETITIVE PROGRAMMING', 'COMPUTER PROGRAMMING'],
  'SP': ['SYSTEM PROGRAMMING'],
  'PDC': ['PARALLEL AND DISTRIBUTED COMPUTING'],
  'IS': ['INFORMATION SECURITY', 'INTRO TO SOFTWARE'],
  'NLP': ['NATURAL LANGUAGE PROCESSING'],
  'CV': ['COMPUTER VISION'],
  'CG': ['COMPUTER GRAPHICS'],
  'FYP': ['FINAL YEAR PROJECT'],
  'ITC': ['INTRO TO COMPUTING', 'INTRODUCTION TO COMPUTING']
};

let appState = {
  initialized: false,
  department: 'CS',
  prevCredits: 0,
  prevCGPA: 0,
  prevPoints: 0,
  currentSemester: 1,
  semesters: [],
  degreeRequirements: {
    total: 137,
    core: 52,
    genEd: 34,
    math: 12,
    majorElec: 21,
    domainElec: 15,
    supportElec: 3
  },
  warningCount: 0
};

let whatIfBackup = null;
let isWhatIfMode = false;
let currentRepeatCourse = null;
let currentRepeatSemesterIdx = null;
let currentBulkSemesterIdx = null;
let currentImportSemesterIdx = null;
let currentChartType = 'sgpa';

function generateId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

function getGradePoint(grade) {
  return GRADE_POINTS[grade] ?? null;
}

function formatGPA(value) {
  return (value || 0).toFixed(2);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function getClassification(credits) {
  if (credits < 30) return 'Freshman';
  if (credits < 60) return 'Sophomore';
  if (credits < 90) return 'Junior';
  return 'Senior';
}

function getSemesterHealth(sgpa) {
  if (sgpa <= 0) return null;
  if (sgpa < 2.0) return 'danger';
  if (sgpa < 2.3) return 'warning';
  if (sgpa < 3.0) return 'normal';
  return 'strong';
}

function saveState() {
  if (isWhatIfMode) return;
  try {
    localStorage.setItem('fastAcademicPlanner', JSON.stringify(appState));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

function loadState() {
  try {
    var saved = localStorage.getItem('fastAcademicPlanner');
    if (saved) {
      var parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
      return true;
    }
  } catch (e) {
    console.warn('Could not load from localStorage:', e);
  }
  return false;
}

function clearState() {
  localStorage.removeItem('fastAcademicPlanner');
}

function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  setTimeout(function() { drawChart(); }, 100);
}

function loadTheme() {
  var saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleWhatIfMode() {
  var checkbox = document.getElementById('whatIfMode');
  if (checkbox.checked) {
    enterWhatIfMode();
      } else {
    exitWhatIfMode();
  }
}

function enterWhatIfMode() {
  whatIfBackup = JSON.parse(JSON.stringify(appState));
  isWhatIfMode = true;
  document.getElementById('whatIfBanner').classList.remove('hidden');
  document.getElementById('whatIfMode').checked = true;
}

function exitWhatIfMode() {
  if (whatIfBackup) {
    appState = whatIfBackup;
    whatIfBackup = null;
  }
  isWhatIfMode = false;
  document.getElementById('whatIfBanner').classList.add('hidden');
  document.getElementById('whatIfMode').checked = false;
  renderSemesters();
  recalculateAll();
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function openSetupModal() {
  document.getElementById('initCredits').value = appState.prevCredits || 0;
  document.getElementById('initCGPA').value = appState.prevCGPA || 0;
  document.getElementById('initSemester').value = appState.currentSemester || 1;
  document.getElementById('selectDepartment').value = appState.department || 'CS';
  updateDegreeSummary();
  openModal('setupModal');
}

function closeSetupModal() {
  closeModal('setupModal');
}

function openBulkModal(semesterIdx) {
  currentBulkSemesterIdx = semesterIdx;
  document.getElementById('bulkInput').value = '';
  openModal('bulkModal');
}

function closeBulkModal() {
  closeModal('bulkModal');
  currentBulkSemesterIdx = null;
}

function openImportTemplateModal(semesterIdx) {
  currentImportSemesterIdx = semesterIdx;
  var semNum = semesterIdx + appState.currentSemester;
  document.getElementById('importSemesterSelect').value = Math.min(semNum, 8);
  updateImportPreview();
  openModal('importTemplateModal');
}

function closeImportTemplateModal() {
  closeModal('importTemplateModal');
  currentImportSemesterIdx = null;
}

function updateImportPreview() {
  var semNum = parseInt(document.getElementById('importSemesterSelect').value) || 1;
  var previewContainer = document.getElementById('importPreview');
  
  if (typeof curriculumData === 'undefined') {
    previewContainer.innerHTML = '<div class="import-empty">Curriculum data not loaded</div>';
    return;
  }
  
  var deptData = curriculumData[appState.department];
  if (!deptData || !deptData.semesters) {
    previewContainer.innerHTML = '<div class="import-empty">No curriculum data available for ' + DEPARTMENTS[appState.department].name + '</div>';
    return;
  }
  
  var courses = deptData.semesters[semNum] || [];
  
  if (courses.length === 0) {
    previewContainer.innerHTML = '<div class="import-empty">No courses found for Semester ' + semNum + '</div>';
    return;
  }
  
  var totalCredits = courses.reduce(function(sum, c) { return sum + c.credits; }, 0);
  
  previewContainer.innerHTML = '<div style="margin-bottom: 12px; font-size: 0.875rem; color: var(--text-muted);">Semester ' + semNum + ' - ' + courses.length + ' courses, ' + totalCredits + ' credits</div>' +
    courses.map(function(course) {
      return '<div class="import-course-item">' +
        '<div class="import-course-info">' +
          '<span class="import-course-code">' + course.code + '</span>' +
          '<span class="import-course-name">' + course.name + '</span>' +
        '</div>' +
        '<span class="import-course-credits">' + course.credits + ' cr</span>' +
      '</div>';
    }).join('');
}

function confirmImportCourses() {
  if (currentImportSemesterIdx === null) {
    alert('No semester selected');
    return;
  }
  
  var semNum = parseInt(document.getElementById('importSemesterSelect').value) || 1;
  
  if (typeof curriculumData === 'undefined') {
    alert('Curriculum data not loaded');
    return;
  }
  
  var deptData = curriculumData[appState.department];
  if (!deptData || !deptData.semesters) {
    alert('No curriculum data available for your program');
    return;
  }
  
  var templateCourses = deptData.semesters[semNum] || [];
  
  if (templateCourses.length === 0) {
    alert('No courses found for Semester ' + semNum);
    return;
  }
  
  var semIdx = currentImportSemesterIdx;
  
  var newCourses = templateCourses.map(function(tc) {
    var isInternship = tc.code && (tc.code.includes('2019') || tc.name.toLowerCase().includes('internship'));
    return {
      id: generateId(),
      name: tc.name,
      credits: tc.credits,
      grade: '',
      enabled: true,
      isRepeat: false,
      isInternship: isInternship,
      repeatInfo: null
    };
  });
  
  if (!appState.semesters[semIdx]) {
    alert('Invalid semester');
    return;
  }
  
  appState.semesters[semIdx].courses = appState.semesters[semIdx].courses.concat(newCourses);
  
  closeImportTemplateModal();
  renderSemesters();
  recalculateAll();
  saveState();
}

function openRepeatModal(semesterIdx, courseId) {
  currentRepeatSemesterIdx = semesterIdx;
  currentRepeatCourse = courseId;
  
  var semester = appState.semesters[semesterIdx];
  var course = semester?.courses.find(function(c) { return c.id === courseId; });
  
  if (course?.repeatInfo) {
    document.getElementById('repeatOldGrade').value = course.repeatInfo.oldGrade || '';
    document.getElementById('repeatOldCredits').value = course.repeatInfo.oldCredits || 3;
    } else {
    document.getElementById('repeatOldGrade').value = '';
    document.getElementById('repeatOldCredits').value = 3;
  }
  
  openModal('repeatModal');
}

function closeRepeatModal() {
  closeModal('repeatModal');
  currentRepeatCourse = null;
  currentRepeatSemesterIdx = null;
}

function openPrereqModal() {
  document.getElementById('prereqSearchInput').value = '';
  document.getElementById('prereqSearchResults').innerHTML = '';
  document.getElementById('prereqDetails').classList.add('hidden');
  openModal('prereqModal');
}

function closePrereqModal() {
  closeModal('prereqModal');
}

function searchPrereqCourse() {
  var query = document.getElementById('prereqSearchInput').value.trim().toUpperCase();
  var resultsContainer = document.getElementById('prereqSearchResults');
  
  if (query.length < 2) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  var expandedQueries = [query];
  if (COURSE_ABBREVIATIONS[query]) {
    expandedQueries = expandedQueries.concat(COURSE_ABBREVIATIONS[query]);
  }
  
  function matchesQuery(text) {
    var upperText = text.toUpperCase();
    return expandedQueries.some(function(q) {
      return upperText.includes(q);
    });
  }
  
  var results = [];
  
  if (typeof PREREQUISITES !== 'undefined') {
    Object.keys(PREREQUISITES).forEach(function(dept) {
      var deptData = PREREQUISITES[dept];
      Object.keys(deptData).forEach(function(code) {
        var course = deptData[code];
        if (matchesQuery(code) || matchesQuery(course.name)) {
          var existing = results.find(function(r) { return r.code === code; });
          if (!existing) {
            results.push({
              code: code,
              name: course.name,
              credits: course.credits || 3,
              dept: dept
            });
          }
        }
      });
    });
  }
  
  if (typeof curriculumData !== 'undefined') {
    Object.keys(curriculumData).forEach(function(dept) {
      var deptData = curriculumData[dept];
      if (deptData.semesters) {
        Object.values(deptData.semesters).forEach(function(semCourses) {
          semCourses.forEach(function(course) {
            if (matchesQuery(course.code) || matchesQuery(course.name)) {
              var existing = results.find(function(r) { return r.code === course.code; });
              if (!existing) {
                results.push({
                  code: course.code,
                  name: course.name,
                  credits: course.credits,
                  dept: dept
                });
              }
            }
          });
        });
      }
    });
  }
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="prereq-empty">No courses found matching your search</div>';
    return;
  }
  
  results = results.slice(0, 15);
  
  resultsContainer.innerHTML = results.map(function(course) {
    return '<div class="prereq-search-item" onclick="showPrereqDetails(\'' + course.code + '\')">' +
      '<span class="code">' + course.code + '</span>' +
      '<span class="name">' + course.name + '</span>' +
      '<span class="credits">' + course.credits + ' cr</span>' +
    '</div>';
  }).join('');
}

function showPrereqDetails(courseCode) {
  var courseName = '';
  var prereqs = [];
  var postreqs = [];
  var programs = [];
  
  if (typeof PREREQUISITES !== 'undefined') {
    Object.keys(PREREQUISITES).forEach(function(dept) {
      var deptData = PREREQUISITES[dept];
      if (deptData[courseCode]) {
        var course = deptData[courseCode];
        courseName = course.name;
        
        if (!programs.includes(DEPARTMENTS[dept]?.name || dept)) {
          programs.push(DEPARTMENTS[dept]?.name || dept);
        }
        
        if (course.prereqs) {
          course.prereqs.forEach(function(preCode) {
            if (deptData[preCode]) {
              var existing = prereqs.find(function(p) { return p.code === preCode; });
              if (!existing) {
                prereqs.push({ code: preCode, name: deptData[preCode].name });
              }
            }
          });
        }
        
        Object.keys(deptData).forEach(function(otherCode) {
          var otherCourse = deptData[otherCode];
          if (otherCourse.prereqs && otherCourse.prereqs.includes(courseCode)) {
            var existing = postreqs.find(function(p) { return p.code === otherCode; });
            if (!existing) {
              postreqs.push({ code: otherCode, name: otherCourse.name });
            }
          }
        });
      }
    });
  }
  
  if (typeof curriculumData !== 'undefined') {
    Object.keys(curriculumData).forEach(function(dept) {
      var deptData = curriculumData[dept];
      if (deptData.semesters) {
        Object.values(deptData.semesters).forEach(function(semCourses) {
          semCourses.forEach(function(course) {
            if (course.code === courseCode) {
              if (!courseName) courseName = course.name;
              var progName = DEPARTMENTS[dept]?.name || deptData.name || dept;
              if (!programs.includes(progName)) {
                programs.push(progName);
              }
            }
          });
        });
      }
    });
  }
  
  document.getElementById('prereqCourseCode').textContent = courseCode;
  document.getElementById('prereqCourseName').textContent = courseName;
  
  var programsContainer = document.getElementById('prereqPrograms');
  if (programs.length > 0) {
    programsContainer.innerHTML = '<div style="margin-bottom: 8px; font-size: 0.8125rem; color: var(--text-muted);">This course is part of:</div>' +
      programs.map(function(p) {
        return '<span class="prereq-program-tag">' + p + '</span>';
      }).join('');
    } else {
    programsContainer.innerHTML = '';
  }
  
  var prereqList = document.getElementById('prereqList');
  var postreqList = document.getElementById('postreqList');
  
  if (prereqs.length === 0) {
    prereqList.innerHTML = '<div class="prereq-empty">No prerequisites required</div>';
  } else {
    prereqList.innerHTML = prereqs.map(function(p) {
      return '<div class="prereq-chip"><span class="chip-code">' + p.code + '</span><span class="chip-name">' + p.name + '</span></div>';
    }).join('');
  }
  
  if (postreqs.length === 0) {
    postreqList.innerHTML = '<div class="prereq-empty">No courses require this as prerequisite</div>';
  } else {
    postreqList.innerHTML = postreqs.map(function(p) {
      return '<div class="prereq-chip"><span class="chip-code">' + p.code + '</span><span class="chip-name">' + p.name + '</span></div>';
    }).join('');
  }
  
  document.getElementById('prereqDetails').classList.remove('hidden');
}

function openExportModal() {
  generateExportPreview();
  openModal('exportModal');
}

function closeExportModal() {
  closeModal('exportModal');
}

function openDegreeModal() {
  document.getElementById('reqTotal').value = appState.degreeRequirements.total;
  document.getElementById('reqCore').value = appState.degreeRequirements.core;
  document.getElementById('reqGenEd').value = appState.degreeRequirements.genEd;
  document.getElementById('reqMath').value = appState.degreeRequirements.math;
  document.getElementById('reqMajorElec').value = appState.degreeRequirements.majorElec;
  document.getElementById('reqDomainElec').value = appState.degreeRequirements.domainElec;
  document.getElementById('reqSupportElec').value = appState.degreeRequirements.supportElec;
  openModal('degreeModal');
}

function closeDegreeModal() {
  closeModal('degreeModal');
}

function openFailureModal() {
  document.getElementById('failCredits').value = 3;
  document.getElementById('failCurrentGrade').value = '';
  document.getElementById('failureResult').classList.add('hidden');
  openModal('failureModal');
}

function closeFailureModal() {
  closeModal('failureModal');
}

function openRepeatAnalyzerModal() {
  analyzeRepeatOptions();
  openModal('repeatAnalyzerModal');
}

function closeRepeatAnalyzerModal() {
  closeModal('repeatAnalyzerModal');
}

function updateDegreeSummary() {
  var department = document.getElementById('selectDepartment').value;
  var completedCredits = parseFloat(document.getElementById('initCredits').value) || 0;
  
  var totalCredits = DEPARTMENTS[department]?.credits || 137;
  if (department === 'GEN') {
    totalCredits = parseInt(document.getElementById('customCredits').value) || 137;
  }
  
  var remaining = Math.max(0, totalCredits - completedCredits);
  
  document.getElementById('summaryTotal').textContent = totalCredits;
  document.getElementById('summaryCompleted').textContent = completedCredits;
  document.getElementById('summaryRemaining').textContent = remaining;
}

function initializeApp() {
  var department = document.getElementById('selectDepartment').value;
  var credits = parseFloat(document.getElementById('initCredits').value) || 0;
  var cgpa = parseFloat(document.getElementById('initCGPA').value) || 0;
  var semester = parseInt(document.getElementById('initSemester').value) || 1;
  
  appState.department = department;
  appState.prevCredits = clamp(credits, 0, 200);
  appState.prevCGPA = clamp(cgpa, 0, 4);
  appState.prevPoints = appState.prevCredits * appState.prevCGPA;
  appState.currentSemester = semester;
  appState.initialized = true;
  
  if (department === 'GEN') {
    var customCredits = parseInt(document.getElementById('customCredits').value) || 137;
    appState.degreeRequirements.total = customCredits;
  } else {
    appState.degreeRequirements.total = DEPARTMENTS[department].credits;
  }
  
  document.getElementById('programName').textContent = DEPARTMENTS[department].name;
  
  if (appState.semesters.length === 0) {
    addSemester('regular');
  }
  
  closeSetupModal();
  showLoadingAnimation();
}

function showLoadingAnimation() {
  var overlay = document.getElementById('loadingOverlay');
  overlay.style.display = 'flex';
  overlay.classList.remove('fade-out');
  
  // Show animation for 4 seconds before fading
  setTimeout(function() {
    overlay.classList.add('fade-out');
    showApp();
    recalculateAll();
    saveState();
    
    // Wait for fade animation to complete (0.8s)
    setTimeout(function() {
      overlay.style.display = 'none';
    }, 800);
  }, 4000);
}

function showLoadingAnimationOnRestore() {
  var overlay = document.getElementById('loadingOverlay');
  overlay.style.display = 'flex';
  overlay.classList.remove('fade-out');
  
  // Show animation for 3 seconds when restoring state
  setTimeout(function() {
    overlay.classList.add('fade-out');
    showApp();
    renderSemesters();
    recalculateAll();
    
    // Wait for fade animation to complete (0.8s)
    setTimeout(function() {
      overlay.style.display = 'none';
    }, 800);
  }, 3000);
}

function showApp() {
  document.getElementById('app').classList.remove('hidden');
}

function hideApp() {
  document.getElementById('app').classList.add('hidden');
}

function resetApp() {
  if (confirm('This will delete all your data. Are you sure?')) {
    clearState();
    appState = {
      initialized: false,
      department: 'CS',
      prevCredits: 0,
      prevCGPA: 0,
      prevPoints: 0,
      currentSemester: 1,
      semesters: [],
      degreeRequirements: {
        total: 137,
        core: 52,
        genEd: 34,
        math: 12,
        majorElec: 21,
        domainElec: 15,
        supportElec: 3
      },
      warningCount: 0
    };
    isWhatIfMode = false;
    whatIfBackup = null;
    hideApp();
    openSetupModal();
  }
}

function addSemester(type) {
  type = type || 'regular';
  var semesterNum = appState.semesters.length + appState.currentSemester;
  var isSummer = type === 'summer';
  
  var semester = {
    id: generateId(),
    type: type,
    name: isSummer ? 'Summer ' + Math.ceil(semesterNum / 2) : 'Semester ' + semesterNum,
    courses: []
  };
  
  appState.semesters.push(semester);
  renderSemesters();
  recalculateAll();
  saveState();
}

function duplicateLastSemester() {
  if (appState.semesters.length === 0) {
    addSemester('regular');
    return;
  }
  
  var lastSem = appState.semesters[appState.semesters.length - 1];
  var semesterNum = appState.semesters.length + appState.currentSemester;
  
  var newSemester = {
    id: generateId(),
    type: lastSem.type,
    name: lastSem.type === 'summer' ? 'Summer ' + Math.ceil(semesterNum / 2) : 'Semester ' + semesterNum,
    courses: lastSem.courses.map(function(c) {
      return {
        id: generateId(),
        name: c.name,
        credits: c.credits,
        grade: '',
        enabled: true,
        isRepeat: false,
        isInternship: false,
        repeatInfo: null
      };
    })
  };
  
  appState.semesters.push(newSemester);
  renderSemesters();
  recalculateAll();
  saveState();
}

function removeSemester(index) {
  if (appState.semesters.length <= 1) {
    alert('You need at least one semester.');
    return;
  }
  
  if (confirm('Remove this semester and all its courses?')) {
    appState.semesters.splice(index, 1);
    renderSemesters();
    recalculateAll();
    saveState();
  }
}

function updateSemesterName(index, name) {
  appState.semesters[index].name = name;
  saveState();
  updateTimeline();
}

function moveSemester(index, direction) {
  var newIndex = index + direction;
  if (newIndex < 0 || newIndex >= appState.semesters.length) return;
  
  var temp = appState.semesters[index];
  appState.semesters[index] = appState.semesters[newIndex];
  appState.semesters[newIndex] = temp;
  
  renderSemesters();
  recalculateAll();
  saveState();
}

function addCourse(semesterIdx) {
  var course = {
    id: generateId(),
    name: '',
    credits: 3,
    grade: '',
    enabled: true,
    isRepeat: false,
    isInternship: false,
    repeatInfo: null
  };
  
  appState.semesters[semesterIdx].courses.push(course);
  renderSemester(semesterIdx);
  recalculateAll();
  saveState();
}

function removeCourse(semesterIdx, courseId) {
  var semester = appState.semesters[semesterIdx];
  semester.courses = semester.courses.filter(function(c) { return c.id !== courseId; });
  renderSemester(semesterIdx);
  recalculateAll();
  saveState();
}

function updateCourse(semesterIdx, courseId, field, value) {
  var semester = appState.semesters[semesterIdx];
  var course = semester.courses.find(function(c) { return c.id === courseId; });
  
  if (!course) return;
  
  if (field === 'credits') {
    course[field] = clamp(parseFloat(value) || 0, 0, 6);
  } else if (field === 'enabled') {
    course[field] = value;
  } else {
    course[field] = value;
  }
  
  recalculateAll();
  saveState();
}

function toggleCourseFlag(semesterIdx, courseId, flag) {
  var semester = appState.semesters[semesterIdx];
  var course = semester.courses.find(function(c) { return c.id === courseId; });
  
  if (!course) return;
  
  if (flag === 'isRepeat') {
    course.isRepeat = !course.isRepeat;
    if (course.isRepeat) {
      openRepeatModal(semesterIdx, courseId);
    } else {
      course.repeatInfo = null;
    }
  } else if (flag === 'isInternship') {
    course.isInternship = !course.isInternship;
  }
  
  renderSemester(semesterIdx);
  recalculateAll();
  saveState();
}

function saveRepeatSettings() {
  if (currentRepeatSemesterIdx === null || currentRepeatCourse === null) return;
  
  var semester = appState.semesters[currentRepeatSemesterIdx];
  var course = semester.courses.find(function(c) { return c.id === currentRepeatCourse; });
  
  if (!course) return;
  
  var oldGrade = document.getElementById('repeatOldGrade').value;
  var oldCredits = parseFloat(document.getElementById('repeatOldCredits').value) || 3;
  
  if (!oldGrade) {
    alert('Please select the original grade.');
    return;
  }
  
  course.repeatInfo = {
    oldGrade: oldGrade,
    oldCredits: oldCredits,
    oldPoints: oldCredits * getGradePoint(oldGrade)
  };
  
  closeRepeatModal();
  renderSemester(currentRepeatSemesterIdx);
  recalculateAll();
  saveState();
}

function toggleAllCourses(semesterIdx, enabled) {
  var semester = appState.semesters[semesterIdx];
  semester.courses.forEach(function(course) {
    course.enabled = enabled;
  });
  renderSemester(semesterIdx);
  recalculateAll();
  saveState();
}

function importBulkCourses() {
  if (currentBulkSemesterIdx === null) return;
  
  var input = document.getElementById('bulkInput').value.trim();
  if (!input) {
    closeBulkModal();
    return;
  }
  
  var lines = input.split('\n').filter(function(line) { return line.trim(); });
  var courses = [];
  
  lines.forEach(function(line) {
    var parts = line.trim().split(/\s+/);
    if (parts.length < 2) return;
    
    var grade = parts[parts.length - 1].toUpperCase();
    var credits = parseFloat(parts[parts.length - 2]);
    var name = parts.slice(0, -2).join(' ');
    
    var normalizedGrade = normalizeGrade(grade);
    
    if (name && !isNaN(credits) && credits > 0) {
      courses.push({
        id: generateId(),
        name: name,
        credits: clamp(credits, 1, 6),
        grade: normalizedGrade || '',
        enabled: true,
        isRepeat: false,
        isInternship: false,
        repeatInfo: null
      });
    }
  });
  
  if (courses.length > 0) {
    appState.semesters[currentBulkSemesterIdx].courses = appState.semesters[currentBulkSemesterIdx].courses.concat(courses);
    renderSemester(currentBulkSemesterIdx);
    recalculateAll();
    saveState();
  }
  
  closeBulkModal();
}

function normalizeGrade(grade) {
  var normalized = grade.replace(/−/g, '-').toUpperCase();
  if (GRADE_POINTS.hasOwnProperty(normalized)) {
    return normalized;
  }
  for (var i = 0; i < GRADE_OPTIONS.length; i++) {
    if (GRADE_OPTIONS[i].toUpperCase() === normalized) {
      return GRADE_OPTIONS[i];
    }
  }
  return '';
}

function calculateSemesterStats(semesterIdx) {
  var semester = appState.semesters[semesterIdx];
  if (!semester) return null;
  
  var totalCredits = 0;
  var totalPoints = 0;
  var sgpaCredits = 0;
  var sgpaPoints = 0;
  var repeatDeduction = 0;
  var repeatCredits = 0;
  
  semester.courses.forEach(function(course) {
    if (!course.enabled) return;
    
    var credits = course.credits || 0;
    var gradePoint = getGradePoint(course.grade);
    
    if (gradePoint === null) return;
    
    var points = credits * gradePoint;
    
    if (course.isRepeat && course.repeatInfo) {
      repeatDeduction += course.repeatInfo.oldPoints;
      repeatCredits += course.repeatInfo.oldCredits || credits;
    }
    
    totalCredits += credits;
    totalPoints += points;
    
    if (!course.isInternship) {
      sgpaCredits += credits;
      sgpaPoints += points;
    }
  });
  
  var sgpa = sgpaCredits > 0 ? sgpaPoints / sgpaCredits : 0;
  
  return {
    totalCredits: totalCredits,
    totalPoints: totalPoints,
    sgpaCredits: sgpaCredits,
    sgpaPoints: sgpaPoints,
    sgpa: sgpa,
    repeatDeduction: repeatDeduction,
    repeatCredits: repeatCredits,
    health: getSemesterHealth(sgpa)
  };
}

function recalculateAll() {
  var runningCredits = appState.prevCredits;
  var runningPoints = appState.prevPoints;
  var warningCount = 0;
  
  var semesterResults = [];
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (!stats) return;
    
    runningPoints -= stats.repeatDeduction;
    runningCredits += stats.totalCredits;
    runningCredits -= stats.repeatCredits;
    runningPoints += stats.totalPoints;
    
    var cgpa = runningCredits > 0 ? runningPoints / runningCredits : 0;
    
    if (stats.sgpa > 0 && stats.sgpa < 2.0) {
      warningCount++;
    }
    
    semesterResults.push({
      index: idx,
      semester: semester,
      stats: stats,
      cgpaAfter: cgpa,
      creditsAfter: runningCredits
    });
  });
  
  appState.warningCount = warningCount;
  
  updateDashboard(runningCredits, runningPoints);
  updateSemesterStats(semesterResults);
  updateTimeline();
  updateWarnings(semesterResults);
  updateHealthAdvice(runningCredits > 0 ? runningPoints / runningCredits : appState.prevCGPA);
  drawChart();
}

function updateDashboard(totalCredits, totalPoints) {
  var cgpa = totalCredits > 0 ? totalPoints / totalCredits : appState.prevCGPA;
  
  document.getElementById('dashCGPA').textContent = formatGPA(cgpa);
  document.getElementById('dashCredits').textContent = totalCredits;
  document.getElementById('dashClass').textContent = getClassification(totalCredits);
  document.getElementById('dashPrevCredits').textContent = appState.prevCredits + ' cr previous';
  
  var statusEl = document.getElementById('cgpaStatus');
  if (cgpa >= 3.5) {
    statusEl.textContent = "Dean's List";
    statusEl.style.color = 'var(--success)';
  } else if (cgpa >= 3.0) {
    statusEl.textContent = 'Good Standing';
    statusEl.style.color = 'var(--success)';
  } else if (cgpa >= 2.0) {
    statusEl.textContent = 'Satisfactory';
    statusEl.style.color = 'var(--warning)';
  } else if (cgpa > 0) {
    statusEl.textContent = 'Academic Warning';
    statusEl.style.color = 'var(--danger)';
    } else {
    statusEl.textContent = '';
  }
  
  var remaining = appState.degreeRequirements.total - totalCredits;
  document.getElementById('creditsRemaining').textContent = 
    remaining > 0 ? remaining + ' remaining' : 'Complete';
  
  var progress = (totalCredits / appState.degreeRequirements.total) * 100;
  document.getElementById('degreeProgress').style.width = Math.min(progress, 100) + '%';
  document.getElementById('degreeProgressText').textContent = Math.round(progress) + '% complete';
}

function updateSemesterStats(results) {
  results.forEach(function(result) {
    var index = result.index;
    var stats = result.stats;
    var cgpaAfter = result.cgpaAfter;
    
    var creditsEl = document.getElementById('sem' + index + 'Credits');
    var sgpaEl = document.getElementById('sem' + index + 'SGPA');
    var cgpaEl = document.getElementById('sem' + index + 'CGPA');
    
    if (creditsEl) creditsEl.textContent = stats.totalCredits;
    if (sgpaEl) {
      sgpaEl.textContent = formatGPA(stats.sgpa);
      
      var statDiv = sgpaEl.closest('.stat');
      statDiv.classList.remove('warning', 'danger', 'strong');
      if (stats.health === 'danger') statDiv.classList.add('danger');
      else if (stats.health === 'warning') statDiv.classList.add('warning');
      else if (stats.health === 'strong') statDiv.classList.add('strong');
    }
    if (cgpaEl) {
      cgpaEl.textContent = formatGPA(cgpaAfter);
    }
  });
}

function updateTimeline() {
  var timeline = document.getElementById('timeline');
  
  document.getElementById('timelineStart').textContent = formatGPA(appState.prevCGPA);
  
  var tiles = timeline.querySelectorAll('.timeline-tile, .timeline-connector');
  tiles.forEach(function(el) { el.remove(); });
  
  var runningCredits = appState.prevCredits;
  var runningPoints = appState.prevPoints;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (!stats) return;
    
    runningPoints -= stats.repeatDeduction;
    runningCredits += stats.totalCredits;
    runningCredits -= stats.repeatCredits;
    runningPoints += stats.totalPoints;
    
    var cgpa = runningCredits > 0 ? runningPoints / runningCredits : 0;
    
    var connector = document.createElement('div');
    connector.className = 'timeline-connector';
    timeline.appendChild(connector);
    
    var tile = document.createElement('div');
    tile.className = 'timeline-tile';
    if (semester.type === 'summer') tile.classList.add('summer');
    if (stats.health) tile.classList.add('health-' + stats.health);
    
    tile.innerHTML = '<span class="timeline-label">' + semester.name + '</span>' +
      '<span class="timeline-cgpa">' + formatGPA(cgpa) + '</span>' +
      '<span class="timeline-credits">' + stats.totalCredits + ' cr | SGPA ' + formatGPA(stats.sgpa) + '</span>';
    
    tile.onclick = function() {
      var el = document.getElementById('semester-' + idx);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    
    timeline.appendChild(tile);
  });
}

function updateWarnings(results) {
  var banner = document.getElementById('warningBanner');
  var text = document.getElementById('warningText');
  
  var consecutiveWarnings = 0;
  var currentCGPA = appState.prevCGPA;
  
  results.forEach(function(result) {
    currentCGPA = result.cgpaAfter;
    if (result.stats.sgpa > 0 && result.stats.sgpa < 2.0) {
      consecutiveWarnings++;
    } else if (result.stats.sgpa > 0) {
      consecutiveWarnings = 0;
    }
  });
  
  if (currentCGPA > 0 && currentCGPA < 2.0) {
    banner.classList.remove('hidden');
    banner.classList.add('danger');
    text.textContent = 'Your CGPA is below 2.00. You are on academic warning. ' + appState.warningCount + ' semester(s) with SGPA below 2.0.';
  } else if (consecutiveWarnings >= 2) {
    banner.classList.remove('hidden');
    banner.classList.add('danger');
    text.textContent = consecutiveWarnings + ' consecutive semesters with SGPA below 2.0. This may lead to academic dismissal.';
  } else if (appState.warningCount > 0) {
    banner.classList.remove('hidden', 'danger');
    text.textContent = appState.warningCount + ' semester(s) had SGPA below 2.0. Monitor your progress closely.';
      } else {
    banner.classList.add('hidden');
  }
}

function updateHealthAdvice(cgpa) {
  var adviceBox = document.getElementById('healthAdvice');
  var adviceList = document.getElementById('adviceList');
  
  var advice = [];
  
  if (cgpa < 2.0) {
    advice.push('Consider reducing your course load next semester to focus on fewer subjects');
    advice.push('Prioritize retaking core subjects where you received low grades');
    advice.push('Avoid taking multiple difficult technical courses together');
  } else if (cgpa < 2.5) {
    advice.push('Consider taking general education or elective courses to balance your load');
    advice.push('Spread out difficult core courses across multiple semesters');
  } else if (cgpa < 2.7) {
    advice.push('You can maintain your current course load');
    advice.push('Consider taking one challenging course per semester while building up');
  } else if (cgpa >= 2.7) {
    advice.push('Good standing - you can handle a heavier course load if needed');
    advice.push('Consider taking on challenging courses or research opportunities');
  }
  
  if (advice.length > 0) {
    adviceList.innerHTML = advice.map(function(a) { return '<li>' + a + '</li>'; }).join('');
    adviceBox.classList.remove('hidden');
  } else {
    adviceBox.classList.add('hidden');
  }
}

function switchChart(type) {
  currentChartType = type;
  var tabs = document.querySelectorAll('.chart-tab');
  tabs.forEach(function(tab) {
    tab.classList.toggle('active', tab.textContent.toLowerCase() === type);
  });
  drawChart();
}

function drawChart() {
  var canvas = document.getElementById('gpaChart');
  if (!canvas) return;
  
  var ctx = canvas.getContext('2d');
  
  var styles = getComputedStyle(document.documentElement);
  var lineColor = styles.getPropertyValue('--chart-line').trim() || '#2563eb';
  var fillColor = styles.getPropertyValue('--chart-fill').trim() || 'rgba(37, 99, 235, 0.08)';
  var gridColor = styles.getPropertyValue('--chart-grid').trim() || '#f1f5f9';
  var textColor = styles.getPropertyValue('--text-muted').trim() || '#94a3b8';
  
  var dataPoints = [];
  var runningCredits = appState.prevCredits;
  var runningPoints = appState.prevPoints;
  
  dataPoints.push({
    label: 'Start',
    sgpa: appState.prevCGPA,
    cgpa: appState.prevCGPA
  });
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (!stats) return;
    
    runningPoints -= stats.repeatDeduction;
    runningCredits += stats.totalCredits;
    runningCredits -= stats.repeatCredits;
    runningPoints += stats.totalPoints;
    
    var cgpa = runningCredits > 0 ? runningPoints / runningCredits : 0;
    
    if (stats.sgpa > 0 || stats.totalCredits > 0) {
      dataPoints.push({
        label: semester.name.replace('Semester ', 'S'),
        sgpa: stats.sgpa,
        cgpa: cgpa
      });
    }
  });
  
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  var width = rect.width;
  var height = rect.height;
  
  if (dataPoints.length < 2) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = textColor;
    ctx.font = '14px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Add grades to see progression chart', width / 2, height / 2);
      return;
    }

  var padding = { top: 20, right: 20, bottom: 36, left: 44 };
  var chartWidth = width - padding.left - padding.right;
  var chartHeight = height - padding.top - padding.bottom;
  
  ctx.clearRect(0, 0, width, height);
  
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  
  for (var i = 0; i <= 4; i++) {
    var y = padding.top + (chartHeight / 4) * (4 - i);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    
    ctx.fillStyle = textColor;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(i.toFixed(1), padding.left - 8, y + 4);
  }
  
  var xStep = chartWidth / (dataPoints.length - 1);
  
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top + chartHeight);
  
  dataPoints.forEach(function(point, i) {
    var x = padding.left + i * xStep;
    var value = currentChartType === 'sgpa' ? point.sgpa : point.cgpa;
    var y = padding.top + chartHeight - (value / 4) * chartHeight;
    ctx.lineTo(x, y);
  });
  
  ctx.lineTo(padding.left + (dataPoints.length - 1) * xStep, padding.top + chartHeight);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  
  dataPoints.forEach(function(point, i) {
    var x = padding.left + i * xStep;
    var value = currentChartType === 'sgpa' ? point.sgpa : point.cgpa;
    var y = padding.top + chartHeight - (value / 4) * chartHeight;
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  
  ctx.stroke();
  
  dataPoints.forEach(function(point, i) {
    var x = padding.left + i * xStep;
    var value = currentChartType === 'sgpa' ? point.sgpa : point.cgpa;
    var y = padding.top + chartHeight - (value / 4) * chartHeight;
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = styles.getPropertyValue('--bg-tertiary').trim() || '#f1f5f9';
    ctx.fill();
    
    ctx.fillStyle = textColor;
    ctx.font = '10px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(point.label, x, height - 8);
    
    ctx.fillStyle = lineColor;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(formatGPA(value), x, y - 10);
  });
}

function calculateTarget() {
  var targetCGPA = parseFloat(document.getElementById('targetCGPA').value) || 3.0;
  var semesters = parseInt(document.getElementById('targetSemesters').value) || 2;
  
  var currentCredits = appState.prevCredits;
  var currentPoints = appState.prevPoints;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (stats) {
      currentPoints -= stats.repeatDeduction;
      currentCredits += stats.totalCredits;
      currentCredits -= stats.repeatCredits;
      currentPoints += stats.totalPoints;
    }
  });
  
  var avgCreditsPerSem = 15;
  var futureCredits = avgCreditsPerSem * semesters;
  var totalFutureCredits = currentCredits + futureCredits;
  
  var requiredTotalPoints = targetCGPA * totalFutureCredits;
  var requiredFuturePoints = requiredTotalPoints - currentPoints;
  var requiredSGPA = requiredFuturePoints / futureCredits;
  
  var resultEl = document.getElementById('targetResult');
  var messageEl = document.getElementById('targetMessage');
  
  resultEl.classList.remove('hidden', 'impossible');
  
  if (requiredSGPA <= 0) {
    messageEl.innerHTML = 'You have already achieved your target CGPA of <strong>' + formatGPA(targetCGPA) + '</strong>.';
  } else if (requiredSGPA > 4.0) {
    resultEl.classList.add('impossible');
    messageEl.innerHTML = 'Target CGPA of <strong>' + formatGPA(targetCGPA) + '</strong> cannot be achieved in ' + semesters + ' semester(s). The required SGPA would be ' + formatGPA(requiredSGPA) + ', which exceeds the maximum of 4.00. Try adding more semesters.';
  } else {
    messageEl.innerHTML = 'To reach a CGPA of <strong>' + formatGPA(targetCGPA) + '</strong>, you need an average SGPA of <strong>' + formatGPA(requiredSGPA) + '</strong> over the next ' + semesters + ' semester(s) (assuming approximately ' + avgCreditsPerSem + ' credits each).';
  }
}

function showRecoveryAdvisor() {
  var section = document.getElementById('recoverySection');
  var grid = document.getElementById('recoveryGrid');
  
  var currentCredits = appState.prevCredits;
  var currentPoints = appState.prevPoints;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (stats) {
      currentPoints -= stats.repeatDeduction;
      currentCredits += stats.totalCredits;
      currentCredits -= stats.repeatCredits;
      currentPoints += stats.totalPoints;
    }
  });
  
  var currentCGPA = currentCredits > 0 ? currentPoints / currentCredits : 0;
  var avgCredits = 15;
  
  var targets = [2.0, 2.5, 3.0];
  var results = targets.map(function(target) {
    if (currentCGPA >= target) {
      return { target: target, semesters: 0, sgpa: 0, achieved: true };
    }
    
    var avgSGPA = 3.5;
    var testCredits = currentCredits;
    var testPoints = currentPoints;
    var sems = 0;
    
    while (sems < 10) {
      testCredits += avgCredits;
      testPoints += avgCredits * avgSGPA;
      sems++;
      
      if (testPoints / testCredits >= target) break;
    }
    
    var reqPoints = target * (currentCredits + avgCredits) - currentPoints;
    var reqSGPA = reqPoints / avgCredits;
    
    return {
      target: target,
      semesters: sems,
      sgpa: reqSGPA,
      achieved: false,
      impossible: reqSGPA > 4.0
    };
  });
  
  grid.innerHTML = results.map(function(r) {
    return '<div class="recovery-card">' +
      '<div class="recovery-target">CGPA ' + formatGPA(r.target) + '</div>' +
      (r.achieved ? 
        '<div class="recovery-value" style="color: var(--success);">Achieved</div>' +
        '<div class="recovery-hint">Already reached</div>'
        :
        '<div class="recovery-value">' + r.semesters + ' sem</div>' +
        '<div class="recovery-hint">' + (r.impossible ? 'Requires more than 1 semester' : 'Required SGPA: ' + formatGPA(r.sgpa)) + '</div>'
      ) +
    '</div>';
  }).join('');
  
  section.classList.remove('hidden');
  section.scrollIntoView({ behavior: 'smooth' });
}

function hideRecoveryAdvisor() {
  document.getElementById('recoverySection').classList.add('hidden');
}

function suggestSemester() {
  var section = document.getElementById('suggestSection');
  var content = document.getElementById('suggestContent');
  
  var currentCredits = appState.prevCredits;
  var currentPoints = appState.prevPoints;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (stats) {
      currentPoints -= stats.repeatDeduction;
      currentCredits += stats.totalCredits;
      currentCredits -= stats.repeatCredits;
      currentPoints += stats.totalPoints;
    }
  });
  
  var cgpa = currentCredits > 0 ? currentPoints / currentCredits : appState.prevCGPA;
  
  var suggestion = '';
  var recommendations = [];
  
  if (cgpa < 2.0) {
    suggestion = 'Conservative load recommended: 12-13 credit hours';
    recommendations = [
      { type: 'Core Technical', credits: '3-6', note: 'Focus on 1-2 weak areas' },
      { type: 'General Education', credits: '3-6', note: 'Balance with manageable courses' },
      { type: 'Elective/Lab', credits: '2-3', note: 'Choose low-stress options' }
    ];
  } else if (cgpa < 2.5) {
    suggestion = 'Moderate load recommended: 14-15 credit hours';
    recommendations = [
      { type: 'Core Technical', credits: '6-9', note: 'Spread difficulty evenly' },
      { type: 'General Education', credits: '3-6', note: 'Include at least one lighter course' },
      { type: 'Elective/Lab', credits: '2-3', note: 'Choose based on interest' }
    ];
  } else if (cgpa < 3.0) {
    suggestion = 'Standard load recommended: 15-17 credit hours';
    recommendations = [
      { type: 'Core Technical', credits: '9-12', note: 'Can handle 3-4 technical courses' },
      { type: 'General Education', credits: '3-6', note: 'As per curriculum requirements' },
      { type: 'Elective/Lab', credits: '2-4', note: 'Explore your interests' }
    ];
  } else {
    suggestion = 'Full load possible: 17-19 credit hours';
    recommendations = [
      { type: 'Core Technical', credits: '12-15', note: 'Can handle heavier technical load' },
      { type: 'General Education', credits: '3-6', note: 'Complete requirements efficiently' },
      { type: 'Advanced/Research', credits: '2-3', note: 'Consider research projects' }
    ];
  }
  
  content.innerHTML = '<p><strong>' + suggestion + '</strong></p>' +
    '<ul>' + recommendations.map(function(r) {
      return '<li><span>' + r.type + ': ' + r.credits + ' cr</span><span style="color: var(--text-muted); font-size: 0.8125rem;">' + r.note + '</span></li>';
    }).join('') + '</ul>';
  
  section.classList.remove('hidden');
  section.scrollIntoView({ behavior: 'smooth' });
}

function hideSuggestSection() {
  document.getElementById('suggestSection').classList.add('hidden');
}

function calculateFailureImpact() {
  var credits = parseFloat(document.getElementById('failCredits').value) || 3;
  var currentGrade = document.getElementById('failCurrentGrade').value;
  
  var totalCredits = appState.prevCredits;
  var totalPoints = appState.prevPoints;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (stats) {
      totalPoints -= stats.repeatDeduction;
      totalCredits += stats.totalCredits;
      totalCredits -= stats.repeatCredits;
      totalPoints += stats.totalPoints;
    }
  });
  
  var currentCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
  
  var newCredits, newPoints, cgpaAfterFail;
  
  if (currentGrade) {
    var oldPoints = credits * getGradePoint(currentGrade);
    newPoints = totalPoints - oldPoints;
    newCredits = totalCredits;
    cgpaAfterFail = newCredits > 0 ? newPoints / newCredits : 0;
  } else {
    newCredits = totalCredits + credits;
    newPoints = totalPoints;
    cgpaAfterFail = newCredits > 0 ? newPoints / newCredits : 0;
  }
  
  var drop = currentCGPA - cgpaAfterFail;
  
  var resultEl = document.getElementById('failureResult');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = '<h4>Impact Analysis</h4>' +
    '<p>Current CGPA: <strong>' + formatGPA(currentCGPA) + '</strong></p>' +
    '<p>CGPA after failure: <strong>' + formatGPA(cgpaAfterFail) + '</strong></p>' +
    '<p>CGPA Drop: <strong style="color: var(--danger);">-' + formatGPA(drop) + '</strong></p>' +
    (cgpaAfterFail < 2.0 ? '<p style="color: var(--danger); font-weight: 600;">Warning: This would put you on academic warning.</p>' : '');
}

function analyzeRepeatOptions() {
  var results = document.getElementById('repeatAnalyzerResults');
  
  var candidates = [];
  
  var totalCredits = appState.prevCredits;
  var totalPoints = appState.prevPoints;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (stats) {
      totalPoints -= stats.repeatDeduction;
      totalCredits += stats.totalCredits;
      totalCredits -= stats.repeatCredits;
      totalPoints += stats.totalPoints;
    }
    
    semester.courses.forEach(function(course) {
      if (course.enabled && course.grade && course.grade !== 'A' && !course.isRepeat) {
        var gradePoint = getGradePoint(course.grade);
        if (gradePoint !== null && gradePoint < 4.0) {
          var currentPointsVal = course.credits * gradePoint;
          var improvedPoints = course.credits * 4.0;
          var pointGain = improvedPoints - currentPointsVal;
          
          var newTotal = totalPoints + pointGain;
          var newCGPA = totalCredits > 0 ? newTotal / totalCredits : 0;
          var currentCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
          var cgpaGain = newCGPA - currentCGPA;
          
          candidates.push({
            name: course.name || 'Unnamed Course',
            credits: course.credits,
            currentGrade: course.grade,
            gradePoint: gradePoint,
            cgpaGain: cgpaGain
          });
        }
      }
    });
  });
  
  candidates.sort(function(a, b) { return b.cgpaGain - a.cgpaGain; });
  
  if (candidates.length === 0) {
    results.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No courses available for repeat analysis. Add courses with grades below A to see which would benefit most from repeating.</p>';
    return;
  }
  
  results.innerHTML = candidates.slice(0, 10).map(function(c, i) {
    return '<div class="repeat-item">' +
      '<div class="repeat-item-info">' +
        '<h4>' + (i + 1) + '. ' + c.name + '</h4>' +
        '<p>' + c.credits + ' credits | Current: ' + c.currentGrade + ' (' + formatGPA(c.gradePoint) + ')</p>' +
      '</div>' +
      '<div class="repeat-item-impact">' +
        '<div class="repeat-impact-value">+' + formatGPA(c.cgpaGain) + '</div>' +
        '<div class="repeat-impact-label">CGPA gain if A</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function saveDegreeRequirements() {
  appState.degreeRequirements = {
    total: parseInt(document.getElementById('reqTotal').value) || 137,
    core: parseInt(document.getElementById('reqCore').value) || 52,
    genEd: parseInt(document.getElementById('reqGenEd').value) || 34,
    math: parseInt(document.getElementById('reqMath').value) || 12,
    majorElec: parseInt(document.getElementById('reqMajorElec').value) || 21,
    domainElec: parseInt(document.getElementById('reqDomainElec').value) || 15,
    supportElec: parseInt(document.getElementById('reqSupportElec').value) || 3
  };
  
  closeDegreeModal();
  recalculateAll();
  saveState();
}

function generateExportPreview() {
  var summary = generateSummary();
  document.getElementById('exportPreview').textContent = summary;
}

function generateSummary() {
  var totalCredits = appState.prevCredits;
  var totalPoints = appState.prevPoints;
  var lastSGPA = 0;
  
  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (stats) {
      totalPoints -= stats.repeatDeduction;
      totalCredits += stats.totalCredits;
      totalCredits -= stats.repeatCredits;
      totalPoints += stats.totalPoints;
      if (stats.sgpa > 0) lastSGPA = stats.sgpa;
    }
  });
  
  var cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  var remaining = appState.degreeRequirements.total - totalCredits;
  
  var targetCGPA = 3.0;
  var futureCredits = 15;
  var requiredPoints = targetCGPA * (totalCredits + futureCredits) - totalPoints;
  var requiredSGPA = requiredPoints / futureCredits;
  
  var summary = 'FAST NUCES Academic Summary\n' +
    '=============================\n' +
    'Generated: ' + new Date().toLocaleDateString() + '\n' +
    'Program: ' + DEPARTMENTS[appState.department].name + '\n\n' +
    'Credits: ' + totalCredits + '\n' +
    'CGPA: ' + formatGPA(cgpa) + '\n' +
    'Standing: ' + getClassification(totalCredits) + '\n' +
    'Last Semester SGPA: ' + formatGPA(lastSGPA) + '\n' +
    'Warning Status: ' + (appState.warningCount > 0 ? appState.warningCount + ' semester(s) below 2.0' : 'None') + '\n' +
    'Remaining Credits: ' + (remaining > 0 ? remaining : 0) + '\n' +
    'Required SGPA for 3.00 CGPA: ' + (requiredSGPA > 4 ? 'Not achievable in 1 semester' : formatGPA(requiredSGPA)) + '\n\n' +
    'Semester Breakdown:\n' +
    '-------------------';

  appState.semesters.forEach(function(semester, idx) {
    var stats = calculateSemesterStats(idx);
    if (!stats) return;
    
    summary += '\n\n' + semester.name + ':';
    semester.courses.forEach(function(course) {
      if (!course.enabled) return;
      var status = course.isRepeat ? ' (Repeat)' : course.isInternship ? ' (Internship)' : '';
      summary += '\n  - ' + (course.name || 'Unnamed') + ': ' + course.credits + ' cr, ' + (course.grade || '-') + status;
    });
    summary += '\n  SGPA: ' + formatGPA(stats.sgpa) + ' | Credits: ' + stats.totalCredits;
  });
  
  return summary;
}

function exportJSON() {
  var data = JSON.stringify(appState, null, 2);
  downloadFile(data, 'academic-plan.json', 'application/json');
}

function exportText() {
  var summary = generateSummary();
  downloadFile(summary, 'academic-summary.txt', 'text/plain');
}

function exportPDF() {
  var summary = generateSummary();
  var printWindow = window.open('', '_blank');
  printWindow.document.write(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<title>Academic Plan - FAST NUCES</title>' +
    '<style>' +
    'body { font-family: Segoe UI, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }' +
    'pre { white-space: pre-wrap; font-family: Consolas, monospace; font-size: 13px; background: #f5f5f5; padding: 24px; border-radius: 8px; }' +
    'h1 { border-bottom: 2px solid #2563eb; padding-bottom: 12px; color: #0f172a; }' +
    '@media print { body { padding: 20px; } }' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<h1>FAST NUCES Academic Plan</h1>' +
    '<pre>' + summary + '</pre>' +
    '<script>window.print(); window.close();<\/script>' +
    '</body>' +
    '</html>'
  );
  printWindow.document.close();
}

function copyToClipboard() {
  var summary = generateSummary();
  navigator.clipboard.writeText(summary).then(function() {
    alert('Copied to clipboard.');
  }).catch(function() {
    var textarea = document.createElement('textarea');
    textarea.value = summary;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard.');
  });
}

function downloadFile(content, filename, type) {
  var blob = new Blob([content], { type: type });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function renderSemesters() {
  var container = document.getElementById('semestersContainer');
  container.innerHTML = '';
  
  appState.semesters.forEach(function(semester, idx) {
    container.appendChild(createSemesterCard(semester, idx));
  });
}

function renderSemester(index) {
  var semester = appState.semesters[index];
  var existingCard = document.getElementById('semester-' + index);
  
  if (existingCard && semester) {
    var newCard = createSemesterCard(semester, index);
    existingCard.replaceWith(newCard);
  }
}

function createSemesterCard(semester, index) {
  var card = document.createElement('div');
  card.className = 'card semester-card' + (semester.type === 'summer' ? ' summer' : '');
  card.id = 'semester-' + index;
  
  var badgeClass = semester.type === 'summer' ? 'summer' : '';
  var stats = calculateSemesterStats(index);
  var healthClass = stats?.health || '';
  
  card.innerHTML = 
    '<div class="section-header">' +
      '<h2>' +
        '<input type="text" class="course-name-input" value="' + semester.name + '" ' +
               'onchange="updateSemesterName(' + index + ', this.value)" style="font-size: 1.125rem; font-weight: 600; min-width: 140px;">' +
        '<span class="semester-badge ' + badgeClass + '">' + (semester.type === 'summer' ? 'Summer' : 'Sem ' + (index + appState.currentSemester)) + '</span>' +
        (healthClass ? '<span class="semester-health ' + healthClass + '" title="SGPA Status"></span>' : '') +
      '</h2>' +
      '<div class="semester-actions">' +
        '<button class="semester-import-btn" onclick="openImportTemplateModal(' + index + ')">Import</button>' +
        '<button class="btn-text" onclick="toggleAllCourses(' + index + ', true)">Enable All</button>' +
        '<button class="btn-text" onclick="toggleAllCourses(' + index + ', false)">Disable All</button>' +
        '<button class="btn-text" onclick="openBulkModal(' + index + ')">Paste</button>' +
        '<button class="btn-icon" onclick="moveSemester(' + index + ', -1)" title="Move Up"' + (index === 0 ? ' disabled' : '') + '>Up</button>' +
        '<button class="btn-icon" onclick="moveSemester(' + index + ', 1)" title="Move Down"' + (index === appState.semesters.length - 1 ? ' disabled' : '') + '>Down</button>' +
        '<button class="btn-icon danger" onclick="removeSemester(' + index + ')" title="Delete Semester">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div class="course-list" id="courseList-' + index + '">' +
      semester.courses.map(function(course) { return createCourseRow(course, index); }).join('') +
    '</div>' +
    '<div class="add-course-row">' +
      '<button class="btn-add-course" onclick="addCourse(' + index + ')">+ Add Course</button>' +
    '</div>' +
    '<div class="stats-row">' +
      '<div class="stat">' +
        '<span class="stat-label">Credits</span>' +
        '<span class="stat-value" id="sem' + index + 'Credits">0</span>' +
      '</div>' +
      '<div class="stat">' +
        '<span class="stat-label">Semester GPA</span>' +
        '<span class="stat-value" id="sem' + index + 'SGPA">0.00</span>' +
      '</div>' +
      '<div class="stat primary">' +
        '<span class="stat-label">CGPA After</span>' +
        '<span class="stat-value" id="sem' + index + 'CGPA">0.00</span>' +
      '</div>' +
    '</div>';
  
  return card;
}

function createCourseRow(course, semesterIdx) {
  var gradeOptions = GRADE_OPTIONS.map(function(g) {
    return '<option value="' + g + '"' + (course.grade === g ? ' selected' : '') + '>' + g + '</option>';
  }).join('');
  
  var disabledClass = course.enabled ? '' : ' disabled';
  var repeatClass = course.isRepeat ? ' repeat' : '';
  var internshipClass = course.isInternship ? ' internship' : '';
  
  return '<div class="course-item' + disabledClass + repeatClass + internshipClass + '" id="course-' + course.id + '">' +
      '<input type="checkbox" class="course-checkbox" ' + (course.enabled ? 'checked' : '') +
             ' onchange="updateCourse(' + semesterIdx + ', \'' + course.id + '\', \'enabled\', this.checked)">' +
      '<input type="text" class="course-name-input" value="' + course.name + '" placeholder="Course Name"' +
             ' onchange="updateCourse(' + semesterIdx + ', \'' + course.id + '\', \'name\', this.value)">' +
      '<input type="number" class="credit-input" value="' + course.credits + '" min="1" max="6"' +
             ' onchange="updateCourse(' + semesterIdx + ', \'' + course.id + '\', \'credits\', this.value)"' +
             (course.enabled ? '' : ' disabled') + '>' +
      '<select class="grade-select" onchange="updateCourse(' + semesterIdx + ', \'' + course.id + '\', \'grade\', this.value)"' +
              (course.enabled ? '' : ' disabled') + '>' +
        '<option value="">Grade</option>' +
        gradeOptions +
      '</select>' +
      '<div class="course-actions">' +
        '<button class="action-btn' + (course.isRepeat ? ' active' : '') + '" ' +
                'onclick="toggleCourseFlag(' + semesterIdx + ', \'' + course.id + '\', \'isRepeat\')"' +
                ' title="Mark as repeat course - original grade will be replaced">Repeat</button>' +
        '<button class="action-btn' + (course.isInternship ? ' active intern' : '') + '" ' +
                'onclick="toggleCourseFlag(' + semesterIdx + ', \'' + course.id + '\', \'isInternship\')"' +
                ' title="Mark as internship - counts in CGPA but not semester GPA">Internship</button>' +
      '</div>' +
      '<button class="btn-icon danger" onclick="removeCourse(' + semesterIdx + ', \'' + course.id + '\')" title="Delete Course">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
      '</button>' +
    '</div>';
}

document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  
  var hasState = loadState();
  
  if (hasState && appState.initialized) {
    document.getElementById('programName').textContent = DEPARTMENTS[appState.department]?.name || 'Academic Planner';
    showLoadingAnimationOnRestore();
  } else {
    openSetupModal();
  }
  
  document.getElementById('startPlanningBtn').addEventListener('click', initializeApp);
  
  document.getElementById('selectDepartment').addEventListener('change', function() {
    var genericGroup = document.getElementById('genericCreditsGroup');
    if (this.value === 'GEN') {
      genericGroup.classList.remove('hidden');
    } else {
      genericGroup.classList.add('hidden');
    }
    updateDegreeSummary();
  });
  
  document.getElementById('initCredits').addEventListener('input', updateDegreeSummary);
  document.getElementById('customCredits').addEventListener('input', updateDegreeSummary);
  
  var importSemSelect = document.getElementById('importSemesterSelect');
  if (importSemSelect) {
    importSemSelect.addEventListener('change', updateImportPreview);
  }
  
  document.querySelectorAll('#setupModal input').forEach(function(input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') initializeApp();
    });
  });
  
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal && modal.id !== 'setupModal') {
        modal.classList.remove('active');
      }
    });
  });
  
  document.getElementById('targetCGPA').addEventListener('change', calculateTarget);
  document.getElementById('targetSemesters').addEventListener('change', calculateTarget);
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(function(modal) {
        if (modal.id !== 'setupModal' || appState.initialized) {
          modal.classList.remove('active');
        }
      });
    }
  });
  
  window.addEventListener('resize', function() {
    if (appState.initialized) {
      setTimeout(function() { drawChart(); }, 100);
    }
  });
  
  // Initialize view counter
  initViewCounter();
});

// View Counter - Syncs with Vercel Analytics
function initViewCounter() {
  var viewCountEl = document.getElementById('viewCount');
  if (!viewCountEl) return;
  
  // Use localStorage for view tracking
  // When deployed on Vercel, the actual analytics will be in the Vercel Dashboard
  var viewKey = 'fastgpa_total_views';
  var lastVisitKey = 'fastgpa_last_visit';
  
  var currentViews = parseInt(localStorage.getItem(viewKey) || '0');
  var lastVisit = localStorage.getItem(lastVisitKey);
  var now = new Date().toDateString();
  
  // Increment view count (once per session/day)
  if (lastVisit !== now) {
    currentViews++;
    localStorage.setItem(viewKey, currentViews.toString());
    localStorage.setItem(lastVisitKey, now);
  }
  
  // Display the count with animation
  animateViewCount(viewCountEl, currentViews);
}

function animateViewCount(element, target) {
  var current = 0;
  var duration = 1000;
  var step = Math.ceil(target / (duration / 16));
  
  function update() {
    current += step;
    if (current >= target) {
      element.textContent = formatViewCount(target);
    } else {
      element.textContent = formatViewCount(current);
      requestAnimationFrame(update);
    }
  }
  
  if (target > 0) {
    update();
  } else {
    element.textContent = '0';
  }
}

function formatViewCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toLocaleString();
}
