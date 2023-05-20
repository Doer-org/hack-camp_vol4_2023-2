import Link from "next/link";
import { DebugButton } from "./_ui";
import { useEnv } from "@/utils/env";
export default function Home() {
  const { clientURL } = useEnv();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/api/auth/login" prefetch={false}>
          Login
        </Link>
      </div>
      <div>
        <Link href="/api/auth/logout" prefetch={false}>
          Logout
        </Link>
      </div>
      <div>
        <DebugButton
          label="Health Check Button"
          url={`${clientURL}/api/health`}
        />
      </div>
      <div>
        <DebugButton label="Get Profile" url={`${clientURL}/api/auth/me`} />
      </div>
    </main>
  );
}
