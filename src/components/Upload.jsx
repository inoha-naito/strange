import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../scripts/firebase';
import Image from './Image';

const getDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      resolve(dataURL);
    }
    reader.readAsDataURL(file);
  });
}

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleInputChange = async (event) => {
    const fileList = Array.from(event.target.files);
    const imageList = [];
    for (const file of fileList) {
      const dataURL = await getDataURL(file);
      imageList.push(
        <Image key={file.name} url={dataURL} name={file.name} />
      );
    }
    setFiles(fileList);
    setImages(imageList);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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
          onChange={handleInputChange}
        />
        <button type='submit' onClick={handleSubmit}>送信</button>
      </form>
      { images }
    </React.Fragment>
  );
}

export default Upload;
