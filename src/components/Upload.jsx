import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../scripts/firebase'; 

const Upload = () => {
  const [files, setFiles] = useState([]);

  const onFileInputChange = e => {
    setFiles(Array.from(e.target.files));
  }

  const clickSubmit = e => {
    e.preventDefault();
    files.forEach((file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded!');
      });
    });
  }

  return (
    <React.Fragment>
      <form>
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={onFileInputChange}
        />
        <button type='submit' onClick={clickSubmit}>送信</button>
      </form>
    </React.Fragment>
  );
}

export default Upload;
