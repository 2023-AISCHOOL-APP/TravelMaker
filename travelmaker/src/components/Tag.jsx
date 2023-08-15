import React, { useState } from 'react'
import './css/Tag.css'

const Tag = () => {

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

  const deleteTag = () => {
    if (tags.length > 0) {
      const updatedTags = [...tags];
      updatedTags.pop(); // 마지막 태그 삭제
      setTags(updatedTags);
    }
  };

  const keywordEmojiMapping = {
    '자동차': '🚗',
    '버스': '🚌',
    '산책': '👟',
    '휴양': '🏖️',
    '외부': '🏃',
    '관광': '🏛️',
    '쇼핑': '🛍️',
    '사진': '📸',
    '맛집': '🍚',
    '카페': '☕',
    '커피': '☕'
  };

  const inputImoji = (e) => {
    const keyword = e.target.value;
    const emoji = keywordEmojiMapping[keyword];

    if (emoji) {
      setTagValue(emoji + keyword);
    } else {
      setTagValue(keyword);
    }
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