import React from 'react';
import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../scripts/firebase'; 

const onFileInputChange = e => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const storageRef = ref(storage, 'images/' + file.name);
    uploadBytes(storageRef, file).then(() => {
      console.log('Uploaded!');
    });
  });
}

const Upload = () => {
  return (
    <React.Fragment>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={onFileInputChange}
      />
    </React.Fragment>
  );
}

export default Upload;
