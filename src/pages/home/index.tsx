import { useContext, useEffect, useState } from 'react';
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import PostBox from 'components/posts/PostBox';
import PostForm from 'components/posts/PostForm';

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    if (user) {
      let postRef = collection(db, 'posts');
      let postsQuery = query(postRef, orderBy('createdAt', 'desc'));

      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setPosts(dataObj as PostProps[]);
      });
    }
  }, []);

  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>Home</div>
        <div className='home__tabs'>
          <div className='home__tab home__tab--active'>For You</div>
          <div className='home__tab'>Following</div>
        </div>
      </div>

      <PostForm />

      <div className='post'>
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox key={post?.id} post={post} />)
        ) : (
          <div className='post__no-posts'>
            <div className='posts__text'>게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
