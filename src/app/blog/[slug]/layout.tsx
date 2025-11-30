export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="content-holder space-y-2">{children}</div>;
}
