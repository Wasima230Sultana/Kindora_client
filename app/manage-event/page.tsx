

import ManageCard from '@/components/Card/ManagedCard';
import { Event } from '@/components/type/type';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const ManageEventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    redirect('/login');
  }
const token = await getTokenFromServer()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/manage-event/${user.email}`,
    { cache: 'no-store' ,
      headers:{
        authorization : `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch managed events');
  }

  const events: Event[] = await res.json();

  return (
   <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
  <div>
    <h1 className="text-3xl font-bold tracking-tight">
      Manage My Events
    </h1>
    <p className="mt-2 text-muted-foreground">
      Manage the events you have created.
    </p>
  </div>

  <h2 className="text-xl font-semibold">
    My Created Events ({events.length})
  </h2>

  {events.length > 0 ? (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <ManageCard key={event._id} event={event} />
      ))}
    </div>
  ) : (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <p className="font-medium">You haven&apos;t created any events yet.</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Create your first event and start making a difference!
      </p>
    </div>
  )}
</div>
  );
};

export default ManageEventPage;