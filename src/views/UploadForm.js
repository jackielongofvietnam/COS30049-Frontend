import React, { useState } from 'react';

function UploadForm({ onSubmit }) {
  // Initialize 3 'variables' file, name, date
  // By default, file is null, name and date are empty string
  const [file, setFile] = useState(null);
  const [name, setFileName] = useState('');
  const [date, setDate] = useState('');

  // When file is uploaded, set the values for 3 'variables' above
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setDate(new Date().toLocaleString());
  };


  // This function will be futher developed for calling API for processing data. At this time,
  // it just only send file info to the HistoryPage Component
  const handleAnalyzing = () => {
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileInfo = {
            fileName: name,
            uploadDate: date,
            fileData: reader.result,
          };

          // call the onSubmit property to send data to HistoryPage Component
          onSubmit(fileInfo);
        };
        reader.readAsDataURL(file);

        alert("Starting to analyze, visit uploaded history for more");

        setFile(null);
        setFileName('');
        setDate('');

      }
  };

  return (
    <div>
      <h2>Upload .sol file</h2>
      <input type="file" onChange={handleFileChange}/>
    

      <h3>Upload Information</h3>
      <table>
        <tbody>
          <tr>
            <td>File Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Upload Date</td>
            <td>{date}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleAnalyzing}>Start Analyzing</button>
    </div>
  );
}

export default UploadForm;