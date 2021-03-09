import { connect } from 'react-redux';

import Connection from 'src/components/Connection';

import { changePage } from 'src/actions/router';


const mapStateToProps = (state) => ({
  page: state.router.page,
});

const mapDispatchToProps = (dispatch) => ({
  goToPage: (page) => {
    dispatch(changePage(page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Connection);
