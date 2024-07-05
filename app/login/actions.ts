'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Destructure and only pull out Error.
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error?.message); // NEED THIS "Invalid login credentials"
    return {error: error.message};
  }

  console.log("good:")
  revalidatePath('/', 'layout')
  return { success: true };
}