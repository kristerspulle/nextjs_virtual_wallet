export { default } from "next-auth/middleware"

export const config = { matcher: "/protected/(.*)"}

export const withAuth = ({
  pages: {
    signIn: 'api/auth/login', 
  }
});