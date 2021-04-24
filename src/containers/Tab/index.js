import { connect } from 'react-redux';

import Tab from 'src/components/Tab';

import { changeSubPage } from 'src/actions/tab';

const mapStateToProps = (state) => ({
  stateTabs: state.tab,
});

const mapDispatchToProps = (dispatch) => ({
  newSubPage: (name, subPage) => {
    dispatch(changeSubPage(name, subPage));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tab);
