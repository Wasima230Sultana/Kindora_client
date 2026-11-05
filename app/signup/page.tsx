"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  HeartHandshake,
  Leaf,
  LoaderCircle,
  Send,
} from "lucide-react"
import { Form } from "@base-ui/react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import Swal from "sweetalert2"

type FieldName = "name" | "email" | "photoURL" | "password"

type FormErrors = Partial<Record<FieldName, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUpPage() {
  const router = useRouter()
  const [errors, setErrors] = useState<FormErrors>({})
  // const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const clearError = (name: FieldName) => {
    setErrors((previous) =>
      previous[name] ? { ...previous, [name]: undefined } : previous
    )
  }

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   setServerError(null)

  //   const values = Object.fromEntries(
  //     new FormData(event.currentTarget).entries()
  //   ) as Record<string, string>

  //   const nextErrors: FormErrors = {}
  //   if (!values.name?.trim()) {
  //     nextErrors.name = "Full name is required"
  //   }
  //   if (!values.email?.trim()) {
  //     nextErrors.email = "Email address is required"
  //   } else if (!EMAIL_PATTERN.test(values.email.trim())) {
  //     nextErrors.email = "Enter a valid email address"
  //   }
  //   if (!values.photoURL?.trim()) {
  //     nextErrors.photoURL = "Photo URL is required"
  //   } else {
  //     try {
  //       new URL(values.photoURL)
  //     } catch {
  //       nextErrors.photoURL = "Enter a valid URL (including https://)"
  //     }
  //   }
  //   if (!values.password) {
  //     nextErrors.password = "Password is required"
  //   } else if (values.password.length < 6) {
  //     nextErrors.password = "Password must be at least 6 characters"
  //   } else if (!/[A-Z]/.test(values.password)) {
  //     nextErrors.password =
  //       "Password must contain at least one uppercase letter"
  //   } else if (!/[a-z]/.test(values.password)) {
  //     nextErrors.password =
  //       "Password must contain at least one lowercase letter"
  //   }

  //   setErrors(nextErrors)
  //   if (Object.keys(nextErrors).length > 0) {
  //     return
  //   }

  //   setIsPending(true)
  //   try {
  //     // better-auth stores the avatar in `image`, not `photoURL`.
  //     const { data, error } = await authClient.signUp.email({
  //       name: values.name.trim(),
  //       email: values.email.trim(),
  //       password: values.password,
  //       image: values.photoURL.trim(),
  //     })

  //     if (error) {
  //       setServerError(
  //         error.message ?? "Something went wrong. Please try again."
  //       )
  //       return
  //     }
  //     if (data) {
  //       router.push("/")
  //       router.refresh()
  //     }
  //   } catch {
  //     setServerError("Something went wrong. Please try again.")
  //   } finally {
  //     setIsPending(false)
  //   }
  // }

  
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  const values = Object.fromEntries(
    new FormData(event.currentTarget).entries()
  ) as Record<string, string>

  const nextErrors: FormErrors = {}

  if (!values.name?.trim()) {
    nextErrors.name = "Full name is required"
  }

  if (!values.email?.trim()) {
    nextErrors.email = "Email address is required"
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address"
  }

  if (!values.photoURL?.trim()) {
    nextErrors.photoURL = "Photo URL is required"
  } else {
    try {
      new URL(values.photoURL)
    } catch {
      nextErrors.photoURL = "Enter a valid URL (including https://)"
    }
  }

  if (!values.password) {
    nextErrors.password = "Password is required"
  } else if (values.password.length < 6) {
    nextErrors.password = "Password must be at least 6 characters"
  } else if (!/[A-Z]/.test(values.password)) {
    nextErrors.password =
      "Password must contain at least one uppercase letter"
  } else if (!/[a-z]/.test(values.password)) {
    nextErrors.password =
      "Password must contain at least one lowercase letter"
  }

  setErrors(nextErrors)

  if (Object.keys(nextErrors).length > 0) {
    await Swal.fire({
      title: "Invalid Information!",
      text: "Please check the form and correct the highlighted fields.",
      icon: "warning",
      confirmButtonColor: "#7c3aed",
    })
    return
  }

  setIsPending(true)

  try {
    const { data, error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      image: values.photoURL.trim(),
    })

    if (error) {
      await Swal.fire({
        title: "Registration Failed!",
        text: error.message ?? "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#7c3aed",
      })
      return
    }

    if (data) {
      await Swal.fire({
        title: "Account Created!",
        text: "Your account has been created successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      })

      router.push("/")
      router.refresh()
    }
  } catch {
    await Swal.fire({
      title: "Something Went Wrong!",
      text: "Unable to create your account. Please try again.",
      icon: "error",
      confirmButtonColor: "#7c3aed",
    })
  } finally {
    setIsPending(false)
  }
}



  return (
    <div className="min-h-svh">
      <main className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          {/* Decorative branding panel */}
          <aside className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-b from-violet-100 via-violet-50 to-violet-100/60 p-8 text-center dark:from-violet-500/15 dark:via-violet-500/5 dark:to-violet-500/10">
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
          </aside>

          {/* Form */}
          <div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#1e1b4b] sm:text-4xl dark:text-white">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Join our community today
            </p>

            <Form onSubmit={handleSubmit} className="mt-8">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="signup-name">
                    Full Name{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="signup-name"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    aria-invalid={errors.name ? true : undefined}
                    onChange={() => clearError("name")}
                  />
                  <FieldError>{errors.name}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="signup-email">
                    Email Address{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="signup-email"
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
                  <FieldLabel htmlFor="signup-photo">
                    Photo URL{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="signup-photo"
                    name="photoURL"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    autoComplete="url"
                    required
                    aria-invalid={errors.photoURL ? true : undefined}
                    onChange={() => clearError("photoURL")}
                  />
                  <FieldError>{errors.photoURL}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="signup-password">
                    Password{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
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

                {/* {serverError && (
                  <p
                    role="alert"
                    className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  >
                    {serverError}
                  </p>
                )} */}

                <Button
                  type="submit"
                  className="h-11 w-full gap-2"
                  disabled={isPending}
                >
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <Send />
                  )}
                  {isPending ? "Creating account..." : "Register"}
                </Button>
              </FieldGroup>
            </Form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
