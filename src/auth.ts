import { checkAuthorEmailExists } from "@/actions/helper/checkCredentialsExists";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/mongoConnection";
import { Author } from "@/models/author";
import { AuthorType } from "@/types/schema.types";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { revalidateTag } from "next/cache";
import slugify from "slugify";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
  callbacks: {
    signIn: async ({ user }) => {
      try {
        await connectDB();
        const existingUser = await checkAuthorEmailExists(user.email as string);
        if (!existingUser.status) {
          const username = user.email
            ?.split("@")[0]
            .replace(/\./g, "-") as string;
          // slugify username
          const slugifyUsername = slugify(username, {
            lower: true,
            strict: true,
            remove: /[']/g,
          });
          const author: AuthorType = {
            username: slugifyUsername,
            authorInfo: {
              name: user.name as string,
              email: user.email as string,
              image: user.image as string,
            },
          };

          await Author.create(author);
          revalidateTag("doclify-authors", "max");
          return true;
        } else {
          const isNameChanged =
            existingUser.author?.authorInfo.name !== user.name;
          const isImageChanged =
            existingUser.author?.authorInfo.image !== user.image;

          if (isNameChanged || isImageChanged) {
            await Author.updateOne(
              { "authorInfo.email": user.email },
              {
                $set: {
                  "authorInfo.name": user.name,
                  "authorInfo.image": user.image,
                },
              }
            );
            revalidateTag("doclify-single-author", "max");
          }
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (errors) {
        return false;
      }
    },
    jwt: async ({ token }) => {
      await connectDB();
      const author: AuthorType | null = await Author.findOne({
        "authorInfo.email": token.email,
      });

      if (author) {
        token.username = author.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.username) {
        session.user.username = token.username as string;
      }

      return session;
    },
  },
});
