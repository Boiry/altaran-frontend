import React from 'react';

import { expect } from 'chai';

/* shallow permet de faire le rendu d'un composant, sans faire le rendu des sous-
composants
*/
// https://enzymejs.github.io/enzyme
import { shallow } from 'enzyme';

// import du composant à tester
import RecipeSmall from 'src/components/Home/RecipeSmall';

// on importe Link parce qu'on en a besoin pour l'un des tests
import { Link } from 'react-router-dom';

// only (utilisé sur describe ou sur it) permet de zapper tous les autres tests
// => bien penser à l'enlever quand on a fini de mettre au point le test
// describe.only('<RecipeSmall />', () => {
describe('<RecipeSmall />', () => {
  // it.only('Uses title given as props', () => {
  it('Uses title given as props', () => {
    const titleValue = 'pizza';

    const wrapper = shallow(<RecipeSmall title={titleValue} thumbnail="img1.png" difficulty="facile" />);

    // vérifier que la valeur de la prop title est utilisée pour le h2
    // rechercher les h2
    const h2elements = wrapper.find('h2');

    // vérifier que j'en ai bien un seul
    expect(h2elements).to.have.lengthOf(1);

    // vérifier le contenu du h2 => comme il y a un seul h2, enzyme sait se
    // débrouiller sans avoir besoin de récupérer h2elements[0]
    expect(h2elements.text()).to.equal(titleValue);
  });

  // skip (utilisé sur describe ou it) permet de zapper ce test-là
  // => ne pas oublier de l'enlever à la fin
  // it.skip('has a link towards the recipe', () => {
  it('has a link towards the recipe', () => {
    const titleValue = 'pizza margherita';
    const slugTitle = 'pizza-margherita';

    const wrapper = shallow(<RecipeSmall title={titleValue} thumbnail="img1.png" difficulty="facile" />);

    // rechercher les instances du composant Link
    const links = wrapper.find(Link);

    // vérifier que j'en ai une seule
    expect(links).to.have.lengthOf(1);

    // vérifier la valeur de la prop "to" fournie au composant Link
    expect(links.props()).to.have.property('to', `/recipe/${slugTitle}`);
  });

  // TODO vérifier que difficulty est utilisé pour le p
  // TODO vérifier que la valeur de la prop thumbnail est utilisée comme src pour l'image
});
