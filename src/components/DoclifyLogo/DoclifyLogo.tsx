import Link from "next/link";
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...(props as any)}
    >
      {/* D shape stroke-like bar */}
      <rect
        x="70"
        y="90"
        width="180"
        height="40"
        rx="20"
        transform="rotate(0 70 90)"
        fill="currentColor"
      />

      {/* Y shape angled bar */}
      <rect
        x="140"
        y="150"
        width="180"
        height="40"
        rx="20"
        transform="rotate(45 140 150)"
        fill="currentColor"
      />
    </svg>
  );
};

export function DoclifyFullLogo({ logoHref }: { logoHref: string }) {
  return (
    <Link
      href={logoHref}
      className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
    >
      <div className="text-2xl">
        <Logo />
      </div>
      <span className="font-bold text-xl">Doclify</span>
    </Link>
  );
}
