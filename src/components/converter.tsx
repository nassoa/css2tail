"use client";

import React, { useState } from "react";
import { CssEditor } from "@/components/css-editor";
import { TailwindOutput } from "@/components/tailwind-output";
import { CopyButton } from "@/components/copy-button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useDebounce } from "@/hooks/use-debounce";
import { Progress } from "@/components/ui/progress";
import { convertCssToTailwind } from "@/lib/converter";

export function Converter() {
  const [css, setCss] = useState("");
  const [tailwind, setTailwind] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const debouncedCss = useDebounce(css, 400);

  React.useEffect(() => {
    const convert = async () => {
      if (!debouncedCss.trim()) {
        setTailwind("");
        return;
      }

      setIsConverting(true);
      setProgress(30);

      try {
        const result = await convertCssToTailwind(debouncedCss);
        setProgress(70);
        setTailwind(result || "");
        setProgress(100);
      } catch (error) {
        console.error("Error converting CSS:", error);
        setTailwind("/* Error: Failed to convert CSS */");
      } finally {
        setTimeout(() => {
          setIsConverting(false);
          setProgress(0);
        }, 300);
      }
    };

    if (debouncedCss.trim()) {
      convert();
    } else {
      setTailwind("");
    }
  }, [debouncedCss]);

  return (
    <div className="h-screen w-full flex flex-col">
      {isConverting && (
        <Progress
          value={progress}
          className="h-1 absolute top-0 left-0 right-0 z-50"
        />
      )}

      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={50} minSize={30}>
          <CssEditor value={css} onChange={setCss} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="relative h-full">
            <TailwindOutput value={tailwind} />
            <CopyButton value={tailwind} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
