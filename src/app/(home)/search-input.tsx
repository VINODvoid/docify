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
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="search the docs..."
          className="md:text-base placeholder:text-primary px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_0_rgba(65,69,73,0.15)] bg-[#F0F4F8] rounded-full h-10 focus-visible:right-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant={'ghost'}
          size={'icon'}
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >

          <SearchIcon className="size-4" color="#7033ff" />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant={'ghost'}
            size={'icon'}
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon className="size-4" color="#7033ff"/>
          </Button>
        )}
      </form>
    </div>
  );
}
