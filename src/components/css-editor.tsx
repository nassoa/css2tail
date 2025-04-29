"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

interface CssEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CssEditor({
  value,
  onChange,
  placeholder = "Entrez votre CSS ici",
}: CssEditorProps) {
  return (
    <div className="h-full w-full relative flex flex-col">
      <div className="px-4 py-2 font-medium text-sm border-b">CSS</div>
      <div className="flex-grow overflow-auto">
        <CodeMirror
          value={value}
          onChange={onChange}
          height="100%"
          theme={vscodeDark}
          extensions={[css()]}
          placeholder={placeholder}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}
