import React, { useEffect, useState } from 'react'
import ReactFileReader from "react-file-reader";
import Papa from 'papaparse';
import { db } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore'

function CsvUpload() {
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
  // 회원가입 정보 데이터베이스로 보내기
  const sendData = async () => {
    for(let i=1; i<locationdata.length-1; i++){
      await setDoc(doc(db, "강원도", `횡성군${i-1}`),
      { LocalData : locationdata[i] })
    }
    window.location.replace('/csvupload')
  }

  // useEffect(()=>{
  //   sendData();
  // },[locationdata])
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
    </div>
  )
}

export default CsvUpload