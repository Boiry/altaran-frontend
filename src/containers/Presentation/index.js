import { connect } from 'react-redux';

import Presentation from 'src/components/Presentation';

import { goToCivilizationsGuideDone, updateUserField } from 'src/actions/user';

const mapStateToProps = (state) => ({
  goToCivilizationsGuide: state.user.goToCivilizationsGuide,
});

const mapDispatchToProps = (dispatch) => ({
  goToCivilizationsGuideDone: () => {
    dispatch(goToCivilizationsGuideDone());
  },
  selectCivilization: (name) => {
    dispatch(updateUserField(name, 'civilization'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentation);
