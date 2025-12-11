import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton,OrganizationSwitcher } from "@clerk/clerk-react";


export const Navbar = () => {


  return (
  <nav className="flex items-center justify-between h-full w-full backdrop-blur-sm border-b border-border/40">
    <div className="flex gap-4 items-center shrink-0 pr-6">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="transition-transform group-hover:scale-110"
          />
        </div>
        <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Docify
        </h3>
      </Link>
    </div>
    <SearchInput/>
    <div className="flex gap-3 items-center pl-6">
      <OrganizationSwitcher
      afterCreateOrganizationUrl={"/"}
      afterLeaveOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      afterSelectPersonalUrl={"/"}
      />
    <UserButton/>
    </div>


  </nav>

  );
}
