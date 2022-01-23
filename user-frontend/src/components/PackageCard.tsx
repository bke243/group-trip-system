import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';

export const PackageCard = () => {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{ width: 340, margin: 'auto' }}>
            <Card shadow="sm" padding="lg">

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>Package 1</Text>

                </Group>
                <Text size='md'>Location</Text>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <Text size='md'>Details</Text>
                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                    activities on and around the fjords of Norway
                </Text>

                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                    View
                </Button>


            </Card>
        </div>
    );
}