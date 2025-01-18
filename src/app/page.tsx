"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  FirestoreError,
} from "firebase/firestore";

// Types
interface User {
  id: string;
  name: string;
}

interface Message {
  type: 'success' | 'error';
  content: string;
}

interface UserFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  buttonText: string;
  placeholder: string;
}

// Custom Alert Component
const Alert = ({ type, children }: { type: 'success' | 'error', children: React.ReactNode }) => (
  <div className={`p-4 rounded-lg ${
    type === 'error' 
      ? 'bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200' 
      : 'bg-green-100 border border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200'
  }`}>
    {children}
  </div>
);

// Reusable form component
const UserForm = ({ value, onChange, onSubmit, buttonText, placeholder }: UserFormProps) => (
  <div className="flex items-center mt-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 flex-1 mr-2 bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      placeholder={placeholder}
    />
    <button
      onClick={onSubmit}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors dark:bg-green-600 dark:hover:bg-green-700"
      disabled={!value.trim()}
    >
      {buttonText}
    </button>
  </div>
);

export default function UserManagement() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<string>("");
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // Listen for changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setIsDarkMode(e.matches);
    });
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as User[]
        );
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        console.error("Error fetching users:", error);
        setMessage({
          type: 'error',
          content: 'Error loading users. Please refresh the page.'
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const showMessage = (type: 'success' | 'error', content: string) => {
    setMessage({ type, content });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    
    try {
      await addDoc(usersCollectionRef, { name: newUser.trim() });
      setNewUser("");
      showMessage('success', "User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      showMessage('error', "Error adding user. Please try again.");
    }
  };

  const handleUpdateUser = async () => {
    if (!editUserName.trim() || !editUserId) return;
    
    const userDoc = doc(db, "users", editUserId);
    try {
      await updateDoc(userDoc, { name: editUserName.trim() });
      setEditUserId(null);
      setEditUserName("");
      showMessage('success', "User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      showMessage('error', "Error updating user. Please try again.");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    const userDoc = doc(db, "users", id);
    try {
      await deleteDoc(userDoc);
      showMessage('success', "User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      showMessage('error', "Error deleting user. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!user) {
    return (
      <div className={`min-h-screen p-6 flex items-center justify-center ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="text-center space-y-6">
          {/* Image Box */}
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
              <img
                src="/Signup.jpg"
                alt="Your Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
      
          {/* Login Button */}
          <button
            onClick={loginWithGoogle}
            className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 shadow-md dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <img 
              src="/Google.png" 
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome, {user.displayName}!
          </h1>
          <div className="flex items-center gap-4">
            
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <Alert type={message.type}>
            {message.content}
          </Alert>
        )}

        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Add a new user:</h2>
          <UserForm
            value={newUser}
            onChange={setNewUser}
            onSubmit={handleAddUser}
            buttonText="Add User"
            placeholder="Enter user name"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Users:</h2>
          {isLoading ? (
            <div className="text-center py-4 dark:text-gray-300">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">No users found</div>
          ) : (
            <ul className="mt-4 space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded hover:shadow-sm transition-shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  {editUserId === user.id ? (
                    <div className="flex items-center space-x-2 w-full">
                      <UserForm
                        value={editUserName}
                        onChange={setEditUserName}
                        onSubmit={handleUpdateUser}
                        buttonText="Save"
                        placeholder="Enter new name"
                      />
                      <button
                        onClick={() => setEditUserId(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors dark:bg-gray-600 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-800 dark:text-white">{user.name}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditUserId(user.id);
                            setEditUserName(user.name);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors dark:bg-yellow-600 dark:hover:bg-yellow-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}