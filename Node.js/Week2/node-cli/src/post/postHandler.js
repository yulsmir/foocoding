'use strict';

import { readJsonFile, writeJsonFile } from '../utils/fileHandler.js';
import { generateNewPostId } from '../utils/newIdHandler.js';

export const getPosts = async () => {
  const postsData = await readJsonFile('./data/posts.json');
  return JSON.parse(postsData);
};

export const getPostById = async (id) => {
  const postsData = await readJsonFile('./data/posts.json');
  const posts = JSON.parse(postsData);
  return posts.find((post) => post.post_id === parseInt(id));
};

export const addPost = async (post) => {
  const posts = await getPosts();
  const newId = generateNewPostId(Array.from(posts));
  post.post_id = newId;
  posts.push(post);
  await writeJsonFile('./data/posts.json', posts);
};

export const updatePost = async (updatedPost) => {
  const posts = await getPosts();
  const index = posts.findIndex((post) => post.post_id === updatedPost.post_id);
  posts[index] = updatedPost;
  await writeJsonFile('./data/posts.json', posts);
};

export const deletePost = async (id) => {
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.post_id !== parseInt(id));
  await writeJsonFile('./data/posts.json', filteredPosts);
};
