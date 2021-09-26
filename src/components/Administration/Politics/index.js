import React, { useEffect, useState } from 'react';

import Overview from 'src/components/Administration/Politics/Overview';
import Selected from 'src/components/Administration/Politics/Selected';

import './politics.scss';

const Politics = ({ fetchPolitics, politics }) => {
  const [page, setPage] = useState('selected');
  const [regime, setRegime] = useState();

  useEffect(() => {
    if (!politics) {
      fetchPolitics();
    }
  }, [])

  return (
    <>
      {page === 'overview' && <Overview changePage={(regime) => {setRegime(regime); setPage("selected")}}/>}
      {page === 'selected' && politics && <Selected chosenPolitics={politics} regime={regime} changePage={() => setPage("overview")}/>}
    </>
  );
}

export default Politics;
