import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import './VocView.css';

function GetCategory() {
    const [category, setCategory] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/toyseven/voc/category').then((response) => {
            setCategory(response.data);
        })
    }, []);

    const categories = (Object.values(category)).map((item) => (
        <option key={item.id} value={item.id}>
            {item.displayName}
        </option>
    ));

    return categories;
}

const HandleQuestionSubmit = async ({ body }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer cognito 의 access token"
    }

    const response = await axios.post('http://127.0.0.1:8000/toyseven/voc/question', body, { headers: headers }).then((response) => {
        console.log('status : ' + response.status);
    }).catch((error) => {
        console.log('error : ' + error);
    });
}

function VocQuestion() {
    const categories = GetCategory();

    const [categoryId, setCategoryId] = useState(1);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stationId, setStationId] = useState('ST-4');

    const body = {
        categoryId: categoryId,
        title: title,
        content: content,
        stationId: stationId
    }

    return (<>
        <h2 align="center">게시글 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <label>카테고리</label>
                <select onChange={(event) => setCategoryId(parseInt(event.target.value))}>
                    {categories}
                </select>
            </div>
            
            <div className="voc-view-row">
                <label>제목</label>
                <input onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div className="voc-view-row">
                <label>내용</label>
                <textarea onChange={(event) => setContent(event.target.value)}></textarea>
            </div>
            <Link to='/voc/'>
                <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({ body })}>글쓰기</button>
                </Link>

        </div>
    </>);
}

export default VocQuestion;