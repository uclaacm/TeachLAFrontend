import CreateUser from '../components/CreateUser'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,  //all props passed to the container, put into the props
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const CreateUserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)

export default CreateUserPage
