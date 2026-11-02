"use client"

import { useState, type FormEvent, type MouseEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Flower2,
  HeartHandshake,
  Leaf,
  LoaderCircle,
} from "lucide-react"
import { Form } from "@base-ui/react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type FieldName = "email" | "password"

type FormErrors = Partial<Record<FieldName, string>>

type Notice = {
  type: "error" | "success"
  text: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [errors, setErrors] = useState<FormErrors>({})
  const [notice, setNotice] = useState<Notice | null>(null)
  const [pending, setPending] = useState<null | "signin" | "google" | "reset">(
    null
  )
  const [showPassword, setShowPassword] = useState(false)

  const clearError = (name: FieldName) => {
    setErrors((previous) =>
      previous[name] ? { ...previous, [name]: undefined } : previous
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)

    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    ) as Record<string, string>

    const nextErrors: FormErrors = {}
    if (!values.email?.trim()) {
      nextErrors.email = "Email address is required"
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address"
    }
    if (!values.password) {
      nextErrors.password = "Password is required"
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setPending("signin")
    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email.trim(),
        password: values.password,
        rememberMe: values.rememberMe === "on",
      })

      if (error) {
        setNotice({
          type: "error",
          text: error.message ?? "Invalid email or password.",
        })
        return
      }
      if (data) {
        router.push("/")
        router.refresh()
      }
    } catch {
      setNotice({
        type: "error",
        text: "Something went wrong. Please try again.",
      })
    } finally {
      setPending(null)
    }
  }

  // const handleForgotPassword = async (event: MouseEvent<HTMLButtonElement>) => {
  //   const form = event.currentTarget.form
  //   const email = form
  //     ? String(new FormData(form).get("email") ?? "").trim()
  //     : ""

  //   if (!email) {
  //     setErrors((previous) => ({
  //       ...previous,
  //       email: "Enter your email address first",
  //     }))
  //     return
  //   }
  //   if (!EMAIL_PATTERN.test(email)) {
  //     setErrors((previous) => ({
  //       ...previous,
  //       email: "Enter a valid email address",
  //     }))
  //     return
  //   }

  //   setNotice(null)
  //   setPending("reset")
  //   try {
  //     const { data, error } = await authClient.requestPasswordReset({ email })

  //     if (error) {
  //       setNotice({
  //         type: "error",
  //         text: error.message ?? "Could not send the reset link.",
  //       })
  //       return
  //     }
  //     if (data) {
  //       setNotice({
  //         type: "success",
  //         text:
  //           data.message ?? "If that email exists, a reset link is on its way.",
  //       })
  //     }
  //   } catch {
  //     setNotice({
  //       type: "error",
  //       text: "Something went wrong. Please try again.",
  //     })
  //   } finally {
  //     setPending(null)
  //   }
  // }

  const handleGoogleSignIn = async () => {
    setNotice(null)
    setPending("google")
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (error) {
        setNotice({
          type: "error",
          text: error.message ?? "Google sign-in is unavailable right now.",
        })
      }
      // On success the client navigates to the provider automatically.
    } catch {
      setNotice({
        type: "error",
        text: "Something went wrong. Please try again.",
      })
    } finally {
      setPending(null)
    }
  }

  return (
    <div className="min-h-svh">
      <main className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
        <div className="rounded-3xl border border-border p-4 sm:p-5">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
            {/* Decorative branding panel */}
            <aside className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-b from-violet-100 via-violet-50 to-violet-100/60 p-8 text-center dark:from-violet-500/15 dark:via-violet-500/5 dark:to-violet-500/10">
              <div
                aria-hidden
                className="absolute -top-16 -left-12 size-48 rounded-full bg-primary/10 blur-2xl"
              />
              <div className="relative rounded-3xl bg-card p-7 shadow-xl ring-1 ring-primary/10">
                <HeartHandshake
                  className="size-16 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div className="relative">
                <p className="font-heading text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl dark:text-white">
                  Kindora
                </p>
                <p className="mt-2 font-heading text-lg leading-snug font-bold text-primary sm:text-xl">
                  Together for a Better Community
                </p>
              </div>
              <Leaf
                aria-hidden
                className="absolute bottom-10 left-8 size-5 -rotate-12 fill-emerald-400 text-emerald-500"
              />
              <Leaf
                aria-hidden
                className="absolute right-10 bottom-16 size-4 rotate-45 fill-emerald-300 text-emerald-400"
              />
              <Flower2
                aria-hidden
                className="absolute right-8 bottom-8 size-4 text-violet-400"
              />
              <Flower2
                aria-hidden
                className="absolute bottom-16 left-14 size-3.5 text-pink-400"
              />
            </aside>

            {/* Form */}
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#1e1b4b] sm:text-4xl dark:text-white">
                Welcome Back!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Sign in to your account to continue
              </p>

              <Form onSubmit={handleSubmit} className="mt-8">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="login-email">Email address</FieldLabel>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      aria-invalid={errors.email ? true : undefined}
                      onChange={() => clearError("email")}
                    />
                    <FieldError>{errors.email}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        className="pr-10"
                        aria-invalid={errors.password ? true : undefined}
                        onChange={() => clearError("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                    <FieldError>{errors.password}</FieldError>
                  </Field>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {/* <Checkbox
                        id="login-remember"
                        name="rememberMe"
                        defaultChecked
                      /> */}
                      {/* <Label
                        htmlFor="login-remember"
                        className="cursor-pointer font-normal text-muted-foreground"
                      >
                        Remember me
                      </Label> */}
                    </div>
                    {/* <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={pending !== null}
                      className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
                    >
                      {pending === "reset" ? "Sending..." : "Forgot password?"}
                    </button> */}
                  </div>

                  {notice && (
                    <p
                      role="alert"
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm",
                        notice.type === "error"
                          ? "border-destructive/30 bg-destructive/10 text-destructive"
                          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      )}
                    >
                      {notice.text}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="h-11 w-full gap-2"
                    disabled={pending !== null}
                  >
                    {pending === "signin" ? (
                      <LoaderCircle className="animate-spin" />
                    ) : null}
                    {pending === "signin" ? "Signing in..." : "Sign In"}
                  </Button>
                </FieldGroup>
              </Form>

              <FieldSeparator className="my-6">Or continue with</FieldSeparator>

              <Button
                type="button"
                variant="outline"
                className="h-11 w-full gap-2.5"
                onClick={handleGoogleSignIn}
                disabled={pending !== null}
              >
                {pending === "google" ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </Button>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
