import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import AuthPageHeader from './AuthPageHeader'



export default function AuthPage({ setUser }) {
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

                <div className='center-container row' >
                    <div className="col">

                    </div>

                    <div className="col">
                        {/* <SignUpForm setUser={setUser} /> */}

                        {/* <LoginForm setUser={setUser} /> */}
                    </div>
                </div>
            </div>

        </main>

    );
}