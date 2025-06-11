import { Client, ID, Account } from "appwrite";
import Config from "../conf/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(Config.appwriteul);
    this.client.setProject(Config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userData = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = this.account.get();
      if (user) return user;
    } catch (error) {
      throw error.message;
    }
  }

  async userLogin({ email, password }) {
    try {
      const userData = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userData;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
      return "User Logout Sucess";
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
