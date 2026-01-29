'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

const FunnelNode = ({ data, selected }: NodeProps<Node>) => {
  return (
    <div className={clsx(
      "w-64 bg-white rounded-lg shadow-lg border-2 overflow-hidden",
      selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
    )}>
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-sm text-gray-700">Marketing Funnel</span>
      </div>

      {/* Top of Funnel (ToFu) */}
      <div className="relative p-4 border-b border-gray-100 bg-blue-50/30 hover:bg-blue-50 transition-colors">
        <Handle 
          type="target" 
          position={Position.Left} 
          id="tofu-target"
          className="!bg-blue-400 !w-3 !h-3 !-left-1.5"
          style={{ top: '50%' }}
        />
        <div className="text-center">
          <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Top of Funnel (ToFu)</div>
          <div className="text-[10px] text-gray-500">Awareness & Discovery</div>
        </div>
        <Handle 
          type="source" 
          position={Position.Right} 
          id="tofu-source"
          className="!bg-blue-400 !w-3 !h-3 !-right-1.5"
          style={{ top: '50%' }}
        />
      </div>

      {/* Middle of Funnel (MoFu) */}
      <div className="relative p-4 border-b border-gray-100 bg-purple-50/30 hover:bg-purple-50 transition-colors">
        <Handle 
          type="target" 
          position={Position.Left} 
          id="mofu-target"
          className="!bg-purple-400 !w-3 !h-3 !-left-1.5"
          style={{ top: '50%' }}
        />
        <div className="text-center">
          <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">Middle of Funnel (MoFu)</div>
          <div className="text-[10px] text-gray-500">Consideration & Intent</div>
        </div>
        <Handle 
          type="source" 
          position={Position.Right} 
          id="mofu-source"
          className="!bg-purple-400 !w-3 !h-3 !-right-1.5"
          style={{ top: '50%' }}
        />
      </div>

      {/* Bottom of Funnel (BoFu) */}
      <div className="relative p-4 bg-orange-50/30 hover:bg-orange-50 transition-colors">
        <Handle 
          type="target" 
          position={Position.Left} 
          id="bofu-target"
          className="!bg-orange-400 !w-3 !h-3 !-left-1.5"
          style={{ top: '50%' }}
        />
        <div className="text-center">
          <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">Bottom of Funnel (BoFu)</div>
          <div className="text-[10px] text-gray-500">Conversion & Loyalty</div>
        </div>
        <Handle 
          type="source" 
          position={Position.Right} 
          id="bofu-source"
          className="!bg-orange-400 !w-3 !h-3 !-right-1.5"
          style={{ top: '50%' }}
        />
      </div>
    </div>
  );
};

export default memo(FunnelNode);
