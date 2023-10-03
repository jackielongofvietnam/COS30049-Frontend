import React from 'react';

function HistoryPage({ historyArray }) {
  return (
    <div>
      <h2>Uploaded History</h2>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Upload Date</th>
            <th>Audit Result</th>
          </tr>
        </thead>
        <tbody>
          {historyArray.map((historyItem, index) => (
            <tr key={index}>
              <td>{historyItem.fileName}</td>
              <td>{historyItem.uploadDate}</td>
              <td>Under-developing</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;