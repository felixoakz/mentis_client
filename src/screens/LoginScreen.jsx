import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const backendConnected = !!import.meta.env.VITE_API_URL;

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
      <div className="flex flex-col items-center m-12">

        <h1 className="text-3xl text-secondary font-bold mb-12">mentis</h1>

        {!backendConnected && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Backend is disconnected - login unavailable</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(proceedLogin)}
          className="flex flex-col space-y-3 w-full"
        >
          <input
            className="input input-bordered w-full"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            type="email"
            disabled={!backendConnected}
          />

          <input
            className="input input-bordered w-full"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            type="password"
            disabled={!backendConnected}
          />

          <button type="submit" className="btn btn-primary w-full" disabled={!backendConnected}>
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

        <div className="hero bg-base-200 p-4 mt-24 rounded-lg">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <p className="font-bold text-primary py-6">
                A modern personal finance application designed to help you manage your accounts and track your transactions with ease.
              </p>
              <button className="btn btn-outline text-accent" onClick={() => navigate('/about')}>
                Learn More
              </button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
