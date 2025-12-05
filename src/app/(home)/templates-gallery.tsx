"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Templates from "@/constants/templates"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"


export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating,setIsCreating] = useState(false);

  const onTemplateClick = (title:string,initialContent:string) => {
    setIsCreating(true);
    create({title,initialContent})
    .then((documentId) => {
      router.push(`/documents/${documentId}`);
    })
    .finally(() => {
      setIsCreating(false);
    });
  }
  return (
    <div className="bg-primary/10">
      <div className="max-w-7xl mx-auto px-16 py-7 flex flex-col gap-y-4 ">
        <h3 className="text-base font-medium ">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {Templates.map((template) => (
              <CarouselItem key={template.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4">
                <div className={cn(
                  "aspect-3/4 flex flex-col gap-y-2.5",
                  isCreating && "pointer-events-none opacity-50"
                )}>
                  <button
                   disabled = {isCreating}
                   onClick={()=> onTemplateClick(template.label,"")} //TODO: Add initial content
                   style={{
                    backgroundImage:`url(${template.imageUrl})`,
                    backgroundPosition:"cover",
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat"
                  }}
                  className="size-full rounded-sm border hover:bg-muted transition flex flex-col items-center justify-center gap-y-4 bg-secondary/50 "
                   />
                    <p className="text-sm font-medium truncate text-center">{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious  />
          <CarouselNext/>
        </Carousel>
      </div>
    </div>
  )
}
