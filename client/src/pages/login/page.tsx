import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-neutral-900 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
