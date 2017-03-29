import React from 'react';
import {List, ListItem} from 'material-ui/List';

const Posts = ({ posts }) => {
  return (
    <List
      children={posts.map((post, i) => <a href={post.url}><ListItem key={i} primaryText={post.title} /></a>)}
    />
  );
};

export default Posts;