import React from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import ActionButtons from './ActionButtons';
import ZoomControls from './ZoomControls';
import UndoRedoControls from './UndoRedoControls';

/**
 * Main toolbar container component
 */
const Toolbar = ({ filtering, nodeManagement, exportFns, navigation, undoRedo, onOpenSaveLoad }) => {
  return (
    <div
      style={{
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '10px',
      }}
    >
      <h1
        style={{
          color: '#1e293b',
          margin: 0,
          fontSize: '20px',
          fontWeight: '600',
        }}
      >
        CourseGraph
      </h1>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <SearchBar searchQuery={filtering.searchQuery} setSearchQuery={filtering.setSearchQuery} />

        <FilterPanel
          isFilterOpen={filtering.isFilterOpen}
          setIsFilterOpen={filtering.setIsFilterOpen}
          filterType={filtering.filterType}
          setFilterType={filtering.setFilterType}
          filterLevel={filtering.filterLevel}
          setFilterLevel={filtering.setFilterLevel}
          tagSearch={filtering.tagSearch}
          setTagSearch={filtering.setTagSearch}
          filterTag={filtering.filterTag}
          setFilterTag={filtering.setFilterTag}
          connFilter={filtering.connFilter}
          setConnFilter={filtering.setConnFilter}
          allTags={filtering.allTags}
          resetFilters={filtering.resetFilters}
        />

        <div style={{ width: '1px', height: '32px', background: '#e2e8f0', marginLeft: '10px', marginRight: '10px' }} />

        <ActionButtons
          onAddLEO={() => nodeManagement.setShowDialog({ type: 'leo' })}
          onAddAssessment={() => nodeManagement.setShowDialog({ type: 'assessment' })}
          onSaveLoad={onOpenSaveLoad}
          onExportPNG={exportFns.handleExportPNG}
          onExportExcel={exportFns.handleExportExcel}
          isExportingPNG={exportFns.isExportingPNG}
          isExportingExcel={exportFns.isExportingExcel}
        />

        <div style={{ width: '1px', height: '32px', background: '#e2e8f0', marginLeft: '10px', marginRight: '10px' }} />

        <ZoomControls
          zoomLevel={navigation.zoomLevel}
          handleZoomIn={navigation.handleZoomIn}
          handleZoomOut={navigation.handleZoomOut}
          handleFitView={navigation.handleFitView}
        />

        <UndoRedoControls
          handleUndo={undoRedo.handleUndo}
          handleRedo={undoRedo.handleRedo}
          canUndo={undoRedo.canUndo}
          canRedo={undoRedo.canRedo}
        />
      </div>
    </div>
  );
};

export default Toolbar;
