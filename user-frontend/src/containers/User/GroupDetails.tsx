import { Button, Popover, Select, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';

export const GroupDetails = () => {
    const [opened, setOpened] = useState(false);
    return <div>
        <Text size="lg">Add a new Group Member</Text>
        <TextInput placeholder='e-mail address' width={"100"} />
        <Button variant="light" color="blue" style={{ marginTop: 14 }}>
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
                <div className='px-3 py-2 border border-gray-200 rounded-lg cursor-pointer'>Group Members</div>
            }
        >
            <div>
                <div>User 1</div>
            </div>
        </Popover>
        <Text size="lg">Purchased Package</Text>
        <Select data={["Package 1"]} defaultValue='Package 1'>

        </Select>
    </div>;
};
