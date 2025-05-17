import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  OnRegister: () => void;
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({
  user,
  OnRegister,
  onSignin,
  onSignout,
}: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 border-slate-300">
      <div className="text-lg flex flex-col justify-center">PayNest</div>
      <div className="flex justify-center pt-2">
        {!user && <Button onClick={OnRegister}>Register</Button>}

        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
