/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import './TweetBody.css';

const TweetBox = (props) => (
  <div className="tweet-body">
    {props.children}
  </div>
);

const Image = (props) => (
  <img src={props.image} alt="Logo" className="picture" />
);

const Handle = (props) => (
  <div className="handle">
    @
    {props.handle}
  </div>
);

const Name = (props) => (
  <div className="name">
    {props.name}
  </div>
);

const Tweet = (props) => (
  <div className="tweet">
    {props.tweet}
  </div>
);

const TweetBody = (props) => (
  <TweetBox>
    <div className="inner-body">
      <Image image={props.user.profile_image_url} />
      <div className="body">
        <div className="inner-body">
          <div>
            <Name name={props.user.name} />
            <Handle handle={props.user.screen_name} />
          </div>
        </div>
        <Tweet tweet={props.text} />
      </div>
    </div>
  </TweetBox>
);

export default TweetBody;
