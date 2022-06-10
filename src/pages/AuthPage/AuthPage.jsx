import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import AuthPageHeader from './AuthPageHeader'

export default function AuthPage({ setUser }) {
    return (
        <main className='d-flex flex-column'>

            <AuthPageHeader />

            <div className='center-container row'>
                <div className="col">
                    <SignUpForm setUser={setUser}  />

                </div>

                <div className="col">

                    <LoginForm setUser={setUser}  />
                </div>
            </div>

        </main>
    );
}