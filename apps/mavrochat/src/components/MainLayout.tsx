'use client';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';

export default function MainLayout() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}
            >
                <ChatArea />
                <ChatInput />
            </div>
        </div>
    );
}
