import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Modal } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GroupDetails } from '../containers/User/GroupDetails';
import { $delete_group, Group as GType } from '../redux/groups.reducer';


export const GroupCard = ({ group }: { group: GType }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const $user = useSelector(state => state.$user)
    const [opened, setOpened] = useState(false);
    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{ width: "100%", margin: 'auto' }}>
            <div className='w-full h-auto bg-white border border-gray-200 rounded-lg shadow-md p-2'>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>{group.name}</Text>

                </Group>
                <Text size='md'>Destination</Text>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {group.destination}
                </Text>
                <Text size='md'>Description</Text>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {group.description}
                </Text>
                <div className='w-full flex flex-row items-center justify-center space-x-2 mt-2'>
                    <Link className='w-full' to={`group/${group.id}`}>
                        <button onClick={() => setOpened(true)} className='w-full text-white py-2 font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md'>View</button>
                    </Link>

                    <div className='w-full'>
                        <button onClick={() => dispatch($delete_group(group.id))} className='w-full text-white py-2 font-semibold bg-red-600 hover:bg-red-700 rounded-lg shadow-md'>Delete</button>
                    </div>
                </div>
            </div>
        </div >
    );
}