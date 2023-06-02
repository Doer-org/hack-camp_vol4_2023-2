import { env } from "@/utils/env";
import Link from "next/link";
import { DebugButton, DebugGraphQLButton } from "./_ui";

const Page = () => {
  const { clientURL } = env();
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
          <Link href="./debug/profile" prefetch={false} style={linkStyle}>
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
          <DebugGraphQLButton color="black" label="try graphql" />
        </li>
      </ul>
    </main>
  );
};
export default Page;
