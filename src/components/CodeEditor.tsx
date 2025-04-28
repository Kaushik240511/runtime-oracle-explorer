
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeEditorProps {
  defaultCode: string;
  onSubmit: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultCode, onSubmit }) => {
  const [code, setCode] = useState<string>(defaultCode);

  const handleSubmit = () => {
    onSubmit(code);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Algorithm Code</div>
        <Button 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600" 
          onClick={handleSubmit}
        >
          Run Analysis
        </Button>
      </div>
      <div className="relative w-full h-full min-h-[300px] border border-border rounded-md overflow-hidden">
        <textarea
          className="w-full h-full p-4 font-mono text-sm bg-code text-code-foreground resize-none focus:outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
