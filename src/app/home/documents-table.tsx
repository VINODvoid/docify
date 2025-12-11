import { PaginationStatus } from 'convex/react';
import { Doc } from '../../../convex/_generated/dataModel';
import { FileTextIcon, LoaderIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DocumentRow } from './document-row';
import { Button } from '@/components/ui/button';

interface DocumentsTableProps {
  documents: Doc<'documents'>[] | undefined;
  loadMore: (numberItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="max-w-6xl mx-auto px-16 py-8 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <FileTextIcon className="size-5 text-primary" />
        <h3 className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Recent Documents
        </h3>
      </div>

      {documents === undefined ? (
        <div className="flex items-center justify-center py-12">
          <LoaderIcon className="animate-spin text-primary size-8" />
        </div>
      ) : (
        <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40 bg-card/50">
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">&nbsp;</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Name</TableHead>
                <TableHead className="hidden md:table-cell text-xs uppercase tracking-wider font-semibold text-muted-foreground">Shared</TableHead>
                <TableHead className="hidden md:table-cell text-xs uppercase tracking-wider font-semibold text-muted-foreground">Created At</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">&nbsp;</TableHead>
              </TableRow>
            </TableHeader>
            {documents.length === 0 ? (
              <TableBody>
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell
                    colSpan={5}
                    className="text-center h-32"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <FileTextIcon className="size-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No documents found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {documents.map((doc) => (
                  <DocumentRow key={doc._id} document={doc} />
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant={'ghost'}
          size={'sm'}
          onClick={() => loadMore(5)}
          disabled={status !== 'CanLoadMore'}
          className="hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
        >
          {status === 'CanLoadMore' ? "Load More" : "End of Documents"}
        </Button>
      </div>
    </div>
  );
};
