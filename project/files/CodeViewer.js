import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Edit2, Save, X } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('css', css);

const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2 text-sm font-medium
      ${active ? 'bg-gray-800 text-white border-t-2 border-blue-500' : 'bg-gray-900 text-gray-400 hover:text-white'}
      border-r border-l border-gray-700
      first:border-l-0 last:border-r-0
      transition-colors duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-blue-500
    `}
  >
    {children}
  </button>
);

const ActionButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="p-2 text-gray-300 hover:text-blue-500 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </button>
);

// const CodeViewer = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [activeTab, setActiveTab] = useState('');
//   const [files, setFiles] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editContent, setEditContent] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Add GitHub-like syntax highlighting styles
//     const style = document.createElement('link');
//     style.rel = 'stylesheet';
//     style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css';
//     document.head.appendChild(style);

//     if (isLoggedIn) {
//       fetchFiles();
//     }

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, [isLoggedIn]);

//   const fetchFiles = async () => {
//     try {
//       const response = await fetch('/api/files');
//       const data = await response.json();
//       const filesContent = {};
//       for (const file of data.files) {
//         const contentRes = await fetch(`/api/files/${file}`);
//         const contentData = await contentRes.json();
//         filesContent[file] = contentData.content;
//       }
//       setFiles(filesContent);
//       setActiveTab(Object.keys(filesContent)[0]);
//     } catch (error) {
//       setError('Error loading files');
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       fetchFiles();
//     } catch (error) {
//       setError('Error uploading file');
//     }
//   };

//   const handleDownload = () => {
//     const blob = new Blob([files[activeTab]], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = activeTab;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const handleSave = async () => {
//     try {
//       await fetch(`/api/files/${activeTab}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: editContent }),
//       });
//       setFiles({ ...files, [activeTab]: editContent });
//       setIsEditing(false);
//     } catch (error) {
//       setError('Error saving file');
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username === 'admin' && password === 'password') {
//       setIsLoggedIn(true);
//       setError('');
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   const getFileLanguage = (filename) => {
//     const ext = filename.split('.').pop();
//     switch (ext) {
//       case 'js': return 'javascript';
//       case 'html': return 'html';
//       case 'css': return 'css';
//       default: return 'text';
//     }
//   };

//   const MainContent = () => {
//     const filteredFiles = Object.keys(files).filter(file => 
//       file.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//       <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
//         <div className="max-w-6xl mx-auto space-y-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-blue-500">Developer Files Viewer</h1>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search files..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <label className="cursor-pointer">
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                 />
//                 <Upload className="h-6 w-6 text-gray-300 hover:text-blue-500 transition-colors duration-200" />
//               </label>
//             </div>
//           </div>

//           <div className="border-b border-gray-700">
//             <div className="flex space-x-1">
//               {filteredFiles.map((filename) => (
//                 <Tab
//                   key={filename}
//                   active={activeTab === filename}
//                   onClick={() => {
//                     setActiveTab(filename);
//                     setIsEditing(false);
//                   }}
//                 >
//                   {filename}
//                 </Tab>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-800 rounded-lg border border-gray-700">
//             <div className="flex justify-end p-2 border-b border-gray-700">
//               <div className="flex space-x-2">
//                 <ActionButton onClick={handleDownload}>
//                   <Download className="h-5 w-5" />
//                 </ActionButton>
//                 <ActionButton
//                   onClick={() => {
//                     setIsEditing(!isEditing);
//                     setEditContent(files[activeTab]);
//                   }}
//                 >
//                   <Edit2 className="h-5 w-5" />
//                 </ActionButton>
//                 {isEditing && (
//                   <>
//                     <ActionButton onClick={handleSave}>
//                       <Save className="h-5 w-5" />
//                     </ActionButton>
//                     <ActionButton onClick={() => setIsEditing(false)}>
//                       <X className="h-5 w-5" />
//                     </ActionButton>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="p-4">
//               {isEditing ? (
//                 <textarea
//                   value={editContent}
//                   onChange={(e) => setEditContent(e.target.value)}
//                   className="w-full h-96 bg-gray-800 text-gray-100 font-mono p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ) : (
//                 <div className="relative rounded-lg overflow-hidden">
//                   <SyntaxHighlighter
//                     language={getFileLanguage(activeTab)}
//                     style={githubGist}
//                     showLineNumbers={true}
//                     customStyle={{
//                       margin: 0,
//                       borderRadius: '0.5rem',
//                       background: '#0d1117',
//                     }}
//                     lineNumberStyle={{
//                       minWidth: '3em',
//                       paddingRight: '1em',
//                       color: '#6e7681',
//                       textAlign: 'right',
//                       borderRight: '1px solid #30363d',
//                       marginRight: '1em',
//                     }}
//                     className="syntax-highlighter"
//                   >
//                     {files[activeTab] || ''}
//                   </SyntaxHighlighter>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const LoginForm = () => (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
//         <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {error && (
//             <div className="text-red-500 text-sm text-center">{error}</div>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   return isLoggedIn ? <MainContent /> : <LoginForm />;
// };

// export default CodeViewer;
const CodeViewer = () => {
  // ... keep all existing state and handlers ...
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
    // Add GitHub-like syntax highlighting styles
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css';
    document.head.appendChild(style);

    if (isLoggedIn) {
      fetchFiles();
    }

    return () => {
      document.head.removeChild(style);
    };
  }, [isLoggedIn]);

  // ... keep all existing functions ...
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
      setError('Invalid credentials');
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

  const MainContent = () => {
    const filteredFiles = Object.keys(files).filter(file => 
      file.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-500">Developer Files Viewer</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Upload className="h-6 w-6 text-gray-300 hover:text-blue-500 transition-colors duration-200" />
              </label>
            </div>
          </div>

          <div className="border-b border-gray-700">
            <div className="flex">
              {filteredFiles.map((filename) => (
                <Tab
                  key={filename}
                  active={activeTab === filename}
                  onClick={() => {
                    setActiveTab(filename);
                    setIsEditing(false);
                  }}
                >
                  {filename}
                </Tab>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-end p-2 border-b border-gray-700">
              <div className="flex space-x-2">
                <ActionButton onClick={handleDownload}>
                  <Download className="h-5 w-5" />
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setEditContent(files[activeTab]);
                  }}
                >
                  <Edit2 className="h-5 w-5" />
                </ActionButton>
                {isEditing && (
                  <>
                    <ActionButton onClick={handleSave}>
                      <Save className="h-5 w-5" />
                    </ActionButton>
                    <ActionButton onClick={() => setIsEditing(false)}>
                      <X className="h-5 w-5" />
                    </ActionButton>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-96 bg-gray-800 text-gray-100 font-mono p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="relative rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language={getFileLanguage(activeTab)}
                    style={githubGist}
                    showLineNumbers={true}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: '#1a1a1a',
                      fontSize: '0.875rem',
                      borderRadius: '0.5rem',
                    }}
                    lineNumberStyle={{
                      minWidth: '3em',
                      paddingRight: '1em',
                      color: '#6e7681',
                      textAlign: 'right',
                      borderRight: '1px solid #30363d',
                      marginRight: '1em',
                      fontSize: '0.875rem',
                    }}
                    className="syntax-highlighter"
                  >
                    {files[activeTab] || ''}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );

  return isLoggedIn ? <MainContent /> : <LoginForm />;
};

export default CodeViewer;