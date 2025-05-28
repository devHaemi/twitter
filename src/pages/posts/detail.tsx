import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { IoIosArrowBack } from 'react-icons/io';

import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import PostBox from 'components/posts/PostBox';
import Loader from 'components/loader/Loader';
import { get } from 'http';

export default function PostDetailPage() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);
      const docSnapshot = await getDoc(docRef);

      setPost({
        ...(docSnapshot.data() as PostProps),
        id: docSnapshot.id,
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost]);

  return (
    <div className='post'>
      <div className='post__header'>
        <button type='button' onClick={() => navigate(-1)}>
          <IoIosArrowBack className='post__header-btn' />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
}
