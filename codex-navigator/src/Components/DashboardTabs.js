import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateTab from "./Creation/Creation";
import ExplorePanel from "./Explorer/ExplorePanel";

function DashboardTabs() {
    const [key, setKey] = useState('search');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3" fill
        >
            <Tab eventKey="search" title="Explore">
                <ExplorePanel/>
            </Tab>
            <Tab eventKey="create" title="Create">
                <CreateTab/>
            </Tab>
            <Tab eventKey="update" title="Update">
                Tab content for Update
            </Tab>
        </Tabs>
    );
}

export default DashboardTabs;