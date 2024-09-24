import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onTagsChange?: (tags: string[]) => void;
  tagValue?: string[];
}

export const TagsInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, tagValue, onTagsChange, ...props }, ref) => {
    const [tags, setTags] = useState<string[]>(tagValue || []);
    const [isFocused, setIsFocused] = useState(false);
    const [isComposing, setIsComposing] = useState(false);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key !== "Enter") return;
      if (isComposing) return;
      const value = e.currentTarget.value;
      if (!value.trim()) return;
      setTags([...tags, value]);
      e.currentTarget.value = "";
      e.preventDefault();
    }

    useEffect(() => {
      onTagsChange && onTagsChange(tags);
    }, [tags]);

    function removeTag(index: number) {
      setTags(tags.filter((el, i) => i !== index));
    }

    return (
      <div
        className={cn(
          "w-full min-h-9 flex flex-wrap items-center rounded-md bg-transparent border border-input gap-1 px-1.5 py-1 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          isFocused && " ring-1 ring-ring",
          className
        )}
      >
        {tags.map((tag, index) => (
          <Badge className={"rounded-full h-6"} key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              <X className="h-3.5 w-3.5 ml-1.5 -mr-1 hover:bg-white hover:text-black rounded-full" />
            </span>
          </Badge>
        ))}
        <input
          type={type}
          onKeyDown={handleKeyDown}
          className="w-full ml-2 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus:outline-none"
          ref={ref}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onCompositionStart={() => {
            setIsComposing(true);
          }}
          onCompositionEnd={() => {
            setIsComposing(false);
          }}
          name={undefined}
        />
        <input type="hidden" {...props} value={tags} />
      </div>
    );
  }
);
