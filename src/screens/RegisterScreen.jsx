import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import Layout from '@/components/Layout';
import { displayValidationErrors } from '@/utils/helpers';


export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const { registerUser } = useAuth();

  const password = watch('password');

  const proceedRegister = async (data) => {
    try {
      await registerUser(data);
      navigate('/');

    } catch (error) {
      console.error('Error Registering:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">

        <h1 className="text-3xl text-secondary font-bold mb-12">mentis</h1>

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
            />
          </div>

          <div className="mt-6 form-control">
            <button type="submit" className="btn btn-primary">
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
