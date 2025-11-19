# 📊 CourseGraph

A desktop application for course designers to visualize and manage learning outcomes and assessments using interactive graph visualization.

## 🎯 Vision

CourseGraph supports course designers in developing courses following the **Constructive Alignment** approach. The tool enables the definition of Learning Outcomes (LEOs) and their relationships, linking them to assessments, and visualizing the entire course structure as an interactive graph.

## ✨ Features

### ✅ Implemented
- **Interactive Graph Canvas** - Drag, zoom, and pan to explore course structures
- **Node Management** - Create, edit, and delete Learning Outcome and Assessment nodes
- **Visual Differentiation** - Blue nodes for Learning Outcomes, green for Assessments
- **Node Connections** - Create relationships between nodes with drag & drop
- **Custom Node Types** - Distinguish between LEO and Assessment nodes
- **Edit Mode** - Double-click or use Edit button to rename nodes
- **Delete Functionality** - Remove nodes with confirmation dialog
- **Responsive UI** - Modern toolbar with node counter
- **MiniMap** - Overview of large graphs
- **Zoom Controls** - Easy navigation for complex course structures

### 🚧 Coming Soon
- **Save/Load** - Export and import course structures as JSON
- **Export Options** - Save as PNG, Excel, or JSON
- **Edge Types** - Different relationship types (requires, implies, tested by)
- **Auto-Layout** - Automatic graph organization
- **Undo/Redo** - Revert changes
- **Templates** - Pre-built course structures

## 🛠️ Technology Stack

- **Electron** - Cross-platform desktop application framework
- **React** - UI library for interactive components
- **ReactFlow** - Graph visualization and interaction
- **Vite** - Fast build tool with hot-reload
- **Node.js** v24.11.1

## 📦 Installation

### Prerequisites
- Node.js (v24.x or higher)
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

## 🚀 Usage

### Creating Nodes

1. Click the **"+ Node hinzufügen"** button in the toolbar
2. Select node type:
   - **📘 Learning Outcome** (blue)
   - **✅ Assessment** (green)
3. Enter a label (e.g., "Understand basics" or "Quiz 1")
4. Click **"Hinzufügen"**

### Editing Nodes

- **Double-click** on a node to edit its label
- Or click the **✏️ Edit** button on the node
- Press **Enter** to save changes

### Deleting Nodes

- Click the **🗑️ Delete** button on a node
- Confirm deletion in the dialog
- Connected edges are automatically removed

### Creating Connections

1. **Drag** from a connection point (small circle) on one node
2. **Drop** on another node
3. A connection is created automatically

### Navigation

- **Drag nodes** - Click and drag to reposition
- **Zoom** - Use mouse wheel or +/- controls
- **Pan** - Click empty space and drag to move canvas
- **MiniMap** - Use the overview in the bottom-left corner

## 📁 Project Structure

```
CourseGraph/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── components/
│   │   ├── CustomNode.jsx         # Custom node component with edit/delete
│   │   └── AddNodeDialog.jsx      # Dialog for adding new nodes
│   ├── renderer.jsx               # React entry point
│   ├── index.css                  # Global styles
│   ├── main.js                    # Electron main process
│   └── preload.js                 # Electron preload script
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── forge.config.js                # Electron Forge configuration
├── vite.*.config.mjs              # Vite build configurations
└── README.md                      # This file
```

## 🎓 User Stories (Requirements)

### Functional Requirements

**FR1 - Create and Manage Nodes**
- Create new Learning Outcome or Assessment nodes
- Edit node labels
- Delete nodes with proper cleanup of connected edges

**FR2 - Connect Nodes**
- Create connections between nodes via drag & drop
- Visualize relationships with arrows and labels

**FR3 - Interactive Graph**
- Move nodes freely on canvas
- Zoom and pan for navigation
- Auto-layout for organization (planned)

**FR4 - Visual Differentiation**
- Blue nodes for Learning Outcomes
- Green nodes for Assessments
- Distinct shapes and badges for node types

**FR5 - Save, Load, and Export** (planned)
- Save course structures as JSON
- Load previously saved structures
- Export as PNG, Excel, or JSON

**FR6 - Reset and New Project** (planned)
- Start new project with confirmation
- Reset canvas to empty state

### Non-Functional Requirements

**NFR1 - Usability**
- Intuitive interface for first-time users
- Context menus for quick actions
- Visual feedback for all interactions

**NFR2 - Performance**
- Smooth performance with 100+ nodes
- Minimum 30 FPS for all interactions

**NFR3 - Reliability**
- Data persistence through save/load
- No data loss during operations

**NFR4 - Accessibility**
- Keyboard navigation support
- High contrast for readability
- Clear visual hierarchy

## 🧑‍💻 Development

### Run in Development Mode

```bash
npm start
```
- Opens Electron window with hot-reload
- Changes to source files automatically refresh the app

### Build for Production

```bash
npm run make
```
- Creates distributable packages
- Output in `out/` directory

### Available Scripts

- `npm start` - Start development server
- `npm run package` - Package the app
- `npm run make` - Create distributable packages
- `npm run publish` - Publish to distribution platforms

## 📚 Learning Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [ReactFlow Documentation](https://reactflow.dev)
- [Vite Documentation](https://vitejs.dev)

## 👥 Team

**Project:** CourseGraph  
**Organization:** FH Technikum Wien  
**Department:** Software Engineering & Architecture  
**Contact:** Thomas MANDL (thomas.mandl@technikum-wien.at)

## 📝 License

This project is created as part of academic coursework at FH Technikum Wien.

## 🤝 Contributing

This is an educational project. For contributions or questions, please contact the project supervisor.

## 🐛 Known Issues

- Edge labels can overlap with nodes on complex graphs
- Auto-layout feature not yet implemented
- Save/Load functionality in development

## 🔮 Future Enhancements

- [ ] Persistent storage with auto-save
- [ ] Multiple edge types with custom styling
- [ ] Course templates library
- [ ] Export to various formats (PDF, SVG, DOCX)
- [ ] Collaborative editing mode
- [ ] Version history and undo/redo
- [ ] Search and filter nodes
- [ ] Analytics and insights on course structure
- [ ] Integration with learning management systems

---

**Built with ❤️ using Electron, React, and ReactFlow**

*Last updated: November 2024*