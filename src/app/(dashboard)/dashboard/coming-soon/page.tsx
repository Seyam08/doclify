import { DoclifyComingSoon01 } from "@/components/DoclifyComingSoon/DoclifyComingSoon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-3">
      <DoclifyComingSoon01
        cta={
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Continue Browsing <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
        className="border rounded-lg"
      />
    </div>
  );
}
