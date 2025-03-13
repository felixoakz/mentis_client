import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const proceedLogin = async (loginData) => {
    try {
      await login(loginData);
      navigate('/');

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">

        <h1 className="text-3xl font-bold mb-12">mentis</h1>

        <form
          onSubmit={handleSubmit(proceedLogin)}
          className="flex flex-col space-y-4 w-full max-w-md"
        >
          <input
            className="input input-bordered w-full"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            type="email"
          />

          <input
            className="input input-bordered w-full"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            type="password"
          />

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <div className="text-center mt-4">
            <p>
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>

        </form>

      </div>
    </Layout>
  );
}
