import React from 'react';
import './style.scss';

export default function AdminTable({ data, columns }) {
  return (
    <table className="adminTable">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
