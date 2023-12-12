"use client";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const createRoomAndJoin = () => {
    const id = uuid();
    router.push(`/room/${id}`);
  };
  const joinRoom = () => {
    if (roomId) {
      router.push(`/room/${roomId}`);
    } else {
      alert("Enter valid room Id");
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={styles.homeContainer}>
        <h1>Google meet clone</h1>
        <h2>Video conferencing web app.</h2>
        <div className="flex items-center justify-center gap-10">
          <div>
            <button className={styles.primaryButton} onClick={createRoomAndJoin}>Create new room</button>
          </div>
          <span>Or</span>
          <div className={styles.enterRoom}>
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value || "")}
              placeholder="Enter a room ID to join"
            />
            <button className="hover:bg-neutral-100 bg-neutral-50 p-2 rounded-sm h-full" onClick={joinRoom}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}
