import React, { useState } from 'react'
import './css/Tag.css'
import { useEffect } from 'react';

const Tag = ({setTagData}) => {

  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    if (e.key === 'Enter' && tagValue && tags.length < 10) {
      setTags([...tags, tagValue]);
      setTagValue('');
      
    } else if (e.key === 'Backspace' && tagValue === '') {
      if (tags.length > 0) {
        const updatedTags = [...tags];
        updatedTags.pop();
        setTags(updatedTags);
      }
    }
    
  };

  useEffect(()=>{
    setTagData(tags)
  },[tags])


  const deleteTag = () => {
    if (tags.length > 0) {
      const updatedTags = [...tags];
      updatedTags.pop(); // 마지막 태그 삭제
      setTags(updatedTags);
    }
  };

  const keywordEmojiMapping = {
    '차': '🚗',
    '버스': '🚌',
    '뚜벅': '👟',
    '휴양': '🏖️',
    '외부': '🏃',
    '관광': '🏛️',
    '쇼핑': '🛍️',
    '사진': '📸',
    '맛집': '🍚',
    '카페': '☕',
    '커피': '☕',
  };

  const inputImoji = (e) => {
    const keyword = e.target.value;
    const emoji = keywordEmojiMapping[keyword];

    // 키워드에 해당하는 이모지가 있을 경우, 이모지와 키워드를 조합하여 태그값 업데이트
    setTagValue(emoji ? emoji + keyword : keyword);
  };


  return (
    <div className='tag-container'>
        <div className='tagInput'>
          {tags.map((item, index) => {
            return (
              <div
                className='tag-box'
                onClick={() => deleteTag(item)}
                key={index}>
                {item}
              </div>
            );
          })}
          <input
            className='typing-tag'
            type="text"
            placeholder={tags.length < 10 ? '여행 태그를 최대 10개까지 입력하세요.' : ''}
            value={tagValue}
            onChange={inputImoji}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Backspace") {
                addTag(e);
              }
            }} />
        </div>
    </div>
  )
}

export default Tag