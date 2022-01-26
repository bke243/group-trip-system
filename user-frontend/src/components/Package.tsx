import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Modal, TextInput, Select } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GroupDetails } from '../containers/User/GroupDetails';
import { $delete_group, Group as GType } from '../redux/groups.reducer';
import { $buy_package, Package } from '../redux/packages.reducer';
import travelManImage from "../assets/travelImage.jpg";
import travelManImage2 from "../assets/travelImage2.jpg";
import travelManImage3 from "../assets/travelImage3.jpg";
import travelManImage4 from "../assets/travelImage4.jpg";
import travelManImage5 from "../assets/travelImage5.jpg";
import travelManImage6 from "../assets/travelImage6.jpg";
import travelManImage7 from "../assets/travelImage7.jpg";
import travelManImage8 from "../assets/travelImage8.jpg";


export const PackageCard = ({ pack }: { pack: Package }) => {
    const imagesList = [travelManImage, travelManImage2, travelManImage3, travelManImage4, travelManImage5, travelManImage6, travelManImage7, travelManImage8]
    console.log(pack);

    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const $user = useSelector(state => state.$user)
    const $groups = useSelector(state => state.$groups)
    const [card_number, setCard_number] = useState("");
    const [expiry_month, setExpiry_month] = useState("");
    const [expiry_year, setExpiry_year] = useState("");
    const [cvc, setCvc] = useState("");
    const [groupid, setGroupid] = useState<any>(null);
    const [opened, setOpened] = useState(false);
    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];
    console.log(groupid);

    return (
        <div style={{ width: "100%", margin: 'auto' }}>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Payment"
            >
                <Text size="lg">Group</Text>
                <Select onChange={setGroupid} value={groupid} data={$groups.groups.data.map(d => ({ value: d.id, label: d.name }))}></Select>
                <Text size="lg">Card Number</Text>
                <TextInput placeholder='name' value={card_number} onChange={({ target: { value } }) => setCard_number(value)} width={"100"} />
                <Text size="lg">Expiry Month</Text>
                <TextInput placeholder='name' value={expiry_month} onChange={({ target: { value } }) => setExpiry_month(value)} width={"100"} />
                <Text size="lg">Expiry Year</Text>
                <TextInput placeholder='name' value={expiry_year} onChange={({ target: { value } }) => setExpiry_year(value)} width={"100"} />
                <Text size="lg">CVC</Text>
                <TextInput placeholder='name' value={cvc} onChange={({ target: { value } }) => setCvc(value)} width={"100"} />

                <div className='w-full flex justify-end'>
                    <button
                        onClick={() => dispatch($buy_package(groupid, pack.id, card_number, parseInt(expiry_month), parseInt(expiry_year), cvc))}
                        className='px-3 h-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold mt-2 rounded-lg shadow-md py-2'>Buy</button>
                </div>
            </Modal>
            <div className='w-full h-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden'>
                <img src={imagesList[Math.floor(Math.random() * (imagesList.length - 1))]} className='w-full h-44 object-cover' alt="" />
                <div className='w-full h-auto flex flex-col p-2'>
                    <Group position="apart" style={{ marginBottom: 5 }}>
                        <Text weight={600}>{pack.name}</Text>

                    </Group>
                    <Text size='md' weight={500}>Price</Text>
                    <Text weight={400}>{pack.price}</Text>
                    <Text size='md' weight={500}>Activities</Text>
                    <Text weight={400}>{pack.activities.join(",")}</Text>
                    <Text size='md' weight={500}>Description</Text>
                    <Text weight={400}>{pack.description}</Text>
                    <Text size='md' weight={500}>Start Date</Text>
                    <Text weight={400}>{pack.startDate}</Text>
                    <Text size='md' weight={500}>End Date</Text>
                    <Text weight={400}>{pack.endDate}</Text>
                    <button onClick={() => setOpened(true)} className='w-full h-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold mt-2 rounded-lg shadow-md py-2'>Buy This Package</button>
                </div>




            </div>
        </div >
    );
}