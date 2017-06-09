import React from 'react'
import { connect } from 'react-redux'
import SignUp from '../components/SignUp'
console.log(SignUp)

const mapState = () => ({ message: 'Sign up' });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SignUp);

