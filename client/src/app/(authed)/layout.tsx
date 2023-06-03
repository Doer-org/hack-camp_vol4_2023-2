import { NavFooter } from "../_ui";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <NavFooter user={null} /> {/* ログインしているユーザを取得したい */}
    </>
  );
};

export default AuthLayout;
