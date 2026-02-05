import { useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.api.ts";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setTokenManual } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const data = await authService.signup({
        firstName,
        email,
        password,
      });
      setTokenManual(data.access_token);
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"bg-neutral-800"}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-neutral-0">
            Create your account
          </CardTitle>
          <CardDescription className={"text-neutral-200"}>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className={"text-neutral-200"}>
                  First Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={"border-none bg-neutral-700 py-5 text-neutral-200"}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className={"text-neutral-200"}>
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={"border-none bg-neutral-700 py-5 text-neutral-200"}
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel
                      htmlFor="password"
                      className={"text-neutral-200"}
                    >
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={
                        "border-none bg-neutral-700 py-5 text-neutral-200"
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="confirm-password"
                      className={"text-neutral-200"}
                    >
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`border-none bg-neutral-700 py-5 text-neutral-200 ${
                        confirmPassword && password !== confirmPassword
                          ? "ring-2 ring-red-500"
                          : ""
                      }`}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className={
                    "cursor-pointer py-5 bg-blue-700 font-display text-base"
                  }
                >
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className={"text-neutral-200 hover:text-neutral-200"}
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
