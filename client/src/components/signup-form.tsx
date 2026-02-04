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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className={"text-neutral-200"}>
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
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
                      className={
                        "border-none bg-neutral-700 py-5 text-neutral-200"
                      }
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className={
                    "cursor-pointer py-5 bg-blue-700 font-display text-base"
                  }
                >
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className={"text-neutral-200 hover:text-neutral-200"}
                  >
                    Sign in
                  </a>
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
