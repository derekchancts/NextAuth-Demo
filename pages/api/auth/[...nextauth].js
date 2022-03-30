import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email";

import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";

import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from '../../../lib/mongodb'

import { html, text } from '../../../utils/htmlEmail'
import nodemailer from "nodemailer"



export default NextAuth({ 
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json'}
        });
        const user = await res.json();


        if (user) {
          return user
        } else {
          return null
        }

             // NORMALLY DATABASE LOOKUP HERE
        // instead, we are ust looking for username = "john" and password = 'test in this case
        // if (credentials.username === 'johndoe@test.com' && credentials.password === 'test' ) {
        //   return {
        //     id: 2,
        //     name: "John",
        //     email: "johndoe@test.com"
        //   }
        // }


        // return null;
      }
    })
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // first time jwt callback is run, user object is available
  //     if (user) {
  //       token.id = user.id;  
  //     };
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.id = token.id;
  //     };
  //     return session;
  //   }
  // },
  // database: process.env.MONGODB_URL,
  adapter: MongoDBAdapter(clientPromise),
  database: {
    type: "mongodb",
    useNewUrlParser: true,
    url: process.env.MONGODB_URL1,
    // ssl: true,
    // useUnifiedTopology: true,
    // authSource: "admin",
  },

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT
  secret: process.env.SECRET,
  // secret: process.env.NEXTAUTH_SECRET,

  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_PRIVATE_KEY,
    encryption: true,
    // maxAge: 60 * 60 * 24 * 30,   // seconds
  },
  // callbacks: {
  //   async jwt(token, account) {
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //     }
  //     return token;
  //   },
  //   redirect: async (url, _baseUrl) => {
  //     if (url === '/profile') {
  //       return Promise.resolve('/');
  //     }
  //     return Promise.resolve('/');
  //   },
  // },
  // callbacks: {
    // async signIn(user, account, profile) { return true },

    // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
    // async redirect(url, baseUrl) { return baseUrl }, 
    // async redirect(url, baseUrl) { 
    //   return "https://google.com" 
    // },

    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // first time jwt callback is run, user object is available
  //     if (user) {
  //       token.id = user.id;  
  //     };
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.id = token.id;
  //     };
  //     return session;
  //   }
  // },
  // callbacks: {
  //   session: async (session, user) => {
  //     session.userId = user.sub
  //     return Promise.resolve(session)
  //   }
  // },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.userId = user.sub
      };
      return session;
    }
  },
  pages: {
    signIn: '/login'
    // signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // newUser: '/bully',   // if a new user signs up, they will be redirected to this "bully" page
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  // events: {
  //   signIn: ({ user, account, profile, isNewUser }) => {
  //     console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
  //   },
  //   // updateUser({ user })
  // },

  
})