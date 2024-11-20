export type Message = {
    id: string;
    sender: 'user' | 'agent';
    content: string;
    timestamp: Date;
};

export type Thread = {
    id: string;
    title: string;
    messages: Message[];
};
