import React from 'react';
import {
  HeartOutlined,
  HeartFilled,
  PlusSquareOutlined,
} from '@ant-design/icons'; //icons 모듈을 갖고온다

// onclick = () => {
//   this.setState({});
// };

class AddTagButton extends React.Component {
  render() {
    return (
      <span className="icons-list">
        <PlusSquareOutlined style={{ fontSize: '20px' }} />
      </span>
    );
  }
}
export default AddTagButton;
