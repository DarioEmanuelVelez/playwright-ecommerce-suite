import { test, expect } from '@playwright/test';

test.describe('API - Gestión de Usuarios', () => {

  // Test 1: Consultar lista (GET)
  test('Debería obtener la lista de usuarios con status 200', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
  });

  // Test 2: Crear usuario nuevo (POST)
  test('Deberia crear un usuario nuevo con status 201', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: { 
        name: 'Dario Velez', 
        job: 'QA' 
      }
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody.name).toBe('Dario Velez');
  });

  // Test 3: Registro fallido sin password (POST negativo)
  test('Deberia darme error al mandar un usuario sin contraseña', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/register', {
      data: { 
        email: 'peter@klaven'
      }
    });

    expect(response.status()).toBe(400);
    expect(response.ok()).toBeFalsy();

    const responseBody = await response.json();
    expect(responseBody.error).toBe('Missing password');
  });

});