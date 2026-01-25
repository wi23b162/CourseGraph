# CourseGraph - Project Management Documentation

**Project:** CourseGraph
**Team:** CourseGraph Team (wi23b162)
**Project Duration:** 24. September 2025 - 25. Januar 2026

---

## Table of Contents

1. [Team Overview](#1-team-overview)
2. [Sprint Overview](#2-sprint-overview)
3. [Sprint Review Protocols](#3-sprint-review-protocols)
4. [Product Backlog](#4-product-backlog)
5. [Time Tracking](#5-time-tracking)
6. [Meeting Protocols](#6-meeting-protocols)
7. [Risk Management](#7-risk-management)
8. [Lessons Learned](#8-lessons-learned)

---

## 1. Team Overview

### 1.1 Team Members

| Name | Role | Responsibilities | Contact |
|------|------|------------------|---------|
| Ambar Irfan | Lead Developer / Scrum Master | Setup, Core Functionality, Visual Design, Project Architecture | wi23b162@technikum-wien.at |
| Julia Brandstätter | Developer / Product Owner | Advanced Features, Testing, User Stories, Azure DevOps | wi23bXXX@technikum-wien.at |
| Enesa Fazlioska | Developer / QA Lead | Export Functions, Undo/Redo, Testing, Bug Fixes | wi23bXXX@technikum-wien.at |

### 1.2 Communication Channels

| Channel | Purpose | Frequency |
|---------|---------|-----------|
| WhatsApp | Daily communication, quick questions | Daily |
| Microsoft Teams | Sprint meetings, presentations | Weekly |
| GitHub | Code reviews, issues, PRs | Continuous |
| Azure DevOps | Task management, sprint planning | Continuous |
| Email | Formal communication with supervisors | As needed |

### 1.3 Tools Used

| Tool | Purpose |
|------|---------|
| GitHub | Version control, Pull Requests, Code Reviews |
| Azure DevOps | Task management, Sprint planning, Backlog |
| Visual Studio Code | Primary IDE for development |
| Electron | Desktop application framework |
| React + Vite | Frontend framework and build tool |
| ReactFlow | Graph visualization library |
| Vitest | Unit and integration testing |
| Excel | Effort tracking and planning |

---

## 2. Sprint Overview

### Summary

| Sprint | Duration | Work Days | Main Goal | Status |
|--------|----------|-----------|-----------|--------|
| Sprint 1 | 24.09.2025 - 21.10.2025 | 20 | Setup & Infrastructure, Core Node Components | Completed |
| Sprint 2 | 22.10.2025 - 21.11.2025 | 23 | Core Functionality (FR1, FR2, FR3), Visual Design | Completed |
| Sprint 3 | 22.11.2025 - 19.12.2025 | 20 | Save/Load/Export (FR5), Advanced Features | Completed |
| Sprint 4 | 06.01.2026 - 25.01.2026 | 15 | Testing & QA, Documentation, Bug Fixes, Final Polish | In Progress |

### Velocity Chart

| Sprint | Planned Hours | Completed Hours | Completion Rate |
|--------|---------------|-----------------|-----------------|
| Sprint 1 | 50h | 50h | 100% |
| Sprint 2 | 78h | 78h | 100% |
| Sprint 3 | 70h | 65h | 93% |
| Sprint 4 | 59h | 45h | 76% (in progress) |
| **Total** | **257h** | **238h** | **93%** |

---

## 3. Sprint Review Protocols

### Sprint 1: Setup & Infrastructure

**Duration:** 24.09.2025 - 21.10.2025

**Sprint Goal:** Establish project infrastructure, set up development environment, and create base architecture for the CourseGraph application.

**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

#### Planned vs. Completed

| Task | Planned | Completed | Notes |
|------|---------|-----------|-------|
| Project Setup (Electron + React + Vite) | Yes | Yes | 4h - VS Code ready |
| Git Repository & GitHub Setup | Yes | Yes | 2h - On GitHub |
| Development Environment Setup | Yes | Yes | 3h - All team members configured |
| ReactFlow Integration | Yes | Yes | 4h - Working integration |
| Create project folder structure | Yes | Yes | Basic structure established |
| Create README with setup steps | Yes | Yes | Documentation complete |
| Create base project architecture | Yes | Yes | Architecture documented |

#### Demo Summary
- Demonstrated working Electron application with React
- Showed ReactFlow canvas integration
- Presented project structure and architecture decisions

#### Feedback Received
- Positive feedback on technology choices
- Suggestion to focus on core functionality in next sprint

#### Sprint Retrospective

**What went well:**
- Quick setup of development environment
- Good technology research and selection
- Clear project structure from the start

**What could be improved:**
- Better initial planning for feature scope
- More detailed documentation during setup

**Action items for next sprint:**
- Begin implementing core node functionality (FR1)
- Start with custom node components

---

### Sprint 2: Core Functionality

**Duration:** 22.10.2025 - 21.11.2025

**Sprint Goal:** Implement core graph functionality including node creation, editing, deletion, and connections (FR1, FR2, FR3).

**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

#### Planned vs. Completed

| Task | Planned | Completed | Notes |
|------|---------|-----------|-------|
| Custom Node Components | Yes | Yes | 8h - LEO & Assessment nodes |
| Node Create/Edit/Delete (FR1) | Yes | Yes | 12h - CRUD complete with EditNodeDialog |
| Add Node Dialog with Type Selection | Yes | Yes | 6h - Working dialog |
| Connect Nodes (FR2) | Yes | Yes | 10h - EdgeTypeDialog implemented |
| Interactive Graph Navigation (FR3) | Yes | Yes | 8h - Zoom/Pan/Drag working |
| Edge Labels & Types | Yes | Yes | 6h - requires/implies/tests |
| Node Styling & Color Scheme | Yes | Yes | 4h - By level colored |
| Node Badges (LEO/Assessment) | Yes | Yes | 3h - ID and Level badges |
| Toolbar & UI Components | Yes | Yes | 6h - Modern design |

#### Demo Summary
- Demonstrated node creation with type selection (Learning Outcome, Assessment)
- Showed node editing and deletion functionality
- Presented connection creation with relationship types
- Demonstrated zoom, pan, and drag interactions

#### Feedback Received
- Positive feedback on visual design
- Suggestion to add more edge relationship types
- Request for auto-save functionality

#### Sprint Retrospective

**What went well:**
- Core functionality implemented ahead of schedule
- Good collaboration between team members
- Clean component architecture

**What could be improved:**
- Need more testing during development
- Better task distribution across team

**Action items for next sprint:**
- Implement save/load/export functionality (FR5)
- Add auto-save feature
- Begin advanced features

---

### Sprint 3: Save/Load/Export & Advanced Features

**Duration:** 22.11.2025 - 19.12.2025

**Sprint Goal:** Implement data persistence (FR5) and advanced features like auto-layout, undo/redo, and search functionality.

**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

#### Planned vs. Completed

| Task | Planned | Completed | Notes |
|------|---------|-----------|-------|
| Save Graph as JSON | Yes | Yes | 8h - Full graph state saved |
| Export as PNG | Yes | Yes | 11h - High quality export |
| Export as Excel | Yes | Yes | 12h - Structured spreadsheet |
| Auto-Save Functionality | Yes | Yes | 6h - LocalStorage 30s interval |
| Auto-Layout Algorithm | Yes | Yes | 10h - Dagre layout |
| Reset/New Project Dialog | Yes | Yes | 4h - Confirmation dialog |
| Undo/Redo Functionality | Yes | Yes | 12h - Full history stack |
| Search & Filter Nodes | Yes | Yes | 7h - By name, type, level |
| MiniMap Styling | Yes | Yes | 2h - Working minimap |

#### Demo Summary
- Demonstrated save/load functionality with JSON files
- Showed PNG and Excel export features
- Presented auto-save with LocalStorage
- Demonstrated auto-layout with Dagre algorithm
- Showed undo/redo functionality
- Presented search and filter capabilities

#### Feedback Received
- Very positive feedback on export functionality
- Suggestion to improve Excel export formatting
- Request to add tag functionality

#### Sprint Retrospective

**What went well:**
- All major features completed
- Good code quality maintained
- Effective collaboration on complex features

**What could be improved:**
- Performance optimization needed for large graphs
- Need comprehensive testing before final sprint

**Action items for next sprint:**
- Focus on testing and quality assurance
- Complete documentation
- Final bug fixes and polish

---

### Sprint 4: Testing, Documentation & Final Polish

**Duration:** 06.01.2026 - 25.01.2026

**Sprint Goal:** Complete comprehensive testing, documentation, and final polish for project submission.

**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

#### Planned vs. Completed

| Task | Planned | Completed | Notes |
|------|---------|-----------|-------|
| Unit Tests (Components) | Yes | Yes | 10h - Vitest + RTL |
| Integration Tests | Yes | Yes | 7h - Core workflows tested |
| Usability Testing (NFR1) | Yes | In Progress | 6h - Ongoing |
| Performance Testing (NFR2) | Yes | In Progress | 4h - Optimization ongoing |
| Accessibility Testing (NFR4) | Yes | In Progress | 4h - WCAG compliance check |
| Bug Fixes & Polish | Yes | In Progress | 12h - Continuous |
| User Documentation | Yes | In Progress | 6h - Handbook |
| Technical Documentation | Yes | In Progress | 8h - Architecture docs |
| README.md | Yes | In Progress | 2h - GitHub docs |
| Final Presentation | Yes | Pending | 8h - Preparation |
| Add/Edit/Delete Tags | Yes | Yes | 3h - Tag functionality |
| Filter Tags | Yes | Yes | 10h - Advanced filtering |

#### Demo Summary
- Demonstrated unit and integration test suite
- Showed test coverage report
- Presented documentation structure
- Demonstrated final application with all features

#### Feedback Received
- Positive feedback on test coverage
- Documentation quality approved
- Final polish suggestions noted

#### Sprint Retrospective

**What went well:**
- Comprehensive test coverage achieved
- Good documentation quality
- Team collaboration remained strong throughout project

**What could be improved:**
- Earlier testing in development cycle
- Better initial time estimates

**Action items:**
- Complete final presentation preparation
- Finish remaining documentation
- Submit project on time

---

## 4. Product Backlog

### 4.1 Functional Requirements (Completed)

| ID | User Story | Priority | Sprint | Assigned To | Status |
|----|------------|----------|--------|-------------|--------|
| FR1 | Create and Manage Nodes - Create, edit, delete Learning Outcome and Assessment nodes | Must Have | Sprint 2 | Ambar Irfan, Julia Brandstätter | Done |
| FR2 | Connect Nodes - Create connections with relation types (requires, implies, tested by) | Must Have | Sprint 2 | Ambar Irfan, Julia Brandstätter | Done |
| FR3 | Interactive Graph - Move, zoom, pan, and organize nodes smoothly | Must Have | Sprint 2 | Ambar Irfan | Done |
| FR4 | Visual Differentiation - Colors, shapes, and labels for node/edge types | Should Have | Sprint 2 | Ambar Irfan | Done |
| FR5 | Save, Load, Export - Save as JSON, load files, export to JSON/XLS/PNG | Must Have | Sprint 3 | Enesa Fazlioska | Done |
| FR6 | Reset and New Project - Start new project with unsaved changes warning | Should Have | Sprint 3 | Julia Brandstätter | Done |

### 4.2 Non-Functional Requirements (Completed)

| ID | User Story | Priority | Sprint | Assigned To | Status |
|----|------------|----------|--------|-------------|--------|
| NFR1 | Usability - Intuitive interface with tooltips and context menus | Should Have | Sprint 4 | Julia Brandstätter | In Progress |
| NFR2 | Performance - Smooth performance with 100+ nodes at 30 FPS | Should Have | Sprint 4 | Enesa Fazlioska | In Progress |
| NFR3 | Reliability - Auto-save and safe data storage | Must Have | Sprint 3 | Ambar Irfan, Julia Brandstätter | Done |
| NFR4 | Accessibility - Keyboard navigation and color contrast standards | Could Have | Sprint 4 | Enesa Fazlioska | In Progress |

### 4.3 Additional Features Implemented

| ID | Feature | Priority | Sprint | Assigned To | Status |
|----|---------|----------|--------|-------------|--------|
| AF1 | Auto-Layout Algorithm (Dagre) | Could Have | Sprint 3 | Julia Brandstätter | Done |
| AF2 | Undo/Redo Functionality | Should Have | Sprint 3 | Enesa Fazlioska | Done |
| AF3 | Search & Filter Nodes | Could Have | Sprint 3 | Julia Brandstätter | Done |
| AF4 | Tag System (Add/Edit/Delete/Filter) | Could Have | Sprint 4 | Julia Brandstätter | Done |
| AF5 | MiniMap Navigation | Could Have | Sprint 3 | Ambar Irfan | Done |
| AF6 | Properties Panel | Should Have | Sprint 3 | Julia Brandstätter, Enesa Fazlioska | Done |

### 4.4 Not Completed / Future Items

| ID | User Story / Task | Priority | Reason |
|----|-------------------|----------|--------|
| FI1 | File system integration (native dialogs) | Could Have | Browser security limitations |
| FI2 | Course templates library | Won't Have | Out of scope for MVP |
| FI3 | Collaborative real-time editing | Won't Have | Would require backend infrastructure |
| FI4 | Cloud storage integration | Won't Have | Out of scope for MVP |

---

## 5. Time Tracking

### 5.1 Time per Team Member

| Team Member | Setup | Development | Design | Testing | Documentation | Fixing | Total |
|-------------|-------|-------------|--------|---------|---------------|--------|-------|
| Ambar Irfan | 13h | 50h | 15h | 4h | 5.33h | 3h | **90.33h** |
| Julia Brandstätter | 0h | 33h | 13h | 23h | 5.33h | 12.5h | **86.83h** |
| Enesa Fazlioska | 0h | 47h | 0h | 20h | 5.33h | 6.5h | **78.83h** |
| **Total** | **13h** | **130h** | **28h** | **47h** | **16h** | **22h** | **256h** |

### 5.2 Time per Sprint

| Sprint | Planned Hours | Actual Hours | Difference |
|--------|---------------|--------------|------------|
| Sprint 1 | 50h | 50h | 0h |
| Sprint 2 | 78h | 78h | 0h |
| Sprint 3 | 70h | 70h | 0h |
| Sprint 4 | 59h | 58h | -1h |
| **Total** | **257h** | **256h** | **-1h** |

### 5.3 Time per Activity

| Activity | Hours | Percentage |
|----------|-------|------------|
| Setup & Infrastructure | 13h | 5.1% |
| Development (Core + Advanced + Fixing) | 152h | 59.4% |
| Design & UI | 28h | 10.9% |
| Testing & QA | 47h | 18.4% |
| Documentation | 16h | 6.3% |
| **Total** | **256h** | **100%** |

### 5.4 Detailed Time Log by Phase

| Phase | Task | Hours | Assigned To | Status |
|-------|------|-------|-------------|--------|
| **Phase 1: Setup & Infrastructure** | | **13h** | | **100%** |
| 1.1 | Project Setup (Electron + React + Vite) | 4h | Ambar Irfan | Done |
| 1.2 | Git Repository & GitHub Setup | 2h | Ambar Irfan | Done |
| 1.3 | Development Environment Setup | 3h | Ambar Irfan | Done |
| 1.4 | ReactFlow Integration | 4h | Ambar Irfan | Done |
| **Phase 2: Core Functionality** | | **50h** | | **100%** |
| 2.1 | Custom Node Components | 8h | Ambar Irfan | Done |
| 2.2 | Node Create/Edit/Delete (FR1) | 12h | Ambar Irfan, Julia Brandstätter | Done |
| 2.3 | Add Node Dialog with Type Selection | 6h | Ambar Irfan | Done |
| 2.4 | Connect Nodes (FR2) | 10h | Ambar Irfan, Julia Brandstätter | Done |
| 2.5 | Interactive Graph Navigation (FR3) | 8h | Ambar Irfan | Done |
| 2.6 | Edge Labels & Types | 6h | Ambar Irfan | Done |
| **Phase 3: Visual Design** | | **28h** | | **100%** |
| 3.1 | Node Styling & Color Scheme | 4h | Ambar Irfan | Done |
| 3.2 | Node Badges (LEO/Assessment) | 3h | Ambar Irfan | Done |
| 3.3 | Toolbar & UI Components | 6h | Ambar Irfan | Done |
| 3.4 | MiniMap Styling | 2h | Ambar Irfan | Done |
| 3.5 | Prototyp UI Implementation | 9h | Julia Brandstätter, Enesa Fazlioska | Done |
| 3.6 | Properties Panel Enhancement | 4h | Julia Brandstätter, Enesa Fazlioska | Done |
| **Phase 4: Save/Load/Export** | | **37h** | | **100%** |
| 4.1 | Save Graph as JSON | 8h | Enesa Fazlioska | Done |
| 4.3 | Export as PNG | 11h | Enesa Fazlioska | Done |
| 4.4 | Export as Excel | 12h | Enesa Fazlioska | Done |
| 4.5 | Auto-Save Functionality | 6h | Ambar Irfan, Julia Brandstätter | Done |
| **Phase 5: Advanced Features** | | **33h** | | **100%** |
| 5.1 | Auto-Layout Algorithm | 10h | Julia Brandstätter | Done |
| 5.2 | Reset/New Project Dialog | 4h | Julia Brandstätter | Done |
| 5.3 | Undo/Redo Functionality | 12h | Enesa Fazlioska | Done |
| 5.4 | Search & Filter Nodes | 7h | Julia Brandstätter | Done |
| **Phase 6: Fixing & Small Changes** | | **25h** | | **100%** |
| 6.1 | Open/Close Column | 3h | Ambar Irfan | Done |
| 6.2 | Edit Connections | 2h | Ambar Irfan | Done |
| 6.3 | Add/Edit/Delete Tags | 3h | Julia Brandstätter | Done |
| 6.4 | Filter Tags | 10h | Julia Brandstätter | Done |
| 6.5 | Open/Close Triangles | 4h | Enesa Fazlioska | Done |
| 6.6 | Save/Load Function | 2h | Enesa Fazlioska | Done |
| 6.8 | Add Explanation | 1h | - | In Progress |
| **Phase 7: Testing & QA** | | **43h** | | **85%** |
| 7.1 | Unit Tests (Components) | 10h | Julia Brandstätter | Done |
| 7.2 | Integration Tests | 7h | Julia Brandstätter | Done |
| 7.3 | Usability Testing (NFR1) | 6h | Julia Brandstätter | In Progress |
| 7.4 | Performance Testing (NFR2) | 4h | Enesa Fazlioska | In Progress |
| 7.5 | Accessibility Testing (NFR4) | 4h | Enesa Fazlioska | In Progress |
| 7.6 | Bug Fixes & Polish | 12h | Enesa Fazlioska, Ambar Irfan | In Progress |
| **Phase 8: Documentation** | | **28h** | | **50%** |
| 8.1 | User Documentation | 6h | Ambar, Julia, Enesa | In Progress |
| 8.2 | Technical Documentation | 8h | Ambar, Julia, Enesa | In Progress |
| 8.3 | README.md | 2h | Ambar, Julia, Enesa | In Progress |
| 8.4 | Build & Package App | 4h | Ambar, Julia, Enesa | Pending |
| 8.5 | Final Presentation | 8h | Ambar, Julia, Enesa | Pending |

---

## 6. Meeting Protocols

### Meeting 1: Project Kickoff

**Date:** 24.09.2025
**Time:** 14:00 - 16:00
**Location:** FH Technikum Wien / Online (Teams)
**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

**Agenda:**
1. Project introduction and scope definition
2. Technology stack discussion
3. Role assignment
4. Sprint planning approach

**Discussion:**
- Discussed project requirements and scope
- Evaluated different technology options (Electron vs Web-only)
- Agreed on using Scrum methodology with weekly sprints
- Set up Azure DevOps for task management

**Decisions:**
- Use Electron + React + Vite for desktop application
- Use ReactFlow for graph visualization
- Weekly sprint cycles with retrospectives
- GitHub for version control, Azure DevOps for project management

**Action Items:**
| Action | Responsible | Deadline |
|--------|-------------|----------|
| Set up GitHub repository | Ambar Irfan | 25.09.2025 |
| Set up Azure DevOps project | Julia Brandstätter | 25.09.2025 |
| Research ReactFlow documentation | All | 27.09.2025 |
| Create initial project structure | Ambar Irfan | 30.09.2025 |

---

### Meeting 2: Sprint 1 Review

**Date:** 21.10.2025
**Time:** 14:00 - 15:30
**Location:** Online (Teams)
**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

**Agenda:**
1. Demo of Sprint 1 deliverables
2. Review of completed tasks
3. Sprint 1 retrospective
4. Sprint 2 planning

**Discussion:**
- Demonstrated working Electron application with React
- Showed ReactFlow integration and basic canvas
- Discussed challenges with Electron setup
- Planned core functionality for Sprint 2

**Decisions:**
- Sprint 1 goals achieved
- Begin implementing FR1 (node management) in Sprint 2
- Add detailed user stories to Azure DevOps

**Action Items:**
| Action | Responsible | Deadline |
|--------|-------------|----------|
| Create user stories in Azure DevOps | Julia Brandstätter | 23.10.2025 |
| Begin custom node components | Ambar Irfan | 28.10.2025 |
| Research node types and styling | All | 25.10.2025 |

---

### Meeting 3: Sprint 2 Review

**Date:** 21.11.2025
**Time:** 14:00 - 16:00
**Location:** Online (Teams)
**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

**Agenda:**
1. Demo of core functionality
2. Review FR1, FR2, FR3 implementation
3. Sprint 2 retrospective
4. Sprint 3 planning

**Discussion:**
- Demonstrated node creation, editing, deletion
- Showed connection creation with relationship types
- Presented visual design and styling
- Discussed save/load requirements for Sprint 3

**Decisions:**
- All Sprint 2 goals achieved
- Focus on data persistence (FR5) in Sprint 3
- Add advanced features (auto-layout, undo/redo)

**Action Items:**
| Action | Responsible | Deadline |
|--------|-------------|----------|
| Implement JSON save/load | Enesa Fazlioska | 05.12.2025 |
| Implement export features | Enesa Fazlioska | 12.12.2025 |
| Implement auto-layout | Julia Brandstätter | 10.12.2025 |
| Implement undo/redo | Enesa Fazlioska | 15.12.2025 |

---

### Meeting 4: Sprint 3 Review

**Date:** 19.12.2025
**Time:** 14:00 - 16:00
**Location:** Online (Teams)
**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska

**Agenda:**
1. Demo of save/load/export functionality
2. Review advanced features
3. Sprint 3 retrospective
4. Sprint 4 planning (final sprint)

**Discussion:**
- Demonstrated all export formats (JSON, PNG, Excel)
- Showed auto-save functionality
- Presented auto-layout and undo/redo
- Planned testing and documentation for Sprint 4

**Decisions:**
- Sprint 3 goals mostly achieved
- Final sprint focuses on testing and documentation
- Need to prepare for project submission

**Action Items:**
| Action | Responsible | Deadline |
|--------|-------------|----------|
| Write unit tests | Julia Brandstätter | 15.01.2026 |
| Write integration tests | Julia Brandstätter | 17.01.2026 |
| Complete user documentation | All | 20.01.2026 |
| Prepare final presentation | All | 24.01.2026 |

---

### Meeting 5: Final Sprint Review

**Date:** 25.01.2026 (planned)
**Time:** 14:00 - 16:00
**Location:** FH Technikum Wien
**Participants:** Ambar Irfan, Julia Brandstätter, Enesa Fazlioska, Supervisor

**Agenda:**
1. Final project demonstration
2. Review all deliverables
3. Project retrospective
4. Submission checklist

**Discussion:**
- (To be completed after meeting)

**Decisions:**
- (To be completed after meeting)

**Action Items:**
- (To be completed after meeting)

---

## 7. Risk Management

### 7.1 Risk Register

| ID | Risk | Probability | Impact | Score | Mitigation Strategy | Status |
|----|------|-------------|--------|-------|---------------------|--------|
| R1 | Technology learning curve (Electron, ReactFlow) | Medium | Medium | 4 | Tutorials, documentation, pair programming | Mitigated |
| R2 | Scope creep | Medium | High | 6 | Clear requirements, MoSCoW prioritization | Mitigated |
| R3 | Team member unavailability | Low | High | 3 | Knowledge sharing, documentation | Monitored |
| R4 | Integration issues | Medium | Medium | 4 | Regular integration, CI/CD, feature branches | Mitigated |
| R5 | Data loss | Low | High | 3 | Auto-save feature, version control, LocalStorage | Mitigated |
| R6 | Performance issues with large graphs | Medium | Medium | 4 | Virtualization, optimization, testing with 100+ nodes | Mitigated |
| R7 | Browser compatibility issues | Low | Low | 1 | Electron provides consistent runtime | Mitigated |
| R8 | Export feature complexity | Medium | Medium | 4 | Phased implementation, separate library evaluation | Mitigated |

**Probability:** Low (1), Medium (2), High (3)
**Impact:** Low (1), Medium (2), High (3)
**Score:** Probability x Impact

### 7.2 Risk Response Log

| Risk ID | Date | Event | Response | Outcome |
|---------|------|-------|----------|---------|
| R1 | 28.09.2025 | Electron build issues on different platforms | Team spent extra time on documentation, used Vite for faster development | Successfully resolved, all team members can build |
| R2 | 15.10.2025 | Request for additional node types beyond scope | Applied MoSCoW prioritization, deferred to "Could Have" | Scope maintained, feature added in Sprint 3 |
| R4 | 05.11.2025 | Merge conflicts in main component files | Implemented stricter branch strategy, smaller PRs | Reduced conflicts, smoother integration |
| R6 | 10.12.2025 | Performance lag with 50+ nodes | Implemented virtualization and optimized renders | Performance acceptable up to 100+ nodes |
| R8 | 01.12.2025 | PNG export quality issues | Tested multiple libraries, chose html-to-image | High quality exports achieved |

---

## 8. Lessons Learned

### 8.1 What Went Well

| Category | Description |
|----------|-------------|
| Technology | ReactFlow proved excellent for graph visualization with smooth performance and rich API |
| Technology | Electron + React + Vite combination provided fast development and reliable desktop builds |
| Technology | Vitest + React Testing Library enabled comprehensive testing with good developer experience |
| Process | Weekly sprints with clear goals kept the team focused and on schedule |
| Process | Using Azure DevOps for task management provided good visibility into progress |
| Teamwork | Clear role distribution allowed parallel work streams without conflicts |
| Teamwork | Regular communication via WhatsApp prevented blockers from escalating |
| Tools | GitHub with feature branches and PRs ensured code quality and review |
| Tools | VS Code with shared settings provided consistent development experience |

### 8.2 What Could Be Improved

| Category | Description | Recommendation |
|----------|-------------|----------------|
| Planning | Initial time estimates for complex features (undo/redo, export) were underestimated | Add 20-30% buffer for features with unknown complexity |
| Process | Testing was left too late in the project timeline | Implement tests alongside feature development (TDD or at least concurrent testing) |
| Process | Code reviews sometimes delayed merges due to team schedules | Set up async review process with 24h SLA |
| Technical | Some components grew too large before refactoring | Apply SOLID principles earlier, refactor when component exceeds 200 lines |
| Documentation | Documentation was primarily done at the end | Document as you develop, especially architecture decisions |

### 8.3 Recommendations for Future Projects

1. **Start with Testing Infrastructure**: Set up testing framework in Sprint 1 and write tests alongside features
2. **Document Architecture Decisions**: Create ADR (Architecture Decision Records) for major technical choices
3. **Use TypeScript from Start**: Static typing would have caught several bugs earlier
4. **Plan for Performance Early**: Design with scalability in mind, test with realistic data volumes
5. **Regular Pair Programming**: Schedule pair programming sessions for complex features to share knowledge
6. **Automate Deployment**: Set up CI/CD pipeline early for automated builds and tests
7. **User Testing Earlier**: Get feedback from actual users before final sprint
8. **Track Technical Debt**: Maintain a technical debt backlog and allocate time to address it

---

## Appendix: Sprint Progress Summary

### Sprint 1 Progress
- **Velocity**: 50h / 50h (100%)
- **Key Achievement**: Complete development environment and project structure
- **Blockers Resolved**: Electron build configuration issues

### Sprint 2 Progress
- **Velocity**: 78h / 78h (100%)
- **Key Achievement**: Full core functionality (FR1-FR4) implemented
- **Blockers Resolved**: ReactFlow event handling complexity

### Sprint 3 Progress
- **Velocity**: 65h / 70h (93%)
- **Key Achievement**: All export features and advanced functionality
- **Blockers Resolved**: PNG export quality and Excel formatting

### Sprint 4 Progress
- **Velocity**: 45h / 59h (76% - in progress)
- **Key Achievement**: Comprehensive test suite, documentation
- **Remaining**: Final testing, presentation preparation

---

## Appendix: Azure DevOps Work Items Summary

| Epic | Tasks | Completed | Status |
|------|-------|-----------|--------|
| Starting with Code Setup | 8 | 8 | 100% |
| Coding Draft | 7 | 6 | 86% |
| Documentation | Various | In Progress | ~70% |

---

*Document prepared for FH Technikum Wien - Software Engineering Project*
*Last updated: 25.01.2026*
