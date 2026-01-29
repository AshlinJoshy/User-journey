'use client';

import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  Panel,
  NodeMouseHandler,
  EdgeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Save } from 'lucide-react';

import Sidebar from './Sidebar';
import CustomNode from './nodes/CustomNode';
import NodeConfigPanel from './NodeConfigPanel';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { label: 'Start Campaign', type: 'source' },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `dndnode_${id++}_${Date.now()}`; // Ensure unique IDs across sessions

interface JourneyBuilderProps {
  projectId?: string;
}

const JourneyBuilder = ({ projectId }: JourneyBuilderProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Load project data
  useEffect(() => {
    if (projectId) {
      const savedData = localStorage.getItem(`project-${projectId}`);
      if (savedData) {
        try {
          const flow = JSON.parse(savedData);
          if (flow.nodes) setNodes(flow.nodes);
          if (flow.edges) setEdges(flow.edges);
        } catch (e) {
          console.error("Failed to load project", e);
        }
      }
    }
  }, [projectId, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');
      const nodeType = event.dataTransfer.getData('application/nodeType'); // e.g., source, channel, action

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: 'custom', // We use one custom node component and pass specific type via data
        position,
        data: { label: label || `${type} node`, type: nodeType },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const selectedNode = useMemo(() => {
    return nodes.find((n) => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  const saveProject = useCallback(() => {
    if (projectId && reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(`project-${projectId}`, JSON.stringify(flow));
      
      // Update last modified date in project list
      const projects = JSON.parse(localStorage.getItem('real-estate-projects') || '[]');
      const updatedProjects = projects.map((p: any) => {
        if (p.id === projectId) {
          return { ...p, updatedAt: new Date().toISOString() };
        }
        return p;
      });
      localStorage.setItem('real-estate-projects', JSON.stringify(updatedProjects));
      
      setLastSaved(new Date().toLocaleTimeString());
      // Optional: Show toast
    }
  }, [projectId, reactFlowInstance]);

  // Auto-save every 30 seconds (optional, but good for UX)
  useEffect(() => {
    const interval = setInterval(() => {
      if (projectId && reactFlowInstance) {
        saveProject();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [saveProject, projectId, reactFlowInstance]);

  return (
    <div className="dndflow w-full h-full flex">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper flex-grow h-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            deleteKeyCode={['Backspace', 'Delete']}
            fitView
          >
            <Controls />
            <Background />
            <MiniMap />
            <Panel position="top-right" className="flex flex-col gap-2 items-end mr-12 md:mr-0">
               <div className="bg-white p-2 rounded shadow-sm border text-xs text-gray-500 flex flex-col gap-1">
                <div>Drag nodes to map journey.</div>
                <div>Select a node/edge and press <b>Backspace</b> to delete.</div>
              </div>
              
              {projectId && (
                <div className="flex items-center gap-2">
                  {lastSaved && <span className="text-xs text-gray-400">Saved: {lastSaved}</span>}
                  <button 
                    onClick={saveProject}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </Panel>
          </ReactFlow>
        </div>
        {selectedNode && (
          <NodeConfigPanel
            selectedNode={selectedNode}
            setNodes={setNodes}
            setSelectedNode={(node) => setSelectedNodeId(node?.id || null)}
          />
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default JourneyBuilder;
