'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Form } from '@base-ui/react';
import { Heart } from 'lucide-react';

import { Event } from '../type/type';
import { getTokenFromClient } from '@/lib/getTokenFromClient';


const MyJoinedEvent = ({result}:{result:Event}) => {
      const { data: session } = authClient.useSession()
    const user = session?.user
const handleSubmit=async(e: React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault()
    const data = {
        username: user?.name,
        email:user?.email,
        UserImage:user?.image,
        ...result,
        joinedDate : new Date()
    }
    console.log(data)
  const token = await getTokenFromClient()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-event`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            authorization : `Bearer ${token}`
        
        },
        body:JSON.stringify(data)
    })
    const joinedRes = await res.json()
    console.log(joinedRes)

}
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                  {/* Join Button - UI Only */}
                            <Button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:shadow-lg"
                            >
                                <Heart size={17} />
                                Join Event
                            </Button>
            </Form>
          
        </div>
    );
};

export default MyJoinedEvent;