import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { PackageCard } from '../../components/Package';
import { $fetch_packages } from '../../redux/packages.reducer';

export const UserPackages = () => {
    const $packages = useSelector((state: RootStateOrAny) => state.$packages)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch($fetch_packages())
    }, []);
    console.log($packages);

    return <div className='w-full'>
        <header className="bg-white shadow">
            <div className=" py-6 px-4 inline-flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold text-gray-900">Packages</h1>

            </div>
        </header>
        <div className='container w-full mx-auto'>
            <div className='w-full grid grid-cols-3 grid-flow-row gap-2 mt-4'>
                {
                    $packages.packages.data.map(pack => <PackageCard pack={pack} />)
                }
            </div>
        </div>
    </div>;
};
