export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
}

const posts: PostProps[] = [
  {
    id: '1',
    email: 'test@test.com',
    content: '내용입니다',
    createdAt: '2025-05-01',
    uid: '123123',
  },
  {
    id: '2',
    email: 'test@test.com',
    content: '2내용입니다',
    createdAt: '2025-05-01',
    uid: '123123',
  },
  {
    id: '3',
    email: 'test@test.com',
    content: '3내용입니다',
    createdAt: '2025-05-01',
    uid: '123123',
  },
];

export default function HomePage() {
  return (
    <div className='home'>
      <div className='home__title'>Home</div>
      <div className='home__tab home__tab--active'>For You</div>
      <div className='home__tab'>Following</div>
    </div>
  );
}
