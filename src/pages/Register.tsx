import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "../lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {  
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const onSubmit: SubmitHandler<registerSchemaType> = async (data: registerSchemaType) => {
    console.table(data);
    setLoading(true);
    try {
      setError("");
      await register(data.email, data.password);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error);
      setError(error.code);
    }
    setLoading(false);
  }
    

    return (
      <div className='relative flex flex-col justify-center h-screen'>
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
          <h1 className='text-3xl font-semibold text-center'>Register</h1>
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
            <div>
              <label className='label'>
                <span className='label-text'>Confirm Password</span>
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                className='w-full input input-bordered'
                {...form("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className='text-xs italic text-red-500 mt-2'>
                    {errors.confirmPassword?.message}
                  </p>
                )}
            </div>
            <div>
              <button className='btn btn-primary btn-block my-4' type='submit'>Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  