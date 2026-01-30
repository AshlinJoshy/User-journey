'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Map, LayoutTemplate } from 'lucide-react';
import Header from '@/components/Header';
import { realEstateTemplate } from './data/templates';

interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('real-estate-projects') || '[]');
    setProjects(savedProjects);
  }, []);

  const createNewProject = () => {
    const newId = crypto.randomUUID();
    const newProject: Project = {
      id: newId,
      name: `New Campaign ${projects.length + 1}`,
      createdAt: new Date().toLocaleDateString(),
    };
    
    const updatedProjects = [...projects, newProject];
    localStorage.setItem('real-estate-projects', JSON.stringify(updatedProjects));
    // Also initialize empty state for this project
    localStorage.setItem(`project-${newId}`, JSON.stringify({ nodes: [], edges: [] }));
    
    setProjects(updatedProjects);
  };

  const createFromTemplate = () => {
    const newId = crypto.randomUUID();
    const newProject: Project = {
      id: newId,
      name: `${realEstateTemplate.name} (Copy)`,
      createdAt: new Date().toLocaleDateString(),
    };
    
    const updatedProjects = [...projects, newProject];
    localStorage.setItem('real-estate-projects', JSON.stringify(updatedProjects));
    
    // Initialize with template data
    localStorage.setItem(`project-${newId}`, JSON.stringify({ 
      nodes: realEstateTemplate.nodes, 
      edges: realEstateTemplate.edges 
    }));
    
    setProjects(updatedProjects);
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside Link (though we'll structure it to avoid this)
    if(!confirm('Are you sure you want to delete this project?')) return;

    const updatedProjects = projects.filter(p => p.id !== id);
    localStorage.setItem('real-estate-projects', JSON.stringify(updatedProjects));
    localStorage.removeItem(`project-${id}`);
    setProjects(updatedProjects);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Your Campaigns</h1>
          <div className="flex gap-3">
            <button 
              onClick={createFromTemplate}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
            >
              <LayoutTemplate className="w-5 h-5" />
              Use Template
            </button>
            <button 
              onClick={createNewProject}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <Map className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No campaigns yet</h3>
            <p className="text-gray-500 mt-1 mb-6">Get started by creating a new journey map.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={createFromTemplate}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Start with a Template
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={createNewProject}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Create Blank
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/planner/${project.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 group relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Map className="w-6 h-6 text-blue-600" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProject(project.id, e);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Created on {project.createdAt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
