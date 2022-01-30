import { ReplyIcon } from '@heroicons/react/outline';
import { Textarea, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { GroupCard } from '../../components/Group';
import { GroupCardFinished } from '../../components/GroupCardFinished';
import { $fetch_groups } from '../../redux/groups.reducer';
import { $fetch_messages, $send_message } from '../../redux/messages.reducer';

export const FinishedTrips = () => {
    const dispatch = useDispatch()
    const $groups = useSelector((state: RootStateOrAny) => state.$groups)
    useEffect(() => {
        dispatch($fetch_groups())
    }, []);
    console.log($groups);
    return <div className='grid grid-cols-2 grid-flow-row gap-2'>{
        $groups.groups.data.map(group => <GroupCardFinished group={group} />)
    }</div>;
    // const dispatch = useDispatch()
    // const $messages = useSelector((state: RootStateOrAny) => state.$messages)
    // const $user = useSelector((state: RootStateOrAny) => state.$user)
    // const [message, setMessage] = useState('');
    // useEffect(() => {
    //     dispatch($fetch_messages($user.personData.id))
    // }, []);
    // console.log($messages);

    // return <div className='w-full h-full relative' style={{ height: 'calc(100vh-72px' }}>
    //     <div className='absolute bottom-0 left-0 right-0 h-12 p-2 bg-gray-100 inline-flex items-center'>
    //         <TextInput style={{width: '100%'}} value={message} onChange={({ target: { value } }) => setMessage(value)} ></TextInput>
    //         <ReplyIcon onClick={() => { dispatch($send_message(message)) }} className='w-5 h-5 ml-2' />
    //     </div>
    // </div>;
};
