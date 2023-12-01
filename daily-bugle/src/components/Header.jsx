
import {useAuth} from '../auth/AuthContext'
import { useParams, useNavigate } from "react-router-dom";


export default function Header(props){
    const { logout} = useAuth();
    const navigate = useNavigate();

    async function handleLogOut(e){
        e.preventDefault();
        try{
            await logout();
            navigate("/");
        } catch (e) {
            alert('Failed to logout. Try again!')
        }
    }
    return (
        <>
            <header className="bg-slate-950/20 shadow-xl shadow-indigo-500/10 p-5 rounded-lg items-center">
                <div className="w-full h-auto mx-auto">
                <div className="flex items-center justify-between">
                    <a href="#" className="font-bold text-xl">
                    The Daily Bugle
                    </a>
                    <div className="flex items-center">
                        {props.user === null ? 
                            <>
                            <a href="/login" className="px-3 py-2 hover:bg-gray-700">
                                    Login
                            </a>
                            <a href="/signup" className="px-3 py-2 hover:bg-gray-700">
                                        Sign Up
                            </a>
                            </>
                        :
                        <a onClick={handleLogOut} className="px-3 py-2 hover:bg-gray-700">
                            Logout
                        </a>
                        }
                    </div>
                </div>
                </div>
          </header>
        </>
    )
}