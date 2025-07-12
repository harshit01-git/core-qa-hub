import { useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Write your content...",
  className = ""
}: RichTextEditorProps) => {
  const ReactQuill = useRef<any>(null);

  useEffect(() => {
    const loadQuill = async () => {
      if (typeof window !== "undefined") {
        const { default: ReactQuillComponent } = await import("react-quill");
        ReactQuill.current = ReactQuillComponent;
      }
    };
    loadQuill();
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  if (!ReactQuill.current) {
    return (
      <div className={`min-h-[200px] border border-border rounded-md p-4 bg-background ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill.current
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="border border-border rounded-md bg-background"
        style={{
          '--ql-border-color': 'hsl(var(--border))',
          '--ql-color': 'hsl(var(--foreground))',
          '--ql-color-subtle': 'hsl(var(--muted-foreground))',
        } as any}
      />
      <style>{`
        .ql-toolbar {
          border-top: 1px solid hsl(var(--border)) !important;
          border-left: 1px solid hsl(var(--border)) !important;
          border-right: 1px solid hsl(var(--border)) !important;
          border-bottom: none !important;
          background: hsl(var(--muted)) !important;
          border-radius: 6px 6px 0 0 !important;
        }
        
        .ql-container {
          border: 1px solid hsl(var(--border)) !important;
          border-top: none !important;
          border-radius: 0 0 6px 6px !important;
          background: hsl(var(--background)) !important;
        }
        
        .ql-editor {
          color: hsl(var(--foreground)) !important;
          min-height: 150px;
        }
        
        .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground)) !important;
          font-style: normal !important;
        }
        
        .ql-snow .ql-stroke {
          stroke: hsl(var(--muted-foreground)) !important;
        }
        
        .ql-snow .ql-fill {
          fill: hsl(var(--muted-foreground)) !important;
        }
        
        .ql-snow .ql-picker-label {
          color: hsl(var(--muted-foreground)) !important;
        }
        
        .ql-snow .ql-picker-options {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
        }
        
        .ql-snow .ql-picker-item:hover {
          background: hsl(var(--muted)) !important;
        }
      `}</style>
    </div>
  );
};