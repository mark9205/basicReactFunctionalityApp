import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import "../styles/App.css";
import Postlist from "../components/PostList";
import PostForm from "../components/PostForm";
import Postfilter from "../components/PostFilter";
import Mymodal from "../components/UI/MyModal/MyModal";
import Mybutton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PosrService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPagesCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedposts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPagesCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [limit, page]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <Mybutton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пост
            </Mybutton>
            <Mymodal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </Mymodal>
            <hr style={{ margin: "15px 0" }} />
            <Postfilter filter={filter} setFilter={setFilter} />

            <MySelect
                value={limit}
                defaultValue="Количество элементов на странице"
                onChange={(value) => setLimit(value)}
                options={[
                    {value:5, name: '5'},
                    {value:10, name: '10'},
                    {value:25, name: '25'},
                    {value:-1, name: 'Показать все'},
                ]}
            />
            {postError && <h1>Произошла ошибка</h1>}

            <Postlist
                remove={removePost}
                posts={sortedAndSearchedposts}
                title={"Список постов с jsonplaceholder"}
            />

            <div
                ref={lastElement}
                style={{ height: 20, background: "red" }}
            ></div>

            {isPostsLoading && (
                <div style={{ justifyContent: "center", display: "flex" }}>
                    <Loader />
                </div>
            )}

            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;