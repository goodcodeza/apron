import { createContext, useContext } from 'react';
import { messages } from '@/app/users/copy/messages';

type T = keyof typeof messages;
const MessagesContext = createContext<Record<T, string>>(messages);

export const MessagesProvider = ({ children }: { children: React.ReactNode }) => (
	// messages may be loaded from a service or the database
	<MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>
);

export const useMessages = () => useContext(MessagesContext);
