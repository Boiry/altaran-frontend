import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Tab from 'src/containers/Tab';
import Chat from 'src/containers/Communications/Chat';
import MiniChat from 'src/containers/MiniChat';

import './communications.scss';

const Communications = () => {
  const { t } = useTranslation('communications');
  const [subPage, changeSubPage] = useState("intCom");
  const tabs = {
    [t("intCom")]: "intCom",
    [t("extCom")]: "extCom",
  };
  
  return (
    <div className="communications">
      <Tab name={"communications"} tabs={tabs} dispatchSubPage={changeSubPage} />
      {subPage === "intCom" && <div>Genre les rapports de combat</div> && <MiniChat />}
      {subPage === "extCom" && <Chat />}
    </div>
  );
};

export default Communications;
