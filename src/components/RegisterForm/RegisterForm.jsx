"use client";

import { register } from '@/lib/action';
import Link from "next/link";
import { useFormState } from "react-dom";
import styles from "./registerForm.module.css";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterForm() {
 const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/");
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type='text' placeholder='name' name='name' />
      <input type='email' placeholder='email' name='email' />
      <input type='password' placeholder='password' name='password' />
      <input
        type='password'
        placeholder='password again'
        name='passwordRepeat'
      />
      <button>Register</button>
      
      {state?.error && <div className={styles.error}>{state?.error}</div>}
      
      <Link className="text-sm mt-3 text-right" href={"/"}>
        Already have an account? <span className="underline">Login</span>
      </Link>
    </form>
  );
}