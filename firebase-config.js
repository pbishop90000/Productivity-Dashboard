// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0wjSiD7vHjcXGKq6UaFIeH-V-JdsdHTQ",
  authDomain: "productivity-dashboard-6f49e.firebaseapp.com",
  projectId: "productivity-dashboard-6f49e",
  storageBucket: "productivity-dashboard-6f49e.appspot.com",
  messagingSenderId: "486612310372",
  appId: "1:486612310372:web:37d40c9e27b585a831c271",
  measurementId: "G-6H3FRMVV2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = getAuth(app);
const database = getDatabase(app);

// Firebase Authentication Methods
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Logged in:', userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login Error:', error.code, error.message);
    return { success: false, message: 'Invalid credentials, please try again.' };
  }
};

const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Registration Error:', error.code, error.message);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
    return { success: true };
  } catch (error) {
    console.error('Sign-out Error:', error.code, error.message);
    return { success: false, message: 'Sign-out failed. Please try again.' };
  }
};

// Firebase Database Methods
const saveTask = async (userId, taskId, task) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    await set(taskRef, task);
    console.log('Task saved');
    return { success: true };
  } catch (error) {
    console.error('Save Task Error:', error.code, error.message);
    return { success: false, message: 'Failed to save task.' };
  }
};

const getTask = async (userId, taskId) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);
    if (snapshot.exists()) {
      console.log('Task retrieved:', snapshot.val());
      return { success: true, task: snapshot.val() };
    } else {
      console.log('No task found');
      return { success: false, message: 'No task found.' };
    }
  } catch (error) {
    console.error('Get Task Error:', error.code, error.message);
    return { success: false, message: 'Failed to retrieve task.' };
  }
};

const updateTask = async (userId, taskId, updates) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    await update(taskRef, updates);
    console.log('Task updated');
    return { success: true };
  } catch (error) {
    console.error('Update Task Error:', error.code, error.message);
    return { success: false, message: 'Failed to update task.' };
  }
};

const deleteTask = async (userId, taskId) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`);
    await remove(taskRef);
    console.log('Task deleted');
    return { success: true };
  } catch (error) {
    console.error('Delete Task Error:', error.code, error.message);
    return { success: false, message: 'Failed to delete task.' };
  }
};

// Export the functions
export { auth, database, login, register, logout, saveTask, getTask, updateTask, deleteTask };
