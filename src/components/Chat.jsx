import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';

// Simple in-memory chat per session for demo
const demoConversations = {
  'Alya-Raka': [
    { id: 1, from: 'Alya', text: 'Hai! Barang masih ada ya ✨', ts: Date.now() - 1000 * 60 * 20 },
    { id: 2, from: 'Raka', text: 'Halo kak, masih ada? ukuran M?', ts: Date.now() - 1000 * 60 * 18 },
  ],
};

const bubbleColors = (isMine) => isMine
  ? 'bg-emerald-700 text-white'
  : 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100';

const Chat = ({ currentUser, peerName, onClose }) => {
  const key = useMemo(() => `${(currentUser?.name||'User')}-${peerName}`, [currentUser, peerName]);
  const [messages, setMessages] = useState(() => demoConversations[key] || []);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, key]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = { id: Date.now(), from: currentUser?.name || 'You', text: text.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50">
      <div className="w-full sm:w-[380px] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl bg-white dark:bg-zinc-900">
        <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="text-sm text-zinc-500">Chat dengan</div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{peerName}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"><X size={16}/></button>
        </div>
        <div className="h-72 overflow-y-auto p-4 space-y-2">
          {messages.map((m) => {
            const isMine = m.from === (currentUser?.name || 'You');
            return (
              <div key={m.id} className={`max-w-[80%] ${isMine ? 'ml-auto' : ''}`}>
                <div className={`px-3 py-2 rounded-2xl ${bubbleColors(isMine)}`}>{m.text}</div>
                <div className="text-[10px] text-zinc-500 mt-1">{new Date(m.ts).toLocaleTimeString()}</div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} className="p-3 flex items-center gap-2 border-t border-zinc-200 dark:border-zinc-800">
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Tulis pesan..."
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"><Send size={16}/>Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
