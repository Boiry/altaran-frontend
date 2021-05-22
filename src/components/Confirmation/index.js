import React, { useEffect, useState } from 'react';

import Corner from 'src/assets/images/corner.svg';

import './confirmation.scss';

const Confirmation = ({ confirm, confirmSuccess }) => {

  useEffect(() => {
    const token = window.location.search.slice(7);
    confirm(token);
  }, [])

  const [confirmed, setConfirmed] = useState();
  useEffect(() => {
    if (confirmSuccess === true) {
      setConfirmed(true)
    } else if (confirmSuccess === false) {
      setConfirmed(false)
    }
  }, [confirmSuccess])

  useEffect(() => {
    setTimeout(() => {
      window.location = process.env.APP_URL;
    }, 5000);
  }, [])

  return (
    <div className="confirmation">
      {confirmed === true &&
        <>
          <h1 className="confirmation-title">Confirmation réussie !</h1>
          <p className="confirmation-paragraph">Vous pouvez désormais vous connecter !</p>
        </>
      }
      {confirmed === false && 
        <h1 className="confirmation-title">La confirmation a échoué...</h1>
      }
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
    </div>
  )
}

export default Confirmation;
