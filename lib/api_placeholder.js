import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const HEADERS = {
    'Content-Type': 'application/json',
};

export function getPost() {
    let postId = 1;
    let res = http.get(`${BASE_URL}/posts/${postId}`); 
    check(res, {
        'GET /posts/1: status 200': (r) => r.status === 200,
        'GET /posts/1: ID es 1': (r) => r.json('id') === postId,
    });
}

export function createPost(title, body, userId) {
    let url = `${BASE_URL}/posts`;
    
    let payload = JSON.stringify({
        title: title,
        body: body,
        userId: userId
    });

    let res = http.post(url, payload, { headers: HEADERS });

    check(res, {
        'POST /posts: status 201 (Created)': (r) => r.status === 201,
        'POST /posts: response title matches': (r) => r.json('title') === title,
    });
}