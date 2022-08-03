import React from 'react';

export default function Sidebar() {
  return (
    <div className="offcanvas offcanvas-start show sidebarStyle" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="staticBackdropLabel">Channel Name</h5>
      </div>
      <hr />
      <div className="offcanvas-body">
        <div>Threads</div>
        <div>Direct messages</div>
        <div>Mentions and reactions</div>
        <div>More</div>
        <hr />
        <div className="collapsible">Channels</div>
        <div className="content">
          <div>Channel 1</div>
          <div>Channel 2</div>
          <div>Channel 3</div>
          <div>Add channels</div>
        </div>
        <br />
        <div>Direct messages</div>
        <div>Slack-er Bot</div>
        <div>Message 1</div>
        <div>Message 2</div>
        <div>Message 3</div>
        <div>Add teammates</div>
      </div>
    </div>
  );
}
