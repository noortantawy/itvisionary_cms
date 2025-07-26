'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminCMS() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editingSection, setEditingSection] = useState(null); // 'header', 'body', 'footer'
  const [content, setContent] = useState({
    header: '',
    body: '',
    footer: '',
  });
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchPages = async () => {
      const pageFiles = [
        { slug: 'home', path: 'frontend/pages/index.js', title: 'Home' },
        { slug: 'about', path: 'frontend/pages/about.js', title: 'About' },
        // Add more pages as needed
      ];
      setPages(pageFiles);
      if (pageFiles.length > 0) setSelectedPage(pageFiles[0].slug);
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedPage) return;

      try {
        const [headerRes, footerRes, bodyRes] = await Promise.all([
          fetch(`/api/file-content?section=header`),
          fetch(`/api/file-content?section=footer`),
          fetch(`/api/file-content?section=body&slug=${selectedPage}`),
        ]);

        const [headerData, footerData, bodyData] = await Promise.all([
          headerRes.json(),
          footerRes.json(),
          bodyRes.json(),
        ]);

        setContent({
          header: headerData.content,
          body: bodyData.content,
          footer: footerData.content,
        });
      } catch (err) {
        console.error('Error fetching content:', err);
        setContent({
          header: '<p>Default Header</p>',
          body: '<p>Default Body</p>',
          footer: '<p>Default Footer</p>',
        });
      }
    };
    fetchContent();
  }, [selectedPage]);

  const handleContentChange = (e) => {
    const updated = { ...content, [editingSection]: e.target.value };
    setContent(updated);
  };

  const handleSave = async () => {
    if (!selectedPage || !editingSection) {
      alert('No page or section selected to save');
      return;
    }

    try {
      const response = await fetch('/api/file-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: editingSection, slug: editingSection === 'body' ? selectedPage : null, content: content[editingSection] }),
      });

      if (response.ok) {
        alert('Content saved successfully!');
        setEditingSection(null);
      } else {
        const error = await response.json();
        alert(`Error saving content: ${error.error}`);
      }
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Error saving content');
    }
  };

  useEffect(() => {
    if (!iframeRef.current || !selectedPage) return;

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>body{font-family:sans-serif;padding:20px;}</style>
        </head>
        <body>
          ${content.header}
          ${content.body}
          ${content.footer}
        </body>
      </html>
    `);
    doc.close();
  }, [content, selectedPage]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4">
        <h2 className="font-bold text-xl mb-4">Pages</h2>
        {Array.isArray(pages) ? pages.map((page) => (
          <div
            key={page.slug}
            className={`cursor-pointer p-2 rounded ${
              selectedPage === page.slug ? 'bg-blue-200' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              setSelectedPage(page.slug);
              setEditingSection(null);
            }}
          >
            {page.title}
          </div>
        )) : <p>Loading pages...</p>}
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        {selectedPage && (
          <div className="flex gap-4 p-4 border-b items-center">
            <h2 className="font-semibold text-lg">{pages.find(p => p.slug === selectedPage)?.title || 'Untitled'}</h2>
            <button
              onClick={() => setEditingSection('header')}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit Header
            </button>
            <button
              onClick={() => setEditingSection('body')}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Edit Body
            </button>
            <button
              onClick={() => setEditingSection('footer')}
              className="bg-purple-500 text-white px-3 py-1 rounded"
            >
              Edit Footer
            </button>
            <button
              onClick={handleSave}
              className="bg-[#3B5998] text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Editor Panel */}
          {editingSection && (
            <div className="w-1/2 p-4 border-r">
              <h3 className="font-semibold mb-2 capitalize">Editing {editingSection}</h3>
              <textarea
                value={content[editingSection]}
                onChange={handleContentChange}
                className="w-full h-[90%] border p-2 font-mono text-sm"
              />
            </div>
          )}

{/* Preview Panel */}
<div className={`flex-1 ${editingSection ? '' : 'w-full'} overflow-auto`}>
  <iframe
    ref={iframeRef}
    key={selectedPage?.slug}
    src={`http://localhost:3000/${selectedPage?.slug === 'home' ? '' : selectedPage?.slug}?preview=true`}
    className="w-full h-full min-h-screen border-0"
    title="Page Preview"
  />
</div>




        </div>
      </div>
    </div>
  );
}