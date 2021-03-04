// on importe l'une des syntaxes de chai
import { expect } from 'chai';

// on importe le morceau de code qu'on veut tester
import { slugifyTitle } from 'src/utils';

/* describe décrit un bloc de test, on peut les imbriquer. 2 paramètres :
- un texte qui décrit le bloc
- la callback qui permet d'exécuter les tests pour ce bloc
*/
describe('utils', () => {
  describe('function slugifyTitle', () => {
    /* it décrit un cas de test (une ou plusieurs assertions), 2 paramètres :
    - un texte qui décrit le cas de test
    - la callback qui permet d'éxécuter les tests pour ce cas
    */
    it('is a function', () => {
      // assertion pour vérifier que slugifyTitle est une fonction
      expect(slugifyTitle).to.be.a('function');
    });

    it('replaces spaces', () => {
      // assertion pour vérifier que si j'appelle slugifyTitle avec une chaîne de
      // caractères qui contient des espaces, le résultat c'est la chaîne avec les
      // espaces remplacés par des tirets
      expect(slugifyTitle('une phrase')).to.equal('une-phrase');
    });

    // TODO ajouter des cas de test : majuscules, accents, ...
  });

  // TODO autre bloc de tests pour la fonction getRecipeBySlug
});
