import React, { useState } from 'react';
import { Button, Text, Textarea, TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { $create_group } from '../../redux/groups.reducer';

export const NewGroup = ({ setOpened }: { setOpened: (open: boolean) => void }) => {
    const dispatch = useDispatch()
    const [groupName, setGroupName] = useState(``);
    const [destination, setDestination] = useState(``);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    return <div className='w-full'>
        <Text size="lg">Group Name</Text>
        <TextInput placeholder='name' value={groupName} onChange={({ target: { value } }) => setGroupName(value)} width={"100"} />
        <Text size="lg">Destination</Text>
        <TextInput placeholder='destination' value={destination} onChange={({ target: { value } }) => setDestination(value)} width={"100"} />
        <Text size="lg">Description</Text>
        <Textarea placeholder='description' value={description} onChange={({ target: { value } }) => setDescription(value)} />
        <div className='w-full flex justify-end mt-2'>
            <button disabled={loading} className={`bg-purple-600 ${loading ? "opacity-50 cursor-not-allowed" : ""} hover:bg-purple-700 font-semibold text-white px-3 py-2 rounded-lg shadow-md`}
                onClick={() => {
                    dispatch($create_group(groupName, destination, description))
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setOpened(false)
                    }, 1000);
                }}

            >
                Create
            </button>
        </div>

    </div>;
};
