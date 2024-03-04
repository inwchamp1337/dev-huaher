import React, { useState } from 'react';

interface Comment {
  id: string;
  text: string;
}

interface Props {
  comments: Comment[];
  isLoading: boolean;
  onAddComment: (commentText: string) => void;
}

const CommentSection: React.FC<Props> = ({ comments, isLoading, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        ) : (
          <p>No comments</p>
        )
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleChange}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;
