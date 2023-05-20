import { DebugButton } from "./_ui";
import { Button } from "@/ui";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <DebugButton
          label="Health Check Button"
          url="http://localhost:3000/api/health"
        />
      </div>
    </main>
  );
}
