'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

const FunnelNode = ({ data, selected }: NodeProps<Node>) => {
  // Handle styling: small, circular, on the edge
  const handleStyle = "!w-2.5 !h-2.5 !bg-white !border-2 !border-slate-400 hover:!border-blue-500 hover:!bg-blue-50 transition-colors";
  
  return (
    <div className="relative flex flex-col items-center w-[320px]">
      
      {/* Header Label - Floating above */}
      <div className={clsx(
        "mb-2 px-3 py-1.5 rounded-full bg-white border shadow-sm flex items-center gap-2 transition-all",
        selected ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"
      )}>
        <Filter className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Marketing Funnel</span>
      </div>

      {/* Funnel Container */}
      <div className="w-full flex flex-col filter drop-shadow-sm">
        
        {/* TOFU SECTION */}
        {/* Shape: Wide top, slightly tapered bottom */}
        {/* Polygon: Top 100%, Bottom 80% width */}
        <div className="relative h-24 w-full">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600 shadow-inner flex items-center justify-center"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}>
              <div className="text-center text-white z-10 p-2 transform -translate-y-1">
                 <div className="text-sm font-extrabold tracking-wider">ToFu</div>
                 <div className="text-[10px] font-medium opacity-90 uppercase">Awareness</div>
              </div>
           </div>
           
           {/* Handles */}
           {/* Top: Center */}
           <Handle type="target" position={Position.Top} id="tofu-top" className={handleStyle} />
           
           {/* Sides: Calculated at 50% height. 
               Top width 100%, Bottom 80%. Midpoint width 90%.
               Left edge: 5%. Right edge: 5%.
           */}
           <Handle type="target" position={Position.Left} id="tofu-left" className={handleStyle} style={{ top: '50%', left: '5%' }} />
           <Handle type="source" position={Position.Right} id="tofu-right" className={handleStyle} style={{ top: '50%', right: '5%' }} />
        </div>

        {/* MOFU SECTION */}
        {/* Shape: Matches ToFu bottom, tapers more */}
        {/* Polygon: Top 80% width (starts at 10%), Bottom 60% width (starts at 20%) */}
        {/* Relative to 100% container: 
            Top-Left: 10%, Top-Right: 90%
            Bottom-Left: 20%, Bottom-Right: 80%
        */}
        <div className="relative h-24 w-full -mt-0.5">
           <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-purple-600 shadow-inner flex items-center justify-center"
                style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}>
              <div className="text-center text-white z-10 p-2 transform -translate-y-1">
                 <div className="text-sm font-extrabold tracking-wider">MoFu</div>
                 <div className="text-[10px] font-medium opacity-90 uppercase">Consideration</div>
              </div>
           </div>

           {/* Handles */}
           {/* Sides: Calculated at 50% height.
               Top width 80%, Bottom 60%. Midpoint width 70%.
               Left edge: 15%. Right edge: 15%.
           */}
           <Handle type="target" position={Position.Left} id="mofu-left" className={handleStyle} style={{ top: '50%', left: '15%' }} />
           <Handle type="source" position={Position.Right} id="mofu-right" className={handleStyle} style={{ top: '50%', right: '15%' }} />
        </div>

        {/* BOFU SECTION */}
        {/* Shape: Matches MoFu bottom, tapers to narrow bottom */}
        {/* Polygon: Top 60% width (starts at 20%), Bottom 40% width (starts at 30%) */}
        {/* Relative to 100% container:
            Top-Left: 20%, Top-Right: 80%
            Bottom-Left: 30%, Bottom-Right: 70%
        */}
        <div className="relative h-24 w-full -mt-0.5">
           <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600 shadow-inner flex items-center justify-center"
                style={{ clipPath: 'polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)' }}>
              <div className="text-center text-white z-10 p-2 transform -translate-y-1">
                 <div className="text-sm font-extrabold tracking-wider">BoFu</div>
                 <div className="text-[10px] font-medium opacity-90 uppercase">Conversion</div>
              </div>
           </div>

           {/* Handles */}
           {/* Sides: Calculated at 50% height.
               Top width 60%, Bottom 40%. Midpoint width 50%.
               Left edge: 25%. Right edge: 25%.
           */}
           <Handle type="target" position={Position.Left} id="bofu-left" className={handleStyle} style={{ top: '50%', left: '25%' }} />
           <Handle type="source" position={Position.Right} id="bofu-right" className={handleStyle} style={{ top: '50%', right: '25%' }} />
           
           {/* Bottom Handle: Center */}
           <Handle type="source" position={Position.Bottom} id="bofu-bottom" className={handleStyle} style={{ bottom: 0 }} />
        </div>

      </div>
    </div>
  );
};

export default memo(FunnelNode);
