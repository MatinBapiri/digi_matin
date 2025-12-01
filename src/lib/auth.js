import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
if (typeof window !== "undefined") {
  auth.languageCode = "fa";
}