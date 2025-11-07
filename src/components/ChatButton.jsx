import React from 'react';
import { MessageSquare } from 'lucide-react';

const ChatButton = ({ onClick, label = 'Chat Penjual' }) => (
  <button onClick={onClick} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-sm">
    <MessageSquare size={16}/> {label}
  </button>
);

export default ChatButton;
