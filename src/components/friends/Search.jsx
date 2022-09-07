import { useState } from 'react';
import FriendsItem from './FriendsItem';

const Search = () => {
  const data = [
    {
      freindsid: '1',
      email: 'dsfjsd@naver.com',
      userId: '배지공주',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
    {
      freindsid: '2',
      email: 'dsfjsd@naver.com',
      userId: '소연',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
    {
      freindsid: '2',
      email: 'dsfjsd@naver.com',
      userId: '단비',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
    {
      freindsid: '2',
      email: 'dsfjsd@naver.com',
      userId: '김단비',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
    {
      freindsid: '2',
      email: 'dsfjsd@naver.com',
      userId: '눈사람단비',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='App'>
      <input
        type='text'
        placeholder='Search...'
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className='container'>
        {data
          .filter((val) => {
            if (searchTerm === null || searchTerm === '') {
              return false;
            } else if (
              val.userId.toLowerCase().includes(searchTerm.toLowerCase())
              // ||
              // val.user_code.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return <FriendsItem val={val} key={key} />;
          })}
      </div>
    </div>
  );
};

export default Search;
