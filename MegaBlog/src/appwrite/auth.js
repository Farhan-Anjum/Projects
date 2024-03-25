import conf from '../conf/conf' // Importing configuration settings from conf.js
import {Client, Account, ID} from 'appwrite'; // Importing Client, Account, and ID modules from 'appwrite' library

export class AuthService {
  client = new Client (); // Creating a new instance of the Client class
  account; // Declaring an 'account' property

  constructor () {
    // Initializing the Appwrite client with endpoint and project ID from configuration
    this.client
      .setEndpoint (conf.appwriteUrl) // Setting the API endpoint URL
      .setProject (conf.appwriteProjectId); // Setting the project ID

    // Creating a new instance of the Account class with the initialized client
    this.account = new Account (this.client); // Initializing an 'account' object with the Account class and the client
  }

  // Method to create a new account with email, password, and name
  async createAccount({email, password, name}) {
    try {
      // Creating a new user account using the Account class's 'create' method
      const userAccount = await this.account.create (
        ID.unique (), // Generating a unique ID for the account
        email, // User's email
        password, // User's password
        name // User's name
      );

      // If account creation is successful, proceed with login
      if (userAccount) {
        return this.login ({email, password}); // Logging in with the newly created account
      } else {
        return userAccount; // Returning the userAccount object
      }
    } catch (error) {
      throw error; // Throwing an error if account creation fails
    }
  }

  // Method to login with email and password
  async login({email, password}) {
    try {
      // Creating a new session using the Account class's 'createEmailSession' method
      return await this.account.createEmailSession (email, password); // Returning the created session
    } catch (error) {
      throw error; // Throwing an error if login fails
    }
  }

  // Method to get the current user's details
  async getCurrentUser() {
    try {
      const userData = await this.account.get(); // Updated to await the user data
      return userData; // Returning user data if available
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser :: error', error);
      throw error; // Throwing an error if fetching user details fails
    }
  }
  // Method to log out the current user
  async logout () {
    try {
      await this.account.deleteSessions (); // Deleting the user's sessions using the Account class's 'deleteSessions' method
    } catch (error) {
      console.log ('Appwrite service :: logout :: error', error); // Logging an error if logout fails
    }
  }
}

const authService = new AuthService (); // Creating a new instance of the AuthService class

export default authService; // Exporting the AuthService class