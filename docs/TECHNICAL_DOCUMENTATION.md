# CourseGraph Technical Documentation

**Version 1.0 | January 2025**

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Core Components](#4-core-components)
5. [Data Models](#5-data-models)
6. [State Management](#6-state-management)
7. [Key Algorithms](#7-key-algorithms)
8. [Build System](#8-build-system)
9. [API Reference](#9-api-reference)
10. [Testing Strategy](#10-testing-strategy)
11. [Performance Considerations](#11-performance-considerations)
12. [Security Considerations](#12-security-considerations)

---

## 1. Architecture Overview

### High-Level Architecture

CourseGraph follows a **desktop application architecture** using Electron with a React-based user interface.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Electron Shell                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    IPC    ┌─────────────────────────────┐  │
│  │   Main Process  │◄─────────►│      Renderer Process       │  │
│  │   (Node.js)     │           │      (React + ReactFlow)    │  │
│  │                 │           │                             │  │
│  │  - App lifecycle│           │  - UI Components            │  │
│  │  - Window mgmt  │           │  - Graph Visualization      │  │
│  │  - Native APIs  │           │  - User Interactions        │  │
│  └─────────────────┘           └─────────────────────────────┘  │
│                                           │                      │
│                                           ▼                      │
│                                ┌─────────────────────┐          │
│                                │   Local Storage     │          │
│                                │   (Browser API)     │          │
│                                └─────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Process Model

| Process | Technology | Responsibilities |
|---------|------------|------------------|
| **Main Process** | Node.js | Application lifecycle, window management, native OS integration |
| **Renderer Process** | React | UI rendering, user interactions, graph visualization |
| **Preload Script** | JavaScript | Secure bridge between main and renderer processes |

### Design Patterns Used

- **Component-Based Architecture**: React components for modular UI
- **Unidirectional Data Flow**: React state flows down through props
- **Observer Pattern**: ReactFlow event handlers for graph interactions
- **Debouncing**: Auto-save with debounced writes to prevent performance issues

---

## 2. Technology Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Electron** | 39.2.2 | Cross-platform desktop framework |
| **React** | 19.2.0 | UI component library |
| **ReactFlow** | 11.11.4 | Graph visualization and interaction |
| **Vite** | 7.2.6 | Build tool with HMR support |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react-toastify` | 11.0.5 | Toast notifications for user feedback |
| `html-to-image` | 1.11.13 | PNG export functionality |
| `xlsx` | 0.18.5 | Excel file generation |
| `electron-squirrel-startup` | 1.0.1 | Windows installer handling |

### Development Dependencies

| Package | Purpose |
|---------|---------|
| `@electron-forge/cli` | Build and packaging automation |
| `@electron-forge/maker-*` | Platform-specific installers |
| `@electron-forge/plugin-vite` | Vite integration for Electron |
| `@vitejs/plugin-react` | React support in Vite |

---

## 3. Project Structure

```
coursegraph/
├── src/
│   ├── main.js                    # Electron main process entry
│   ├── preload.js                 # Preload script for IPC
│   ├── renderer.jsx               # React entry point
│   ├── App.jsx                    # Main React application component
│   ├── App.css                    # Application styles
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── CustomNode.jsx         # Custom node rendering
│   │   ├── AddNodeDialog.jsx      # Node creation dialog
│   │   ├── EditNodeDialog.jsx     # Node editing dialog
│   │   ├── EditConnectionDialog.jsx # Edge editing dialog
│   │   ├── EdgeTypeDialog.jsx     # Edge type selection
│   │   ├── NodeProperties.jsx     # Properties sidebar
│   │   ├── NewProjectDialog.jsx   # New project confirmation
│   │   ├── Saveloadmanager.jsx    # Save/load functionality
│   │   └── edgeUtils.js           # Edge styling utilities
│   └── utils/
│       ├── exportUtils.js         # PNG and Excel export
│       └── autoLayout.js          # Graph layout algorithm
├── index.html                     # HTML entry point
├── package.json                   # Project configuration
├── forge.config.js                # Electron Forge config
├── vite.main.config.mjs           # Vite config (main process)
├── vite.renderer.config.mjs       # Vite config (renderer)
├── vite.preload.config.mjs        # Vite config (preload)
└── docs/
    ├── USER_HANDBOOK.md
    ├── INSTALLATION_GUIDE.md
    └── TECHNICAL_DOCUMENTATION.md
```

### Directory Descriptions

| Directory/File | Description |
|----------------|-------------|
| `src/` | All source code |
| `src/components/` | Reusable React components |
| `src/utils/` | Utility functions and helpers |
| `.vite/` | Vite build output (generated) |
| `out/` | Packaged application output (generated) |
| `node_modules/` | npm dependencies (generated) |

---

## 4. Core Components

### App.jsx (Main Application)

The central component managing application state and orchestrating all features.

**Key Responsibilities:**
- Graph state management (nodes, edges)
- Dialog coordination
- Event handling for ReactFlow
- History management (undo/redo)
- Auto-save integration

**State Variables:**

```javascript
// Core graph state
const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges);

// UI state
const [showDialog, setShowDialog] = useState(false);
const [selectedNode, setSelectedNode] = useState(null);
const [selectedEdge, setSelectedEdge] = useState(null);

// History for undo/redo
const [history, setHistory] = useState([...]);
const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

// Sidebar state
const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
```

---

### CustomNode.jsx

Custom ReactFlow node component with visual differentiation and interactive controls.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `data.label` | string | Node display text |
| `data.description` | string | Node description |
| `data.nodeType` | "leo" \| "assessment" | Node category |
| `data.nodeId` | string | Unique identifier |
| `data.level` | number (1-5) | Complexity level |
| `data.tags` | string[] | Organization tags |
| `data.onDelete` | function | Delete handler |
| `data.onLabelChange` | function | Label edit handler |

**Visual Mapping:**

| Node Type | Level | Color |
|-----------|-------|-------|
| LEO | 1 | Light Blue (#e0f2fe) |
| LEO | 2 | Blue (#7dd3fc) |
| LEO | 3 | Medium Blue (#38bdf8) |
| LEO | 4 | Dark Blue (#0284c7) |
| LEO | 5 | Deep Blue (#0369a1) |
| Assessment | 1 | Light Green |
| Assessment | 2-5 | Green to Yellow gradient |

---

### Saveloadmanager.jsx

Manages data persistence with auto-save and manual save capabilities.

**Exports:**

```javascript
export { SaveLoadDialog, useSaveLoad, clearAutoSave };
```

**useSaveLoad Hook:**

```javascript
function useSaveLoad(nodes, edges, setLastSaved) {
  // Auto-save with 500ms debounce
  // Saves to localStorage keys:
  //   - coursegraph_autosave
  //   - coursegraph_manual_save
}
```

**Storage Keys:**

| Key | Purpose |
|-----|---------|
| `coursegraph_autosave` | Automatic periodic saves |
| `coursegraph_manual_save` | Explicit user saves |

---

### edgeUtils.js

Utility functions for edge styling based on relationship type.

**Functions:**

```javascript
// Returns style object for edge based on type
getEdgeStyle(edgeType) → { stroke, strokeWidth, ... }

// Returns label string for edge type
getEdgeLabel(edgeType) → string

// Returns label style object
getEdgeLabelStyle(edgeType) → { fill, fontWeight, ... }
```

**Edge Types:**

| Type | Color | Label | Meaning |
|------|-------|-------|---------|
| `requires` | Orange (#f97316) | "← requires" | Prerequisite |
| `implies` | Blue (#3b82f6) | "→ enables" | Enables |
| `tests` | Green (#22c55e) | "✓ tests" | Tests/Assesses |

---

### exportUtils.js

Export functionality for PNG images and Excel spreadsheets.

**Functions:**

```javascript
// Export graph as PNG image
async exportToPNG(reactFlowInstance) → void

// Export data as Excel workbook
async exportToExcel(nodes, edges) → void
```

**Excel Output Structure:**

| Sheet | Columns |
|-------|---------|
| Learning Outcomes | ID, Label, Description, Level, Tags |
| Connections | Source, Target, Type, Label |
| Statistics | Metric, Value |

---

### autoLayout.js

Automatic graph layout algorithm for organizing nodes.

**Algorithm:** Layer-based hierarchical layout

```javascript
function autoLayoutGraph(nodes, edges) → layoutedNodes
```

**Process:**
1. Identify root nodes (no incoming edges)
2. Assign layers using BFS traversal
3. Calculate x/y positions based on layer and index
4. Return nodes with updated positions

---

## 5. Data Models

### Node Structure

```javascript
{
  id: string,              // Unique identifier
  type: "custom",          // ReactFlow node type
  position: {
    x: number,             // X coordinate
    y: number              // Y coordinate
  },
  data: {
    label: string,         // Display text
    description: string,   // Additional info
    nodeType: "leo" | "assessment",
    nodeId: string,        // User-facing ID (e.g., "01_02")
    level: number,         // 1-5 complexity level
    tags: string[],        // Organization tags
    onDelete: function,    // Callback for deletion
    onLabelChange: function // Callback for edits
  }
}
```

### Edge Structure

```javascript
{
  id: string,              // Unique identifier (e.g., "e1-2")
  source: string,          // Source node ID
  target: string,          // Target node ID
  type: "smoothstep",      // ReactFlow edge type
  animated: boolean,       // Animation enabled
  label: string,           // Edge label text
  style: {
    stroke: string,        // Line color
    strokeWidth: number    // Line thickness
  },
  data: {
    edgeType: "requires" | "implies" | "tests"
  }
}
```

### History State

```javascript
{
  nodes: Node[],           // Snapshot of nodes
  edges: Edge[]            // Snapshot of edges
}
```

---

## 6. State Management

### React Hooks Usage

CourseGraph uses React's built-in hooks for state management:

| Hook | Purpose |
|------|---------|
| `useState` | Local component state |
| `useCallback` | Memoized callbacks |
| `useEffect` | Side effects (auto-save, resize) |
| `useNodesState` | ReactFlow nodes state |
| `useEdgesState` | ReactFlow edges state |
| `useReactFlow` | ReactFlow instance access |

### State Flow Diagram

```
User Action
    │
    ▼
Event Handler (e.g., deleteNode)
    │
    ▼
State Update (setNodes, setEdges)
    │
    ├──────────────────────┐
    ▼                      ▼
UI Re-render          useEffect triggers
    │                      │
    ▼                      ▼
ReactFlow updates     History update
                           │
                           ▼
                      Auto-save (debounced)
                           │
                           ▼
                      localStorage write
```

### Undo/Redo Implementation

```javascript
// History maintained as array of states
const [history, setHistory] = useState([initialState]);
const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

// Undo: move back in history
function handleUndo() {
  if (currentHistoryIndex > 0) {
    const prevState = history[currentHistoryIndex - 1];
    setNodes(prevState.nodes);
    setEdges(prevState.edges);
    setCurrentHistoryIndex(currentHistoryIndex - 1);
  }
}

// Redo: move forward in history
function handleRedo() {
  if (currentHistoryIndex < history.length - 1) {
    const nextState = history[currentHistoryIndex + 1];
    setNodes(nextState.nodes);
    setEdges(nextState.edges);
    setCurrentHistoryIndex(currentHistoryIndex + 1);
  }
}
```

**History Limit:** 50 states (oldest removed when exceeded)

---

## 7. Key Algorithms

### Auto-Layout Algorithm

**Type:** Hierarchical Layer-Based Layout

**Input:** Nodes array, Edges array

**Output:** Nodes with updated positions

**Algorithm Steps:**

1. **Build Adjacency List:**
   ```javascript
   const graph = {};
   edges.forEach(edge => {
     graph[edge.source].push(edge.target);
   });
   ```

2. **Find Root Nodes:**
   ```javascript
   const roots = nodes.filter(n =>
     !edges.some(e => e.target === n.id)
   );
   ```

3. **Assign Layers (BFS):**
   ```javascript
   const layers = {};
   const queue = [...roots];
   roots.forEach(r => layers[r.id] = 0);

   while (queue.length > 0) {
     const current = queue.shift();
     graph[current].forEach(child => {
       layers[child] = layers[current] + 1;
       queue.push(child);
     });
   }
   ```

4. **Calculate Positions:**
   ```javascript
   const LAYER_HEIGHT = 150;
   const NODE_WIDTH = 200;

   // Group nodes by layer
   const layerGroups = groupBy(nodes, n => layers[n.id]);

   // Position nodes in each layer
   layerGroups.forEach((layerNodes, layerIndex) => {
     layerNodes.forEach((node, nodeIndex) => {
       node.position = {
         x: nodeIndex * NODE_WIDTH,
         y: layerIndex * LAYER_HEIGHT
       };
     });
   });
   ```

### PNG Export Algorithm

**Library:** html-to-image

**Process:**

1. Get ReactFlow viewport element
2. Calculate bounding box of all nodes
3. Convert DOM to canvas with html-to-image
4. Trigger download of PNG file

```javascript
async function exportToPNG(reactFlowInstance) {
  const element = document.querySelector('.react-flow__viewport');
  const dataUrl = await toPng(element, {
    backgroundColor: '#ffffff',
    quality: 1.0
  });

  const link = document.createElement('a');
  link.download = 'coursegraph.png';
  link.href = dataUrl;
  link.click();
}
```

### Excel Export Algorithm

**Library:** xlsx (SheetJS)

**Process:**

1. Transform nodes to worksheet data
2. Transform edges to worksheet data
3. Calculate statistics
4. Create workbook with multiple sheets
5. Trigger download

```javascript
async function exportToExcel(nodes, edges) {
  const wb = XLSX.utils.book_new();

  // Learning Outcomes sheet
  const leoData = nodes
    .filter(n => n.data.nodeType === 'leo')
    .map(n => ({
      ID: n.data.nodeId,
      Label: n.data.label,
      Description: n.data.description,
      Level: n.data.level
    }));
  XLSX.utils.book_append_sheet(wb,
    XLSX.utils.json_to_sheet(leoData),
    'Learning Outcomes'
  );

  // Similar for other sheets...

  XLSX.writeFile(wb, 'coursegraph.xlsx');
}
```

---

## 8. Build System

### Vite Configuration

CourseGraph uses three Vite configurations:

| Config File | Target | Purpose |
|-------------|--------|---------|
| `vite.main.config.mjs` | Main Process | Compiles Electron main |
| `vite.renderer.config.mjs` | Renderer | Compiles React UI |
| `vite.preload.config.mjs` | Preload | Compiles preload script |

**Renderer Config (vite.renderer.config.mjs):**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});
```

### Electron Forge Configuration

**File:** `forge.config.js`

```javascript
module.exports = {
  packagerConfig: {
    asar: true  // Package as ASAR archive
  },
  makers: [
    // Windows installer
    { name: '@electron-forge/maker-squirrel' },
    // macOS ZIP
    { name: '@electron-forge/maker-zip', platforms: ['darwin'] },
    // Linux DEB
    { name: '@electron-forge/maker-deb' },
    // Linux RPM
    { name: '@electron-forge/maker-rpm' }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        build: [
          { entry: 'src/main.js', config: 'vite.main.config.mjs' },
          { entry: 'src/preload.js', config: 'vite.preload.config.mjs' }
        ],
        renderer: [
          { name: 'main_window', config: 'vite.renderer.config.mjs' }
        ]
      }
    }
  ]
};
```

### Build Commands

| Command | Action |
|---------|--------|
| `npm start` | Development server with HMR |
| `npm run package` | Create unpacked app |
| `npm run make` | Create platform installers |
| `npm run publish` | Publish to distribution |

---

## 9. API Reference

### ReactFlow Event Handlers

| Event | Handler | Description |
|-------|---------|-------------|
| `onNodesChange` | Auto-generated | Node position, selection changes |
| `onEdgesChange` | Auto-generated | Edge selection changes |
| `onConnect` | `onConnectHandler` | New edge creation |
| `onNodeClick` | `handleNodeClick` | Node selection |
| `onEdgeClick` | `handleEdgeClick` | Edge selection |
| `onPaneClick` | `handlePaneClick` | Deselection |

### Component Props API

#### AddNodeDialog

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Dialog visibility |
| `onClose` | function | Yes | Close handler |
| `onAdd` | function | Yes | Add node callback |

#### EditNodeDialog

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Dialog visibility |
| `onClose` | function | Yes | Close handler |
| `node` | object | Yes | Node to edit |
| `onSave` | function | Yes | Save callback |

#### NodeProperties

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `selectedNode` | object | No | Currently selected node |
| `selectedEdge` | object | No | Currently selected edge |
| `onEditNode` | function | No | Edit node callback |
| `onEditEdge` | function | No | Edit edge callback |

---

## 10. Testing Strategy

### Unit Testing

**Framework:** Vitest with React Testing Library

**Test Files Location:** `src/test/*.test.jsx`

**Configuration Files:**
- `vitest.config.js` - Vitest configuration
- `src/test/setup.js` - Test setup with jest-dom matchers

**Components Tested:**

| Component | Test File | Tests | Description |
|-----------|-----------|-------|-------------|
| AddNodeDialog | `AddNodeDialog.test.jsx` | 5 | Node creation dialog |
| CustomNode | `CustomNode.test.jsx` | 5 | Custom node rendering |
| EdgeTypeDialog | `EdgeTypeDialog.test.jsx` | 4 | Edge type selection |
| EditConnectionDialog | `EditConnectionDialog.test.jsx` | 4 | Connection editing dialog |
| EditNodeDialog | `EditNodeDialog.test.jsx` | 4 | Node editing dialog |
| NewProjectDialog | `NewProjectDialog.test.jsx` | 4 | New project confirmation |
| NodeProperties | `NodeProperties.test.jsx` | 3 | Properties sidebar |
| SaveLoadDialog | `Saveloadmanager.test.jsx` | 4 | Save/load functionality |
| **Subtotal Components** | **8 files** | **33** | |

**Utility Functions Tested:**

| Utility | Test File | Tests | Description |
|---------|-----------|-------|-------------|
| edgeUtils | `edgeUtils.test.jsx` | 12 | Edge styling functions (getEdgeStyle, getEdgeLabel, getEdgeLabelStyle) |
| autoLayout | `autoLayout.test.jsx` | 9 | Graph layout algorithm (autoLayoutGraph) |
| **Subtotal Utilities** | **2 files** | **21** | |

**Total: 10 test files, 54 tests**

**Test Commands:**

| Command | Description |
|---------|-------------|
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

**Example Test:**

```javascript
// AddNodeDialog.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import AddNodeDialog from '../components/AddNodeDialog';

describe('AddNodeDialog', () => {
  test('renders with LEO title when initialType is leo', () => {
    render(
      <AddNodeDialog
        initialType="leo"
        onAdd={() => {}}
        onCancel={() => {}}
        allTags={[]}
      />
    );
    expect(screen.getByText(/Adding Learning Outcome/i)).toBeInTheDocument();
  });

  test('calls onCancel when Cancel button is clicked', () => {
    const mockOnCancel = vi.fn();
    render(
      <AddNodeDialog
        initialType="leo"
        onAdd={() => {}}
        onCancel={mockOnCancel}
        allTags={[]}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
```

**Test Results:**

```
Test Files  10 passed (10)
     Tests  54 passed (54)
```

### Integration Testing

**Focus Areas:**
- Node creation workflow
- Edge creation workflow
- Save/Load functionality
- Export functionality

### End-to-End Testing

**Framework:** Playwright or Spectron (recommended for future implementation)

**Scenarios:**
1. Create a complete course graph
2. Save and reload the application
3. Export to PNG and Excel
4. Undo/Redo operations

### Test Coverage

| Area | Status |
|------|--------|
| React Components | 8/8 tested (33 tests) |
| Utility Functions | 2/3 tested (21 tests) |
| Integration | Manual testing completed |
| Utility functions | Pending |
| Integration | Manual testing completed |

---

## 11. Performance Considerations

### Current Optimizations

1. **Debounced Auto-Save:** 500ms delay prevents excessive localStorage writes
2. **History Limit:** 50 states maximum prevents memory bloat
3. **Memoized Callbacks:** `useCallback` prevents unnecessary re-renders
4. **ReactFlow Virtualization:** Only visible nodes are rendered

### Performance Guidelines

| Metric | Target | Notes |
|--------|--------|-------|
| Initial Load | < 2s | With default nodes |
| Node Interaction | 60 FPS | Drag, select, edit |
| Auto-Save | < 50ms | Non-blocking |
| Export PNG | < 5s | Depends on graph size |

### Scalability Limits

| Graph Size | Performance |
|------------|-------------|
| 1-50 nodes | Excellent |
| 50-100 nodes | Good |
| 100-200 nodes | Acceptable |
| 200+ nodes | May need optimization |

### Memory Management

- History states are capped at 50
- Old auto-saves are overwritten
- ReactFlow handles node/edge cleanup

---

## 12. Security Considerations

### Electron Security

**Current Configuration:**
- Preload script isolates renderer from Node.js
- Context isolation is enabled by default in Electron 39

**Recommendations for Production:**
1. Enable Electron Fuses (commented in forge.config.js)
2. Disable DevTools in production builds
3. Implement Content Security Policy

### Data Security

**Current State:**
- Data stored in localStorage (browser sandbox)
- No network requests
- No authentication required

**Considerations:**
- localStorage is not encrypted
- Sensitive course data should be handled appropriately
- Consider file-based storage for sensitive data

### Input Validation

**Current Implementation:**
- Node labels are sanitized for display
- No SQL or command injection vectors (no backend)
- ReactFlow handles XSS prevention in labels

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **ASAR** | Atom Shell Archive - Electron's packaging format |
| **HMR** | Hot Module Replacement - live code updates |
| **IPC** | Inter-Process Communication |
| **LEO** | Learning Outcome |
| **ReactFlow** | Library for building node-based editors |
| **Renderer Process** | Electron's UI process (Chrome-based) |

## Appendix B: Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2025 | Initial release |

---

**CourseGraph Technical Documentation**

*FH Technikum Wien - Software Engineering*
