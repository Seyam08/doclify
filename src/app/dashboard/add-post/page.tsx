import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <div className="p-5">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          <div className="h-full p-3">Add post editor</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="h-full p-3">Preview post</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
