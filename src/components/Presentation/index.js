import React, { useEffect, useRef } from 'react';

import { setPage } from 'src/utils/router';
import Civilizations from './Civilizations';

import './presentation.scss';

const Presentation = ({ goToCivilizationsGuide, goToCivilizationsGuideDone, selectCivilization }) => {
  // Moving to the civilizations presentation
  const civilizationsAnchor = useRef();
  useEffect(() => {
    if (goToCivilizationsGuide) {
      civilizationsAnchor.current.scrollIntoView();
      goToCivilizationsGuideDone();
    }
  }, [goToCivilizationsGuide]);

  const handleSelection = (name) => {
    selectCivilization(name);
    setPage('register');
  }

  return (
    <>
      <p>0123456789Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum blanditiis quam quaerat ipsam. Illum, architecto magnam dolore quam, dignissimos maiores molestiae totam a fugiat ducimus aliquid commodi pariatur sit dicta distinctio ratione autem vel labore. Modi, nulla! Libero nulla necessitatibus sint in iure sunt eum molestiae consequatur aliquid, quos exercitationem nihil omnis totam nostrum vitae ex illum doloribus praesentium maiores repellat. Officia architecto neque autem sapiente voluptatem cumque impedit, voluptatibus id dolor exercitationem deserunt delectus odit voluptas consequatur distinctio illo quod dicta. Accusantium eum fugit reprehenderit provident nobis possimus doloribus incidunt, illum distinctio. Consequatur, corrupti dolorem sint eligendi atque similique corporis, eaque obcaecati nam in natus ratione, esse fugiat optio soluta voluptates eum impedit officia consectetur sequi dolores iste magnam eius saepe! Perspiciatis recusandae excepturi iste autem earum magnam? Provident, voluptatem doloremque! Sed dignissimos quas excepturi, aperiam, maiores magni deleniti iure dolore, quam dicta sequi nemo quo ducimus voluptatum soluta corrupti doloribus tenetur! Tempora fuga facilis corporis libero nobis animi sunt doloremque tempore quisquam sequi maxime necessitatibus quibusdam minus dolorem deleniti eveniet, doloribus esse ullam voluptate quis voluptas! Voluptatem sit obcaecati hic sed aliquam aperiam deleniti atque dicta nam itaque labore deserunt tempore natus voluptates, ex dolore totam voluptatum possimus.</p>
      <p ref={civilizationsAnchor} className="presentation-civilizations-anchor">Les différentes civilisations :</p>
      <p className="presentation-civilizations-tip">(cliquez sur les cartes pour plus d'informations)</p>
      <Civilizations selectCivilization={name => handleSelection(name)} />
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem impedit pariatur quaerat deserunt? Modi quos ratione ipsa minima libero expedita animi unde iure accusantium ut quia, porro labore culpa. Ipsam facilis rem culpa odit, nemo eos qui et saepe dicta tempora necessitatibus, velit odio eveniet vel? Tempore cum fugit expedita, ipsum nam sit. Quisquam debitis, veniam in quaerat eos nobis explicabo veritatis a et facere iusto at autem nemo mollitia eligendi commodi exercitationem quibusdam ipsum. Fugiat, commodi saepe, architecto perspiciatis sunt labore fuga eos odio inventore sed aperiam possimus minima ipsa soluta est deserunt nihil adipisci eaque neque sapiente. Animi dicta enim laboriosam quibusdam doloremque sint ab soluta sit, iure eos doloribus veniam reprehenderit tempora laudantium distinctio dignissimos ipsum. Nostrum commodi possimus quos aspernatur quam, ea error facilis omnis dolorum sit, praesentium repellat? Praesentium, eaque itaque recusandae ex vitae sit repellat odio aliquam! Voluptatum perspiciatis hic odio nam distinctio dolorum accusamus, itaque molestiae doloremque quos ea id natus eum dolorem harum. Quia delectus voluptate optio veritatis facilis eligendi perspiciatis eos recusandae illum, totam accusamus quam? Temporibus molestiae voluptatem quaerat dignissimos pariatur possimus laboriosam eos vel omnis unde libero voluptates, accusamus, molestias, perferendis eveniet vitae explicabo eligendi sit saepe iste non.</p>
    </>
  );
};


export default Presentation;
