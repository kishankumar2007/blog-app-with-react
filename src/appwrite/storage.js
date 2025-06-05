import { Storage, Client, ID } from "appwrite";
import config from "../conf/config";

export class storage {
  clinet = new Client();
  storage;

  constructor() {
    this.clinet.setEndpoint(config.appwriteul);
    this.clinet.setProject(config.projectId);
    this.storage = new Storage(this.clinet);
  }

  async createFile(id,image) {
    try {
    const dbFile = await this.storage.createFile(config.storageId,id,image);
    return dbFile
    } catch (error) {
      throw error
    }
  }

  async getFile(fileid){
      try {
        return await this.storage.getFile(config.storageId,fileid)
      } catch (error) {
        throw error
      }
  }

  async filePreview(fileId){
    try {
      return this.storage.getFileView(config.storageId, fileId)
    } catch (error) {
      throw error
    }
  }

  async updateFile(fileId){
     try {
      const dbUpdatedPost = await this.storage.updateFile(config.storageId,fileId)
      return dbUpdatedPost
     } catch (error) {
      console.log(error.message)
     }
  }

  async deleteFile(fileId){
    try {
      await this.storage.deleteFile(config.storageId,fileId)
      return true
    } catch (error) {
      throw error
    }
  }
}

const storageService = new storage()
export default storageService;

