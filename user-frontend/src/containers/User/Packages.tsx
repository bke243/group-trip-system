import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { PackageCard } from '../../components/PackageCard';
import { $fetch_packages } from '../../redux/packages.reducer';

export const UserPackages = () => {
    const $packages = useSelector((state: RootStateOrAny) => state.$packages)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch($fetch_packages())
    }, []);
    console.log($packages);

    return <div><PackageCard /></div>;
};
