import React, { useEffect } from 'react';

import './aside.scss';

import Corner from 'src/assets/images/corner.svg';
import Equal from 'src/assets/images/ranking-equal.svg';
import Down from 'src/assets/images/ranking-down.svg';
import Up from 'src/assets/images/ranking-up.svg';

const Aside = ({ fetchInfos, ranking }) => {
  useEffect(() => {
    fetchInfos();
  }, [])

  return (
    <div className="ranking-aside">
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />

      {ranking.main && 
        <div>Général : {
          ranking.main[0] === "equal" && <img src={Equal} width="10px" /> ||
          ranking.main[0] === "down" && <img src={Down} width="10px" /> ||
          ranking.main[0] === "up" && <img src={Up} width="10px" />
        } {ranking.main[1]}
        </div>
      }

      {ranking.industry && 
        <div>Industrie : {
          ranking.industry[0] === "equal" && <img src={Equal} width="10px" /> ||
          ranking.industry[0] === "down" && <img src={Down} width="10px" /> ||
          ranking.industry[0] === "up" && <img src={Up} width="10px" />
        } {ranking.industry[1]}
        </div>
      }

      {ranking.military && 
        <div>Militaire : {
          ranking.military[0] === "equal" && <img src={Equal} width="10px" /> ||
          ranking.military[0] === "down" && <img src={Down} width="10px" /> ||
          ranking.military[0] === "up" && <img src={Up} width="10px" />
        } {ranking.military[1]}
        </div>
      }

      {ranking.technology && 
        <div>Technologie : {
          ranking.technology[0] === "equal" && <img src={Equal} width="10px" /> ||
          ranking.technology[0] === "down" && <img src={Down} width="10px" /> ||
          ranking.technology[0] === "up" && <img src={Up} width="10px" />
        } {ranking.technology[1]}
        </div>
      }

      {ranking.economy && 
        <div>Economie : {
          ranking.economy[0] === "equal" && <img src={Equal} width="10px" /> ||
          ranking.economy[0] === "down" && <img src={Down} width="10px" /> ||
          ranking.economy[0] === "up" && <img src={Up} width="10px" />
        } {ranking.economy[1]}
        </div>
      }

      {ranking.intelligence && 
        <div>Espionnage : {
          ranking.intelligence[0] === "equal" && <img src={Equal} width="10px" /> ||
          ranking.intelligence[0] === "down" && <img src={Down} width="10px" /> ||
          ranking.intelligence[0] === "up" && <img src={Up} width="10px" />
        } {ranking.intelligence[1]}
        </div>
      }

    </div>
  )
}

export default Aside;
