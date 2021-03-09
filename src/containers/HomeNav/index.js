import { connect } from 'react-redux';

import HomeNav from 'src/components/HomeNav';

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
)(HomeNav);
