import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { GroupCard } from '../../components/Group';
import { $fetch_groups } from '../../redux/groups.reducer';

export const Groups = () => {
    const dispatch = useDispatch()
    const $groups = useSelector((state: RootStateOrAny) => state.$groups)
    useEffect(() => {
        dispatch($fetch_groups())
    }, []);
    console.log($groups);

    return <div className='grid grid-cols-2 grid-flow-row gap-2'>{
        $groups.groups.data.map(group => <GroupCard group={group} />)
    }</div>;
};
