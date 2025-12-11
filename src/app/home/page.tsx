"use client"
import { usePaginatedQuery } from "convex/react"
import { Navbar } from "./navbar"
import { TemplatesGallery } from "./templates-gallery"
import { api } from "../../../convex/_generated/api"
import { DocumentsTable } from "./documents-table"
import { useSearchParams } from "@/hooks/use-search-params"

const HomePage = () => {
  const [search ] = useSearchParams();
  const {results,status,loadMore} = usePaginatedQuery(api.documents.get,{search},{initialNumItems:5});
  return(
    <div className="min-h-screen flex flex-col bg-background">
      {/* Gradient background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-background/80 backdrop-blur-md border-b border-border/40 p-4">
        <Navbar/>
      </div>
      <div className="mt-16">
        <TemplatesGallery/>
        <DocumentsTable
        documents={results}
        loadMore={loadMore}
        status={status}
        />
      </div>
    </div>
  )
}

export default HomePage
