import React from 'react';
import './styles.scss';
const CustomDropdown = (props) => {
  const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
  const [repeat, setRepeat] = React.useState(null);

  React.useEffect(() => {
    if (props.visibility) {
      clearTimeout(repeat);
      setRepeat(null);
      setVisibilityAnimation(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setVisibilityAnimation(false);
        }, 400),
      );
    }
  }, [props.visibility]);

  return (
    <div
      className={`components-dropdown ${
        props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'
      }`}
    >
      {visibilityAnimation && props.children}
    </div>
  );
};

export default CustomDropdown;
