export const generateNewUserId = (array) => {
  const lastElement = array[array.length - 1];
  const lastId = lastElement ? lastElement.id : 0;
  return lastId + 1;
};

export const generateNewPostId = (array) => {
  const lastElement = array[array.length - 1];
  const lastId = lastElement ? lastElement.post_id : 0;
  return lastId + 1;
};
