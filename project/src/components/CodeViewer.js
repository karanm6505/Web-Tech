import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Edit2, Save, X } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeViewerApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [files, setFiles] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchFiles();
    }
  }, [isLoggedIn]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files');
      const data = await response.json();
      const filesContent = {};
      for (const file of data.files) {
        const contentRes = await fetch(`/api/files/${file}`);
        const contentData = await contentRes.json();
        filesContent[file] = contentData.content;
      }
      setFiles(filesContent);
      setActiveTab(Object.keys(filesContent)[0]);
    } catch (error) {
      setError('Error loading files');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      fetchFiles();
    } catch (error) {
      setError('Error uploading file');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([files[activeTab]], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/files/${activeTab}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent }),
      });
      setFiles({ ...files, [activeTab]: editContent });
      setIsEditing(false);
    } catch (error) {
      setError('Error saving file');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const getFileLanguage = (filename) => {
    const ext = filename.split('.').pop();
    switch (ext) {
      case 'js': return 'javascript';
      case 'html': return 'html';
      case 'css': return 'css';
      default: return 'text';
    }
  };

  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );

  const CodeViewer = () => {
    const filteredFiles = Object.keys(files).filter(file => 
      file.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6">
        <div className="max-w-6xl mx-auto bg-[#161b22] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#58a6ff]">Developer Files Viewer</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 border border-[#30363d] rounded-lg bg-[#0d1117] text-[#c9d1d9]"
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#606060]" />
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Upload className="h-6 w-6 text-[#c9d1d9] hover:text-[#58a6ff]" />
                </label>
              </div>
            </div>

            <div className="flex space-x-1 mb-4 overflow-x-auto border-b border-[#30363d]">
              {filteredFiles.map((filename) => (
                <button
                  key={filename}
                  onClick={() => {
                    setActiveTab(filename);
                    setIsEditing(false);
                  }}
                  className={`px-4 py-2 ${
                    activeTab === filename
                      ? 'bg-[#238636] text-white'
                      : 'bg-[#161b22] text-[#c9d1d9] hover:bg-[#238636] hover:text-white'
                  } rounded-t-lg transition duration-200`}
                >
                  {filename}
                </button>
              ))}
            </div>

            <div className="bg-[#161b22] rounded-lg">
              <div className="flex justify-end space-x-2 p-2 border-b border-[#30363d]">
                <button
                  onClick={handleDownload}
                  className="p-2 text-[#c9d1d9] hover:text-white"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setEditContent(files[activeTab]);
                  }}
                  className="p-2 text-[#c9d1d9] hover:text-white"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                {isEditing && (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 text-[#c9d1d9] hover:text-white"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 text-[#c9d1d9] hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                {isEditing ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 bg-[#161b22] text-[#c9d1d9] font-mono p-4 rounded border border-[#30363d]"
                  />
                ) : (
                  <SyntaxHighlighter
                    language={getFileLanguage(activeTab)}
                    style={atomOneDark}
                    customStyle={{
                      backgroundColor: '#161b22',
                      borderRadius: '6px',
                      padding: '16px',
                      border: '1px solid #30363d'
                    }}
                    className="rounded"
                  >
                    {files[activeTab] || ''}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return isLoggedIn ? <CodeViewer /> : <LoginForm />;
};

export default CodeViewerApp;