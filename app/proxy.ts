// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { auth } from "./lib/auth"
// import { headers } from "next/headers"

// // This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   })
//   const user = session?.user
//   if (!user) {
//     return NextResponse.redirect(new URL("/", request.url))
//   }
// }

// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }

// export const config = {
//   matcher: ["/create-event", "/profile",],
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "../lib/auth"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/create-event",
    "/profile",
    "/manage-event",
  ],
}
