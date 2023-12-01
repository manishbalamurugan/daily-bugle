import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import Header from '../components/Header';

function CommentInput(props) {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(
            `http://localhost:5050/api/article/comment`,
            { method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName: props.user, comment:  commentText, articleId: props.id}),}
        )
        .then((response) => response.json())
        setCommentText('');
    };

    return (
        <div className="bg-slate-900 rounded-md p-5 m-5 w-full h-auto">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 mb-2 text-gray-400 bg-slate-800 rounded-md"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}


export default function Articles(){
    let { articleid } = useParams();
    const [title, setTitle] = useState('');
    const [teaser, setTeaser] = useState('');
    const [body, setBody] = useState('');
    const [img, setImg] = useState('');
    const {currentUser} = useAuth();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let uri = `http://localhost:5050/api/article/${articleid}`
        fetch(uri, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then((response) =>  response.json())
        .then((data) => {
            setTitle(data.title);
            setTeaser(data.teaser);
            setBody(data.body);
            setImg(data.img_src);
            setComments(data.comments);
        })
    })

    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-12 px-6 w-screen h-full">
          <Header/>
          <main className="py-2">
            <div id="article">
                <div className='grid grid-cols-1 m-5 p-5 items-center'>
                    <div className="flex">
                        <p onClick={() => navigate('/')} className="text-xs hover:font-bold">← Go Back</p>
                        <h1 className="mx-auto font-bold text-3xl ">{title}</h1>
                    </div>
                    <div class="grid grid-cols-1 m-5 p-5 items-center bg-slate-800 rounded-md h-auto">
                        <div className="grid grid-cols-[70%_30%] gap-x-5 items-start">
                            <img className="mx-auto rounded-lg my-10" src={img}/>
                            <p className="m-5 my-10 font-normal text-xs text-gray-400">{teaser}</p>
                        </div>
                        <text className='font-medium leading-relaxed text-gray-400 p-2 mx-auto'>
                            {body}
                        </text>
                    </div>
                </div>
            </div>
            <div id="comments" className="grid grid-cols-1 flex m-5 p-5 items-start">
                <h1 className="text-xl">Comments</h1>
                <div id="commentsView" className="grid grid-cols-1 my-2 text-white">
                {
                    comments ? 
                    comments.map((comment) => {
                        return(
                        <>
                            <div className="bg-slate-900 rounded-md p-5 m-5 w-full h-auto">
                                <div className="flex items-center mb-2">
                                    <h2 className="text-lg font-bold">{comment.userName}</h2>
                                </div>
                                <p className="text-gray-400">{comment.comment}</p>
                            </div>
                        </>
                        );
                    })
                    :
                    <div></div>
                }
                <CommentInput user={currentUser.email} id={articleid} />
                </div>
            </div>
          </main>

        </div>
      );
}