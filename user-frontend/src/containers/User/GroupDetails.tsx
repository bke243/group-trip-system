import { TrashIcon } from '@heroicons/react/outline';
import { Button, Popover, Select, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { BrowserRouterProps, RouterProps, useLocation, useParams } from 'react-router-dom';
import { $add_group_member } from '../../redux/groups.reducer';


export const GroupDetails = () => {
    const params = useParams<Record<string, any>>()
    const $packages = useSelector((state: RootStateOrAny) => state.$packages)
    const [opened, setOpened] = useState(false);
    const [mail, setMail] = useState('');
    const dispatch = useDispatch()
    return <div>
        <Text size="lg">Add a new Group Member</Text>
        <TextInput placeholder='e-mail address' width={"100"} value={mail} onChange={({ target: { value } }) => setMail(value)} />
        <Button variant="light" color="blue" style={{ marginTop: 14 }}
            onClick={() => dispatch($add_group_member(params.id, mail))}
        >
            Add
        </Button>
        <Text size="lg">Group Members</Text>
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="start"
            withCloseButton
            title="Edit user"
            transition="pop-top-right"
            target={
                <div className='px-3 py-2 border border-gray-200 rounded-lg cursor-pointer' onClick={() => setOpened(true)}>Group Members</div>
            }
        >
            <div className='w-72 h-auto'>
                <div className='w-full h-auto p-2 border border-gray-200 rounded-lg inline-flex justify-between items-center'><p>Dummy User</p><div><TrashIcon className='w-5 h-5 cursor-pointer text-red-400' onClick={() => { }} /></div></div>
            </div>
        </Popover>
        <Text size="lg">Purchased Package</Text>
        <Select data={$packages.packages.data.map(d => d.name)}>

        </Select>
    </div>;
};
