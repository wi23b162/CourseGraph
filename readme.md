# CourseGraph

A desktop application for course designers to visualize and manage learning outcomes and assessments using interactive graph visualization.

## Vision

CourseGraph supports course designers in developing courses following the **Constructive Alignment** approach. The tool enables the definition of Learning Outcomes (LEOs) and their relationships, linking them to assessments, and visualizing the entire course structure as an interactive graph.

## Features

### Core Features
- **Interactive Graph Canvas** - Drag, zoom, and pan to explore course structures
- **Node Management** - Create, edit, and delete Learning Outcome and Assessment nodes
- **Visual Differentiation** - Color-coded nodes (blue for LEOs, green/yellow for Assessments) with 5 complexity levels
- **Node Connections** - Create relationships between nodes with drag & drop
- **Edge Types** - Three relationship types: requires (orange), implies (blue), tests (green)
- **Tags** - Organize nodes with custom tags for better categorization

### Data Management
- **Auto-Save** - Automatic saving to localStorage with debouncing
- **Manual Save** - Explicit save checkpoints
- **Undo/Redo** - Revert and restore changes (up to 50 states)
- **New Project** - Start fresh with confirmation dialog

### Export Options
- **PNG Export** - High-resolution graph snapshots
- **Excel Export** - Multi-sheet workbook with Learning Outcomes, Connections, and Statistics

### Navigation & UI
- **Zoom Controls** - Easy navigation with +/- buttons
- **Collapsible Sidebars** - Left sidebar for node list, right sidebar for properties
- **Search & Filter** - Find nodes by name, type, level, or tags
- **Auto-Layout** - Automatic hierarchical graph organization
- **Toast Notifications** - User feedback for all actions

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Electron** | 39.2.2 | Cross-platform desktop framework |
| **React** | 19.2.0 | UI component library |
| **ReactFlow** | 11.11.4 | Graph visualization |
| **Vite** | 7.2.6 | Build tool with HMR |
| **Node.js** | 20.x | Runtime environment |

### Additional Libraries
- `react-toastify` - Toast notifications
- `html-to-image` - PNG export
- `xlsx` - Excel export

## Installation

### Prerequisites
- Node.js (v20.x or higher)
- npm (v11.x or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/wi23b162/CourseGraph.git

# Navigate to project directory
cd CourseGraph

# Install dependencies
npm install

# Start the application
npm start
```

## Usage

### Creating Nodes

1. Click **"+ Node hinzufugen"** in the toolbar
2. Select node type:
   - **Learning Outcome (LEO)** - Blue nodes
   - **Assessment** - Green/Yellow nodes
3. Enter a label and optional description
4. Select a complexity level (1-5)
5. Add tags for organization (optional)
6. Click **"Hinzufugen"**

### Editing Nodes

- **Double-click** on a node to edit its label inline
- Or click the **Edit** button on the node for full editing dialog
- Modify label, description, level, or tags
- Click **"Speichern"** to save changes

### Deleting Nodes

- Click the **Delete** button on a node
- Confirm deletion in the dialog
- Connected edges are automatically removed

### Creating Connections

1. Hover over the source node
2. Drag from the connection handle (small circle)
3. Drop on the target node
4. Select connection type:
   - **requires** (orange) - Prerequisite relationship
   - **implies** (blue) - Enables relationship
   - **tests** (green) - Assessment relationship
5. Click **"Verbinden"**

### Navigation

| Action | Method |
|--------|--------|
| Move nodes | Click and drag |
| Zoom | Mouse wheel or +/- buttons |
| Pan canvas | Click empty space and drag |
| Select node | Click on node |
| Deselect | Click empty canvas |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Y | Redo |
| Delete | Delete selected |
| Escape | Cancel action |
| Enter | Confirm edit |

### Exporting

- **PNG**: Click "Als PNG exportieren" - saves graph as image
- **Excel**: Click "Als Excel exportieren" - creates workbook with:
  - Learning Outcomes sheet
  - Connections sheet
  - Statistics sheet

## Project Structure

```
CourseGraph/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
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
│   ├── utils/
│   │   ├── exportUtils.js         # PNG and Excel export
│   │   └── autoLayout.js          # Graph layout algorithm
│   ├── renderer.jsx               # React entry point
│   ├── index.css                  # Global styles
│   ├── main.js                    # Electron main process
│   └── preload.js                 # Electron preload script
├── docs/
│   ├── USER_HANDBOOK.md           # End-user guide
│   ├── INSTALLATION_GUIDE.md      # Setup instructions
│   └── TECHNICAL_DOCUMENTATION.md # Developer documentation
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── forge.config.js                # Electron Forge configuration
└── vite.*.config.mjs              # Vite build configurations
```

## Requirements

### Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR1 | Create and manage LEO and Assessment nodes | Implemented |
| FR2 | Connect nodes with typed relationships | Implemented |
| FR3 | Interactive graph with zoom, pan, drag | Implemented |
| FR4 | Visual differentiation by node type and level | Implemented |
| FR5 | Save, load, and auto-save functionality | Implemented |
| FR6 | Export to PNG and Excel | Implemented |
| FR7 | Undo/Redo functionality | Implemented |
| FR8 | New project with confirmation | Implemented |
| FR9 | Auto-layout for graph organization | Implemented |
| FR10 | Tag management for nodes | Implemented |

### Non-Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| NFR1 | Intuitive interface for first-time users | Implemented |
| NFR2 | Smooth performance with 100+ nodes | Implemented |
| NFR3 | Data persistence with auto-save | Implemented |
| NFR4 | Accessibility improvements | Implemented |

## Development

### Run in Development Mode

```bash
npm start
```
- Opens Electron window with hot-reload
- Changes to source files automatically refresh the app
- DevTools open automatically for debugging

### Build for Production

```bash
npm run make
```
- Creates distributable packages in `out/` directory
- Supports Windows (Squirrel), macOS (ZIP), Linux (DEB, RPM)

### Available Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Start development server |
| `npm run package` | Package the app |
| `npm run make` | Create distributable packages |
| `npm run publish` | Publish to distribution platforms |

## Documentation

Detailed documentation is available in the `docs/` folder:

- **[User Handbook](docs/USER_HANDBOOK.md)** - Complete guide for end users
- **[Installation Guide](docs/INSTALLATION_GUIDE.md)** - Setup and installation instructions
- **[Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)** - Architecture and developer guide

## Team

**Project:** CourseGraph
**Organization:** FH Technikum Wien
**Department:** Software Engineering & Architecture
**Contact:** Thomas MANDL (thomas.mandl@technikum-wien.at)

## License

This project is created as part of academic coursework at FH Technikum Wien.

## Known Issues

- Edge labels may overlap with nodes on very complex graphs
- Large graphs (200+ nodes) may experience performance degradation

---

**Built with Electron, React, and ReactFlow**

*Last updated: January 2025*
