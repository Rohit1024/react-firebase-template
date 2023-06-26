import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { profileSchema, profileSchemaType } from "../lib/validations/auth";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

export default function Profile() {
  const { user, resetPassword, updateUserProfile } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<profileSchemaType> = async (
    data: profileSchemaType
  ) => {
    console.table(data);
    setLoading(true);

    try {
      setError("");
      await updateUserProfile({ displayName: data.displayName });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
      setError("Failed to send Reset Password Link");
    }
    setLoading(false);
  };

  const handelReset = async () => {
    setLoading(true);
    try {
      setError("");
      await resetPassword(user?.email || "");
      setToast(true);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
      setError("Failed to send Reset Password Link");
    }
    setLoading(false);
  };
  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden '>
      {toast && <div className='toast toast-top toast-center'>
        <div className='alert alert-info'>
          <span>We have sent you Password Reset Link</span>
        </div>
      </div>}
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
      {loading && (
        <span className='flex justify-center loading loading-spinner loading-lg'></span>
      )}
      <div className='w-1/3 p-6 m-auto card bg-base-100 ring-2 shadow-xl bg-base-300'>
        <h1 className='text-3xl font-semibold text-center'>User Profile</h1>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label'>
              <span className='label-text'>Display Name</span>
              <button
                className='btn btn-xs'
                onClick={() => setDisabled(!disabled)}
              >
                Enable
              </button>
            </label>
            <input
              type='text'
              placeholder={user?.displayName || ""}
              className='input input-bordered w-full'
              {...form("displayName")}
              disabled={disabled}
            />
            {errors.displayName && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.displayName?.message}
              </p>
            )}
          </div>
          <div>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder={user?.email || ""}
              className='w-full input input-bordered'
              {...form("email")}
              disabled={disabled}
            />
            {errors.email && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <button className='btn btn-primary btn-block my-4' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <div className='divider'></div>
        <div className='flex justify-around'>
          <button className='btn btn-warning' onClick={handelReset}>
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/375092/reset-password.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Reset Password</span>
          </button>
          <button className='btn btn-secondary'>
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/505013/tracker-control.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Upgrade User</span>
          </button>
        </div>
      </div>
    </div>
  );
}
