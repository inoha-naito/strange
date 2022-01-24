import { serverTimestamp } from 'firebase/firestore';

const user = Object.freeze({
  id: '',
  urlList: [],
  createdAt: serverTimestamp()
});

export { user };
