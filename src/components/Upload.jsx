import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import { storage, db } from '../scripts/firebase';
import { user } from '../scripts/userConst';
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
  const [posted, setPosted] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usersRef = collection(db, 'users');
    const userDocRef = await addDoc(
      usersRef,
      user
    );
    const urlList = await Promise.all(files.map(async (file) => {
      const storageRef = ref(storage, `images/${userDocRef.id}/${file.name}`);
      await uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded!');
      });
      const url = await getDownloadURL(storageRef);
      return url;
    }));
    await updateDoc(
      userDocRef,
      {
        id: userDocRef.id,
        urlList
      }
    );
  }

  const getPostedImages = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const querySnap = await getDocs(q);
    const postedList = [];
    let count = 0;
    for (const doc of querySnap.docs) {
      const urlList = doc.data().urlList;
      for (const url of urlList) {
        const name = url.split('?')[0].split('%2F').slice(-1)[0];
        postedList.push(
          <Image key={url} url={url} name={name} />
        );
        count++;
        if (count >= 5) {
          setPosted(postedList);
          return;
        }
      }
    }
    setPosted(postedList);
  }

  useEffect(() => {
    getPostedImages();
  }, []);

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
      <p>----------------------------------------------------------------------------------------------------</p>
      { posted }
    </React.Fragment>
  );
}

export default Upload;
