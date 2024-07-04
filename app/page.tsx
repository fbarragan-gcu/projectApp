// import { createClient } from "@/utils/supabase/server";
// import HomePage from "./ui/homepage/page";

// export default function Home() {

//   return <HomePage />;
// }
import HomePage from "./ui/homepage/page";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/queries";

// Home Page with Stats and User name.
export default async function Home() {
  const supabase = createClient();

  const user = await getUser(supabase);
  return <HomePage user={user} />;
}
