import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { app } from 'firebaseApp';
import { useContext } from 'react';

export default function MenuList() {
  const navigate = useNavigate();

  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type='button' onClick={() => navigate('/')}>
          <BsHouse />
          <span className='footer__grid--text'>Home</span>
        </button>
        <button type='button' onClick={() => navigate('/profile')}>
          <BiUserCircle />
          <span className='footer__grid--text'>Profile</span>
        </button>
        <button
          type='button'
          onClick={async () => {
            const auth = getAuth(app);
            await signOut(auth);
            toast.success('로그아웃 되었습니다.');
          }}
        >
          <MdLogout />
          <span className='footer__grid--text'>Logout</span>
        </button>
      </div>
    </div>
  );
}
