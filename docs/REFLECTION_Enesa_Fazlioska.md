# CourseGraph - Personal Reflection

**Project:** CourseGraph
**Name:** Enesa Fazlioska
**Student ID:** wi23b128
**Date:** 25.01.2026

---

## Table of Contents

1. [Personal Contribution](#1-personal-contribution)
2. [Personal Development as an Engineer](#2-personal-development-as-an-engineer)
3. [Personal Development as a Person](#3-personal-development-as-a-person)
4. [Summary](#4-summary)

---

## 1. Personal Contribution

### 1.1 Role in the Team

**My Role:** Developer / QA Lead

**Main Responsibilities:**
- Data persistence implementation (Save/Load/Export - FR5)
- Export functionality (PNG, Excel, JSON)
- Undo/Redo system implementation
- Performance and accessibility testing
- Bug fixes and quality assurance

### 1.2 Technical Contributions

#### Features I Implemented

| Feature | Description | Files Modified | Complexity |
|---------|-------------|----------------|------------|
| Save Graph as JSON | Complete graph state serialization | App.jsx, exportUtils.js | Medium |
| Export as PNG | High-quality image export with html-to-image | exportUtils.js, App.jsx | High |
| Export as Excel | Structured spreadsheet export with node/edge data | exportUtils.js, excelExport.js | High |
| Undo/Redo Functionality | Full history stack with state management | useHistory.js, App.jsx | High |
| Performance Testing (NFR2) | Optimization for 100+ nodes at 30 FPS | Various components | Medium |
| Accessibility Testing (NFR4) | Keyboard navigation and WCAG compliance | Various components, styles | Medium |
| Open/Close Triangles | Collapsible sidebar toggle indicators | Sidebar components | Low |
| Save/Load Function Enhancement | File dialog integration and error handling | App.jsx, fileUtils.js | Medium |
| Properties Panel | Node properties display and editing | PropertiesPanel.jsx | Medium |

#### Code Examples

**Example 1: Export as PNG**
```javascript
// exportUtils.js - High-quality PNG export using html-to-image
import { toPng } from 'html-to-image';

const exportToPNG = async (elementRef, filename = 'coursegraph') => {
  try {
    const dataUrl = await toPng(elementRef.current, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('PNG export failed');
  }
};
```

**Example 2: Undo/Redo Hook**
```javascript
// useHistory.js - Custom hook for undo/redo functionality
const useHistory = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pushState = useCallback((newState) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [history, currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [history, currentIndex]);

  return { currentState: history[currentIndex], pushState, undo, redo, canUndo: currentIndex > 0, canRedo: currentIndex < history.length - 1 };
};
```

**Example 3: Excel Export**
```javascript
// excelExport.js - Structured Excel export
import * as XLSX from 'xlsx';

const exportToExcel = (nodes, edges, filename = 'coursegraph') => {
  const nodesData = nodes.map(node => ({
    ID: node.id,
    Type: node.data.type,
    Label: node.data.label,
    Level: node.data.level,
    Description: node.data.description || '',
    Tags: node.data.tags?.join(', ') || '',
  }));

  const edgesData = edges.map(edge => ({
    Source: edge.source,
    Target: edge.target,
    Type: edge.data?.type || 'default',
    Label: edge.label || '',
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(nodesData), 'Nodes');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(edgesData), 'Edges');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
```

#### Bug Fixes

| Bug | Description | How I Fixed It |
|-----|-------------|----------------|
| PNG export blank output | Export captured empty canvas when nodes were off-screen | Calculated bounding box of all nodes, centered viewport before export |
| Excel formatting issues | Cell data was not properly formatted for different types | Added type detection and proper cell formatting for each column |
| Undo memory leak | History array grew indefinitely causing memory issues | Implemented max history limit (50 states) with automatic cleanup |
| Save file corruption | Large graphs caused JSON stringify issues | Implemented chunked serialization and added validation on load |
| Performance lag with undo | Storing complete state copies was slow | Implemented diff-based history for better performance |

### 1.3 Non-Technical Contributions

| Contribution | Description |
|--------------|-------------|
| Quality Assurance | Led QA efforts, created test checklists, tracked bugs |
| User Testing | Conducted usability testing sessions, gathered feedback |
| Performance Monitoring | Profiled application performance, identified bottlenecks |
| Accessibility Review | Ensured WCAG compliance, tested keyboard navigation |
| Documentation | Contributed to testing documentation and user handbook |
| Code Reviews | Reviewed PRs for export and data persistence features |

### 1.4 Time Investment

| Activity | Hours | Percentage |
|----------|-------|------------|
| Implementation | 47h | 60% |
| Testing | 20h | 25% |
| Documentation | 5.33h | 7% |
| Bug Fixes | 6.5h | 8% |
| **Total** | **78.83h** | **100%** |

### 1.5 Collaboration with Team Members

**How I collaborated:**
- Worked closely with Ambar on data persistence architecture
- Pair programming sessions with Julia on Properties Panel enhancement
- Coordinated with Julia on integration between export features and UI components
- Regular code reviews and knowledge sharing sessions

**Challenges in collaboration and how we solved them:**
- **Export format compatibility** - Worked with Julia to ensure exported data matched import expectations, created shared data schema
- **State management for undo/redo** - Collaborated with Ambar to integrate history management with ReactFlow state
- **Testing coordination** - Created shared test checklists with Julia to avoid duplicate effort

---

## 2. Personal Development as an Engineer

### 2.1 Technical Skills Learned

#### New Technologies

| Technology | Before Project | After Project | How I Learned |
|------------|----------------|---------------|---------------|
| React | Basic | Intermediate | Project implementation, hooks, state management |
| ReactFlow | None | Intermediate | Documentation, implementation, debugging |
| html-to-image | None | Intermediate | Library exploration, PNG export implementation |
| XLSX.js | None | Intermediate | Excel export implementation, documentation |
| Vitest | None | Basic | Writing tests, test configuration |
| Git/GitHub | Basic | Intermediate | Daily collaboration, PRs, branching |

#### Programming Concepts

| Concept | What I Learned |
|---------|----------------|
| State Management | Managing complex application state with undo/redo history |
| Data Serialization | JSON serialization strategies, handling circular references |
| File Export | Different export formats (PNG, Excel, JSON), browser file APIs |
| Performance Optimization | Profiling, memory management, render optimization |
| Testing Strategies | Unit testing, integration testing, usability testing |
| Accessibility | WCAG guidelines, keyboard navigation, screen reader compatibility |

### 2.2 Software Engineering Practices

| Practice | What I Learned | How I Applied It |
|----------|----------------|------------------|
| Quality Assurance | Test planning, bug tracking, regression testing | Created QA checklists, led testing efforts |
| Version Control | Feature branches, code reviews, merge strategies | Created 10+ PRs, participated in code reviews |
| Agile/Scrum | Sprint participation, task estimation | Contributed to sprint planning and retrospectives |
| Documentation | Technical writing, user guides | Contributed to testing and user documentation |
| Performance Testing | Profiling tools, optimization techniques | Tested and optimized for 100+ nodes |
| Accessibility Testing | WCAG compliance, screen reader testing | Ensured keyboard navigation and contrast |

### 2.3 Problem-Solving Examples

**Problem 1: PNG Export Quality**
- **Situation:** Initial PNG exports were blurry and sometimes captured empty canvas
- **Approach:** Researched html-to-image library options, experimented with settings
- **Solution:** Used pixelRatio: 2 for higher quality, calculated node bounding box to ensure all nodes visible
- **Learning:** Image export requires careful consideration of viewport and resolution

**Problem 2: Undo/Redo Memory Management**
- **Situation:** Undo history caused memory issues with large graphs
- **Approach:** Profiled memory usage, researched common undo/redo patterns
- **Solution:** Implemented history limit of 50 states, used diff-based storage for efficiency
- **Learning:** Trade-offs between functionality and performance must be carefully balanced

**Problem 3: Excel Export Formatting**
- **Situation:** Excel files had inconsistent formatting and missing data
- **Approach:** Studied XLSX.js documentation, tested with various data types
- **Solution:** Created structured data transformation with proper type handling per column
- **Learning:** Data export requires careful mapping between internal and external formats

### 2.4 Areas for Improvement

| Area | Current Level | Goal | How to Improve |
|------|---------------|------|----------------|
| React | Intermediate | Advanced | Build more complex applications, learn advanced patterns |
| Testing | Basic | Intermediate | Learn TDD, practice writing comprehensive test suites |
| TypeScript | None | Basic | Take online course, practice with personal projects |
| Performance Optimization | Basic | Intermediate | Study profiling tools, learn optimization techniques |
| CI/CD | None | Basic | Learn GitHub Actions, automated testing pipelines |

---

## 3. Personal Development as a Person

### 3.1 Soft Skills Development

| Skill | Before | After | Evidence |
|-------|--------|-------|----------|
| Communication | Basic | Intermediate | Explained technical concepts to team, reported bugs clearly |
| Teamwork | Basic | Intermediate | Collaborated on shared features, supported team members |
| Time Management | Basic | Intermediate | Met sprint deadlines, balanced multiple responsibilities |
| Problem Solving | Basic | Intermediate | Resolved complex technical issues with export features |
| Attention to Detail | Intermediate | Advanced | QA lead role, thorough testing, bug identification |
| Adaptability | Basic | Intermediate | Learned new libraries quickly, adjusted to changing requirements |

### 3.2 Challenges Overcome

**Challenge 1: Learning Multiple New Technologies**
- **What was difficult:** Needed to learn React, ReactFlow, html-to-image, and XLSX.js simultaneously
- **How I overcame it:** Focused on one technology at a time, used documentation and tutorials
- **What I learned about myself:** I can learn new technologies effectively when I stay focused and organized

**Challenge 2: QA Lead Responsibility**
- **What was difficult:** First time leading quality assurance efforts for a team project
- **How I overcame it:** Created structured test plans, communicated clearly about bugs, prioritized issues
- **What I learned about myself:** I enjoy ensuring quality and can take leadership in specialized areas

### 3.3 Working in a Team

**What I enjoyed about teamwork:**
- Learning from more experienced team members like Ambar
- Collaborative problem-solving when stuck on complex issues
- Seeing our individual contributions come together into a complete application

**What was challenging about teamwork:**
- Coordinating schedules for pair programming and meetings
- Communicating technical problems clearly to team members
- Balancing individual tasks with team coordination

**How I contributed to team dynamics:**
- Maintained positive attitude during challenging debugging sessions
- Provided thorough bug reports with reproduction steps
- Supported team members with testing their features

### 3.4 Handling Pressure and Deadlines

**How I managed stress:**
- Broke large features into smaller, manageable tasks
- Asked for help when stuck instead of struggling alone
- Used the sprint structure to pace work appropriately
- Celebrated small wins when completing features

**What I would do differently next time:**
- Start testing earlier in the development cycle
- Ask more questions during initial planning phase
- Document my code better as I write it

### 3.5 Personal Insights

**What surprised me about this project:**
- How much complexity is hidden in "simple" features like export functionality
- How important thorough testing is for a reliable application
- How much I learned from working with more experienced developers

**What I'm most proud of:**
- Building a complete undo/redo system that actually works reliably
- Implementing multiple export formats that produce professional-quality output
- Contributing to a real application that solves a practical problem

**What I would do differently:**
- Ask more questions earlier when requirements were unclear
- Write tests while developing features, not after
- Document architectural decisions as they were made

---

## 4. Summary

### 4.1 Key Takeaways

**Technical:**
1. Export functionality requires careful handling of different formats and edge cases
2. Undo/redo systems need thoughtful design for memory efficiency
3. Quality assurance is essential for reliable software
4. Performance testing should happen throughout development, not just at the end

**Personal:**
1. Asking for help is a sign of strength, not weakness
2. Clear communication reduces debugging time and improves collaboration
3. Taking ownership of quality leads to better outcomes for the entire team
4. Learning new technologies is manageable when approached systematically

### 4.2 How This Project Prepared Me for the Future

**For my career:**
- Gained experience with real-world data export and persistence
- Developed QA and testing skills valuable in any development role
- Built portfolio piece demonstrating full-stack frontend capabilities

**For future projects:**
- Will advocate for testing from the beginning
- Will document my code and decisions as I work
- Will ask more questions during planning phases
- Will take ownership of quality assurance in future teams

**For personal growth:**
- More confident in learning new technologies
- Better at communicating technical concepts
- Improved problem-solving approach with systematic debugging

### 4.3 Final Reflection

This project was a significant learning experience for me. Building CourseGraph gave me the opportunity to work on challenging features like the export system and undo/redo functionality that I never would have tackled on my own. The complexity of creating reliable data persistence across multiple formats (JSON, PNG, Excel) taught me that seemingly simple features often have hidden complexity.

What I valued most was the opportunity to take ownership of the QA lead role. While testing might seem less glamorous than feature development, I discovered that ensuring quality is crucial for a reliable application. The systematic approach to testing - creating test plans, documenting bugs, verifying fixes - improved not just the product but also my engineering mindset.

Working with Ambar and Julia was inspiring. Their experience and willingness to help me learn new concepts accelerated my growth significantly. The pair programming sessions were particularly valuable, as seeing how more experienced developers approach problems taught me techniques I will use throughout my career.

Looking back, I'm proud of what we achieved together. The export functionality I built produces professional-quality outputs, and the undo/redo system provides a smooth user experience. These features required significant problem-solving and persistence to get right.

Going forward, I want to continue developing my testing skills and learn TypeScript for better code quality. This project has confirmed my interest in frontend development while also showing me the importance of quality assurance. I'm grateful for this experience and excited to apply what I've learned in future projects.

---

## Appendix: Evidence of Contribution

### Evidence Location

All screenshots and visual evidence can be found in: `docs/screenshots/`

**Note:** The Git commit and push history shows who implemented each feature. Each commit is attributed to the developer who did the work.

### Key Links

- **GitHub Repository:** https://github.com/wi23b162/coursegraph
- **Pull Requests:** https://github.com/wi23b162/coursegraph/pulls?q=is%3Apr+author%3Aenesa
- **Commits:** https://github.com/wi23b162/coursegraph/commits?author=enesa

### Other Evidence

- QA test checklists and bug reports
- Export feature documentation
- Performance testing results


---

*Personal Reflection for FH Technikum Wien - Software Engineering Project*
*Submitted: 25.01.2026*
