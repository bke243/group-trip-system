import { Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { GroupCard } from '../../components/Group';
import { $fetch_groups } from '../../redux/groups.reducer';
import { NewGroup } from './NewGroup';

export const Groups = () => {
    const dispatch = useDispatch()
    const $groups = useSelector((state: RootStateOrAny) => state.$groups)
    const [opened, setOpened] = useState(false);
    useEffect(() => {
        dispatch($fetch_groups())
    }, []);
    console.log($groups);

    return <div className='w-full'>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Create New Group"

        >
            <NewGroup setOpened={setOpened} />
        </Modal>
        <header className="bg-white shadow">
            <div className=" py-6 px-4 inline-flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
                <button onClick={() => setOpened(true)} className='px-3 py-2 rounded-lg shadow-md bg-purple-600 hover:bg-purple-700 text-white font-semibold'>Create New Group</button>
            </div>
        </header>
        <div className='container w-full mx-auto'>
            <div className='w-full grid grid-cols-3 grid-flow-row gap-2 mt-4'>
                {
                    $groups.groups.data.map(group => <GroupCard group={group} />)
                }
            </div>
        </div>


    </div>;
};
