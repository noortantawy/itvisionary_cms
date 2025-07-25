'use client';

import { useState, useEffect, useRef } from 'react';
import { getPages, getPage, createPage, updatePage, deletePage, getComponents } from '../utils/api';

export default function Admin() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [components, setComponents] = useState([]);
  const [globalData, setGlobalData] = useState({ header: '', footer: '' });
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    header: '',
    footer: '',
    navigation: [''],
    bodies: [{ type: 'text', content: '' }]
  });
  const quillRefs = useRef([]);

  useEffect(() => {
    fetchPages();
    fetchComponents();
    fetchStaticPages();
    fetchGlobalData();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchPageContent(selectedPage);
    } else {
      resetForm();
    }
  }, [selectedPage]);

  const fetchPages = async () => {
    try {
      const response = await getPages();
      setPages(prevPages => [...prevPages, ...response.data.map(p => ({ ...p, source: 'database' }))]);
    } catch (err) {
      console.error('Error fetching pages:', err);
    }
  };

  const fetchStaticPages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/static-pages');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const staticPages = await response.json();
      setPages(prevPages => [...prevPages, ...staticPages]);
      if (staticPages.length > 0 && !selectedPage) setSelectedPage(staticPages[0].slug);
    } catch (err) {
      console.error('Error fetching static pages:', err.message);
    }
  };

  const fetchPageContent = async (slug) => {
    try {
      const dbPage = pages.find(p => p.slug === slug && p.source === 'database');
      if (dbPage) {
        const response = await getPage(slug);
        const { title, header, footer, navigation, bodies } = response.data;
        setFormData({ slug, title, header: header || globalData.header, footer: footer || globalData.footer, navigation: navigation || [''], bodies: bodies || [{ type: 'text', content: '' }] });
      } else {
        setFormData({ slug, title: slug.charAt(0).toUpperCase() + slug.slice(1), header: globalData.header, footer: globalData.footer, navigation: [''], bodies: [{ type: 'text', content: '' }] });
      }
    } catch (err) {
      console.error('Error fetching page content:', err);
      resetForm();
    }
  };

  const fetchGlobalData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/global');
      const data = await response.json();
      setGlobalData(data);
    } catch (err) {
      console.error('Error fetching global data:', err);
    }
  };

  const fetchComponents = async () => {
    try {
      const response = await getComponents();
      setComponents(response.data);
    } catch (err) {
      console.error('Error fetching components:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      header: globalData.header,
      footer: globalData.footer,
      navigation: [''],
      bodies: [{ type: 'text', content: '' }]
    });
    setEditMode(null);
  };

  const handleSave = async () => {
    try {
      const { slug, title, header, footer, navigation, bodies } = formData;
      if (!slug || !title || !bodies.length) {
        alert('Slug, title, and at least one body are required');
        return;
      }
      const cleanedBodies = bodies.map(body => {
        if (body.type === 'component' && !body.componentId) {
          alert('Please select a component for component type');
          throw new Error('Invalid component selection');
        }
        return {
          type: body.type,
          content: body.content || (body.type === 'component' ? '' : ''),
          componentId: body.componentId || undefined
        };
      });
      const data = { slug, title, header, footer, navigation, bodies: cleanedBodies };
      console.log('Sending data:', data);
      if (selectedPage) {
        await updatePage(selectedPage, data);
        setPages(pages.map(p => p.slug === selectedPage ? { ...p, ...data, source: 'database' } : p));
        alert('Page updated!');
      } else {
        const newPage = await createPage(data);
        setPages([...pages.filter(p => p.source !== 'database'), newPage.data]);
        setSelectedPage(newPage.data.slug);
        alert('Page created!');
      }
      setEditMode(null);
    } catch (err) {
      console.error('Error saving page:', err.response ? err.response.data : err.message);
      alert('Error saving page');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await deletePage(selectedPage);
        setPages(pages.filter(p => p.slug !== selectedPage));
        setSelectedPage(pages.length > 1 ? pages[1].slug : null);
        resetForm();
        alert('Page deleted!');
      } catch (err) {
        console.error('Error deleting page:', err);
        alert('Error deleting page');
      }
    }
  };

  const handleAddBody = () => {
    setFormData(prev => ({
      ...prev,
      bodies: [...prev.bodies, { type: 'text', content: '' }]
    }));
  };

  const handleRemoveBody = (index) => {
    setFormData(prev => ({
      ...prev,
      bodies: prev.bodies.filter((_, i) => i !== index)
    }));
  };

  const handleBodyChange = (index, field, value) => {
    setFormData(prev => {
      const newBodies = [...prev.bodies];
      newBodies[index] = { ...newBodies[index], [field]: value };
      return { ...prev, bodies: newBodies };
    });
  };

  const handleNavigationChange = (index, value) => {
    setFormData(prev => {
      const newNavigation = [...prev.navigation];
      newNavigation[index] = value;
      return { ...prev, navigation: newNavigation };
    });
  };

  const handleAddNavItem = () => {
    setFormData(prev => ({ ...prev, navigation: [...prev.navigation, ''] }));
  };

  const handleRemoveNavItem = (index) => {
    setFormData(prev => ({
      ...prev,
      navigation: prev.navigation.filter((_, i) => i !== index)
    }));
  };

  const handleGlobalSave = async (field, value) => {
    try {
      const response = await fetch('http://localhost:5000/api/global', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      });
      const data = await response.json();
      setGlobalData(data);
      alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated globally!`);
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      alert('Error updating global content');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Quill) {
      const script = document.createElement('script');
      script.src = 'https://cdn.quilljs.com/1.3.7/quill.js';
      script.onload = () => {
        quillRefs.current = formData.bodies.map((_, i) => {
          const quill = new Quill(`#editor-${i}`, {
            theme: 'snow',
            modules: {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
              ]
            }
          });
          quill.on('text-change', () => {
            handleBodyChange(i, 'content', quill.root.innerHTML);
          });
          if (formData.bodies[i].content) quill.root.innerHTML = formData.bodies[i].content;
          return quill;
        });
      };
      document.body.appendChild(script);
      return () => quillRefs.current.forEach(q => q = null); // Cleanup
    }
  }, [formData.bodies]);

  const handleSectionClick = (section) => {
    setEditMode(section);
  };

  const handleEditChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderEditableSection = (section, content, index = null) => {
    if (editMode === section) {
      if (section === 'bodies' && index !== null) {
        const body = formData.bodies[index];
        return (
          <div className="p-2 border border-[#2C6CA4]/20 rounded">
            <select
              value={body.type}
              onChange={(e) => handleBodyChange(index, 'type', e.target.value)}
              className="w-full p-2 mb-2 border border-[#2C6CA4]/20 rounded-lg bg-white"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="component">Component</option>
            </select>
            {body.type === 'text' && (
              <div id={`editor-${index}`} className="border border-gray-300 rounded p-2 mb-2 min-h-[100px]"></div>
            )}
            {body.type === 'image' && (
              <input
                value={body.content}
                onChange={(e) => handleBodyChange(index, 'content', e.target.value)}
                placeholder="Image URL"
                className="w-full p-2 mb-2 border border-[#2C6CA4]/20 rounded-lg bg-white"
              />
            )}
            {body.type === 'component' && (
              <select
                value={body.componentId || ''}
                onChange={(e) => handleBodyChange(index, 'componentId', e.target.value)}
                className="w-full p-2 mb-2 border border-[#2C6CA4]/20 rounded-lg bg-white"
              >
                <option value="">Select Component</option>
                {components.map(comp => (
                  <option key={comp._id} value={comp._id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => handleRemoveBody(index)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Remove
            </button>
            <button
              onClick={() => setEditMode(null)}
              className="bg-gray-500 text-white px-2 py-1 rounded mt-2 ml-2"
            >
              Done
            </button>
          </div>
        );
      }
      return (
        <input
          value={content}
          onChange={(e) => handleEditChange(section, e.target.value)}
          className="w-full p-2 border border-[#2C6CA4]/20 rounded-lg bg-white"
          onBlur={() => setEditMode(null)}
        />
      );
    }
    return (
      <div
        className="p-2 border border-[#2C6CA4]/20 rounded cursor-pointer hover:bg-gray-100"
        onClick={() => handleSectionClick(section)}
      >
        {content || (section === 'bodies' ? 'Body Section' : section.charAt(0).toUpperCase() + section.slice(1))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-[#2C6CA4]">Global Settings</h2>
        <div
          onClick={() => { setSelectedPage('global-header'); setEditMode('header'); }}
          className={`p-2 mb-2 rounded cursor-pointer ${selectedPage === 'global-header' ? 'bg-[#2C6CA4] text-white' : 'hover:bg-gray-200'}`}
        >
          Edit Global Header
        </div>
        <div
          onClick={() => { setSelectedPage('global-footer'); setEditMode('footer'); }}
          className={`p-2 mb-2 rounded cursor-pointer ${selectedPage === 'global-footer' ? 'bg-[#2C6CA4] text-white' : 'hover:bg-gray-200'}`}
        >
          Edit Global Footer
        </div>
        <h2 className="text-xl font-bold mb-4 mt-6 text-[#2C6CA4]">Pages</h2>
        <button
          onClick={() => { setSelectedPage(null); resetForm(); }}
          className="w-full bg-[#3B5998] text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
        >
          Create New Page
        </button>
        {pages.map(page => (
          <div
            key={page.slug}
            onClick={() => setSelectedPage(page.slug)}
            className={`p-2 mb-2 rounded cursor-pointer ${selectedPage === page.slug ? 'bg-[#2C6CA4] text-white' : 'hover:bg-gray-200'}`}
          >
            {page.title} {page.source === 'static' && '(Static)'}
          </div>
        ))}
      </div>

      {/* Main Panel */}
      <div className="w-3/4 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#2C6CA4]">CMS Editor</h1>
        {selectedPage || formData.slug ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {(selectedPage === 'global-header' || selectedPage === 'global-footer') ? (
              <>
                {renderEditableSection(selectedPage === 'global-header' ? 'header' : 'footer', globalData[selectedPage === 'global-header' ? 'header' : 'footer'])}
                <button
                  onClick={() => handleGlobalSave(selectedPage === 'global-header' ? 'header' : 'footer', globalData[selectedPage === 'global-header' ? 'header' : 'footer'])}
                  className="bg-[#3B5998] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all mt-4"
                >
                  Save Global {selectedPage === 'global-header' ? 'Header' : 'Footer'}
                </button>
              </>
            ) : (
              <>
                {renderEditableSection('header', formData.header)}
                <div className="mt-4">
                  <label className="block text-lg font-medium text-[#2C6CA4] mb-2">Navigation:</label>
                  {formData.navigation.map((nav, index) => (
                    <div
                      key={index}
                      className="p-2 border border-[#2C6CA4]/20 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSectionClick('navigation')}
                    >
                      {nav || 'Nav Item'}
                    </div>
                  ))}
                  {editMode === 'navigation' && (
                    <div className="p-2">
                      {formData.navigation.map((nav, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            value={nav}
                            onChange={(e) => handleNavigationChange(index, e.target.value)}
                            className="flex-1 p-2 border border-[#2C6CA4]/20 rounded-lg bg-white"
                          />
                          <button
                            onClick={() => handleRemoveNavItem(index)}
                            className="bg-red-500 text-white px-2 rounded"
                          >
                            -
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddNavItem}
                        className="bg-[#3B5998] text-white px-4 py-1 rounded mt-2"
                      >
                        Add Nav Item
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded mt-2 ml-2"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-lg font-medium text-[#2C6CA4] mb-2">Body Sections:</label>
                  {formData.bodies.map((body, index) => (
                    renderEditableSection('bodies', body.content, index)
                  ))}
                  <button
                    onClick={handleAddBody}
                    className="bg-[#3B5998] text-white px-4 py-1 rounded mt-2"
                  >
                    Add Body Section
                  </button>
                </div>
                {renderEditableSection('footer', formData.footer)}
                <div className="mt-4 flex gap-4 justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-[#3B5998] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
                    disabled={!selectedPage || pages.find(p => p.slug === selectedPage && p.source === 'database') === undefined}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Select a page or create a new one to edit.</p>
        )}
      </div>
    </div>
  );
}