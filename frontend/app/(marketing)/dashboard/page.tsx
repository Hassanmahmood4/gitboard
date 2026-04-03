import { currentUser } from "@clerk/nextjs/server";

import { DashboardPageClient } from "@/components/DashboardPageClient";

export default async function DashboardPage() {
  const user = await currentUser();
  const signedInAs =
    user?.primaryEmailAddress?.emailAddress ?? user?.username ?? "you";

  return <DashboardPageClient signedInAs={signedInAs} />;
}
