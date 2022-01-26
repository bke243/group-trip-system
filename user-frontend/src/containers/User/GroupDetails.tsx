import { Button, Popover, Select, Text, Textarea, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { $add_group_member, $delete_group_member, $update_group, Group } from '../../redux/groups.reducer';

export const GroupDetails = ({ group }: { group: Group }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [groupName, setGroupName] = useState(``);
    const [destination, setDestination] = useState(``);
    const [description, setDescription] = useState('');
    return <div>
        <Text size="lg">Add a new Group Member</Text>
        <div className='w-full inline-flex items-center'>
            <TextInput onChange={({ target: { value } }: { target: { value: any } }) => setEmail(value)} value={email} placeholder='e-mail address' style={{ width: 180 }} />
            <Button onClick={() => { dispatch($add_group_member(email, group.id)) }} variant="light" color="blue" >
                Add
            </Button>
            <Button onClick={() => { dispatch($delete_group_member(email, group.id)) }} variant="light" color="red" >
                Remove
            </Button>
        </div>
        <Text size="lg">Group Name</Text>
        <TextInput placeholder='name' value={groupName} onChange={({ target: { value } }) => setGroupName(value)} width={"100"} />
        <Text size="lg">Destination</Text>
        <TextInput placeholder='destination' value={destination} onChange={({ target: { value } }) => setDestination(value)} width={"100"} />
        <Text size="lg">Description</Text>
        <Textarea placeholder='description' value={description} onChange={({ target: { value } }) => setDescription(value)} />

        <Button onClick={() => { dispatch($update_group(groupName, destination, description, group.id)) }} variant="light" color="blue" >
            Update Details
        </Button>
    </div>;
};
