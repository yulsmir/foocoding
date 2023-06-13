export class Post {
  constructor(id, userId, text, postDate, likes, comments, hashtags, location, image) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.postDate = postDate;
    this.likes = likes;
    this.comments = comments;
    this.hashtags = hashtags;
    this.location = location;
    this.image = image;
  }
}
