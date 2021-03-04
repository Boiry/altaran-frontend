
# Redux

- [Redux](#redux)
- [Installation <a name="installation"></a>](#installation-)
  - [Mise en place du store <a name="installation-store"></a>](#mise-en-place-du-store-)
- [Connexion d'un composant au store <a name="connexion-store"></a>](#connexion-dun-composant-au-store-)
  - [Mise en place d'un composant container <a name="connexion-store-1"></a>](#mise-en-place-dun-composant-container-)
  - [mapStateToProps : les props qui lisent une valeur du state <a name="connexion-store-2"></a>](#mapstatetoprops--les-props-qui-lisent-une-valeur-du-state-)
  - [mapDispatchToProps : les props qui doivent envoyer une action au store ou à un middleware <a name="connexion-store-3"></a>](#mapdispatchtoprops--les-props-qui-doivent-envoyer-une-action-au-store-ou-à-un-middleware-)
- [Avoir plusieurs reducers (combineReducers) <a name="combine-reducers"></a>](#avoir-plusieurs-reducers-combinereducers-)
- [Middleware <a name="middleware"></a>](#middleware-)
  - [Mise en place d'un middleware <a name="installation-middleware"></a>](#mise-en-place-dun-middleware-)
  - [Réagir à une action dans le middleware <a name="action-middleware"></a>](#réagir-à-une-action-dans-le-middleware-)
  - [Prendre en compte le résultat d'une requête asynchrone dans le middleware <a name="reponse-middleware"></a>](#prendre-en-compte-le-résultat-dune-requête-asynchrone-dans-le-middleware-)


# Installation <a name="installation"></a>

`yarn add redux react-redux redux-devtools-extension`

## Mise en place du store <a name="installation-store"></a>

- créer un reducer `src/reducers/nameForTheReducer.js`

```javascript
const initialState = {
  // ici l'état initial
};

const nameForTheReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: return { ...state };
  }
};

export default nameForTheReducer;

```

- créer le store `src/store/index.js`

```javascript
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from 'src/reducers/nameForTheReducer';

const store = createStore(
  // reducer
  reducer,
  // enhancer
  devToolsEnhancer(),
);

export default store;

```

- utilisation du composant Provider pour que nos composants puissent accéder au store. Par exemple dans _src/index.js_ :

```javascript
import { Provider } from 'react-redux';

import store from 'src/store';

[...]

const rootReactElement = (
  <Provider store={store}>
    <App />
  </Provider>
);

[...]

```

- on peut alors visualiser le store dans le navigateur avec Redux Dev Tools


# Connexion d'un composant au store <a name="connexion-store"></a>

## Mise en place d'un composant container <a name="connexion-store-1"></a>

- créer un fichier dans `src/containers` (utiliser la même structure de fichiers que dans `src/components`) : assistant pour le composant, qui fera le lien avec le store

```javascript
import { connect } from 'react-redux';

// === on importe le composant de présentation
import LeComposant from 'src/components/....../LeComposant';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher une action vers le store
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(LeComposant);

```

- utiliser le container à la place du composant de présentation (par exemple remplacer _components_ par _containers_ dans l'import). Si on fournissait des props au composant de présentation qui sont maintenant liées au state, les supprimer en remplaçant par le composant container. 

- pour chaque prop du composant de présentation, se poser la question "est-ce que cette prop est liée au state ?"
  - oui, lecture d'une information => _mapStateToProps_
  - oui, modification d'une information => _mapDispatchToProps_
  - non => on ne gère pas cette prop dans le container

## mapStateToProps : les props qui lisent une valeur du state <a name="connexion-store-2"></a>

- indiquer le nom de la prop à remplir et la propriété du state qui correspond, par exemple :

  ```javascript
  const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
    messages: state.messages,
  });
  ```

  => le container injecte `state.messages` dans la prop `messages` du composant de présentation

## mapDispatchToProps : les props qui doivent envoyer une action au store ou à un middleware <a name="connexion-store-3"></a>

- si on n'a pas encore de fichier pour les actions : créer un fichier `src/actions/nameForTheActions.js`

- si l'action dont on a besoin (intention) n'existe pas encore : définir le _action type_ et le _action creator_ pour cette action :

 ```javascript
 // === action types
 export const DO_SOMETHING = 'DO_SOMETHING';

 // === action creators
 export const doSomething = (/* newValue */) => ({
   type: DO_SOMETHING,
   /* value: newValue, */
 });

```

- ajouter le traitement de cette action dans un reducer (= quel est l'impact de cette action sur le state), et/ou dans un middleware

```javascript
import { DO_SOMETHING } from 'src/actions/nameForTheActions';

[...]

switch (action.type) {
  case DO_SOMETHING:
    // on retourne un nouveau state
    return {
      // en déversant les informations du state actuel
      ...state,
      // et en appliquant des modifications
      propriété_à_modifier_1: 'valeur',
      propriété_à_modifier_2: action.newValue,
    };

  [...]
}

```

- dans `mapDispatchToProps` indiquer le nom de la prop à remplir et la callback correspondante qui utilise `dispatch` et le `action creator` pour envoyer l'action au store

```javascript
import { doSomething } from 'src/actions/nameForTheActions';

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  setValue: (/* param1 */) => {
    dispatch(doSomething(/* param 1 */));
  },
});
```

# Avoir plusieurs reducers (combineReducers) <a name="combine-reducers"></a>

Avoir plusieurs reducers permet de ranger les données dans des "tiroirs", de découper le state en plusieurs morceaux, par exemple un reducer pour les données des recettes de cuisine, un reducer pour les données de l'utilisateur.

- Créer un reducer principal qui va combiner les autres reducers => src/reducers/index.js

``` javascript
import { combineReducers } from 'redux';
// on importe tous les reducers
import nomReducer1 from './reducer1';
import nomReducer2 from './reducer2';
// etc
// le reducer principal, qui regroupe les autres
// combineReducers prend en argument un objet qui indique un nom pour
// chaque reducer
const rootReducer = combineReducers({
  nomDuTiroir1: nomReducer1,
  nomDuTiroir2: nomReducer2,
  // etc
});
export default rootReducer;
```

- l'utiliser dans le store : on importe le reducer qui combine les autres `import reducer from 'src/reducers';` et c'est celui-ci qu'on utilise dans _createStore_

- adapter les containers si besoin : par exemple si on utilisait `state.info`, il faut corriger pour utiliser `state.nomDuTiroir.info`

# Middleware <a name="middleware"></a>

## Mise en place d'un middleware <a name="installation-middleware"></a>

- créer un fichier `src/middlewares/nomDuMiddleware.js`

``` javascript
const leMiddleware = (store) => (next) => (action) => {
  console.log('on a intercepté une action dans le middleware: ', action);
  switch (action.type) {
    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default leMiddleware;
```



- utiliser le middleware dans le store (créer ou modifier le fichier _src/store/index.js_) :

``` javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import leMiddleware from 'src/middlewares/leMiddleware';

// on combine devTools avec les middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    leMiddleware,
    // ... d'autres middlewares
  ),
);

const store = createStore(
  // reducer
  leReducer,
  // enhancers
  enhancers,
);
export default store;


```

## Réagir à une action dans le middleware <a name="action-middleware"></a>



Je veux par exemple envoyer une requête vers une API quand l'action est LOG_IN.

```javascript
import { LOG_IN } from 'src/actions/chat';
[...]
switch (action.type) {
  case LOG_IN:
    console.log('on va faire l\'appel Axios');
    // je ne bloque pas l'action, je la passe au voisin
    next(action);
    break;
  [...]
}
```

## Prendre en compte le résultat d'une requête asynchrone dans le middleware <a name="reponse-middleware"></a>

Par exemple, j'ai envoyé une requête vers une API avec Axios, dans 'then' je voudrais fournir une information au store.

- créer une action
- traiter cette action dans le reducer (ajouter l'élément au state initial si ce n'était pas encore fait)
- envoyer cette action au store (dispatch)

```javascript
  .then((response) => {
    console.log('on a reçu la réponse : ', response);
    store.dispatch(nomActionCreator(response.xxxxxxx.yyyyyy));
  })
```
