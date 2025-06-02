import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import Layout from '@/components/Layout';
import { displayValidationErrors } from '@/utils/helpers';


export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const { registerUser, login } = useAuth();
  const backendConnected = !!import.meta.env.VITE_API_URL;

  const password = watch('password');

  const proceedRegister = async (data) => {
    try {
      await registerUser(data);
      await login(data);
      navigate('/');

    } catch (error) {
      console.error('Error Registering:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">

        <h1 className="text-3xl text-secondary font-bold mb-12">mentis</h1>

        {!backendConnected && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Backend is disconnected - registration unavailable</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(proceedRegister, displayValidationErrors)}
          className="flex flex-col space-y-4 w-full max-w-md"
        >
          <div className="form-control">
            <input
              {...register('username', { required: 'Username is required!' })}
              className="input input-bordered w-full"
              placeholder="Username"
              type="text"
              disabled={!backendConnected}
            />
          </div>

          <div className="form-control">
            <input
              {...register('email', {
                required: 'Email is required!',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Invalid email format!',
                },
              })}
              className="input input-bordered w-full"
              placeholder="Email"
              type="text"
              disabled={!backendConnected}
            />
          </div>

          <div className="form-control">
            <input
              {...register('password', {
                required: 'Password is required!',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters!',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: 'Password must contain at least 1 letter, 1 number, and 1 symbol!',
                },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
              type="password"
              disabled={!backendConnected}
            />
          </div>

          <div className="form-control">
            <input
              {...register('password_confirmation', {
                required: 'Password confirmation is required!',
                validate: (value) => value === password || 'Passwords do not match!',
              })}
              className="input input-bordered w-full"
              placeholder="Confirm Password"
              type="password"
              disabled={!backendConnected}
            />
          </div>

          <div className="mt-6 form-control">
            <button type="submit" className="btn btn-primary" disabled={!backendConnected}>
              Register
            </button>
          </div>

          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>

        </form>

      </div>
    </Layout>
  );
}
