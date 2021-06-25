import React, { useEffect, useState, useRef } from 'react';

import './ranking.scss';

import Aside from 'src/containers/Ranking/Aside';
import Selector from 'src/components/Selector';

import Equal from 'src/assets/images/ranking-equal.svg';
import Down from 'src/assets/images/ranking-down.svg';
import Up from 'src/assets/images/ranking-up.svg';
import ArrowLeft from 'src/assets/images/ranking-arrow-left.svg';
import ArrowRight from 'src/assets/images/ranking-arrow-right.svg';

const Ranking = ({ fetchInfos, ranking, fetchPlayers, nbPlayers}) => {

  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);

  const getCategoriesNames = () => {
    let categoryName1, categoryName2;
    switch (category1) {
      case 0:
        categoryName1 = "main";
        break;
      case 1:
        categoryName1 = "industry";
        break;
      case 2:
        categoryName1 = "military";
        break;
      case 3:
        categoryName1 = "technology";
        break;
      case 4:
        categoryName1 = "economy";
        break;
      case 5:
        categoryName1 = "intelligence";
        break;
    }
    switch (category2) {
      case 0:
        categoryName2 = "player";
        break;
      case 1:
        categoryName2 = "alliance";
        break;
    }
    return [categoryName1, categoryName2]
  }

  useEffect(() => {
    const categoriesNames = getCategoriesNames();
    fetchInfos(categoriesNames[0], categoriesNames[1]);
  }, [category1, category2])

  const [rankingInfos, setRankingInfos] = useState([]);
  useEffect(() => {
    setRankingInfos([]);
    for (let i=0, length=Object.keys(ranking).length; i<length; i++) {
      const index = Object.keys(ranking)[i];
      setRankingInfos(rankingInfos => [...rankingInfos, ranking[index]]);
    }
  }, [ranking])

  const format = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  }

  // Paging
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const pagesList = useRef();
  useEffect(() => {
    fetchPlayers();
  }, [])

  useEffect(() => {
    const nbPages = Math.ceil(nbPlayers / 100);
    for (let i=0; i<nbPages; i++) {
      setPages(pages => [...pages, i+1]);
    }
  }, [nbPlayers])

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      pagesList.current.scrollLeft += 60;
    } else {
      pagesList.current.scrollLeft -= 60;
    }
  }

  useEffect(() => {
    const page = document.getElementsByClassName("ranking-paging-number");
    for (let i=0; i<page.length; i++) {
      if (parseInt(page[i].textContent) === selectedPage) {
        page[i].classList.add("ranking-paging-number-active");
      } else {
        page[i].classList.remove("ranking-paging-number-active");
      }
    }
  })

  const previousPage = () => {
    if (selectedPage > 1) {
      const page = selectedPage - 1;
      setSelectedPage(page);
    }
  }

  const nextPage = () => {
    const maxPage = document.getElementsByClassName("ranking-paging-number").length;
    if (selectedPage < maxPage) {
      const page = selectedPage + 1;
      setSelectedPage(page);
    }
  }

  useEffect(() => {
    const scrollMax = pagesList.current.scrollLeftMax;
    const maxPage = document.getElementsByClassName("ranking-paging-number").length;
    pagesList.current.scrollLeft = 1.5 * ((selectedPage-1) / (maxPage-1) * scrollMax) - 200;
  }, [selectedPage])

  return (
    <>
      <div className="ranking">

        <div className="ranking-filters">
          Classement <Selector
            selected="général"
            content={["général", "industriel", "militaire", "technologique", "économique", "espionnage"]}
            clickedItem={(item) => (setCategory1(item))}
          /> par <Selector
            selected="joueur"
            content={["joueur", "alliance"]}
            clickedItem={(item) => (setCategory2(item))}
          />
        </div>

        {rankingInfos &&
          <div className="ranking-table-container">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th className="ranking-table-growth"></th>
                  <th className="ranking-table-rank">Rang</th>
                  <th className="ranking-table-name">Nom</th>
                  <th className="ranking-table-alliance">Alliance</th>
                  <th className="ranking-table-score">Score</th>
                </tr>
              </thead>
              <tbody>
                {rankingInfos.map((line, index) => (
                  <tr key={`rankingLine${index}`} className="ranking-table-row">
                    <td>{
                      line.growth === "equal" && <img src={Equal} width="15px" /> ||
                      line.growth === "down" && <img src={Down} width="15px" /> ||
                      line.growth === "up" && <img src={Up} width="15px" />
                      }</td>
                    <td>{line.rank}</td>
                    <td className="ranking-table-data-name">{line.name}</td>
                    <td>{line.alliance}</td>
                    <td>{format(line.score)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }

        <div className="ranking-paging">
          <img src={ArrowLeft} className="ranking-paging-arrow" onClick={() => previousPage()} />
          <span ref={pagesList} className="ranking-paging-numbers" onWheel={(e) => handleWheel(e)}>
            {pages && pages.map((page) => (
              <span
                key={`pageNumber${page}`}
                className="ranking-paging-number"
                onClick={() => setSelectedPage(page)}
              >{page}</span>
            ))}
          </span>
          <img src={ArrowRight} className="ranking-paging-arrow" onClick={() => nextPage()} />
        </div>

      </div>

      <Aside />
    </>
  )
}

export default Ranking;
