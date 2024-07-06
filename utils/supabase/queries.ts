import supabase from "@/app/lib/supabaseClient";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

// Check for Auth and cache to avoid extra API calls
export const getUser = cache( async (supabase: SupabaseClient) => {
    const {
        data: { user }
    } = await supabase.auth.getUser();
    return user;
});

// Get User Details and cache to avoid extra API callsh
export const getUserDetails = cache(async (supabase: SupabaseClient) => {
    const { data: userDetails } = await supabase
        .from('users')
        .select('*')
        .single();
    return userDetails;
});

// Logout a User session
export const logoutUser = (async (supabase: SupabaseClient) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log("Error Logging User out:", error);
        throw new Error("Error with User logout");
    }
})

// Get All registered users
// Must be Admin 
export const getAllUsers = cache(async (supabase: SupabaseClient) => {
    try {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return users;
    } catch (error) {
      console.error('Error fetching users: ', error);
      throw error;
    }
  });
