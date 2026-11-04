import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL as string)
const db = client.db("kindora_resources")

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL as string,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
   plugins: [
        jwt(), 
    ],
    session:{
      cookieCache:{
        enabled:true,
        strategy:'jwt',
        maxAge:2*24*60*60
      }
    }
})
