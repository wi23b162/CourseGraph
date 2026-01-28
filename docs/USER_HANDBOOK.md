# CourseGraph User Handbook

**Version 1.0 | January 2025**

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [User Interface Overview](#3-user-interface-overview)
4. [Working with Nodes](#4-working-with-nodes)
5. [Working with Connections](#5-working-with-connections)
6. [Saving and Loading Projects](#6-saving-and-loading-projects)
7. [Exporting Your Work](#7-exporting-your-work)
8. [Navigation and Controls](#8-navigation-and-controls)
9. [Undo and Redo](#9-undo-and-redo)
10. [Tags and Organization](#10-tags-and-organization)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Introduction

### What is CourseGraph?

CourseGraph is a desktop application designed for course designers and educators to visualize and manage learning outcomes using the **Constructive Alignment** approach. It provides an interactive graph-based interface to:

- Define Learning Outcomes (LEOs)
- Create Assessment nodes
- Visualize relationships between course components
- Export course structures for documentation

### Who is This For?

- **Course Designers** developing curriculum based on Constructive Alignment
- **Educators** planning course structures and assessments
- **Academic Staff** documenting learning outcomes and their relationships

### Key Concepts

| Term | Description |
|------|-------------|
| **Learning Outcome (LEO)** | A statement describing what students will be able to do after completing a course or module |
| **Assessment** | An evaluation method to measure if learning outcomes have been achieved |
| **Constructive Alignment** | An educational framework ensuring learning activities and assessments align with intended learning outcomes |
| **Node** | A visual element representing either a LEO or Assessment |
| **Edge/Connection** | A line connecting two nodes showing their relationship |

---

## 2. Getting Started

### Launching the Application

1. Double-click the **CourseGraph** application icon
2. The application window opens with a default canvas
3. If you have previously saved work, it will be automatically loaded

### Your First Course Graph

**Step 1: Create a Learning Outcome**
1. Click the **"+ Node hinzufugen"** button in the toolbar
2. Select **"Learning Outcome (LEO)"**
3. Enter a label (e.g., "Understand basic programming concepts")
4. Optionally add a description
5. Click **"Hinzufugen"**

**Step 2: Create an Assessment**
1. Click **"+ Node hinzufugen"** again
2. Select **"Assessment"**
3. Enter a label (e.g., "Programming Quiz")
4. Click **"Hinzufugen"**

**Step 3: Connect Them**
1. Hover over the Learning Outcome node
2. Drag from the connection handle (small circle) to the Assessment node
3. Select the relationship type (e.g., "tests")

Congratulations! You've created your first course graph!

---

## 3. User Interface Overview

```
+------------------------------------------------------------------+
|  [Toolbar]  + Node | New Project | Undo | Redo | Export | ...    |
+--------+------------------------------------------+---------------+
|        |                                          |               |
| Left   |                                          |    Right      |
| Sidebar|           Main Canvas                    |   Sidebar     |
|        |                                          |               |
| Node   |        [Graph Visualization]             |   Node        |
| List   |                                          |   Properties  |
|        |                                          |               |
|        |                                          |               |
+--------+------------------------------------------+---------------+
|                                       [Zoom Controls]            |
+------------------------------------------------------------------+
```

### Toolbar Components

| Button | Function |
|--------|----------|
| **+ Node hinzufugen** | Add a new LEO or Assessment node |
| **Neues Projekt** | Start a new empty project |
| **Ruckgangig** | Undo the last action |
| **Wiederholen** | Redo an undone action |
| **Als PNG exportieren** | Export graph as an image |
| **Als Excel exportieren** | Export data to Excel spreadsheet |
| **Auto-Layout** | Automatically arrange nodes |

### Left Sidebar

The left sidebar displays a list of all nodes organized by type:
- **Learning Outcomes** section
- **Assessments** section

Click on any node in the list to select and center it on the canvas.

### Right Sidebar (Node Properties)

When you select a node or edge, the right sidebar shows:
- Node type and ID
- Label
- Description
- Tags
- Connected nodes (for edges: source and target)

### Canvas

The main area where your course graph is displayed. You can:
- Drag nodes to reposition them
- Create connections between nodes
- Zoom and pan to navigate

### Zoom Controls

Located in the bottom-right corner:
- **+** Zoom in
- **-** Zoom out
- **Fit** Fit all nodes in view

---

## 4. Working with Nodes

### Creating Nodes

1. Click **"+ Node hinzufugen"** in the toolbar
2. A dialog appears with options:
   - **Node Type**: Learning Outcome (LEO) or Assessment
   - **Label**: The name displayed on the node
   - **Description**: Additional details (optional)
   - **Level**: Complexity level 1-5 (affects color intensity)
   - **Tags**: Keywords for organization (optional)
3. Click **"Hinzufugen"** to create the node

### Node Types and Colors

| Type | Color | Purpose |
|------|-------|---------|
| Learning Outcome (LEO) | Blue shades | Defines what students will learn |
| Assessment | Green/Yellow shades | Measures learning achievement |

Node colors vary by level (1-5), with higher levels having more intense colors.

### Editing Nodes

**Method 1: Double-Click**
1. Double-click on the node label
2. Edit the text directly
3. Press **Enter** to save or **Escape** to cancel

**Method 2: Edit Button**
1. Click on a node to select it
2. Click the **Edit** button on the node
3. Modify the label, description, or tags in the dialog
4. Click **"Speichern"** to save changes

### Deleting Nodes

1. Click on the node to select it
2. Click the **Delete** button (trash icon) on the node
3. Confirm deletion in the dialog

> **Note**: Deleting a node also removes all connections to and from that node.

### Moving Nodes

1. Click and hold on a node
2. Drag to the desired position
3. Release to place

### Selecting Multiple Nodes

- Hold **Shift** and click multiple nodes
- Or drag a selection box around nodes

---

## 5. Working with Connections

### Connection Types

CourseGraph supports three types of relationships:

| Type | Color | Meaning |
|------|-------|---------|
| **requires** | Orange | The target node requires the source node as a prerequisite |
| **implies** | Blue | The source node enables or leads to the target node |
| **tests** | Green | The source node (assessment) tests the target node (LEO) |

### Creating Connections

1. Hover over the source node
2. Locate the connection handle (small circle on the edge of the node)
3. Click and drag from the handle
4. Drop on the target node
5. Select the connection type in the dialog
6. Click **"Verbinden"**

### Editing Connections

1. Click on the connection line to select it
2. The right sidebar shows connection details
3. Click **"Edit"** to change the connection type or label
4. Save your changes

### Deleting Connections

1. Click on the connection line to select it
2. Press **Delete** key or use the delete option
3. The connection is removed

---

## 6. Saving and Loading Projects

### Auto-Save

CourseGraph automatically saves your work to local storage every few seconds. Your work is preserved even if you close the application unexpectedly.

### Manual Save

While auto-save handles most cases, you can ensure your work is saved by:
1. Making any small change (triggers auto-save)
2. The application confirms saves via toast notifications

### Loading Previous Work

Your most recent work is automatically loaded when you start CourseGraph.

### Starting a New Project

1. Click **"Neues Projekt"** in the toolbar
2. Confirm that you want to start fresh
3. The canvas clears and you can begin a new course graph

> **Warning**: Starting a new project will clear your current work. Export or save important work first.

---

## 7. Exporting Your Work

### Export as PNG Image

1. Click **"Als PNG exportieren"** in the toolbar
2. Choose a location to save the file
3. The entire graph is saved as a high-resolution image

**Use Cases:**
- Including in presentations
- Documentation
- Sharing via email

### Export as Excel

1. Click **"Als Excel exportieren"** in the toolbar
2. Choose a location to save the file
3. An Excel workbook is created with multiple sheets:

| Sheet | Contents |
|-------|----------|
| Learning Outcomes | All LEO nodes with descriptions and metadata |
| Connections | All relationships between nodes |
| Statistics | Summary data (counts, ratios, metadata) |

**Use Cases:**
- Detailed documentation
- Further analysis
- Importing into other systems
- Reporting

---

## 8. Navigation and Controls

### Mouse Controls

| Action | Result |
|--------|--------|
| **Click node** | Select node |
| **Double-click node** | Edit node label |
| **Drag node** | Move node position |
| **Drag from handle** | Create connection |
| **Click canvas** | Deselect all |
| **Drag canvas** | Pan view |
| **Scroll wheel** | Zoom in/out |
| **Click edge** | Select connection |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Ctrl/Cmd + Z** | Undo |
| **Ctrl/Cmd + Y** | Redo |
| **Delete** | Delete selected node/edge |
| **Escape** | Cancel current action |
| **Enter** | Confirm edit |

### Zoom Controls

- **Zoom In**: Click + button or scroll up
- **Zoom Out**: Click - button or scroll down
- **Fit View**: Click the fit button to show all nodes

---

## 9. Undo and Redo

CourseGraph maintains a history of your actions, allowing you to undo mistakes.

### Undo

- Click **"Ruckgangig"** in the toolbar
- Or press **Ctrl/Cmd + Z**
- Reverts the last action

### Redo

- Click **"Wiederholen"** in the toolbar
- Or press **Ctrl/Cmd + Y**
- Restores an undone action

> **Note**: History is limited to the last 50 actions. Very old actions cannot be undone.

---

## 10. Tags and Organization

### Adding Tags to Nodes

Tags help organize and categorize your nodes:

1. Select a node
2. Click **Edit** to open the edit dialog
3. In the **Tags** field, add keywords separated by commas
4. Save your changes

### Using Tags

Tags appear on nodes and help you:
- Quickly identify node categories
- Filter nodes (future feature)
- Organize large course graphs

**Example Tags:**
- "Module 1", "Week 1"
- "Core", "Optional"
- "Beginner", "Advanced"

---

## 11. Troubleshooting

### Common Issues

**Nodes Not Saving**
- Check if the application has storage permissions
- Try exporting as a backup
- Restart the application

**Connections Not Creating**
- Ensure you're dragging from the connection handle (small circle)
- Make sure you're dropping on another node
- Check if the nodes are compatible for the connection type

**Performance Issues with Large Graphs**
- Use the Auto-Layout feature to organize nodes
- Zoom out to see the full picture
- Close other applications to free memory

**Application Won't Start**
- Ensure Node.js dependencies are installed
- Check for error messages in the console
- Try reinstalling the application

### Getting Help

If you encounter issues not covered here:
1. Check the project's GitHub repository for known issues
2. Contact your course supervisor or IT support
3. Report bugs through the appropriate channels

---

## Quick Reference Card

### Essential Actions

| Task | How To |
|------|--------|
| Add node | Toolbar > + Node hinzufugen |
| Edit node | Double-click or Edit button |
| Delete node | Select > Delete button |
| Connect nodes | Drag from handle to target |
| Undo | Ctrl/Cmd + Z |
| Export PNG | Toolbar > Als PNG exportieren |
| Export Excel | Toolbar > Als Excel exportieren |
| New project | Toolbar > Neues Projekt |

### Node Color Reference

| Level | LEO Color | Assessment Color |
|-------|-----------|------------------|
| 1 | Light Blue | Light Green |
| 2 | Blue | Green |
| 3 | Medium Blue | Yellow-Green |
| 4 | Dark Blue | Yellow |
| 5 | Deep Blue | Deep Yellow |

---

**CourseGraph** - Visualizing Learning Outcomes

*FH Technikum Wien - Software Engineering*
