import { asyncConnect } from 'redux-connect';

// import { getHomeData } from 'actions/homeActions';

// Adding the contianer logic here
function mapStateToProps({ home, global: { loggedIn } }) {
  return { ...home, loggedIn };
}

function mapDispatchToProps() {
  return { };
}

export default Component => asyncConnect([
  {
    promise: ({ helpers: { apiClient } }) => apiClient.getUser(),
  },
], mapStateToProps, mapDispatchToProps)(Component);