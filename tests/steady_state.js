import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import * as api from '../lib/api_placeholder.js';

export let options = {
    stages: [
        { duration: '5s', target: 4 },
        { duration: '10s', target: 4 },
        { duration: '5s', target: 0 }, 
    ],
    thresholds: {
        'checks': ['rate>0.95'],
        'http_req_duration': ['p(95)<400'],
    },
};

const posts = new SharedArray('posts data', function () {
  return JSON.parse(open('../data/posts.json'));
});

export default function () {
    const post = posts[Math.floor(Math.random() * posts.length)];
    api.createPost(post.title, post.body, post.userId);
    sleep(1);
    api.getPost();
    sleep(1);
}