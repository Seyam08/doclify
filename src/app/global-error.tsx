"use client";

export default function GlobalError() {
  return (
    <html className="dark" style={{ colorScheme: "dark" }}>
      <body>
        <main className="relative w-full bg-[radial-gradient(circle_at_top_center,rgb(161,210,247,0.6),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_center,rgb(2,13,25,1),transparent_70%)] bg-fixed">
          <div className="flex min-h-svh flex-col items-center justify-center px-4">
            <div className="max-w-xl w-full md:w-4/5 flex flex-col">
              <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full">
                <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 text-center">
                  <div className="w-fit m-auto">
                    <a
                      className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                      href="/"
                    >
                      <div className="text-2xl">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 324 323"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="70"
                            y="90"
                            width="180"
                            height="40"
                            rx="20"
                            transform="rotate(0 70 90)"
                            fill="currentColor"
                          />
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
                      </div>
                      <span className="font-bold text-xl">Doclify</span>
                    </a>
                  </div>
                  <h1 className="scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight">
                    500
                  </h1>
                  <div className="font-semibold text-xl">
                    Internal Server Error!
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Something Went Wrong
                  </div>
                </div>
                <div data-slot="card-content" className="px-6 w-fit m-auto">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                    onClick={() => window.location.reload()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-refresh-ccw"
                      aria-hidden="true"
                    >
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                      <path d="M16 16h5v5"></path>
                    </svg>
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
