import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = () => {
    //
  };

  return (
    <form className='form form--lg'>
      <div className='form__title'>회원가입</div>
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
        <label htmlFor='password'>이메일</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password_confirmation'>이메일</label>
        <input
          type='password'
          name='password_confirmation'
          id='password_confirmation'
          value={passwordConfirmation}
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
        <Link to='/users/login' className='form__link'>
          로그인하기
        </Link>
      </div>
      <div className='form__block'>
        <button
          type='submit'
          className='form__btn-submit'
          disabled={error.length > 0}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
