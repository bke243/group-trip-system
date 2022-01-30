import { ReplyIcon } from '@heroicons/react/outline';
import { Textarea, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { PackageBought } from '../../components/PackageBought';
import { $fetch_groups } from '../../redux/groups.reducer';
import { $fetch_messages, $send_message } from '../../redux/messages.reducer';

export const Messages = () => {
    const [bought, setBought] = useState(JSON.parse(window.localStorage.getItem("bought") || "[]"))

    return <div className='w-full'>
        <header className="bg-white shadow">
            <div className=" py-6 px-4 inline-flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold text-gray-900">Finished Trips</h1>

            </div>
        </header>
        <div className='container w-full mx-auto'>
            <div className='w-full grid grid-cols-3 grid-flow-row gap-2 mt-4'>
                {
                    bought.map((pack: any) => <PackageBought pack={pack} />)
                }
            </div>
        </div>
    </div>;
};
