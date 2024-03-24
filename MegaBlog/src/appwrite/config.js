// Importing necessary modules and configurations
import conf from '../conf/conf.js'; // Importing configuration file
import { Client, ID, Databases, Storage, Query } from 'appwrite'; // Importing necessary classes from the 'appwrite' package

// Exporting a class named Service
export class Service {
    // Initializing instance variables
    client = new Client(); // Creating a new instance of the Client class
    databases; // Variable to store a Databases instance
    bucket; // Variable to store a Storage instance

    // Constructor method
    constructor() {
        // Setting up the Appwrite client
        this.client
            .setEndpoint(conf.appwriteUrl) // Setting the endpoint URL from the configuration
            .setProject(conf.appwriteProjectId); // Setting the project ID from the configuration

        // Initializing Databases and Storage instances with the client
        this.databases = new Databases(this.client); // Creating a new Databases instance with the client
        this.bucket = new Storage(this.client); // Creating a new Storage instance with the client
    }

    // Method to create a new post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // Creating a new document in the specified database and collection
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // Database ID from configuration
                conf.appwriteCollectionId, // Collection ID from configuration
                slug, // Document slug
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error); // Logging any errors
        }
    }

    // Method to update an existing post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            // Updating the document in the specified database and collection
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error); // Logging any errors
        }
    }

    // Method to delete a post
    async deletePost(slug) {
        try {
            // Deleting the document from the specified database and collection
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true; // Returning true if deletion is successful
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error); // Logging any errors
            return false; // Returning false if deletion fails
        }
    }

    // Method to get a specific post
    async getPost(slug) {
        try {
            // Retrieving the document from the specified database and collection
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error); // Logging any errors
            return false; // Returning false if retrieval fails
        }
    }

    // Method to get multiple posts based on queries
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // Listing documents from the specified database and collection based on queries
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error); // Logging any errors
        }
    }

    // File Upload Services

    // Method to upload a file
    async uploadFile(file) {
        try {
            // Creating a new file in the specified bucket
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), // Generating a unique ID for the file
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error); // Logging any errors
            return false; // Returning false if upload fails
        }
    }

    // Method to delete a file
    async deleteFile(fileId) {
        try {
            // Deleting the file from the specified bucket
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true; // Returning true if deletion is successful
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error); // Logging any errors
            return false; // Returning false if deletion fails
        }
    }

    // Method to get the preview of a file
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

// Creating an instance of the Service class
const service = new Service();

// Exporting the service instance
export default service;
