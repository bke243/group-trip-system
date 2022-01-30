import { Button, Popover, Select, Text, Textarea, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { $add_group_member, $delete_group_member, $group_users, $update_group, Group } from '../../redux/groups.reducer';
import _ from 'lodash';
import { TrashIcon } from '@heroicons/react/outline';


export const GroupDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { groups: { data }, groupUsers } = useSelector(state => state.$groups)
    const [email, setEmail] = useState("");
    const [opened, setOpened] = useState(false);
    const [groupName, setGroupName] = useState(``);
    const [destination, setDestination] = useState(``);
    const [description, setDescription] = useState('');
    const [group, setGroup] = useState<Group | null>(null);
    useEffect(() => {
        setGroup(data.find(d => parseInt(d.id) === parseInt(id || "0")) || null);

        return () => {
            setGroup(null)
        };
    }, [data, id]);
    useEffect(() => {
        dispatch($group_users(id))
    }, []);


    if (group === null) return <div></div>
    return <div className='w-full'>
        <header className="bg-white shadow">
            <div className=" py-6 px-4 inline-flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold text-gray-900">Group Details</h1>

            </div>
        </header>
        <div className='container mx-auto w-full mt-5'>
            <div className='w-96 px-3'>
                <Text size="lg">Add a new Group Member</Text>
                <div className='w-full inline-flex items-center'>
                    <TextInput onChange={({ target: { value } }: { target: { value: any } }) => setEmail(value)} value={email} placeholder='e-mail address' style={{ width: 180 }} />
                    <Button onClick={() => { dispatch($add_group_member(email, group.id)) }} variant="light" color="blue" >
                        Add
                    </Button>
                </div>
                <Popover
                    opened={opened}
                    onClose={() => setOpened(false)}
                    position="bottom"
                    placement="start"
                    withCloseButton
                    title="Edit user"
                    transition="pop-top-right"
                    target={
                        <div className='rounded-lg border border-slate-200 hover:bg-gray-200 mt-2 cursor-pointer px-3 py-2' onClick={() => setOpened(true)}>Group Members</div>
                    }
                >
                    <div className='w-72 h-auto flex flex-col space-y-2'>
                        {_(groupUsers).map(user => <div key={user.email} className='w-full h-auto px-3 py-2 inline-flex items-center justify-between rounded-lg border border-slate-100 hover:bg-gray-100'>
                            <p>{user.email}</p>
                            <div
                            onClick={() => { dispatch($delete_group_member(user.userId, group.id)) }}
                            className='hover:bg-red-100 cursor-pointer transition-colors rounded-lg p-1 border border-red-300 text-red-300'>
                                <TrashIcon className='w-4 h-4' />
                            </div>
                        </div>).value()}
                    </div>
                </Popover>
                <Text size="lg">Group Name</Text>
                <TextInput placeholder='name' value={groupName} onChange={({ target: { value } }) => setGroupName(value)} width={"100"} />
                <Text size="lg">Destination</Text>
                <TextInput placeholder='destination' value={destination} onChange={({ target: { value } }) => setDestination(value)} width={"100"} />
                <Text size="lg">Description</Text>
                <Textarea placeholder='description' value={description} onChange={({ target: { value } }) => setDescription(value)} />

                <Button onClick={() => { dispatch($update_group(groupName, destination, description, group.id)) }} variant="light" color="blue" >
                    Update Details
                </Button>
            </div>
        </div>
    </div>;
};
