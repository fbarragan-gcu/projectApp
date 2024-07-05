'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

// TODO: Check for possible duplicate Emails on creation
export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)
  // const response = await supabase.auth.signUp(data)
  // console.log(response)

  if (error?.message) {
    console.log(error.message);
    return { error: error.message };
  }

  console.log("Registration Successful");
  revalidatePath('/', 'layout')
  return { success: true }
}