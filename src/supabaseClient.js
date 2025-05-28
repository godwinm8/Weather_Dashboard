import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (
  typeof supabaseUrl !== "string" ||
  supabaseUrl.trim() === "" ||
  typeof supabaseAnonKey !== "string" ||
  supabaseAnonKey.trim() === ""
) {
  const errorMessage =
    "Supabase URL or Anon Key is missing or invalid. " +
    "Please check your .env file in the project root and ensure that " +
    "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correctly set. " +
    "You may need to restart your development server after creating or modifying the .env file.";

  console.error(errorMessage);

  throw new Error(errorMessage);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
