import React from 'react';

const Image = (props) => {
  return (
    <React.Fragment>
      <img
        src={props.url}
        alt={props.name}
      />
    </React.Fragment>
  );
}

export default Image;
