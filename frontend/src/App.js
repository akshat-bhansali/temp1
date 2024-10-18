import React from 'react';
import DeleteFile from './components/DeleteFile';
import DownloadFile from './components/DownloadFile';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <h1>Google Drive File Manager</h1>
      <FileUpload />
      <DownloadFile/>
      <DeleteFile/>
    </div>
  );
}

export default App;
