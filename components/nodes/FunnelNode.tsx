'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

const FunnelNode = ({ data, selected }: NodeProps<Node>) => {
  const commonHandleStyle = "!w-3 !h-3";
  
  return (
    <div className={clsx(
      "flex flex-col items-center relative",
      selected ? "drop-shadow-lg" : ""
    )}>
      
      {/* Top of Funnel (ToFu) - Wide Top */}
      <div className="relative w-80 h-24 bg-blue-50 border-2 border-blue-200 rounded-t-lg mb-1 flex flex-col items-center justify-center hover:bg-blue-100 transition-colors"
           style={{ clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}>
        {/* Handles need to be absolutely positioned outside the clip-path or on the edge */}
        {/* Since clip-path cuts off children, we actually need to use SVG or CSS shapes differently, 
            or place handles on a wrapper. For simplicity with React Flow handles, 
            we'll use a visual trapezoid effect with standard divs but styled to look like a funnel.
        */}
      </div>
      
      {/* Re-implementing structure to allow Handles to be clickable (not clipped) */}
       <div className={clsx(
          "w-80 flex flex-col bg-white/50 backdrop-blur-sm rounded-lg border-2",
          selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
       )}>
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-center gap-2 rounded-t-lg">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-sm text-gray-700">Marketing Funnel</span>
          </div>

          {/* ToFu Section */}
          <div className="relative p-6 bg-blue-50/40 hover:bg-blue-50 border-b border-gray-100">
             {/* Visual Funnel Shape Background can be added here if needed, but simple stacked rectangles is cleaner for connectivity */}
             <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-blue-500 to-blue-200" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'}}></div>
             
             <div className="relative z-10 text-center">
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Top of Funnel (ToFu)</div>
                <div className="text-[10px] text-gray-500">Awareness & Discovery</div>
             </div>

             {/* Handles - ToFu */}
             <Handle type="target" position={Position.Top} id="tofu-top" className={clsx(commonHandleStyle, "!bg-blue-400")} />
             <Handle type="target" position={Position.Left} id="tofu-left" className={clsx(commonHandleStyle, "!bg-blue-400")} style={{top: '50%'}} />
             <Handle type="source" position={Position.Right} id="tofu-right" className={clsx(commonHandleStyle, "!bg-blue-400")} style={{top: '50%'}} />
             {/* No bottom handle to separate stages clearly */}
          </div>

          {/* MoFu Section */}
          <div className="relative p-6 bg-purple-50/40 hover:bg-purple-50 border-b border-gray-100 w-[90%] mx-auto">
             <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-purple-500 to-purple-200" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)'}}></div>
             
             <div className="relative z-10 text-center">
                <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">Middle of Funnel (MoFu)</div>
                <div className="text-[10px] text-gray-500">Consideration & Intent</div>
             </div>

             {/* Handles - MoFu */}
             <Handle type="target" position={Position.Left} id="mofu-left" className={clsx(commonHandleStyle, "!bg-purple-400")} style={{top: '50%', left: -6}} />
             <Handle type="source" position={Position.Right} id="mofu-right" className={clsx(commonHandleStyle, "!bg-purple-400")} style={{top: '50%', right: -6}} />
          </div>

          {/* BoFu Section */}
          <div className="relative p-6 bg-orange-50/40 hover:bg-orange-50 w-[80%] mx-auto rounded-b-lg">
             <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-orange-500 to-orange-200" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)'}}></div>

             <div className="relative z-10 text-center">
                <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">Bottom of Funnel (BoFu)</div>
                <div className="text-[10px] text-gray-500">Conversion & Loyalty</div>
             </div>

             {/* Handles - BoFu */}
             <Handle type="target" position={Position.Left} id="bofu-left" className={clsx(commonHandleStyle, "!bg-orange-400")} style={{top: '50%', left: -6}} />
             <Handle type="source" position={Position.Right} id="bofu-right" className={clsx(commonHandleStyle, "!bg-orange-400")} style={{top: '50%', right: -6}} />
             <Handle type="source" position={Position.Bottom} id="bofu-bottom" className={clsx(commonHandleStyle, "!bg-orange-400")} />
          </div>
       </div>
    </div>
  );
};

export default memo(FunnelNode);
