"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Code, Eye } from "lucide-react";

export default function AddPostContainer({
  editorPanel,
  previewPanel,
}: {
  editorPanel: React.ReactNode;
  previewPanel: React.ReactNode;
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
          <TabsTrigger value="preview">
            <Eye />
            Preview
          </TabsTrigger>
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
