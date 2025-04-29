'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface TailwindOutputProps {
  value: string;
}

export function TailwindOutput({ value }: TailwindOutputProps) {
  return (
    <div className="h-full w-full relative flex flex-col">
      <div className="px-4 py-2 font-medium text-sm border-b flex justify-between items-center">
        <span>Tailwind CSS</span>
      </div>
      <div className="flex-grow overflow-auto">
        <CodeMirror
          value={value}
          readOnly={true}
          height="100%"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: false,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: false,
            highlightSelectionMatches: true,
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}