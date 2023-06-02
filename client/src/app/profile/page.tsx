import { env } from "@/utils/env";
import { DebugButton } from "../_ui";

const Page = () => {
  const { serverURL } = env();
  return (
    <main className="">
      <div>login successful</div>
      <DebugButton
        color="black"
        label="Health Check Button"
        url={`${serverURL}/users/abc`}
      />
    </main>
  );
};

export default Page;
