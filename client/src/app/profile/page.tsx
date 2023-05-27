import { useEnv } from "@/utils/env";
import { DebugButton } from "../_ui";

const Page = () => {
  const { serverURL } = useEnv();
  console.log(serverURL);
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
