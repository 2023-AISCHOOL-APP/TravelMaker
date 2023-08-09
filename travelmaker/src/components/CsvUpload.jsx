import React, { useEffect, useState } from 'react'
import ReactFileReader from "react-file-reader";
import Papa from 'papaparse';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

function CsvUpload() {

    const [locationdata, setLocationdata] = useState({});
    const [localName, setLocalName] = useState("");


    const uploadFile = (files) => {
      setLocalName((files[0].name).split('.')[0]);
      // Using papaparse to parse the CSV file
      Papa.parse(files[0], {
        complete: function (results) {
          // results contain data; users can use the data for some operations.
          console.log("Finished:", results.data);
          setLocationdata(results.data)
        }
      });
    };


    
    console.log('전송 완료!');
    // 지역데이터 정보 데이터베이스로 보내기
  const sendData = async () => {
    // try {
      for (let i = 1; i < 51; i++) {
        await setDoc(doc(db, localName, locationdata[i][1]),
          {
            num: locationdata[i][0],
            title: locationdata[i][1],
            addr1: locationdata[i][2],
            mapx: locationdata[i][3],
            mapy: locationdata[i][4],
            image: locationdata[i][5],
            overview: locationdata[i][6]
          })
      }
      window.location.replace('/csvupload')
    // } catch (error) {
    //   window.location.replace('/csvupload')
    // }

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
    </div>
  )
}

export default CsvUpload