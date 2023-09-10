import test1 from "../img/test1.jpg";
import test2 from "../img/test2.jpg";
import test3 from "../img/test3.jpg";

const posts = [
  {
    id: "1",
    userID: "user2",
    title: "testPic1",
    image: test1,
    likes: 5,
    comments: [
      {
        commentID: "comment1",
        userID: "user1",
        userAvatar: test3,
        timestamp: "July 6, 2023 | 05:40pm",
        text: "This is a test comment No. 1 This is a test comment No. 1 This is a test comment No. 1 This is a test comment No. 1",
      },
      {
        commentID: "comment2",
        userID: "user2",
        timestamp: "July 6, 2023 | 05:40pm",
        text: "This is also a test comment ",
      },
      {
        commentID: "comment3",
        userID: "user3",
        timestamp: "July 6, 2023 | 05:40pm",
        text: "lorem ipsum dolor sit am lorem ipsum dolor lorem ipsum dolor",
      },
      {
        commentID: "comment4",
        userID: "user2",
        timestamp: "July 6, 2023 | 05:40pm",
        text: "more comment more comments",
      },
    ],
    location: "Earth",
  },
  {
    id: "2",
    title: "testPic2",
    image: test2,
    likes: 13,
    comments: [],
    location: "Moon",
  },
  {
    id: "3",
    title: "testPic3",
    image: test3,
    likes: 72,
    comments: [],
    location: "Mars",
  },
];

export default posts;
