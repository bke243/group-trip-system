import { useEffect, useState } from 'react';
import { AppShell, Burger, Button, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { $fetch_groups } from '../../redux/groups.reducer';

export const Dashboard = () => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const $user = useSelector((state: RootStateOrAny) => state.$user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch($fetch_groups())
    }, []);

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar
                    padding="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 300, lg: 400 }}
                >
                    <Navbar.Section grow>
                        <Button
                            component={Link} to="/dashboard"
                            variant='default'
                            style={{ justifyContent: "flex-start" }}
                            fullWidth>
                            Groups
                        </Button>
                        <Button
                            component={Link} to="/dashboard/create/group"
                            variant='default'
                            style={{ justifyContent: "flex-start" }}
                            fullWidth>
                            Create New Group
                        </Button>
                        <Button
                            component={Link} to="/dashboard/packages"
                            variant='default'
                            style={{ justifyContent: "flex-start" }}
                            fullWidth>
                            Packages
                        </Button>
                    </Navbar.Section>
                    <Navbar.Section>
                        <div className='w-full h-auto flex flex-row items-center'>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className='w-16 h-1/6 rounded-full object-cover' />
                            <div className='w-full flex flex-col ml-2'>
                                <p className='text-base font-medium'>{$user.personData.email}</p>
                                <p onClick={() => { window.localStorage.removeItem('user'); navigate('/', { replace: true }) }}>Log Out</p>
                            </div>
                        </div>
                    </Navbar.Section>
                </Navbar >
            }
            header={
                <Header height={70} padding="md" >

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
                </Header >
            }
        >

            <Outlet />

        </AppShell >

    );
}
