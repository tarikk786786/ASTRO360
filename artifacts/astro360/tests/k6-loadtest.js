import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },  // Ramp up to 20 users
    { duration: '30s', target: 50 },  // Stay at 50 users
    { duration: '10s', target: 0 },   // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete within 500ms
  },
};

export default function () {
  const res = http.get('http://localhost:5000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page title contains ASTRO360': (r) => r.body.includes('ASTRO360') || r.body.includes('Cosmic'),
  });
  sleep(1);
}
