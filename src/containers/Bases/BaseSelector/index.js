import { connect } from 'react-redux';

import BaseSelector from 'src/components/Bases/BaseSelector';

const mapStateToProps = (state) => ({
  bases: state.bases.baseSelector,
});

export default connect(
  mapStateToProps,
)(BaseSelector);
