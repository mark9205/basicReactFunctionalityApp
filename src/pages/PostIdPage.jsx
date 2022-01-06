import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PosrService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const Postidpage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching( async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching( async () => {
        const response = await PostService.getComments(params.id)
        setComments(response.data)
    })

    useEffect( () => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста c id = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h2>
                Комментарии
            </h2>
            {isComLoading
                ?   <Loader/>
                :   <div>
                        {comments.map(comm => 
                            <div key={comm.id} style={{marginTop: 15}}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>)}
                    </div>
        }
        </div>
    );
}

export default Postidpage;
