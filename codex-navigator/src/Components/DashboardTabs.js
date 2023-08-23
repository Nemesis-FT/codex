import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateTab from "./Creation/Creation";

function DashboardTabs() {
    const [key, setKey] = useState('search');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="search" title="Explore">
                Tab content for Explore
            </Tab>
            <Tab eventKey="create" title="Create">
                <CreateTab/>
            </Tab>
        </Tabs>
    );
}

export default DashboardTabs;