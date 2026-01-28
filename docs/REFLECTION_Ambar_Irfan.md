# CourseGraph - Personal Reflection

**Project:** CourseGraph
**Name:** Ambar Irfan
**Student ID:** wi23b162
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

**My Role:** Lead Developer / Scrum Master

**Main Responsibilities:**
- Project architecture and infrastructure setup
- Core functionality implementation (FR1, FR2, FR3)
- Visual design and UI component development
- Sprint planning and team coordination
- Code reviews and technical guidance

### 1.2 Technical Contributions

#### Features I Implemented

| Feature | Description | Files Modified | Complexity |
|---------|-------------|----------------|------------|
| Project Setup | Electron + React + Vite configuration | electron/, vite.config.js, package.json | High |
| Custom Node Components | LEO and Assessment node types with badges | CustomNode.jsx, nodeTypes.js | Medium |
| Node Create/Edit/Delete (FR1) | Full CRUD operations with EditNodeDialog | App.jsx, EditNodeDialog.jsx | High |
| Add Node Dialog | Type selection and initial properties | AddNodeDialog.jsx | Medium |
| Connect Nodes (FR2) | Edge creation with EdgeTypeDialog | EdgeTypeDialog.jsx, edgeTypes.js | High |
| Interactive Graph (FR3) | Zoom, pan, drag with smooth interactions | App.jsx, Canvas.jsx | Medium |
| Edge Labels & Types | requires/implies/tested_by relationships | CustomEdge.jsx, edgeTypes.js | Medium |
| Node Styling | Color scheme by level, visual differentiation | CustomNode.jsx, styles.css | Medium |
| Node Badges | ID and Level badges on nodes | CustomNode.jsx | Low |
| Toolbar & UI | Modern toolbar with action buttons | Toolbar.jsx, components/ | Medium |
| MiniMap | Styled minimap for navigation | App.jsx, minimap styles | Low |
| Auto-Save | LocalStorage with 30s interval | useAutoSave.js, App.jsx | Medium |
| Open/Close Column | Collapsible sidebar functionality | Sidebar.jsx | Low |
| Edit Connections | Modify existing edge relationships | EdgeTypeDialog.jsx | Medium |

#### Code Examples

**Example 1: Custom Node Component**
```javascript
// CustomNode.jsx - Reusable node component with type differentiation
const CustomNode = ({ data, selected }) => {
  const getNodeStyle = () => ({
    backgroundColor: data.type === 'leo' ? '#3b82f6' : '#22c55e',
    borderColor: selected ? '#f59e0b' : 'transparent',
  });

  return (
    <div className={`custom-node ${data.type}`} style={getNodeStyle()}>
      <div className="node-badge">{data.id}</div>
      <div className="node-title">{data.label}</div>
      <div className="node-level">Level {data.level}</div>
    </div>
  );
};
```

**Example 2: Auto-Save Hook**
```javascript
// useAutoSave.js - Custom hook for automatic graph persistence
const useAutoSave = (nodes, edges, interval = 30000) => {
  useEffect(() => {
    const timer = setInterval(() => {
      const graphState = { nodes, edges, timestamp: Date.now() };
      localStorage.setItem('coursegraph-autosave', JSON.stringify(graphState));
    }, interval);
    return () => clearInterval(timer);
  }, [nodes, edges, interval]);
};
```

#### Bug Fixes

| Bug | Description | How I Fixed It |
|-----|-------------|----------------|
| Node drag lag | Performance issues when dragging nodes with many edges | Implemented useCallback for event handlers, reduced re-renders |
| Edge disconnect on edit | Edges would disconnect when editing node properties | Preserved edge references during node updates |
| MiniMap sync | MiniMap viewport not syncing correctly | Fixed viewport calculation and added proper event listeners |
| Dialog focus trap | Focus would escape modal dialogs | Implemented proper focus management with useRef |

### 1.3 Non-Technical Contributions

| Contribution | Description |
|--------------|-------------|
| Project Management | Led sprint planning meetings, managed task distribution |
| Architecture Design | Designed component structure and data flow architecture |
| Code Reviews | Reviewed and approved pull requests from team members |
| Documentation | Contributed to technical documentation and README |
| Mentoring | Helped team members with React and ReactFlow concepts |
| Git Workflow | Established branching strategy and merge guidelines |

### 1.4 Time Investment

| Activity | Hours | Percentage |
|----------|-------|------------|
| Implementation | 63h | 70% |
| Design/Planning | 8h | 9% |
| Testing | 4h | 4% |
| Documentation | 5.33h | 6% |
| Meetings | 5h | 6% |
| Learning/Research | 5h | 6% |
| **Total** | **90.33h** | **100%** |

### 1.5 Collaboration with Team Members

**How I collaborated:**
- Pair programming sessions with Julia on Node Create/Edit/Delete (FR1) and Connect Nodes (FR2)
- Code reviews for Julia's advanced features (auto-layout, search/filter)
- Code reviews for Enesa's export functionality (PNG, Excel, JSON)
- Helped both team members with ReactFlow event handling and state management
- Joint debugging sessions for complex integration issues

