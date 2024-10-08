const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>{`${anecdote.content} by ${anecdote.author}`}</h1>
      <p>{anecdote.votes}</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
