import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-neutral-900">
      <div className="flex w-full max-w-lg flex-col">
        <SignupForm />
      </div>
    </div>
  );
}
