import { useContext, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';

import AuthContext from 'context/AuthContext';
import { db } from 'firebaseApp';

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState<string>('');

  const handleFileUpload = () => {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'posts'), {
        content: content,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        uid: user?.uid,
        email: user?.email,
      });
      setContent('');
      toast.success('게시글을 생성했습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'content') {
      setContent(value);
    }
  };

  return (
    <form className='post-form' onSubmit={handleSubmit}>
      <textarea
        className='post-form__textarea'
        required
        name='content'
        id='content'
        placeholder='What is happening?'
        onChange={handleChange}
        value={content}
      />
      <div className='post-form__submit-area'>
        <label htmlFor='file-input' className='post-form__file'>
          <FiImage className='post-form__file-icon' />
        </label>
        <input
          type='file'
          name='file-input'
          accept='image/*'
          onChange={handleFileUpload}
          className='hidden'
        />
        <input type='submit' value='Tweet' className='post-form__submit-btn' />
      </div>
    </form>
  );
}
