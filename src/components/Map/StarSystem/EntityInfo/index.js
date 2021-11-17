import store from 'src/store';
import axios from 'axios';
import { saveBases } from 'src/actions/bases';

import React from 'react';
import { useTranslation } from 'react-i18next';

import './entityInfo.scss';

const EntityInfo = ({ id, name, type }) => {
  const { t } = useTranslation('map');

  // Until there's no fleet, this will be here
  const colonize = (id) => {
    const token = sessionStorage.getItem('token');
    const config = {
      method: 'post',
      url: `${process.env.API_URL}api/user/planet/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    };
    axios(config)
    .then(response => store.dispatch(saveBases(response.data)))
    .catch(error => console.log(error));
  }
  return (
    <div className="entity-info">
      <div className="entity-info-name">Nom : {name}</div>
      <div className="entity-info-type">Type : {t(type)}</div>
      <button className="entity-info-button" onClick={() => colonize(id)}>Coloniser</button>
      <button className="entity-info-button">Décoloniser</button>
    </div>
  )
}

export default EntityInfo;
