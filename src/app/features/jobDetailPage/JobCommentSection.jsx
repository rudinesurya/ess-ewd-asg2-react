import React from 'react';
import { Link } from 'react-router-dom';
import { Comment, Header, Segment } from 'semantic-ui-react';
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
const JobCommentSection = ({ authenticated, comments, addComment }) => (
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
        {comments && comments.map((c, i) => (
          <Comment key={i}>
            <Comment.Avatar src="" />
            <Comment.Content>
              <Comment.Author as={Link} to={`/profile/${''}`}>John Doe</Comment.Author>
              <Comment.Metadata>
                {<div>{new Date().toLocaleString()}</div>}

              </Comment.Metadata>
              <Comment.Text>sjausdjasj asjduasjd</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

      </Comment.Group>
      {authenticated && (
        <CommentForm addComment={addComment} />
      )}

    </Segment>
  </React.Fragment>
);

export default JobCommentSection;
