import { NavFooter } from "../_ui";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <NavFooter />
    </>
  );
};

export default AuthLayout;
