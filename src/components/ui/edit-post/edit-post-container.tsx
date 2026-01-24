"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Code, Eye } from "lucide-react";

export default function EditPostContainer({
  editorPanel,
  previewPanel,
  disabled,
}: {
  editorPanel: React.ReactNode;
  previewPanel: React.ReactNode;
  disabled: boolean;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">
            <Code />
            Editor
          </TabsTrigger>
          {disabled ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="hover:bg-[#0000]!">
                  <Eye />
                  Preview
                </Button>
              </PopoverTrigger>
              <PopoverContent className="text-base p-2 text-muted-foreground">
                Please save the content first to see preview!
              </PopoverContent>
            </Popover>
          ) : (
            <TabsTrigger value="preview" disabled={disabled}>
              <Eye />
              Preview
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="editor" className="border rounded-xl">
          {editorPanel}
        </TabsContent>
        <TabsContent value="preview" className="border rounded-xl">
          {previewPanel}
        </TabsContent>
      </Tabs>
    );
  } else {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>{editorPanel}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>{previewPanel}</ResizablePanel>
      </ResizablePanelGroup>
    );
  }
}
