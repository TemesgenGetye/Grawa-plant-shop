import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.plant.grawa",
  projectId: "67916ba40011052e3e9b",
  databaseId: "67916f63001411a05432",
  plantCollectionId: "67916fc0003d3a4f9b59",
  favoriteCollectionId: "6791a971002343579bb0",
  userCollectionId: "6791702700077fd922ca",
  storageId: "67917393000eac68ff5c",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, first_name, last_name) {
  // const sessionCurrent = await account.deleteSession("current");

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      first_name,
      last_name
    );

    if (!newAccount) throw Error;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        account_id: newAccount.$id,
        email: email,
        first_name: first_name,
        last_name: last_name,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  // const sessionCurrent = await account.deleteSession("current");
  try {
    const session = await account.createEmailSession(email, password);
    console.log(session);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all plants
export async function getAllPlants() {
  try {
    const plant = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId
    );

    return plant.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get plant by id
export async function getPlantById(id) {
  try {
    const plant = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId,
      id
    );

    return plant;
  } catch (error) {
    throw new Error(error);
  }
}

// Get favorite plants
export async function getFavoritePlants() {
  try {
    const favorites = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.favoriteCollectionId
    );

    return favorites.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// update is_fav to true
export async function updateFavouritePlant(plantId) {
  try {
    const currentUser = await getCurrentUser();

    const favouritePlant = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId,
      plantId,
      {
        is_fav: true,
      }
    );
    return favouritePlant;
  } catch (error) {
    throw new Error(error);
  }
}

// update is_fav to false
export async function updateUnfavouritePlant(plantId) {
  try {
    const currentUser = await getCurrentUser();

    const favouritePlant = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId,
      plantId,
      {
        is_fav: false,
      }
    );
    return favouritePlant;
  } catch (error) {
    throw new Error(error);
  }
}

// update is_cart to true
export async function updateCartPlant(plantId) {
  try {
    const currentUser = await getCurrentUser();

    const favouritePlant = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId,
      plantId,
      {
        is_cart: true,
      }
    );
    return favouritePlant;
  } catch (error) {
    throw new Error(error);
  }
}
// update is_cart to false
export async function updateUncartPlant(plantId) {
  try {
    const currentUser = await getCurrentUser();

    const favouritePlant = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.plantCollectionId,
      plantId,
      {
        is_cart: false,
      }
    );
    return favouritePlant;
  } catch (error) {
    throw new Error(error);
  }
}
