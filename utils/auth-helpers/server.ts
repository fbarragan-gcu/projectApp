'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import { getURL, getErrorRedirect, getStatusRedirect } from 'utils/helpers';
// import { getAuthTypes } from 'utils/auth-helpers/settings';

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

// Function to log user out
export async function SignOut(formData: FormData) {
  const pathName = String(formData.get('pathName')).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}