**Challenges in collaboration and how we solved them:**
- **Merge conflicts in App.jsx** - Established clearer component boundaries, extracted features into separate files
- **Different coding styles** - Agreed on ESLint configuration and formatting rules
- **Knowledge gaps in ReactFlow** - Conducted team knowledge sharing sessions, documented common patterns

---

## 2. Personal Development as an Engineer

### 2.1 Technical Skills Learned

#### New Technologies

| Technology | Before Project | After Project | How I Learned |
|------------|----------------|---------------|---------------|
| Electron | None | Intermediate | Documentation, tutorials, hands-on development |
| React | Basic | Advanced | Project implementation, complex state management |
| ReactFlow | None | Advanced | Official docs, custom node implementation, community examples |
| Vite | Basic | Intermediate | Configuration, HMR optimization |
| Git/GitHub | Basic | Advanced | Daily collaboration, PR workflows, conflict resolution |
| Vitest | None | Basic | Writing unit tests, RTL integration |

#### Programming Concepts

| Concept | What I Learned |
|---------|----------------|
| State Management | Complex state management with React hooks, lifting state, and context |
| Component Architecture | Building reusable, composable components with clear interfaces |
| Event Handling | ReactFlow's node/edge event system, custom event handlers |
| Data Persistence | LocalStorage API, JSON serialization, auto-save patterns |
| Performance Optimization | useCallback, useMemo, avoiding unnecessary re-renders |
| Custom Hooks | Creating reusable logic with custom React hooks |

### 2.2 Software Engineering Practices

| Practice | What I Learned | How I Applied It |
|----------|----------------|------------------|
| Version Control | Feature branches, rebasing, PR workflows | Created 20+ PRs, reviewed 15+ PRs |
| Code Review | Constructive feedback, catching bugs early | Established review checklist for team |
| Agile/Scrum | Sprint planning, daily standups, retrospectives | Led 4 sprint cycles, 5+ planning meetings |
| Documentation | Architecture docs, inline comments, README | Created technical documentation structure |
| Testing | Unit testing with Vitest, component testing with RTL | Contributed to test suite |
| CI/CD | GitHub Actions basics, automated builds | Set up initial CI pipeline |

### 2.3 Problem-Solving Examples

**Problem 1: ReactFlow Performance with Complex Nodes**
- **Situation:** Custom nodes with multiple elements caused lag during interactions
- **Approach:** Profiled rendering with React DevTools, identified unnecessary re-renders
- **Solution:** Implemented React.memo on CustomNode, used useCallback for event handlers
- **Learning:** Importance of profiling before optimization, understanding React's reconciliation

**Problem 2: Auto-Save State Consistency**
- **Situation:** Auto-save was capturing stale state, causing data inconsistency
- **Approach:** Investigated closure behavior in setInterval, researched React patterns
- **Solution:** Used useRef to store latest state reference, updated ref in useEffect
- **Learning:** Deep understanding of closures and React's useRef vs useState

**Problem 3: Electron Build Configuration**
- **Situation:** Different build outputs on Windows, macOS, and Linux development machines
- **Approach:** Researched Electron builder configurations, tested on multiple platforms
- **Solution:** Created unified build config with platform-specific overrides
- **Learning:** Cross-platform development challenges, importance of consistent environments

### 2.4 Areas for Improvement

| Area | Current Level | Goal | How to Improve |
|------|---------------|------|----------------|
| TypeScript | Basic | Advanced | Migrate project to TypeScript, take online course |
| Testing | Basic | Intermediate | Learn TDD, increase test coverage in future projects |
| Backend Development | None | Basic | Learn Node.js/Express for full-stack capabilities |
| CI/CD | Basic | Intermediate | Implement comprehensive pipeline with testing and deployment |
| System Design | Basic | Intermediate | Study design patterns, practice architecture decisions |

---

## 3. Personal Development as a Person

### 3.1 Soft Skills Development

| Skill | Before | After | Evidence |
|-------|--------|-------|----------|
| Communication | Intermediate | Advanced | Led sprint meetings, presented demos, provided technical explanations |
| Teamwork | Intermediate | Advanced | Collaborated on shared features, supported team members |
| Time Management | Basic | Intermediate | Met all sprint deadlines, balanced multiple responsibilities |
| Problem Solving | Intermediate | Advanced | Resolved complex technical issues independently |
| Leadership | Basic | Intermediate | Took initiative as Scrum Master, guided technical decisions |
| Adaptability | Intermediate | Advanced | Learned new technologies quickly, adjusted to changing requirements |

### 3.2 Challenges Overcome

**Challenge 1: Leading Without Authority**
- **What was difficult:** As Scrum Master but also a peer, balancing leadership with collaboration
- **How I overcame it:** Focused on servant leadership, facilitated rather than dictated, earned trust through technical contribution
- **What I learned about myself:** I can influence through expertise and support rather than position

