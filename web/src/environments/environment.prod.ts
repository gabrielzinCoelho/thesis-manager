export const environment = {
  production: true,
  apiUrl: (window as any).__ENV_API_URL__ || 'http://localhost:8000/api'
};
