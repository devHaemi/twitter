import { useState } from 'react';
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { app } from 'firebaseApp';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      toast.success('로그인이 완료되었습니다.');
    } catch (err: any) {
      toast.error(err?.code);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);

      if (value.length < 8) {
        setError('비밀번호는 8자 이상이어야 합니다.');
      } else {
        setError('');
      }
    }
  };

  const onClickSocialLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    let provider;
    const auth = getAuth(app);

    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }

    if (name === 'github') {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GoogleAuthProvider | GithubAuthProvider
    )
      .then((result) => {
        toast.success('로그인 되었습니다.');
      })
      .catch((error) => {
        const errorMessage = error?.message;
        toast.error(errorMessage);
      });
  };

  return (
    <form className='form form--lg' onSubmit={handleSubmit}>
      <div className='form__title'>로그인</div>
      <div className='form__block'>
        <label htmlFor='password'>이메일</label>
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
          required
        />
      </div>

      {error && error?.length > 0 && (
        <div className='form__block'>
          <div className='form__error'>{error}</div>
        </div>
      )}

      <div className='form__block'>
        계정이 있으신가요?
        <Link to='/users/signup' className='form__link'>
          회원가입하기
        </Link>
      </div>
      <div className='form__block--lg'>
        <button
          type='submit'
          className='form__btn--submit'
          disabled={error.length > 0}
        >
          로그인
        </button>
      </div>

      <div className='form__block'>
        <button
          type='button'
          name='google'
          className='form__btn--google'
          onClick={onClickSocialLogin}
        >
          Google로 로그인
        </button>
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='github'
          className='form__btn--github'
          onClick={onClickSocialLogin}
        >
          Github로 로그인
        </button>
      </div>
    </form>
  );
}
