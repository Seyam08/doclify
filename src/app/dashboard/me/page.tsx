import { getAuthorByEmail } from "@/actions/author/author-action";
import { auth } from "@/auth";
import { ForceLogout } from "@/components/authentication/ForceLogout";
import { DoclifyWarnPopover } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { AuthorType } from "@/types/schema.types";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  const response = await getAuthorByEmail(session?.user?.email as string);

  if (response.success === false) {
    return <ForceLogout />;
  } else {
    const user = response.content as AuthorType;
    return (
      <section className="container mx-auto px-5 pt-0 pb-5 space-y-4">
        {/* heading */}
        <div>
          <TypographyH2>{user.authorInfo.name}'s profile</TypographyH2>
          <TypographyP className="mt-3!">
            Your profile information, role assignments, and account status.
          </TypographyP>
        </div>

        {/* image */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex group h-24 w-24 rounded-lg overflow-hidden cursor-not-allowed">
            <Image
              alt={user.authorInfo.name}
              height={100}
              width={100}
              src={user.authorInfo.image}
              className="group-hover:brightness-75 transition-all"
            />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <TypographyH3 className="text-muted-foreground">
              {user.username}
            </TypographyH3>
            <DoclifyWarnPopover
              itemTitle="Profile picture can't be changed from here"
              itemDesc="Please click on the button to change"
              externalLink="https://aboutme.google.com"
              trigger={<Button variant="outline">change</Button>}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* name  */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <InputGroup>
              <InputGroupInput
                disabled
                defaultValue={user.authorInfo.name}
                id="name"
                name="name"
                type="text"
              />

              <InputGroupAddon align="inline-end">
                <DoclifyWarnPopover
                  itemTitle="Name can't be changed from here"
                  itemDesc="Please click on the button to change"
                  externalLink="https://aboutme.google.com"
                  trigger={
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="cursor-pointer p-2"
                    >
                      <RefreshCcw />
                    </Button>
                  }
                />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <InputGroup>
              <InputGroupInput
                disabled
                defaultValue={user.authorInfo.email}
                id="email"
                name="email"
                type="text"
              />

              <InputGroupAddon align="inline-end">
                <DoclifyWarnPopover
                  itemTitle="Email can't be changed from here"
                  itemDesc="Please click on the button to change"
                  externalLink="https://aboutme.google.com"
                  trigger={
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="cursor-pointer p-2"
                    >
                      <RefreshCcw />
                    </Button>
                  }
                />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </section>
    );
  }
}
