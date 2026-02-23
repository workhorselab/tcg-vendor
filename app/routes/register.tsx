import {
  data,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";
import { TestLink } from "~/components/TestLink";
import { Button } from "~/components/ui/Button";
import { Link } from "~/components/ui/Link";
import { TextField } from "~/components/ui/TextField";
import { auth } from "~/lib/auth";
import { getSession } from "~/lib/session.server";
import type { Route } from "./+types/register";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  if (session) throw redirect("/app");
  return {};
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register - TCG Vendor" },
    { name: "description", content: "Create your account" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const firstName = String(formData.get("firstName") ?? "");
  const lastName = String(formData.get("lastName") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  type Errors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  };

  const errors: Errors = {};

  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: `${firstName} ${lastName}`,
      },
      asResponse: true,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message = body?.message ?? "Failed to create account";

      if (response.status === 409 || message.includes("already")) {
        return data(
          {
            errors: {
              form: "An account with this email already exists",
            } as Errors,
          },
          { status: 409 },
        );
      }

      return data(
        {
          errors: {
            form: "Failed to create account. Please try again.",
          } as Errors,
        },
        { status: response.status },
      );
    }

    const headers = new Headers();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      headers.append("Set-Cookie", setCookie);
    }

    return redirect("/app", { headers });
  } catch (error) {
    console.error("Registration error:", error);
    return data(
      {
        errors: {
          form: "Failed to create account. Please try again.",
        } as Errors,
      },
      { status: 500 },
    );
  }
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">
            Create an account
          </h1>
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <TestLink
              to="/login"
              className="text-white hover:text-gray-200 underline"
            >
              Sign in
            </TestLink>
          </p>
        </div>

        {actionData?.errors?.form && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {actionData.errors.form}
          </div>
        )}

        <Form method="post" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              placeholder="John"
              isRequired
              isInvalid={!!actionData?.errors?.firstName}
              errorMessage={actionData?.errors?.firstName}
              className="[&_label]:text-white [&_label]:text-sm [&_label]:font-medium [&_label]:mb-2 [&_input]:bg-white [&_input]:border-0 [&_input]:text-black [&_input]:placeholder-gray-400 [&_input]:h-11"
            />

            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              isRequired
              isInvalid={!!actionData?.errors?.lastName}
              errorMessage={actionData?.errors?.lastName}
              className="[&_label]:text-white [&_label]:text-sm [&_label]:font-medium [&_label]:mb-2 [&_input]:bg-white [&_input]:border-0 [&_input]:text-black [&_input]:placeholder-gray-400 [&_input]:h-11"
            />
          </div>

          <TextField
            type="email"
            name="email"
            label="Email"
            placeholder="m@example.com"
            isRequired
            isInvalid={!!actionData?.errors?.email}
            errorMessage={actionData?.errors?.email}
            className="[&_label]:text-white [&_label]:text-sm [&_label]:font-medium [&_label]:mb-2 [&_input]:bg-white [&_input]:border-0 [&_input]:text-black [&_input]:placeholder-gray-400 [&_input]:h-11"
          />

          <TextField
            type="password"
            name="password"
            label="Password"
            placeholder="Create a password"
            isRequired
            isInvalid={!!actionData?.errors?.password}
            errorMessage={actionData?.errors?.password}
            className="[&_label]:text-white [&_label]:text-sm [&_label]:font-medium [&_label]:mb-2 [&_input]:bg-white [&_input]:border-0 [&_input]:text-black [&_input]:placeholder-gray-400 [&_input]:h-11"
          />

          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            isRequired
            isInvalid={!!actionData?.errors?.confirmPassword}
            errorMessage={actionData?.errors?.confirmPassword}
            className="[&_label]:text-white [&_label]:text-sm [&_label]:font-medium [&_label]:mb-2 [&_input]:bg-white [&_input]:border-0 [&_input]:text-black [&_input]:placeholder-gray-400 [&_input]:h-11"
          />

          <Button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-black border-0 h-11 font-medium"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>

          {/* Or Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Or</span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
              className="border-gray-700 hover:border-gray-600 text-white bg-transparent flex items-center justify-center gap-2 h-11 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span>Continue with Apple</span>
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="border-gray-700 hover:border-gray-600 text-white bg-transparent flex items-center justify-center gap-2 h-11 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
          </div>
        </Form>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-gray-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-gray-400">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
