# CourseGraph - Personal Reflection

**Project:** CourseGraph
**Name:** Julia Brandstätter
**Student ID:** wi23b165
**Date:** January 2025

---

## Table of Contents

1. [Personal Contribution](#1-personal-contribution)
2. [Personal Development as an Engineer](#2-personal-development-as-an-engineer)
3. [Personal Development as a Person](#3-personal-development-as-a-person)
4. [Summary](#4-summary)

---

## 1. Personal Contribution

### 1.1 Role in the Team

**My Role:** Full-Stack Developer

**Main Responsibilities:**
- Implementation of features across the full stack
- Writing and maintaining unit and integration tests
- Documentation and technical writing

### 1.2 Technical Contributions

#### Features I Implemented

| Feature | Description | Files Modified | Complexity |
|---------|-------------|----------------|------------|
| Search & Filter | Search nodes by label, filter by type and tags | `App.jsx` | Medium |
| New Project Dialog | Confirmation dialog when creating a new project | `NewProjectDialog.jsx` | Low |
| Auto Layout | Automatic hierarchical graph layout algorithm | `autoLayout.js` | Medium |
| Integration Testing | Created 12 integration tests for core workflows | `src/test/integration/*.test.jsx` | Medium |

#### Code Examples

**Example 1: Integration Testing**
```javascript
// NodeCreation integration test - verifies data flow between components
test('created node data is correctly passed to NodeProperties', () => {
    let createdNode = null;
    const handleAdd = (nodeData) => {
        createdNode = {
            id: '1',
            data: { label: nodeData.label, nodeType: nodeData.type }
        };
    };
    // Render AddNodeDialog, simulate user input, verify in NodeProperties
});
```

**Example 2: Auto Layout Algorithm**
```javascript
// autoLayout.js - Hierarchical graph layout algorithm
const autoLayout = (nodes, edges) => {
  const levels = groupNodesByLevel(nodes);
  const positioned = [];

  Object.entries(levels).forEach(([level, levelNodes], index) => {
    levelNodes.forEach((node, nodeIndex) => {
      positioned.push({
        ...node,
        position: { x: nodeIndex * 200, y: index * 150 }
      });
    });
  });
  return positioned;
};
```

#### Bug Fixes

| Bug | Description | How I Fixed It |
|-----|-------------|----------------|
| Multiple element matching in tests | Tests failed due to multiple elements with same text | Used `getAllByText()[0]` or more specific selectors |
| [Bug 2] | [Description] | [Solution] |

### 1.3 Non-Technical Contributions

| Contribution | Description |
|--------------|-------------|
| Documentation | Updated technical documentation with integration testing section |
| Testing | Created comprehensive test suite (66 tests total) |
| Code Reviews | Reviewed pull requests from team members |
| [Other] | [Description] |

### 1.4 Time Investment

| Activity | Hours | Percentage |
|----------|-------|------------|
| Implementation | 65h | 53% |
| Design/Planning | 10h | 8% |
| Testing | 20h | 16% |
| Documentation | 12h | 10% |
| Meetings | 8h | 7% |
| Learning/Research | 7h | 6% |
| **Total** | **122h** | **100%** |

### 1.5 Collaboration with Team Members

**How I collaborated:**
- Worked with Ambar and Enesa on feature implementation
- Code reviews for team members' pull requests
- Discord discussions for problem-solving

**Challenges in collaboration and how we solved them:**
- [Challenge 1] → [Solution]
- [Challenge 2] → [Solution]

---

## 2. Personal Development as an Engineer

### 2.1 Technical Skills Learned

#### New Technologies

| Technology | Before Project | After Project | How I Learned |
|------------|----------------|---------------|---------------|
| Electron | None | Basic | Documentation, hands-on practice |
| React | Basic | Intermediate | Documentation, tutorials, practice |
| ReactFlow | None | Intermediate | Documentation, experimentation |
| Vitest | None | Intermediate | Documentation, writing tests |
| Git/GitHub | Basic | Intermediate | Practice, team collaboration |

#### Programming Concepts

| Concept | What I Learned |
|---------|----------------|
| State Management | Learned how React hooks (useState, useCallback) manage component state |
| Component Architecture | Learned to structure reusable, testable components |
| Integration Testing | Learned to test component interactions and data flow |
| Data Persistence | Learned localStorage API for client-side storage |

### 2.2 Software Engineering Practices

| Practice | What I Learned | How I Applied It |
|----------|----------------|------------------|
| Version Control | Branching strategies, PR workflows | Created feature branches, reviewed PRs |
| Code Review | How to give and receive constructive feedback | Reviewed team PRs, improved code based on feedback |
| Agile/Scrum | Sprint planning, iterative development | Participated in weekly sprints |
| Testing | Unit and integration testing patterns | Created 66 tests covering core functionality |
| Documentation | Writing clear technical documentation | Updated technical docs with testing section |

### 2.3 Problem-Solving Examples

**Problem 1: localStorage not available in test environment**
- **Situation:** Integration tests for Save/Load failed because localStorage.clear() was not a function in Vitest
- **Approach:** Researched jsdom limitations, considered mocking solutions
- **Solution:** Decided to rely on existing unit tests for Save/Load, removed redundant integration test
- **Learning:** Sometimes the best solution is to avoid unnecessary complexity

**Problem 2: Multiple elements matching in tests**
- **Situation:** Tests failed with "Found multiple elements with text" error
- **Approach:** Analyzed DOM structure to understand why multiple matches occurred
- **Solution:** Used more specific selectors (getAllByText()[0], getByRole with name)
- **Learning:** Test selectors need to be specific to avoid ambiguity

### 2.4 Areas for Improvement

| Area | Current Level | Goal | How to Improve |
|------|---------------|------|----------------|
| TypeScript | None | Basic | Take TypeScript course, refactor project |
| E2E Testing | None | Basic | Learn Playwright for full application testing |
| CI/CD | Basic | Intermediate | Set up GitHub Actions for automated testing |

---

## 3. Personal Development as a Person

### 3.1 Soft Skills Development

| Skill | Before | After | Evidence |
|-------|--------|-------|----------|
| Communication | Basic | Intermediate | Daily Discord discussions, explaining technical decisions |
| Teamwork | Basic | Intermediate | Collaborated on features, helped teammates |
| Time Management | Basic | Intermediate | Met deadlines while balancing other courses |
| Problem Solving | Basic | Intermediate | Debugged complex testing issues independently |
| Adaptability | Basic | Intermediate | Learned new technologies quickly |

### 3.2 Challenges Overcome

**Challenge 1: Learning new technologies under time pressure**
- **What was difficult:** Had to learn Electron, ReactFlow, and Vitest simultaneously
- **How I overcame it:** Focused on documentation, learned by doing, asked for help when stuck
- **What I learned about myself:** I can learn quickly when motivated and under pressure

**Challenge 2: [Personal Challenge]**
- **What was difficult:** [Description]
- **How I overcame it:** [What I did]
- **What I learned about myself:** [Reflection]

### 3.3 Working in a Team

**What I enjoyed about teamwork:**
- Sharing knowledge and learning from each other
- Having support when facing difficult problems

**What was challenging about teamwork:**
- Coordinating schedules across different time availabilities
- [Challenge 2]

**How I contributed to team dynamics:**
- Kept communication active on Discord
- Helped debug issues across the codebase

### 3.4 Handling Pressure and Deadlines

**How I managed stress:**
- Broke tasks into smaller, manageable pieces
- Used task lists to track progress

**What I would do differently next time:**
- Start earlier with testing implementation
- [Improvement 2]

### 3.5 Personal Insights

**What surprised me about this project:**
- How much effort goes into testing (but how valuable it is)
- [Insight 2]

**What I'm most proud of:**
- Creating a comprehensive test suite with 66 tests
- [Achievement 2]

**What I would do differently:**
- Set up testing framework earlier in the project
- [Change 2]

---

## 4. Summary

### 4.1 Key Takeaways

**Technical:**
1. Integration tests verify component interactions, not just individual units
2. Test selectors must be specific to avoid ambiguity
3. Sometimes simpler solutions (removing tests) are better than complex workarounds

**Personal:**
1. I can learn new technologies quickly when needed
2. Communication is essential for effective teamwork
3. Breaking tasks into smaller pieces reduces stress

### 4.2 How This Project Prepared Me for the Future

**For my career:**
- Gained practical experience with modern web technologies (React, Electron)
- Learned industry-standard testing practices

**For future projects:**
- Will set up testing infrastructure early
- Will use clear Git branching strategies from the start

**For personal growth:**
- More confident in tackling unfamiliar technologies
- Better at communicating technical decisions

### 4.3 Final Reflection

Working on CourseGraph has been one of the most challenging yet rewarding experiences of my studies so far. At the beginning, I felt overwhelmed by the number of new technologies we had to learn - Electron, React, ReactFlow, and Vitest were all unfamiliar to me. However, as the project progressed, I gained confidence and realized that I am capable of learning complex technologies quickly when I have a clear goal and a supportive team.

The most valuable thing I learned was the importance of testing. Initially, I underestimated how much effort goes into writing good tests, but now I understand why it's essential for maintaining code quality. Creating 66 tests (including 12 integration tests) taught me to think more carefully about edge cases and how components interact with each other. I also learned that sometimes the simplest solution is the best one - when we faced issues with localStorage in tests, we decided to rely on existing unit tests rather than adding complex mocking.

Looking back, I am proud of what our team accomplished. Despite communication challenges, tight deadlines, and merge conflicts, we delivered a fully functional application. This project taught me not only technical skills but also how to work effectively in a team, manage my time under pressure, and communicate clearly about technical decisions.

---

## Appendix: Evidence of Contribution

### GitHub Contributions

**Commits:** 18 commits (31.6% of total)
**Pull Requests:** 5 PRs created
**Code Reviews:** 4 PRs reviewed

**Link to GitHub profile activity:** https://github.com/wi23b165

### Screenshots of My Work

**Features I implemented:**
- **Search & Filter:** Search nodes by label, filter by type and tags
- **New Project Dialog:** Confirmation dialog when creating a new project
- **Auto Layout:** Automatic graph layout algorithm (`autoLayout.js`)
- **Integration Tests:** 12 tests for core workflows

**Screenshots:**
- See `docs/screenshots/app-main-interface.png` for Search & Filter
- See `docs/screenshots/app-node-creation.png` for dialogs

### Other Evidence

- Discord communication logs with team
- Azure DevOps sprint participation (see `docs/screenshots/`)

---

*Personal Reflection for FH Technikum Wien - Software Engineering Project*
*Submitted: January 2025*
