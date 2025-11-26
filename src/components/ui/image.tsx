import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

export async function DoclifyImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
  return (
    <div className="w-full aspect-video overflow-hidden flex items-center justify-center rounded-2xl">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-w-full max-h-full object-cover"
      />
    </div>
  );
}

export function DoclifyImageWithSkeleton({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Suspense fallback={<Skeleton className="w-full aspect-video" />}>
      <DoclifyImage src={src} alt={alt} width={width} height={height} />
    </Suspense>
  );
}
