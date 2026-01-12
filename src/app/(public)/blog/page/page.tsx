import { notFound } from "next/navigation";

export default async function Page() {
  "use cache";

  return notFound();
}
