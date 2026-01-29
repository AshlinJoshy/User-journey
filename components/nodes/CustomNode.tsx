'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { 
  Facebook, 
  Instagram, 
  Mail, 
  MessageCircle, 
  MousePointerClick, 
  LayoutTemplate, 
  FormInput, 
  Timer,
  GitBranch,
  Video,
  Globe,
  Circle
} from 'lucide-react';
import clsx from 'clsx';

const Icons: Record<string, any> = {
  'Meta Ad (FB/Insta)': Facebook,
  'Google Ad': Globe,
  'Organic Post': Instagram,
  'Landing Page': LayoutTemplate,
  'Property Listing': Globe,
  'Video Tour': Video,
  'Link Click': MousePointerClick,
  'Lead Form': FormInput,
  'WhatsApp': MessageCircle,
  'Email': Mail,
  'Wait / Delay': Timer,
  'Condition': GitBranch,
};

type CustomNodeData = Node['data'] & {
  label?: string;
  type?: string;
  target?: string;
};

const CustomNode = ({ data, selected }: NodeProps<Node>) => {
  const label = (data.label as string) || 'Node';
  const type = (data.type as string) || 'default';
  const target = data.target as string | undefined;

  const Icon = Icons[label] || Circle;
  
  const getColors = (t: string) => {
    switch(t) {
      case 'source': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'page': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'action': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'channel': return 'bg-green-50 border-green-200 text-green-700';
      case 'logic': return 'bg-gray-50 border-gray-200 text-gray-700';
      default: return 'bg-white border-gray-200 text-gray-900';
    }
  };

  const colors = getColors(type);

  return (
    <div className={clsx(
      "px-4 py-3 shadow-md rounded-md border-2 min-w-[150px] relative",
      colors,
      selected ? "border-black ring-1 ring-black" : "border-transparent"
    )}>
      {/* Top Handle */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-gray-400" id="top" />
      {/* Right Handle */}
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-gray-400" id="right" />
      {/* Bottom Handle */}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-gray-400" id="bottom" />
      {/* Left Handle */}
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-gray-400" id="left" />
      
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <div className="font-medium text-sm">{label}</div>
      </div>
      
      {target && (
        <div className="mt-2 text-xs opacity-75 border-t border-current pt-1">
          Target: {target}
        </div>
      )}
    </div>
  );
};

export default memo(CustomNode);
