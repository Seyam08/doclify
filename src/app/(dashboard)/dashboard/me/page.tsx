import { getAuthor } from "@/actions/author/author-action";
import { auth } from "@/auth";
import { ForceLogout } from "@/components/authentication/ForceLogout";
import {
  EditBio,
  EditSocialLinks,
} from "@/components/DoclifyAccount/DoclifyAccount";
import { DoclifyWarnPopover } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { DoclifySocialLinkItem } from "@/components/DoclifyItem/DoclifyItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { AuthorType, SocialLinksType } from "@/types/schema.types";
import { Pencil, RefreshCcw, SquareStack } from "lucide-react";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  const response = await getAuthor(session?.user?.username as string);

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

        {/* name and email  */}
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
        {/* bio */}
        <div>
          <InputGroup>
            <InputGroupTextarea
              id="bio"
              placeholder="Tell us about yourself, by clicking on the edit icon..."
              className="min-h-[200px]"
              disabled
              defaultValue={user?.authorInfo?.bio ?? ""}
            />

            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText className="font-mono font-medium">
                <SquareStack />
                Bio
              </InputGroupText>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="ml-auto" size="icon-sm">
                    <Pencil />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full md:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Edit Bio</DialogTitle>
                    <DialogDescription>
                      You can place a little details about yourself
                    </DialogDescription>
                  </DialogHeader>
                  <EditBio
                    email={user.authorInfo.email}
                    prevBio={user.authorInfo.bio ?? null}
                  />
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </InputGroupAddon>
          </InputGroup>
        </div>
        {/* social links */}
        <div className="bg-input/30 rounded-md p-3 border">
          <div className="border-b mb-5 flex text-muted-foreground">
            <TypographyP>Social Links</TypographyP>
            {/* dialog trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="ml-auto" size="icon-sm">
                  <Pencil />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full md:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Social Links</DialogTitle>
                  <DialogDescription>
                    You can add your social links
                  </DialogDescription>
                </DialogHeader>
                <EditSocialLinks
                  email={user.authorInfo.email}
                  socialLink={user.authorInfo.socialLinks}
                />
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="w-full md:w-3/4 space-y-3">
            {user.authorInfo.socialLinks &&
              user.authorInfo.socialLinks.map(
                (item: SocialLinksType, index) => (
                  <DoclifySocialLinkItem
                    key={index}
                    name={item.platform}
                    socialLink={item.address}
                  />
                )
              )}
          </div>
        </div>
      </section>
    );
  }
}
