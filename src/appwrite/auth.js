import { Client, ID, Account } from "appwrite";
import Config from '../conf/config'

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(Config.appwriteul)
    this.client.setProject(Config.projectId)
    this.account = new Account(this.client)
  }

  async createAccount({ name, email, password }) {
    try {
      const userData = await this.account.create(ID.unique(), email, password, name)
      return userData
    } catch (error) {
      console.log(error.message)
    }
  }

  async getCurrentUser() {
    try {
      return this.account.get()
    } catch (error) {
      console.log(error.message)
    }
  }

  async userLogin({ email, password }) {
    try {
      const userData = await this.account.createEmailPasswordSession(email, password)
      return userData
    } catch (error) {
      console.log(error.message)
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions()
      return "User Logout Sucess"
    } catch (error) {
      console.log(error.message)
    }
  }
}

const authService = new AuthService()
export default authService