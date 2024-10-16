

import { validateRequest } from "@/lib/auth";
import ReviewClient from "@/components/ReviewClient";

export default async function Reviews() {
  const { user } = await validateRequest();

  
  return (
    <ReviewClient userId={user?.id} />
  );
}
