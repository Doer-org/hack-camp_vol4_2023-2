import { useEnv } from "@/utils/env";
import Link from "next/link";
import { DebugButton } from "./_ui";
import { SnsButton } from "./_ui/sns-button";

export default function Home() {
  const { clientURL } = useEnv();
  const linkStyle = {
    padding: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <li>
          <Link href="/api/auth/login" prefetch={false} style={linkStyle}>
            Login
          </Link>
        </li>
        <li>
          <Link href="/api/auth/logout" prefetch={false} style={linkStyle}>
            Logout
          </Link>
        </li>
        <li>
          <Link href="./profile" prefetch={false} style={linkStyle}>
            Your Profile
          </Link>
        </li>
        <li>
          <DebugButton
            color="black"
            label="Health Check Button"
            url={`${clientURL}/api/health`}
          />
        </li>
        <li>
          <DebugButton
            color="black"
            label="Get Profile"
            url={`${clientURL}/api/auth/me`}
          />
        </li>
        <li>
          <SnsButton color="black" label="GitHubでログイン" />
        </li>
      </ul>
    </main>
  );
}
