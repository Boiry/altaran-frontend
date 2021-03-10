import store from 'src/store';
import { changePage } from 'src/actions/router';

export const getPage = () => (store.getState().router.page);

export const setPage = (page) => {store.dispatch(changePage(page))};
