"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Templates from "@/constants/templates"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"
import { toast } from "sonner"
import { PlusIcon } from "lucide-react"


export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating,setIsCreating] = useState(false);

  const onTemplateClick = (title:string,initialContent:string) => {
    setIsCreating(true);
    create({title,initialContent})
    .then((documentId) => {
      toast.success("Document created successfully");
      router.push(`/documents/${documentId}`);
    })
    .catch(() => {
      toast.error("Something went wrong while creating the document");
    })
    .finally(() => {
      setIsCreating(false);
    });
  }
  return (
    <div className="bg-gradient-to-b from-card/30 to-transparent border-b border-border/30">
      <div className="max-w-7xl mx-auto px-16 py-8 flex flex-col gap-y-6">
        <div className="flex items-center gap-2">
          <PlusIcon className="size-5 text-primary" />
          <h3 className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Start a new document
          </h3>
        </div>
        <Carousel>
          <CarouselContent className="-ml-4">
            {Templates.map((template) => (
              <CarouselItem key={template.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4">
                <div className={cn(
                  "aspect-[3/4] flex flex-col gap-y-3",
                  isCreating && "pointer-events-none opacity-50"
                )}>
                  <button
                   disabled = {isCreating}
                   onClick={()=> onTemplateClick(template.label,template.initialContent)}
                   style={{
                    backgroundImage:`url(${template.imageUrl})`,
                    backgroundPosition:"center",
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat"
                  }}
                  className="group relative size-full rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center gap-y-4 bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-[0_0_30px_rgba(157,209,179,0.15)] hover:scale-[1.02]"
                   >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                   </button>
                    <p className="text-sm font-medium truncate text-center text-foreground/90">{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:bg-primary/10 hover:border-primary/50 transition-colors" />
          <CarouselNext className="hover:bg-primary/10 hover:border-primary/50 transition-colors" />
        </Carousel>
      </div>
    </div>
  )
}
