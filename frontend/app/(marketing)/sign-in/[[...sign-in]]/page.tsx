import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[var(--surface)]/80 p-6 shadow-[0_0_40px_rgba(139,92,246,0.07)] backdrop-blur-sm sm:p-8">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          appearance={{ variables: { colorPrimary: "#8b5cf6" } }}
        />
      </div>
    </main>
  );
}
