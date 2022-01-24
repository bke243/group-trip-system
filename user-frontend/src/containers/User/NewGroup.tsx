import React, { useState } from 'react';
import { Button, Text, Textarea, TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { $create_group } from '../../redux/groups.reducer';

export const NewGroup = () => {
    const dispatch = useDispatch()
    const [groupName, setGroupName] = useState(``);
    const [destination, setDestination] = useState(``);
    const [description, setDescription] = useState('');

    return <div className='w-72'>
        <Text size="lg">Group Name</Text>
        <TextInput placeholder='name' value={groupName} onChange={({ target: { value } }) => setGroupName(value)} width={"100"} />
        <Text size="lg">Destination</Text>
        <TextInput placeholder='destination' value={destination} onChange={({ target: { value } }) => setDestination(value)} width={"100"} />
        <Text size="lg">Description</Text>
        <Textarea placeholder='description' value={description} onChange={({ target: { value } }) => setDescription(value)} />
        <Button variant="light" color="blue" style={{ marginTop: 14 }}
            onClick={() => {
                dispatch($create_group(groupName, destination, description))
            }}
        >
            Create
        </Button>
    </div>;
};
