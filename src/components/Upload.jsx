import React from 'react';
import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../scripts/firebase'; 

const onFileInputChange = e => {
  const file = e.target.files[0];
  const storageRef = ref(storage, file.name);
  uploadBytes(storageRef, file).then(() => {
    console.log('Uploaded!');
  });
}

const Upload = () => {
  return (
    <React.Fragment>
      <input type='file' onChange={onFileInputChange} />
    </React.Fragment>
  );
}

export default Upload;
