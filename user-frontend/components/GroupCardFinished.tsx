import { ReplyIcon } from '@heroicons/react/outline';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Modal, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { $delete_group, Group as GType } from '../redux/groups.reducer';
import { $send_message } from '../redux/messages.reducer';


export const GroupCardFinished = ({ group }: { group: GType }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const [opened, setOpened] = useState(false);
    const [message, setMessage] = useState('');

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (<>

        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Feedback"
        >
            <Textarea value={message} onChange={({ target: { value } }) => setMessage(value)}>


            </Textarea>
            <Button onClick={() => { dispatch($send_message(message)) }} variant="light" color="blue" style={{ marginTop: 14 }}>
                <ReplyIcon className='w-5 h-5 ml-2 ' />
            </Button>

        </Modal>
        <div style={{ width: 340, margin: 'auto' }}>
            <Card shadow="sm" padding="lg">

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>{group.name}</Text>

                </Group>
                <Text size='md'>Personal</Text>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {group.destination}
                </Text>
                <Text size='md'>Trip</Text>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {group.description}
                </Text>
                <Group className='w-full flex flex-row items-center justify-center'>
                    <Button onClick={() => setOpened(true)} fullWidth variant="light" color="blue" style={{ marginTop: 14 }}>
                        Feedback
                    </Button>

                </Group>

            </Card>
        </div>
    </>

    );
}