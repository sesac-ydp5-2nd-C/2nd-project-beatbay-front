import React, { useState } from 'react';
import './style.scss';

export default function AdminTable({
  data,
  dataType,
  handleEdit,
  handleDelete,
}) {
  let columns = [];
  let actions = [];

  switch (dataType) {
    case 'user':
      columns = ['id', 'user_id', 'user_nickname', 'user_grade'];
      actions = [
        <button key="delete" onClick={() => handleDelete()}>
          삭제
        </button>,
      ];
      break;
    case 'column':
    case 'notice':
      columns = ['id', 'title'];
      actions = [
        <button key="edit" onClick={(item) => handleEdit(item)}>
          수정
        </button>,
        <button key="delete" onClick={(item) => handleDelete(item)}>
          삭제
        </button>,
      ];
      break;
    case 'product':
      columns = ['product_id', 'product_title'];
      actions = [
        <button key="delete" onClick={() => handleDelete()}>
          삭제
        </button>,
      ];
      break;
    case 'ability':
      columns = ['ability_id', 'ability_title'];
      actions = [
        <button key="delete" onClick={() => handleDelete()}>
          삭제
        </button>,
      ];
      break;
    default:
      break;
  }
  const userGradeToMusicTerm = (grade) => {
    switch (grade) {
      case 0:
        return 'pianissimo';
      case 1:
        return 'mezzopiano';
      case 2:
        return 'piano';
      case 3:
        return 'forte';
      case 4:
        return 'mezzoforte';
      case 5:
        return 'fortissimo';
      case 6:
        return 'trebeclef';
      default:
        return 'pianissimo';
    }
  };

  const [updatedData, setUpdatedData] = useState(data);

  const handleGradeChange = (event, itemIndex) => {
    const newData = [...updatedData];
    newData[itemIndex].user_grade = parseInt(event.target.value, 10);
    setUpdatedData(newData);
  };

  return (
    <table className={`adminTable ${dataType}`}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>
                {column === 'user_grade' ? (
                  <select
                    value={item[column]}
                    onChange={(event) => handleGradeChange(event, index)}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((grade) => (
                      <option key={grade} value={grade}>
                        {userGradeToMusicTerm(grade)}
                      </option>
                    ))}
                  </select>
                ) : (
                  item[column]
                )}
              </td>
            ))}
            <td>
              {actions.map((action, actionIndex) => (
                <span key={actionIndex} className="actionButton">
                  {React.cloneElement(action, {
                    onClick:
                      action.key === 'edit'
                        ? () => handleEdit(item)
                        : () => handleDelete(item),
                  })}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
