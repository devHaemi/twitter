import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<>HomePage</>} />
      <Route path='/posts' element={<>PostListPage</>} />
      <Route path='/posts/:id' element={<>PostDetailPage</>} />
      <Route path='/posts/new' element={<>PostNewPage</>} />
      <Route path='/posts/edit/:id' element={<>PostEditPage</>} />
      <Route path='/profile' element={<>ProfilePage</>} />
      <Route path='/profile/edit' element={<>ProfileEditPage</>} />
      <Route path='/notifications' element={<>NotificationsPage</>} />
      <Route path='/search' element={<>SearchPage</>} />
      <Route path='/users/login' element={<>LoginPage</>} />
      <Route path='/users/signup' element={<>Page</>} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
}

export default App;
