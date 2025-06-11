import { Client, Databases, ID, Query } from "appwrite";
import config from "../conf/config";

export class services {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(config.appwriteul);
    this.client.setProject(config.projectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, Image, userId, auther, slug, is_Active }) {
    try {
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        { title, content, Image, auther, userId, slug, is_Active }
      );
    } catch (error) {
      throw error.message;
    }
  }

  async getPost(id) {
    try {
      return await this.databases.getDocument(
        config.databaseId,
        config.collectionId,
        id
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async getAllPost(key,...query) {
    try {
      return this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [Query.equal(key, [...query])]
      );
    } catch (error) {
      throw error.message;
    }
  }

  async deletePost(postId) {
    try {
      this.databases.deleteDocument(
        config.databaseId,
        config.collectionId,
        postId
      );
      return true;
    } catch (error) {
      throw error.message;
    }
  }

  async updatePost(postId,data) {
    try {
      return this.databases.updateDocument(config.databaseId,config.collectionId,postId,{...data});
    } catch (error) {
      throw error.message;
    }
  }

  async LikePost(userId,postId){
    try {
      return await this.databases.createDocument(config.databaseId,config.likesCollectionId,ID.unique(),{userId,postId})
    } catch (error) {
       throw error.message
    }
  }
  async getPostLikes(postId){
    try {
      return await this.databases.listDocuments(
        config.databaseId,
        config.likesCollectionId,
        [Query.equal("postId", [postId])],
      )
    } catch (error) {
       throw error.message
    }
  }

  async disLikePost(postId){
      try {
        await this.databases.deleteDocument(config.databaseId,config.likesCollectionId,postId)
      } catch (error) {
          throw error.message
      }
  }
}


const appWriteService = new services();

export default appWriteService;
