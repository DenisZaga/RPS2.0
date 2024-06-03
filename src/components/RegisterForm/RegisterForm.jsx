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
      <input type='text' placeholder='Name' name='name' required />
      <input type='email' placeholder='Email' name='email' required />
      <input type='password' placeholder='Password' name='password' required />
      <input
        type='password'
        placeholder='Confirm Password'
        name='passwordRepeat'
        required
      />
      <button>Register</button>

      {state?.error && <div className={styles.error}>{state?.error}</div>}

      <Link className="text-sm mt-3 text-right" href={"/"}>
        Already have an account? <span className="underline">Login</span>
      </Link>
    </form>
  );
}
