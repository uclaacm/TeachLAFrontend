/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/
import App from '../app.js';
import {connect} from 'react-redux'
import {loadUserData, clearUserData} from '../../actions/userDataActions.js'
import {loadPrograms} from '../../actions/programsActions'
import * as fetch from '../../lib/fetch.js'


const mapStateToProps = state => {
  return {
    uid: state.userData.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserData: async (uid, onFailure) => {
      const {ok, data, error} = await fetch.getUserData(uid, true)
      //if the request went fine, and there's a non empty userData
      if(ok && data && data.userData && Object.keys(data.userData).length){
        dispatch(loadUserData(uid, data.userData))
        if(data.programs){
          dispatch(loadPrograms(data.programs))
        }
      } else {
        onFailure(error)
      }
    },
    clearUserData: () => {
      dispatch(clearUserData())
    },
  }
}


const Root = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Root;
