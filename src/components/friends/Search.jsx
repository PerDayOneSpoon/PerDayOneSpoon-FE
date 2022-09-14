import { useState } from 'react';
import styled from 'styled-components';
import FriendsItem from './FriendsItem';
import { colors } from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi.js';
import { useQuery } from 'react-query';

const Search = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const { data: searchFriends } = useQuery(
    searchTerm,
    () => userApi.getSearchFriends(searchTerm),
    {
      enabled: !!searchTerm,
      onSuccess: (data) => {
        console.log('searchFriends!!!!!!!!!', data);
      },
    }
  );

  return (
    <Container>
      <InputBox>
        <SearchInput
          type='text'
          placeholder='검색'
          onChange={(e) => {
            setSearchTerm(e.target.value.trim());
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
      {searchFriends &&
        searchFriends.data.map((val, key) => {
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
