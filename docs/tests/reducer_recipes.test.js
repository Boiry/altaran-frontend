// on importe une syntaxe de Chai
import { should } from 'chai';

// on importe le morceau de code à tester
import reducerRecipes from 'src/reducers/recipes';

import { saveRecipes } from 'src/actions/recipes';

// spécificité de should : il faut l'exécuter une première fois pour pouvoir
// l'utiliser
should();

describe('reducer for recipes', () => {
  it('is a function', () => {
    // assertion
    reducerRecipes.should.be.a('function');
  });

  // vérifier le retour de l'état initial
  it('returns initial state', () => {
    // on construit la valeur de retour attendue
    const expectedState = {
      recipesList: [],
      loading: true,
    };

    // on veut faire une égalité en profondeur (vérifier chaque propriété) => deep
    // sans deep, on compare les références (adresses) des objets
    reducerRecipes().should.deep.equal(expectedState);
  });

  // vérifier le retour en cas d'action SAVE_RECIPES
  it('handles action SAVE_RECIPES', () => {
    // Plan d'action : on veut exécuter le reducer en fournissant un state et une
    // action, et vérifier qu'on récupère en sortie un state qui contient le
    // payload de l'action
    // - créer un objet pour représenter un state
    // - utiliser le action creator pour créer une action de type SAVE_RECIPES
    // - créer un objet avec le résultat attendu pour le state
    // - exécuter reducerRecipes(state, action) et comparer le résultat avec le
    // résultat attendu

    // on déclare un objet pour représenter un state : on met les valeurs qu'on
    // veut, mais il faut que ce soit différent du résultat attendu après l'exécution
    // du reducer
    const stateBefore = {
      recipesList: [],
      loading: true,
    };

    // on déclare des fausses recettes pour le payload de l'action
    const recipeData = [
      {
        id: 1,
        title: 'Crêpes',
      },
      {
        id: 2,
        title: 'Hamburger',
      },
    ];

    // je crée une action du type que je veux tester
    const action = saveRecipes(recipeData);

    const expectedState = {
      recipesList: recipeData,
      loading: false,
    };

    // on vérifie si le résultat réel est conforme au résultat attendu
    reducerRecipes(stateBefore, action).should.deep.equal(expectedState);
  });
});
