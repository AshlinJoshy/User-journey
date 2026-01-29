'use client';

import { use, useEffect, useState } from 'react';
import Header from '@/components/Header';
import JourneyBuilder from '@/components/JourneyBuilder';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PlannerPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);
  const [projectName, setProjectName] = useState('Untitled Project');

  useEffect(() => {
    if (id) {
      const projects = JSON.parse(localStorage.getItem('real-estate-projects') || '[]');
      const project = projects.find((p: any) => p.id === id);
      if (project) {
        setProjectName(project.name);
      }
    }
  }, [id]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header title={projectName} />
      <main className="flex-1 overflow-hidden">
        <JourneyBuilder projectId={id} />
      </main>
    </div>
  );
}
