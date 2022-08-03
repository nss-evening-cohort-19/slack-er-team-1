import React from 'react';

export default function PostCard() {
  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          <div className="userProfileHover">user profile photo
            <button type="button" className="photoBtn">photo</button>
          </div>
        </div>
        <div className="panel-heading">Messag Sender name and timestamp</div>
        <div className="panel-body">Message content here</div>
        <div className="panel-body">Reactions here</div>
        <div className="panel-body">Replies here</div>
      </div>
    </div>
  );
}
