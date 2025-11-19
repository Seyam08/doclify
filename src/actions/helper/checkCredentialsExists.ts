import { Author } from "@/models/author";

export async function checkClientEmailExists(email: string): Promise<boolean> {
  try {
    const client = await Author.findOne({
      "authorInfo.email": email,
    });

    return client ? true : false;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return false;
  }
}
