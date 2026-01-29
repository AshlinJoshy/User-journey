'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

const FunnelNode = ({ data, selected }: NodeProps<Node>) => {
  const commonHandleStyle = "!w-3 !h-3 border border-white shadow-sm";
  
  return (
    <div className={clsx(
      "relative flex flex-col items-center",
      selected ? "drop-shadow-lg" : ""
    )}>
      {/* Container with border - acts as the "card" */}
      <div className={clsx(
        "bg-white rounded-lg border-2 shadow-sm overflow-hidden min-w-[320px]",
        selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
      )}>
        
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="font-semibold text-sm text-gray-700">Marketing Funnel</span>
        </div>

        {/* Funnel Container - Using CSS Trapezoids for cleaner alignment */}
        <div className="flex flex-col items-center p-4 gap-1 bg-white">
          
          {/* TOFU SECTION */}
          <div className="relative group w-full">
            {/* Trapezoid Shape */}
            <div className="h-20 w-full bg-blue-50 border border-blue-100 rounded-sm relative overflow-hidden flex items-center justify-center transition-colors hover:bg-blue-100"
                 style={{ clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}>
               <div className="text-center z-10 p-2">
                  <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-0.5">Top of Funnel (ToFu)</div>
                  <div className="text-[10px] text-gray-500 font-medium">Awareness & Discovery</div>
               </div>
            </div>

            {/* Handles - Positioned relative to the rectangular container, visually aligned with trapezoid */}
            <Handle type="target" position={Position.Top} id="tofu-top" className={clsx(commonHandleStyle, "!bg-blue-500")} />
            
            {/* Side handles need to be brought in slightly to touch the slanted edge */}
            <Handle type="target" position={Position.Left} id="tofu-left" 
                    className={clsx(commonHandleStyle, "!bg-blue-500")} 
                    style={{ top: '50%', left: '5%' }} />
            <Handle type="source" position={Position.Right} id="tofu-right" 
                    className={clsx(commonHandleStyle, "!bg-blue-500")} 
                    style={{ top: '50%', right: '5%' }} />
          </div>

          {/* MOFU SECTION */}
          <div className="relative group w-[80%]">
             <div className="h-20 w-full bg-purple-50 border border-purple-100 rounded-sm relative overflow-hidden flex items-center justify-center transition-colors hover:bg-purple-100"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)' }}>
               <div className="text-center z-10 p-2">
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-0.5">Middle (MoFu)</div>
                  <div className="text-[10px] text-gray-500 font-medium">Consideration</div>
               </div>
             </div>

             <Handle type="target" position={Position.Left} id="mofu-left" 
                     className={clsx(commonHandleStyle, "!bg-purple-500")} 
                     style={{ top: '50%', left: '8%' }} />
             <Handle type="source" position={Position.Right} id="mofu-right" 
                     className={clsx(commonHandleStyle, "!bg-purple-500")} 
                     style={{ top: '50%', right: '8%' }} />
          </div>

          {/* BOFU SECTION */}
          <div className="relative group w-[60%]">
             <div className="h-20 w-full bg-orange-50 border border-orange-100 rounded-sm relative overflow-hidden flex items-center justify-center transition-colors hover:bg-orange-100"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)' }}>
               <div className="text-center z-10 p-2">
                  <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-0.5">Bottom (BoFu)</div>
                  <div className="text-[10px] text-gray-500 font-medium">Conversion</div>
               </div>
             </div>

             <Handle type="target" position={Position.Left} id="bofu-left" 
                     className={clsx(commonHandleStyle, "!bg-orange-500")} 
                     style={{ top: '50%', left: '10%' }} />
             <Handle type="source" position={Position.Right} id="bofu-right" 
                     className={clsx(commonHandleStyle, "!bg-orange-500")} 
                     style={{ top: '50%', right: '10%' }} />
             <Handle type="source" position={Position.Bottom} id="bofu-bottom" 
                     className={clsx(commonHandleStyle, "!bg-orange-500")} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(FunnelNode);
