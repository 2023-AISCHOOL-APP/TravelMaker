import React, { useEffect, useState } from 'react'
import ReactFileReader from "react-file-reader";
import Papa from 'papaparse';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

function CsvUpload() {
// const [obList, setObList] = useState([{}]);
let obList = [];
const newList = [{test: 1},
  {test: 2},
  {test: 3},
  {test: 4},
  {test: 5},
  {test: 6},
  {test: 7},
  {test: 8},
  {test: 9},
  {test: 10},]
//  const addObject = (n)=>{
//   setObList([...obList, n])
//   obList.concat(n)
//  }

const addTest = ()=>{
  for(let i=0; i<newList.length; i++){
    if(newList[i].test%2 === 0){
      // obList.concat(newList[i]);
      // addObject(newList[i])
      obList.push(newList[i])
      console.log('짝수');
    }
  }
  console.log(obList);
}

 useEffect(()=>{
  // addObject(newList)
  addTest();
},[])

  // const plist = [{apple: 10, banana: 20 }];
  // console.log(plist.push({test: 10}));
  // const add = (key, value)=>{
  //   plist[key] = value;
  //   return plist
  // }
  // console.log(add('tomato', 100));

  // 데이터 베이스에서 모든 데이터 불러오기
  const [local, setLocal] = useState({})
  const getData = async () => {
    const usersCollectionRef = collection(db, '강원도');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setLocal(data);
    const dataKeys = Object.keys(data[0])
    console.log(dataKeys);
  }
  useEffect(()=>{
    getData();
  },[])
  
  // 검색어와 지역 데이터 비교
  const [userInput, setUserInput] = useState("")
  const searchData = () => {
    for (let i = 0; i < local.length; i++) {
      const localTitle = [];
      localTitle.push(local[i].title);
      const filterLocal = (query) => {
        return localTitle.filter((el) =>
        el.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1)
      }
      if(filterLocal(userInput).length!=0){
        console.log(localTitle);
      }
      }
    }

    const [locationdata, setLocationdata] = useState({});
    const uploadFile = (files) => {
      // Using papaparse to parse the CSV file
      Papa.parse(files[0], {
        complete: function (results) {
          // results contain data; users can use the data for some operations.
          console.log("Finished:", results.data);
          setLocationdata(results.data)
        }
      });
    };
    console.log(locationdata[1]);
    // 지역데이터 정보 데이터베이스로 보내기
    const sendData = async () => {
      for (let i = 1; i < locationdata.length - 1; i++) {
          await setDoc(doc(db, "강원도", locationdata[i][1]),
            {
              num: locationdata[i][0],
              title: locationdata[i][1],
              addr1: locationdata[i][2],
              mapx: locationdata[i][3],
              mapy: locationdata[i][4],
              image: locationdata[i][5],
              overview: locationdata[i][6],
              addr2: locationdata[i][7],
            })
        }
      window.location.replace('/csvupload')
    }
  return (
    <div align='center'>
      <br/><br/><br/><br/>
      <h3>지역데이터 업로드 노가다~</h3>
      {/* creating the file upload button to upload CSV file */}
      <ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
        <button className="btn">불러오기</button>
      </ReactFileReader>
      <br/>
        <div>
          <button onClick={sendData}>보내기</button>
        </div>
        <div>
          <input type='text' onChange={(e) => { setUserInput(e.target.value) }}></input>
          <button onClick={searchData}>검색</button>
        </div>
    </div>
  )
}

export default CsvUpload