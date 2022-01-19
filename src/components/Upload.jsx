import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../scripts/firebase'; 

const Upload = () => {
  let files;
  const [images, setImages] = useState([]);
  
  const onFileInputChange = e => {
    files = Array.from(e.target.files);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target.result;
        setImages([...images, <img src={result} key={file.name} />]);
      }
      reader.readAsDataURL(file);
    }
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
      { images }
    </React.Fragment>
  );
}

export default Upload;
