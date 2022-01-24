import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { $delete_group, Group as GType } from '../redux/groups.reducer';


export const GroupCard = ({ group }: { group: GType }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
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
                    <Button component={Link} to={`/dashboard/group/${group.id}`} variant="light" color="blue" style={{ marginTop: 14 }}>
                        View
                    </Button>
                    <Button variant="light" color="red" style={{ marginTop: 14 }} onClick={() => dispatch($delete_group(group.id))}>
                        Delete
                    </Button>
                </Group>

            </Card>
        </div>
    );
}