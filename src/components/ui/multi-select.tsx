"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground bg-secondary/80 text-secondary-foreground hover:bg-secondary/60",
        primary: "border-primary bg-primary/90 text-primary-foreground hover:bg-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  selected: string[];
  onChange: (value: string[]) => void;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      placeholder,
      selected,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (value: string) => {
      onChange(selected.filter((s) => s !== value));
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between h-auto min-h-10", selected.length > 0 ? "h-auto" : "h-10", className)}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              {selected.length > 0 ? (
                selected.map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="mr-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnselect(value);
                    }}
                  >
                    {options.find(o => o.value === value)?.label}
                    <X className="ml-2 h-4 w-4 cursor-pointer" />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const isSelected = selected.includes(option.value);
                      if (isSelected) {
                        handleUnselect(option.value);
                      } else {
                        onChange([...selected, option.value]);
                      }
                      setOpen(true);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
