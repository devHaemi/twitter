import { useCallback, useContext, useEffect, useState } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';

import AuthContext from 'context/AuthContext';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';

export default function PostEditForm() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>('');
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);
      const docSnapshot = await getDoc(docRef);

      setPost({
        ...(docSnapshot.data() as PostProps),
        id: docSnapshot.id,
      });
      setContent((docSnapshot?.data() as unknown as PostProps)?.content || '');
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost]);

  const handleFileUpload = () => {
    //
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          content: content,
        });
        navigate(`/posts/${post?.id}`);
        toast.success('게시글을 수정했습니다.');
      }
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
        <input type='submit' value='수정' className='post-form__submit-btn' />
      </div>
    </form>
  );
}
function userEffect(arg0: () => void, arg1: (() => Promise<void>)[]) {
  throw new Error('Function not implemented.');
}
