import { useState } from 'react';
import styled from 'styled-components';
import FriendsItem from './FriendsItem';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

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
    <Container>
      <InputBox>
        <SearchInput
          type='text'
          placeholder='검색'
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <CancelButton
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </CancelButton>
      </InputBox>
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
    </Container>
  );
};

export default Search;

const Container = styled.div``;

const InputBox = styled.div`
  height: 56px;
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: ${colors.inputColor};
  border-radius: 10px;
  border: none;
`;

const CancelButton = styled.button`
  flex-grow: 1;
  width: 40px;
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  margin-left: 16px;
  cursor: pointer;
`;
