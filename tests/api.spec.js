const { test, expect } = require('@playwright/test');
const data = require('../test-data/data.json');

test.describe('API Testing Tasks', () => {

  test('TEST 1: GET Request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('userId');
  });

  test('TEST 2: POST Request', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/products/add', {
      headers: { 'Content-Type': 'application/json' },
      data: { title: "Test Product", price: 99 }
    });
    expect(response.status()).toBe(201); // 
    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('TEST 3: PUT Request', async ({ request }) => {
    const response = await request.put('https://dummyjson.com/products/1', {
      headers: { 'Content-Type': 'application/json' },
      data: { title: "Updated Product", price: 150 }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe("Updated Product");
  });

  test('TEST 4: DELETE Request', async ({ request }) => {
    const response = await request.delete('https://dummyjson.com/products/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.isDeleted).toBe(true);
  });

  test('TEST 5: Query Params', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts?userId=1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body[0].userId).toBe(1);
  });

  test('TEST 6: Response Validation', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/products/1');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(typeof body.price).toBe('number');
  });

  test('TEST 7: Negative API Test', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/invalid');
    expect(response.status()).toBe(404);
  });

  test('TEST 8: API Chaining', async ({ request }) => {
    const users = await request.get('https://jsonplaceholder.typicode.com/users');
    const firstUserId = (await users.json())[0].id;
    const posts = await request.get(`https://jsonplaceholder.typicode.com/posts?userId=${firstUserId}`);
    const body = await posts.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('TEST 9: Data-Driven API Test', async ({ request }) => {
    for (const id of data.apiIds) {
      const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.id).toBe(id);
    }
  });

  test('TEST 10: Performance Check', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const end = Date.now();
    expect(response.status()).toBe(200);
    expect(end - start).toBeLessThan(2000); 
  });
});
