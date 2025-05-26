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

const posts: PostProps[] = [
  {
    id: '1',
    email: 'test01@test.com',
    content: '1내용입니다',
    createdAt: '2025-05-01',
    uid: '123123',
  },
  {
    id: '2',
    email: 'test02@test.com',
    content: '2내용입니다',
    createdAt: '2025-05-01',
    uid: '123123',
  },
  {
    id: '3',
    email: 'test03@test.com',
    content: '3내용입니다',
    createdAt: '2025-05-01',
    uid: '123123',
  },
];

export default function HomePage() {
  return (
    <div className='home'>
      <div className='home__title'>Home</div>
      <div className='home__tabs'>
        <div className='home__tab home__tab--active'>For You</div>
        <div className='home__tab'>Following</div>
      </div>
      <PostForm />
      <div className='post'>
        {posts?.map((post) => (
          <PostBox key={post?.id} post={post} />
        ))}
      </div>
    </div>
  );
}
