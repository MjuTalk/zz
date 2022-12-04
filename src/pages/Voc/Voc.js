import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VocHeader from '../../components/voc/VocHeader';
import { Link } from 'react-router-dom';

import CommonTable from '../../components/Table/CommonTable';
import CommonTableColumn from '../../components/Table/CommonTableColumn';
import CommonTableRow from '../../components/Table/CommonTableRow';

function GetData() {
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/toyseven/voc').then((response) => {
            setData(response.data);
        })
    }, []);
    const item = (Object.values(data)).map((item) => (
      <CommonTableRow key={item.id}>
        <CommonTableColumn>{item.id}</CommonTableColumn>
        <CommonTableColumn>{item.title}</CommonTableColumn>
        <CommonTableColumn>{item.createAt}</CommonTableColumn>
        <CommonTableColumn>{item.username}</CommonTableColumn>
      </CommonTableRow>
    ));
  
    return item;
  }

function Voc() {
    const item = GetData();

    return (<>
        <VocHeader></VocHeader>
        <CommonTable headersName={['글번호', '제목', '등록일']}>
            {item}
        </CommonTable>
    </>);
}

export default Voc;