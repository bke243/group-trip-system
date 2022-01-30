import { MediaQuery, Header as MantineHeader, Burger, useMantineTheme, Text } from '@mantine/core';
import React, { useState } from 'react';

export const Header = () => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    return <MantineHeader height={70} padding="md">
        {/* Handle other responsive styles with MediaQuery component or createStyles function */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
            </MediaQuery>

            <Text>Application header</Text>
        </div>
    </MantineHeader>;
};
