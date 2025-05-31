import { Client, Databases, ID,Query } from "appwrite";
import config from "../conf/config";

export class services {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteul);
        this.client.setProject(config.projectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ title, content,Image, userId,auther, slug, is_Active }) {
        try {
           return await this.databases.createDocument(config.databaseId, config.collectionId, ID.unique(), { title, content, Image, auther, userId, slug, is_Active }
            );
        } catch (error) {
            console.log(error.message)
        }
    }
    async getPost(id){
      try {
         return await this.databases.getDocument(config.databaseId,config.collectionId,id)
      } catch (error) {
        console.log(error.message)
      }
    }
      async getAllPost(){
      try {
        return  this.databases.listDocuments(config.databaseId,config.collectionId,[Query.equal('is_Active',["Active"])])
      } catch (error) {
        console.log(error.message)
      }
      }
}

const appWriteService = new services();

export default appWriteService;
