import { Component } from "react";
import { signUp } from "../../utilities/users-service"
import { setUser } from "../../pages/App/App"
import '../../pages/AuthPage/AuthPage.css'

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };


  handleButtonClick = (evt) => {

    this.props.setFormDisplay(evt.target.value)
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      // creates a copy of state object, then deletes properties we don't need
      const formData = { ...this.state }
      delete formData.error;
      delete formData.confirm;
      //  The promise returned by the signUp service method
      // will resolve to the user object included in the
      //  payload of the JSON Web Token (JWT)
      const user = await signUp(formData)
      this.props.setUser(user)
    } catch {
      this.setState({ error: 'Invalid Sign Up - Try Again' })
    }

  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    })
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className='d-flex flex-column'>
        <div className="form-container d-flex flex-column mb-5">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <span></span><h1 className='w-100 form-title'>Sign Up</h1>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
          <label className="error-message mt-5">&nbsp;{this.state.error}</label>
        </div>
        <div className="bottom-signup">
          <hr />
          <h5>Already have an account?</h5>
          <button className='w-100 d-inline' value='Login' onClick={this.handleButtonClick}>Login</button>
        </div>
      </div>
    );
  }
}