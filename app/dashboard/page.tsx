"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Plus, Edit, Trash2 } from "lucide-react";
import TemplateForm from "../components/TemplateForm";

interface Template {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export default function Dashboard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  // Load templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("myTemplates");
    if (saved) {
      setTemplates(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveTemplates = (newTemplates: Template[]) => {
    setTemplates(newTemplates);
    localStorage.setItem("myTemplates", JSON.stringify(newTemplates));
  };

  // Add new template
  const addTemplate = (template: Omit<Template, "id">) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
    };
    saveTemplates([...templates, newTemplate]);
    setIsModalOpen(false);
  };

  // Edit template
  const editTemplate = (updatedTemplate: Template) => {
    const updated = templates.map((t) =>
      t.id === updatedTemplate.id ? updatedTemplate : t
    );
    saveTemplates(updated);
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  // Delete template
  const deleteTemplate = (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      const filtered = templates.filter((t) => t.id !== id);
      saveTemplates(filtered);
    }
  };

  // Open edit modal
  const openEditModal = (template: Template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Templates</h1>
            <span className="text-sm text-gray-500">
              {templates.length} templates
            </span>
          </div>

          {/* Templates Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add New Template Card */}
            <div
              onClick={() => {
                setEditingTemplate(null);
                setIsModalOpen(true);
              }}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#00B140] transition-all duration-300 flex items-center justify-center min-h-[400px] cursor-pointer hover:shadow-lg group"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 group-hover:bg-[#00B140]/10 transition-all duration-300 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-10 h-10 text-gray-400 group-hover:text-[#00B140] transition-all duration-300" />
                </div>
                <p className="text-gray-500 font-medium group-hover:text-[#00B140] transition-all duration-300">
                  Add New Template
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to upload
                </p>
              </div>
            </div>

            {/* Template Cards */}
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                  {template.image ? (
                    <Image
                      src={template.image}
                      alt={template.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Content - Complete text without truncation */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title - Complete, auto-wraps */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight break-words">
                    {template.title || "Untitled"}
                  </h3>
                  
                  {/* Description - Complete, auto-wraps */}
                  <p className="text-gray-600 text-sm leading-relaxed break-words flex-1">
                    {template.description || "No description"}
                  </p>

                  {/* Tags - Complete list */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100">
                    {template.tags?.length > 0 ? (
                      template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-green-100 text-[#00B140] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No tags</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(template);
                      }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTemplate(template.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {templates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No templates yet. Click the <span className="text-[#00B140] font-semibold">+</span> button to add your first template!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <TemplateForm
          onClose={() => {
            setIsModalOpen(false);
            setEditingTemplate(null);
          }}
          onSave={(template) => {
            if (editingTemplate) {
              editTemplate({ ...template, id: editingTemplate.id });
            } else {
              addTemplate(template);
            }
          }}
          initialData={editingTemplate || undefined}
        />
      )}
    </>
  );
}