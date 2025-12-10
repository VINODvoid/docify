"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { ClientSideSuspense, } from "@liveblocks/react";
import { useInboxNotifications} from "@liveblocks/react/suspense"
import { InboxNotificationList,InboxNotification } from "@liveblocks/react-ui";
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Inbox = ()=>{
  return (
    <ClientSideSuspense
      fallback={
        <>
        <Button variant="ghost" size="icon" className="relative"
        disabled
        >
          <BellIcon className="size-5" />
        </Button>
        <Separator orientation="vertical" className="h-6"/>
          </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );

}


const InboxMenu = ()=>{
  const {inboxNotifications} = useInboxNotifications();

  return (
    <>
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative">

          <BellIcon className="size-5"/>
          {inboxNotifications.length >0 && (
            <span className="absolute -top-1 -right-1 justify-center flex text-white bg-sky-500 text-xs rounded-full size-4">
              {inboxNotifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {inboxNotifications.length >0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((notification)=>(
              <InboxNotification
                key={notification.id}
               inboxNotification={notification}
              />
            ))}
            </InboxNotificationList>
        ):(
          <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">No notifications</div>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
    <Separator orientation="vertical" className="h-6"/>
          </>
  )
}
