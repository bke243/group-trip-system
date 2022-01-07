export interface TokenType {
  token: string;
  type: string;
}

class LocalStorage {
  static setAuthorizationToken(jwt: TokenType) {
    localStorage.setItem("jwt", jwt.token);
  }

  static getAuthorizationToken() {
    return localStorage.getItem("jwt");
  }

  static removeAuthorizationToken() {
    return localStorage.removeItem("jwt");
  }
}

export default LocalStorage;
