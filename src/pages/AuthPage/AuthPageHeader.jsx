import { Link } from 'react-router-dom'
import { useState } from 'react'
import './AuthPage.css'


export default function NavBar() {


    return (
        <div className="row">

            <div className="col-2"></div>

            <div className="col d-flex justify-content-end">
                <nav className="authHeader-right">



                    
                        <span className="leftLogo display-2">SuperFood</span>


                  

                </nav>
            </div>
        </div>
    )
}