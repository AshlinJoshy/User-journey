'use client';

import React, { useCallback, useRef, useState, useMemo } from 'react';
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
const getId = () => `dndnode_${id++}`;

const JourneyBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

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

  // Optional: You can handle edge clicks if you want to show a delete button for edges in a panel
  // But standard behavior is select + backspace.
  
  const selectedNode = useMemo(() => {
    return nodes.find((n) => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

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
            <Panel position="top-right" className="bg-white p-2 rounded shadow-sm border text-xs text-gray-500 mr-12 md:mr-0 flex flex-col gap-1">
              <div>Drag nodes to map journey.</div>
              <div>Select a node/edge and press <b>Backspace</b> to delete.</div>
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
