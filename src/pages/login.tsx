import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchemaType, loginSchema } from "../lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, googleSignIn, gitHubSignIn, anonymousSignIn } = useAuth();

  const onSubmit: SubmitHandler<loginSchemaType> = async (
    data: loginSchemaType
  ) => {
    console.table(data);
    setLoading(true);
    try {
      setError("");
      await login(data.email, data.password);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error);
      setError(error.code);
    }
    setLoading(false);
  };

  const handelLoginWithGoogle = async () => {
    setLoading(true);

    try {
      setError("");
      await googleSignIn();
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error.code);
    }
    setLoading(false);
  };

  const handelLoginWithGithub = async () => {
    setLoading(true);

    try {
      setError("");
      await gitHubSignIn();
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error.code);
    }
    setLoading(false);
  };

  const handelAnonymous = async () => {
    setLoading(true);

    try {
      setError("");
      await anonymousSignIn();
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error.code);
    }
    setLoading(false);
  };

  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden '>
      {error && (
        <div className='alert alert-error'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {loading && <span className='flex justify-center loading loading-spinner loading-lg'></span>}
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        <h1 className='text-3xl font-semibold text-center'>Login</h1>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='text'
              placeholder='Email Address'
              className='input input-bordered w-full'
              {...form("email")}
            />
            {errors.email && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered'
              {...form("password")}
            />
            {errors.password && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.password?.message}
              </p>
            )}
          </div>
          <Link to="/forgot-password" className="text-sm link">Forgot Password ?</Link>
          <div>
            <button className='btn btn-primary btn-block my-3' type='submit'>
              Login
            </button>
          </div>
          <div className='divider'>OR Continue with</div>
          <div className='flex justify-around'>
            <button className='btn btn-outline' onClick={handelLoginWithGoogle}>
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                loading='lazy'
                alt='google logo'
              />
            </button>
            <button className='btn btn-outline btn-active' onClick={handelLoginWithGithub}>
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/340601/logo-github.svg'
                loading='lazy'
                alt='github logo'
              />
            </button>
            <button className='btn btn-primary' onClick={handelAnonymous}>
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/482673/anonymous.svg'
                loading='lazy'
                alt='Anonymous logo'
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
