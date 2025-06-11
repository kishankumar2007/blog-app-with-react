const config = {
    appwriteul: (import.meta.env.VITE_APPWRITE_URL),
     projectId: (import.meta.env.VITE_PROJECT_ID),
      storageId: (import.meta.env.VITE_STORAGE_ID),
     databaseId: (import.meta.env.VITE_DATABASE_ID),
     collectionId: (import.meta.env.VITE_COllECTION_ID),
     likesCollectionId:(import.meta.env.VITE_LIKES_COllECTION_ID),
}

export default config