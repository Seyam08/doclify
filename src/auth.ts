import { checkClientEmailExists } from "@/actions/helper/checkCredentialsExists";
import { connectDB } from "@/lib/mongoConnection";
import { Author } from "@/models/author";
import { AuthorType } from "@/types/schema.types";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user }) => {
      try {
        await connectDB();
        const existingUser = await checkClientEmailExists(user.email as string);
        if (!existingUser) {
          const username = user.email?.split("@")[0] as string;
          const author: AuthorType = {
            username: username,
            authorInfo: {
              name: user.name as string,
              email: user.email as string,
              image: user.image as string,
            },
          };

          await Author.create(author);

          return true;
        } else {
          await Author.findOneAndUpdate(
            { "authorInfo.email": user.email },
            {
              $set: {
                "authorInfo.name": user.name,
                "authorInfo.image": user.image,
              },
            }
          );
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (errors) {
        return false;
      }
    },
  },
});
