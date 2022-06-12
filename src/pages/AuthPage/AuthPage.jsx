import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import AuthPageHeader from './AuthPageHeader'
import { useState } from 'react'



export default function AuthPage({ setUser }) {
    const [formDisplay, setFormDisplay] = useState('')

    function handleButtonClick(evt) {
        setFormDisplay(evt.target.value)
    }

    return (



        <main className='d-flex flex-column'
            style={{
                backgroundImage: 'url(/veggies_2.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                overflowX: 'hidden',
            }}>

            <AuthPageHeader />
            <div className="main-container" >

                <div className='row' >
                    <div className="col">

                    </div>

                    <div className="col">

                        <div className="container-right">
                            <div className={`auth-2 ${formDisplay==='' ? '' : 'd-none'}`}>
                                <h1> <strong>You are what you eat.</strong></h1>
                                <h1> <strong>So why not keep track?</strong></h1>
                                <button className='w-100 d-inline' value='Sign Up' onClick={handleButtonClick}>Sign Up</button>
                                <hr />
                                <h5>Already have an account?</h5>
                                <button className='w-100 d-inline' value='Login' onClick={handleButtonClick}>Login</button>
                            </div>

                            <div className={`auth-2 ${formDisplay==='Sign Up' ? '' : 'd-none'}`}>
                                <SignUpForm setUser={setUser} formDisplay={formDisplay} setFormDisplay={setFormDisplay}/>
                                
                                
                            </div>

                            <div className={`auth-3 ${formDisplay==='Login' ? '' : 'd-none'}`}>
                                <LoginForm setUser={setUser} />
                            </div>
                            

                        </div>
                        


                    </div>
                </div>
            </div>

        </main>

    );
}