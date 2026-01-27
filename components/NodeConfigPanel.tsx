'use client';

import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { X } from 'lucide-react';

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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              handleUpdate(); // Auto-save on change or use explicit save
            }}
            onBlur={handleUpdate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conditional fields based on type could go here */}
        
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
      
      <div className="mt-auto pt-4 border-t text-xs text-gray-400">
        ID: {selectedNode.id}
      </div>
    </aside>
  );
};

export default NodeConfigPanel;
