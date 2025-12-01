import { DoclifyAuthorMeta, DoclifyImage } from "@/components/ui/image";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { Calendar1Icon } from "lucide-react";

const text = `Working in cybersecurity means you’re constantly playing a game of
            catch-up. Every day you learn something new, but your work is also
            never finished.`;
export default function Page() {
  return (
    <div>
      <TypographyH2 className="mb-14">Blog Page</TypographyH2>

      {/* all blogs */}
      <div className="space-y-5">
        {/* top blog */}
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5 md:gap-10 hover:bg-accent transition-all duration-500 p-2 rounded-2xl">
          {/* image side */}
          <div>
            <DoclifyImage
              src="https://plus.unsplash.com/premium_photo-1763922901071-374d798c5062?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height={400}
              width={800}
              alt="Image"
            />
          </div>
          {/* content side  */}
          <div className="flex flex-col justify-center px-5 md:px-0">
            <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
              <DoclifyAuthorMeta username={"ayan519600"} />
            </div>
            <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
              <Calendar1Icon className="h-4 w-4 mr-2" />
              Published at{" "}
              {new Date("2025-11-30T12:56:29.572+00:00").toLocaleString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </div>
            <TypographyH3>Blog name</TypographyH3>
            <TypographyP>{text.slice(0, 80) + "..."}</TypographyP>
          </div>
        </div>

        {/* rest of the blog */}
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5">
          {/* each item  */}
          <div className="space-y-5 hover:bg-accent transition-all duration-500 p-2 rounded-2xl">
            {/* image side */}
            <div>
              <DoclifyImage
                src="https://plus.unsplash.com/premium_photo-1763922901071-374d798c5062?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={400}
                width={1200}
                alt="Image"
              />
            </div>
            {/* content side  */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <DoclifyAuthorMeta username={"ayan519600"} />
              </div>
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <Calendar1Icon className="h-4 w-4 mr-2" />
                Published at{" "}
                {new Date("2025-11-30T12:56:29.572+00:00").toLocaleString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
              <TypographyH3>Blog name</TypographyH3>
              <TypographyP>{text.slice(0, 80) + "..."}</TypographyP>
            </div>
          </div>
          {/* each item  */}
          <div className="space-y-5 hover:bg-accent transition-all duration-500 p-2 rounded-2xl">
            {/* image side */}
            <div>
              <DoclifyImage
                src="https://plus.unsplash.com/premium_photo-1763922901071-374d798c5062?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={400}
                width={1200}
                alt="Image"
              />
            </div>
            {/* content side  */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <DoclifyAuthorMeta username={"ayan519600"} />
              </div>
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <Calendar1Icon className="h-4 w-4 mr-2" />
                Published at{" "}
                {new Date("2025-11-30T12:56:29.572+00:00").toLocaleString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
              <TypographyH3>Blog name</TypographyH3>
              <TypographyP>{text.slice(0, 80) + "..."}</TypographyP>
            </div>
          </div>
          {/* each item  */}
          <div className="space-y-5 hover:bg-accent transition-all duration-500 p-2 rounded-2xl">
            {/* image side */}
            <div>
              <DoclifyImage
                src="https://plus.unsplash.com/premium_photo-1763922901071-374d798c5062?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={400}
                width={1200}
                alt="Image"
              />
            </div>
            {/* content side  */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <DoclifyAuthorMeta username={"ayan519600"} />
              </div>
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <Calendar1Icon className="h-4 w-4 mr-2" />
                Published at{" "}
                {new Date("2025-11-30T12:56:29.572+00:00").toLocaleString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
              <TypographyH3>Blog name</TypographyH3>
              <TypographyP>{text.slice(0, 80) + "..."}</TypographyP>
            </div>
          </div>
          {/* each item  */}
          <div className="space-y-5 hover:bg-accent transition-all duration-500 p-2 rounded-2xl">
            {/* image side */}
            <div>
              <DoclifyImage
                src="https://plus.unsplash.com/premium_photo-1763922901071-374d798c5062?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={400}
                width={1200}
                alt="Image"
              />
            </div>
            {/* content side  */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <DoclifyAuthorMeta username={"ayan519600"} />
              </div>
              <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                <Calendar1Icon className="h-4 w-4 mr-2" />
                Published at{" "}
                {new Date("2025-11-30T12:56:29.572+00:00").toLocaleString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
              <TypographyH3>Blog name</TypographyH3>
              <TypographyP>{text.slice(0, 80) + "..."}</TypographyP>
            </div>
          </div>
        </div>
        {/* post horizontal */}
      </div>
    </div>
  );
}
