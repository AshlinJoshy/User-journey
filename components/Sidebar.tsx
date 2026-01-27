'use client';

import React from 'react';
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
  PlusCircle,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string, category: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.setData('application/nodeType', category);
    event.dataTransfer.effectAllowed = 'move';
  };

  const DraggableItem = ({ type, label, category, icon: Icon }: { type: string, label: string, category: string, icon: any }) => (
    <div
      className="flex items-center gap-2 p-2 mb-2 bg-white border border-gray-200 rounded cursor-grab hover:bg-gray-50 text-sm shadow-sm transition-colors"
      onDragStart={(event) => onDragStart(event, type, label, category)}
      draggable
    >
      <Icon className="w-4 h-4 text-gray-500" />
      <span>{label}</span>
    </div>
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-6 overflow-y-auto">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">Sources</h3>
        <DraggableItem type="meta-ad" label="Meta Ad (FB/Insta)" category="source" icon={Facebook} />
        <DraggableItem type="google-ad" label="Google Ad" category="source" icon={Globe} />
        <DraggableItem type="organic" label="Organic Post" category="source" icon={Instagram} />
        <DraggableItem type="custom-source" label="Custom Source" category="source" icon={PlusCircle} />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">Pages & Content</h3>
        <DraggableItem type="landing-page" label="Landing Page" category="page" icon={LayoutTemplate} />
        <DraggableItem type="listing" label="Property Listing" category="page" icon={Globe} />
        <DraggableItem type="video" label="Video Tour" category="page" icon={Video} />
        <DraggableItem type="custom-page" label="Custom Page" category="page" icon={PlusCircle} />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">Actions</h3>
        <DraggableItem type="click" label="Link Click" category="action" icon={MousePointerClick} />
        <DraggableItem type="form" label="Lead Form" category="action" icon={FormInput} />
        <DraggableItem type="custom-action" label="Custom Action" category="action" icon={PlusCircle} />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">Channels</h3>
        <DraggableItem type="whatsapp" label="WhatsApp" category="channel" icon={MessageCircle} />
        <DraggableItem type="email" label="Email" category="channel" icon={Mail} />
        <DraggableItem type="custom-channel" label="Custom Channel" category="channel" icon={PlusCircle} />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">Logic</h3>
        <DraggableItem type="wait" label="Wait / Delay" category="logic" icon={Timer} />
        <DraggableItem type="condition" label="Condition" category="logic" icon={GitBranch} />
        <DraggableItem type="custom-logic" label="Custom Logic" category="logic" icon={Settings} />
      </div>
    </aside>
  );
};

export default Sidebar;
