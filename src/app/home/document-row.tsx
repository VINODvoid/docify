import { TableCell, TableRow } from '@/components/ui/table';
import { Doc } from '../../../convex/_generated/dataModel';
import { SiGoogledocs } from 'react-icons/si';
import { Building2Icon, CircleUserIcon, FileTextIcon } from 'lucide-react';
import { format } from 'date-fns';
import {  DocumentMenu } from './document-menu';
import { useRouter } from 'next/navigation';


interface DocumentRowProps {
  document: Doc<'documents'>;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {

  const router = useRouter();
  const onNewTabClick = (id:string) => {
    window.open(`/documents/${id}`, '_blank');

  };

  const onRowClick = (id:string) => {
    router.push(`/documents/${id}`);
  };
  return (
    <TableRow
      className="group cursor-pointer border-b border-border/40 hover:bg-card/50 transition-all duration-200"
      onClick={()=>onRowClick(document._id)}
    >
      <TableCell className="w-[50px]">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          <FileTextIcon className="size-6 text-primary relative z-10 group-hover:scale-110 transition-transform" />
        </div>
      </TableCell>
      <TableCell className="font-semibold md:w-[45%] text-foreground/90 group-hover:text-primary transition-colors">
        {document.title}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4 text-primary/70" />
        ) : (
          <CircleUserIcon className="size-4 text-accent/70" />
        )}
        <span className="text-sm">{document.organizationId ? 'Organization' : 'Personal'}</span>
      </TableCell>
      <TableCell className="text-muted-foreground/80 text-sm hidden md:table-cell">
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className='flex justify-end'>
        <DocumentMenu
        documentId={document._id}
        title={document.title}
        onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};
