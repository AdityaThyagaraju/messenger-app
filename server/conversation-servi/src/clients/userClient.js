import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(config => {
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

class UserServiceClient {
  static extractUser(token) {
    return apiClient.get('/user/extract-user',{
      headers:{
        Authorization:String(token)
      }
    });
  }

  static login(credentials) {
    return apiClient.post('/user/login', credentials);
  }

  static updateUser(userId, userData) {
    return apiClient.put(`/users/${userId}`, userData);
  }

  static deleteUser(userId) {
    return apiClient.delete(`/users/${userId}`);
  }
}

export { UserServiceClient }
