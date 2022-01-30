import { Button, Select, Text, Textarea, TextInput } from '@mantine/core';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const BuyPackage = () => {
    const params = useParams<Record<string, any>>()
    const $groups = useSelector((state: RootStateOrAny) => state.$groups)

    return <div className='w-72'>
        <div className='font-semibold text-base'>{`Package ${params.id}`}</div>

        <Text size="lg">Location</Text>
        <TextInput placeholder='City Name' width={"100"} />
        <Text size="lg">Start Date</Text>
        <TextInput placeholder='dd/mm/yyyy' width={"100"} />

        <Text size="lg">End Date</Text>
        <TextInput placeholder='dd/mm/yyyy' width={"100"} />
        <Text size="lg">Description</Text>
        <Textarea placeholder='text' />
        <Text size="lg">Price</Text>
        <TextInput placeholder='Price' width={"100"} />
        <Text size="lg">Group</Text>
        <Select data={$groups.groups.data.map(d => d.name)} placeholder='Select a group' width={"100"} />

        <Button color={`blue`} variant='light'>
            Purchase
        </Button>
    </div>;
};
