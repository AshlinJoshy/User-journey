'use client';

import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { X, Trash2 } from 'lucide-react';

interface NodeConfigPanelProps {
  selectedNode: Node | null;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setSelectedNode: (node: Node | null) => void;
}

const NodeConfigPanel = ({ selectedNode, setNodes, setSelectedNode }: NodeConfigPanelProps) => {
  const [label, setLabel] = useState('');
  const [target, setTarget] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel((selectedNode.data.label as string) || '');
      setTarget((selectedNode.data.target as string) || '');
      setDescription((selectedNode.data.description as string) || '');
    }
  }, [selectedNode]);

  const handleUpdate = () => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label,
              target,
              description,
            },
          };
        }
        return node;
      })
    );
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    
    // Remove the node
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    // Clear selection
    setSelectedNode(null);
  };

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-4 hidden md:block">
        <div className="text-sm text-gray-500 text-center mt-10">
          Select a node to configure its properties.
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col h-full shadow-xl md:shadow-none z-10 absolute md:relative right-0 top-0 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Configure Node</h3>
        <button onClick={() => setSelectedNode(null)} className="md:hidden">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 flex-grow overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              // handleUpdate(); // Wait for blur to update for performance, or add debounce. 
              // React state update is fast enough for input, but let's stick to onBlur/onChange combination for immediate feedback if needed.
              // Actually, updating on every keystroke might re-render flow too often, so let's keep handleUpdate for onBlur or specific save.
              // BUT, to see live changes on canvas, we need to update nodes. 
              // Let's rely on onBlur for the node update to avoid lag.
            }}
            onBlur={handleUpdate}
            // Add onKeyDown Enter to save
            onKeyDown={(e) => { if(e.key === 'Enter') handleUpdate(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target / Goal
          </label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onBlur={handleUpdate}
            placeholder="e.g. First Time Buyers, Leads"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Define the target audience or the goal for this step.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleUpdate}
            rows={4}
            placeholder="Details about this step..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t flex flex-col gap-2">
        <button 
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Delete Node
        </button>
        <div className="text-xs text-gray-400 text-center">
          ID: {selectedNode.id}
        </div>
      </div>
    </aside>
  );
};

export default NodeConfigPanel;
