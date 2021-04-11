import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import planet1 from 'src/assets/images/planet1.png';
import planet2 from 'src/assets/images/planet2.png';
import planet3 from 'src/assets/images/planet3.png';
import planet4 from 'src/assets/images/planet4.png';
import planet5 from 'src/assets/images/planet5.png';
import planet6 from 'src/assets/images/planet6.png';

import './planets.scss';

const Planets = () => (
  <div className="planets">
    <div className="planets-planets-container">
      <img src={planet1} />
      <img src={planet2} />
      <img src={planet3} />
      <img src={planet4} />
      <img src={planet5} />
      <img src={planet6} />
    </div>
    <div className="planets-main-container">
      <Tabs>
      <TabList>
        <Tab>Bâtiments</Tab>
        <Tab>Défense</Tab>
        <Tab>Flottes</Tab>
        <Tab>Troupes</Tab>
      </TabList>

      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
    </div>
  </div>
);

export default Planets;
