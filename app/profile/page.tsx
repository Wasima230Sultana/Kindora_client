
"use client";

import { Form, Button } from "@base-ui/react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type FieldName = "name" | "image";
type FormErrors = Partial<Record<FieldName, string>>;

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [errors, setErrors] = useState<FormErrors>({});
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  // Populate inputs after the session loads.
  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setImage(user.image ?? "");
    }
  }, [user]);

  const clearError = (field: FieldName) => {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
    setServerError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!image.trim()) {
      newErrors.image = "Photo URL is required.";
    } else {
      try {
        const parsedUrl = new URL(image);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          newErrors.image = "Enter a valid HTTP or HTTPS URL.";
        }
      } catch {
        newErrors.image = "Enter a valid photo URL.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSuccessMessage("");
    setServerError("");

    if (!validateForm()) return;

    try {
      setIsUpdating(true);

      const result = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (result.error) {
        setServerError(
          result.error.message || "Failed to update your profile."
        );
        return;
      }

      setSuccessMessage("Your profile has been updated successfully.");

      // Refresh server-rendered data and session information.
      await authClient.getSession();
      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-muted-foreground">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Please sign in</h2>
        <p className="text-muted-foreground">
          You need to sign in to update your profile.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Edit Your Profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update your personal information and profile photo.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="border-b px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-xl font-bold text-violet-700">
                {image ? (
                  <img
                    src={image}
                    alt="Profile preview"
                    className="size-full object-cover"
                  />
                ) : (
                  name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold">
                  {user.name}
                </h2>
                <p className="truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <Form onSubmit={handleUpdateProfile} className="space-y-6">
              <FieldGroup className="space-y-5">
                <Field>
                  <FieldLabel htmlFor="profile-name">
                    Full Name
                  </FieldLabel>

                  <Input
                    id="profile-name"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError("name");
                    }}
                    required
                    aria-invalid={!!errors.name}
                  />

                  <FieldError>{errors.name}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="profile-image">
                    Profile Photo URL
                  </FieldLabel>

                  <Input
                    id="profile-image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      clearError("image");
                    }}
                    required
                    aria-invalid={!!errors.image}
                  />

                  <FieldError>{errors.image}</FieldError>
                </Field>
              </FieldGroup>

              {serverError && (
                <p role="alert" className="text-sm text-destructive">
                  {serverError}
                </p>
              )}

              {successMessage && (
                <p role="status" className="text-sm text-green-600">
                  {successMessage}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => router.back()}
                  className="rounded-lg border px-5 py-2.5 text-sm font-medium"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
