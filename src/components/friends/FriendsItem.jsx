const FriendsItem = ({ val }) => {
  const followhandler = () => {
    console.log(val.socialid);
  };

  return (
    <>
      <div>
        <p>{val.userId}</p>
        <button onClick={followhandler}>test</button>
      </div>
    </>
  );
};

export default FriendsItem;
