import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Comment, Header, Segment } from 'semantic-ui-react';
import CommentForm from './CommentForm';

/**
 * Component for rendering the Comment Section
 *
 * @param auth
 * @param job
 * @param addComment
 * @returns {*}
 * @constructor
 */
const JobCommentSection = ({
  auth, comments, addComment, deleteComment,
}) => {
  const sortedComments = comments.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

  return (
    <React.Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="blue"
        style={{ border: 'none' }}
      >
        <Header>Watercooler</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {sortedComments.map((c, i) => (
            <Comment key={i}>
              <Comment.Avatar src={c.user.avatarUrl} />
              <Comment.Content>
                <Comment.Author
                  as={Link}
                  to={`/profile/${c.user._id}`}
                >
                  {c.user.name}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(c.createdDate).toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text>{c.text}</Comment.Text>
                <Comment.Action>
                  {auth.isAuthenticated && auth.user._id === c.user._id && (
                    <Button size="mini" onClick={() => deleteComment(c._id)} content="delete" />
                  )}
                </Comment.Action>
              </Comment.Content>
            </Comment>
          ))}

        </Comment.Group>
        {auth.isAuthenticated && (
          <CommentForm addComment={addComment} />
        )}

      </Segment>
    </React.Fragment>
  );
};

export default JobCommentSection;
