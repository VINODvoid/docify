import { useMutation } from 'convex/react';
import { useRef, useState, useEffect } from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { LoaderIcon } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';

interface DocumentInputProps {
  title?: string;
  id?: Id<'documents'>;
}

export const DocumentInput = ({ id, title }: DocumentInputProps) => {
  const [value, setValue] = useState(title ?? 'Untitled Document');
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const mutate = useMutation(api.documents.updateById);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync value with title prop when it changes
  useEffect(() => {
    if (title) {
      setValue(title);
    }
  }, [title]);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;
    if (!id) return;
    setIsPending(true);
    setIsError(false);
    mutate({ id, title: newValue })
      .then(() => {
        toast.success('Document title updated');
      })
      .catch(() => {
        toast.error('Failed to update document title');
        setIsError(true);
      })
      .finally(() => {
        setIsPending(false);
      });
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !value.trim()) return;

    setIsPending(true);
    setIsError(false);
    mutate({ id, title: value.trim() })
      .then(() => {
        toast.success('Document title updated');
        setIsEditing(false);
      })
      .catch(() => {
        toast.error('Failed to update document title');
        setIsError(true);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const showLoader = isPending;
  const showError = isError && !isPending;
  const showSaved = !isPending && !isError;

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form className="relative w-fit max-w-[300px]" onSubmit={handleSubmit}>
          {/* Hidden span to auto-size the input */}
          <span className="invisible whitespace-pre px-1.5 text-lg min-w-[50px]">
            {value || ' '}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            className="absolute inset-0 text-lg text-foreground px-1.5 bg-transparent truncate focus:outline-none focus:ring-1 focus:ring-primary rounded"
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
              inputRef.current?.select();
            }, 0);
          }}
          className="text-lg text-foreground px-1.5 cursor-pointer truncate max-w-[300px] hover:bg-muted rounded transition-colors"
          title={value}
        >
          {value || 'Untitled Document'}
        </span>
      )}

      {/* Status indicator */}
      <div className="flex items-center justify-center w-5 h-5">
        {showLoader && (
          <LoaderIcon className="size-4 text-primary animate-spin" />
        )}
        {showError && <BsCloudSlash className="size-4 text-destructive" />}
        {showSaved && <BsCloudCheck className="size-4 text-primary" />}
      </div>
    </div>
  );
};