**Challenge 2: Balancing Depth vs. Breadth**
- **What was difficult:** Wanting to implement everything myself vs. delegating to team members
- **How I overcame it:** Recognized the value of team contribution, focused on architecture and mentoring
- **What I learned about myself:** Letting go of control leads to better outcomes and team growth

### 3.3 Working in a Team

**What I enjoyed about teamwork:**
- Collaborative problem-solving sessions where different perspectives led to better solutions
- Seeing team members grow in their skills and confidence
- Sharing knowledge and learning from each other's approaches

**What was challenging about teamwork:**
- Coordinating schedules for meetings and pair programming
- Maintaining consistent code quality across different contributors
- Managing different working styles and communication preferences

**How I contributed to team dynamics:**
- Created welcoming environment for questions and discussions
- Provided technical guidance without being condescending
- Celebrated team achievements and acknowledged individual contributions

### 3.4 Handling Pressure and Deadlines

**How I managed stress:**
- Broke large tasks into smaller, manageable pieces
- Used the sprint structure to pace work and avoid last-minute rushes
- Took breaks when stuck, often finding solutions after stepping away
- Maintained realistic expectations and communicated early about blockers

**What I would do differently next time:**
- Start documentation earlier to avoid end-of-project rush
- Build in more buffer time for unexpected technical challenges
- Practice saying "no" to feature creep more firmly

### 3.5 Personal Insights

**What surprised me about this project:**
- How much I enjoyed the architecture and planning aspects, not just coding
- The complexity of building a polished desktop application
- How much I learned from teaching and explaining concepts to others

**What I'm most proud of:**
- Building a fully functional desktop application from scratch
- Successfully leading a team through a complete development cycle
- Creating reusable component architecture that the team could build upon

**What I would do differently:**
- Implement TypeScript from the beginning for better type safety
- Write tests alongside feature development, not after
- Document architectural decisions as they were made

---

## 4. Summary

### 4.1 Key Takeaways

**Technical:**
1. Electron + React + Vite is a powerful stack for desktop applications
2. ReactFlow provides excellent foundation for graph-based UIs
3. State management architecture is crucial for scalable applications
4. Performance optimization should be measured, not assumed

**Personal:**
1. Leadership is about enabling others, not controlling outcomes
2. Clear communication reduces friction and improves collaboration
3. Balancing technical depth with project management requires conscious effort
4. Teaching others solidifies and deepens my own understanding

### 4.2 How This Project Prepared Me for the Future

**For my career:**
- Gained experience with production-ready desktop application development
- Developed leadership and project management skills alongside technical skills
- Built portfolio piece demonstrating full-stack frontend development

**For future projects:**
- Will advocate for testing from day one
- Will use TypeScript for better code quality
- Will document architecture decisions as they're made
- Will establish clear team workflows early in the project

**For personal growth:**
- More confident in taking technical leadership roles
- Better at balancing perfectionism with pragmatism
- Improved at communicating technical concepts to different audiences

### 4.3 Final Reflection

This project was a significant milestone in my development as a software engineer. Building CourseGraph from an idea to a fully functional desktop application taught me that software development is as much about people and process as it is about code. The technical challenges - integrating Electron with React, building custom ReactFlow components, implementing complex features like undo/redo and auto-save - pushed me to learn deeply and think carefully about architecture.

What I valued most was the opportunity to lead a team through a complete development cycle. As Scrum Master, I learned that good leadership means enabling others to do their best work, not doing everything myself. Watching Julia and Enesa grow in confidence and capability throughout the project was incredibly rewarding. Our different strengths complemented each other: my focus on architecture and core functionality, Julia's work on advanced features and testing, and Enesa's expertise in export functionality and quality assurance.

Looking back, I'm proud of what we built together. CourseGraph is a real application that solves a real problem, and the codebase reflects the care we put into making it maintainable and well-structured. The challenges we faced - performance optimization, state management, cross-platform builds - are the same challenges faced by professional development teams. Overcoming them has given me confidence that I'm ready for the demands of professional software development.

Going forward, I will carry the lessons learned about testing early, documenting decisions, and enabling team collaboration. This project has confirmed my passion for frontend development and architecture, while also revealing areas where I want to grow: backend development, TypeScript proficiency, and advanced testing practices. I'm grateful for this experience and excited to apply what I've learned in future projects.

---

## Appendix: Evidence of Contribution

### GitHub Contributions

**Commits:** 45+ commits
**Pull Requests:** 20+ PRs created
**Code Reviews:** 15+ PRs reviewed

**Key Pull Requests:**
- #1: Initial project setup with Electron + React + Vite
- #5: Custom node components with type differentiation
- #8: Node CRUD operations with EditNodeDialog
- #12: Edge creation and management system
- #15: Interactive graph navigation (FR3)
- #18: Visual design and styling implementation
- #22: Auto-save functionality with LocalStorage

---

*Personal Reflection for FH Technikum Wien - Software Engineering Project*
*Submitted: 25.01.2026*
