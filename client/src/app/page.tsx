import Link from "next/link";
import { DebugButton } from "./_ui";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/api/auth/login"> Login </Link>
      </div>
      <div>
        <Link href="/api/auth/login"> Logout </Link>
      </div>
      <div>
        <DebugButton
          label="Health Check Button"
          url="http://localhost:3000/api/health"
        />
      </div>
      <div>
        <DebugButton
          label="Get Profile"
          url="http://localhost:3000/api/auth/me"
        />
      </div>
    </main>
  );
}
