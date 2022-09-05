import { useState } from 'react';
import axios from 'axios';

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
      userId: '전소연',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
    {
      freindsid: '2',
      email: 'dsfjsd@naver.com',
      userId: '배지',
      user_code: '012621',
      socialid: 'qweqwjk123',
    },
    {
      freindsid: '2',
      email: 'dsfjsd@naver.com',
      userId: '킹갓소연',
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
            if (searchTerm == '') {
              return val;
            } else if (
              val.userId.toLowerCase().includes(searchTerm.toLowerCase())
              // ||
              // val.user_code.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <div className='beaches' key={key}>
                <p>{val.userId}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
