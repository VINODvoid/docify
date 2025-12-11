"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSearchParams } from "@/hooks/use-search-params";


export const SearchInput = () => {
  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=> {
    setValue(e.target.value);
  };
  const handleClear= ()=> {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  }
  const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full group" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search documents..."
          className="md:text-base placeholder:text-muted-foreground px-14 w-full border border-border/50 bg-card/50 backdrop-blur-sm rounded-full h-11 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-primary/50 hover:bg-card"
        />
        <Button
          type="submit"
          variant={'ghost'}
          size={'icon'}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-primary/10 transition-colors"
        >
          <SearchIcon className="size-5 text-primary" />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant={'ghost'}
            size={'icon'}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-destructive/10 transition-colors"
          >
            <XIcon className="size-5 text-muted-foreground hover:text-destructive transition-colors"/>
          </Button>
        )}
      </form>
    </div>
  );
}
