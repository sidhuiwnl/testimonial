import { signOut } from "@/app/lib/auth-client";


export default function SignOut() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
    >
      <span>LogOut</span>
    </button>
  );
}
