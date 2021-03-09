import { connect } from 'react-redux';

import Header from 'src/components/Header';

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
)(Header);
