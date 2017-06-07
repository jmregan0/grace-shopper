import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile'
import { getUserById } from '../action-creators/users'


const mapStateToProps = (state) => {
  return {
    selected: state.users.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer
