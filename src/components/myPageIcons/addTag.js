import React from 'react';
import { PlusOutlined } from '@ant-design/icons'; //icons 모듈을 갖고온다
import './addTsg.scss';

class AddTagButton extends React.Component {
  render() {
    const { onAddTag } = this.props;
    return (
      <span className="tagAddButton" onClick={onAddTag}>
        <PlusOutlined style={{ fontSize: '16px' }} />
      </span>
    );
  }
}
export default AddTagButton;
