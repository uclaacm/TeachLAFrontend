import CreateUser from '../CreateUser.js'
import {connect} from 'react-redux'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,  //all props passed to the container, put into the props
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const CreateUserPage = compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withFirestore)(CreateUser)

export default CreateUserPage
