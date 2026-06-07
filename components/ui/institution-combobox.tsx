"use client";

import * as React from "react";
import { Building2, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSTITUTIONS } from "@/lib/institutions";
import { Input } from "@/components/ui/input";

interface InstitutionComboboxProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function InstitutionCombobox({
  value,
  onChange,
  error,
  placeholder = "Search institution...",
}: InstitutionComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const filteredInstitutions = React.useMemo(() => {
    if (!value.trim()) return INSTITUTIONS.slice(0, 10);
    const query = value.toLowerCase();
    return INSTITUTIONS.filter((inst) =>
      inst.name.toLowerCase().includes(query)
    ).slice(0, 10);
  }, [value]);

  const handleSelect = (institution: string) => {
    onChange(institution);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredInstitutions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && filteredInstitutions[highlightedIndex]) {
        handleSelect(filteredInstitutions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    setHighlightedIndex(0);
  }, [value]);

  const isValid = INSTITUTIONS.some((i) => i.name === value);

  return (
    <div className="relative">
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-10",
            error && "border-red-500 focus-visible:ring-red-500"
          )}
          aria-invalid={!!error}
          aria-expanded={isOpen}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
          {isValid && value && (
            <span className="text-emerald-500">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsOpen(!isOpen)}
            className="p-0.5 hover:bg-accent rounded"
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md max-h-60 overflow-y-auto"
        >
          {filteredInstitutions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No institutions found
            </div>
          ) : (
            <ul className="py-1">
              {filteredInstitutions.map((institution, index) => (
                <li key={institution.name}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(institution.name)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "w-full px-3 py-2 text-sm text-left transition-colors",
                      index === highlightedIndex
                        ? "bg-emerald-50 text-emerald-900"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {institution.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}