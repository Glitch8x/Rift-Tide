import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();
    const [manualAccount, setManualAccount] = useState(() => {
        try {
            const stored = localStorage.getItem('rift_tide_manual_wallet');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error("Failed to parse manual wallet:", error);
            localStorage.removeItem('rift_tide_manual_wallet');
            return null;
        }
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const manualLogin = (address) => {
        const acc = { address };
        setManualAccount(acc);
        localStorage.setItem('rift_tide_manual_wallet', JSON.stringify(acc));
    };

    const manualLogout = () => {
        setManualAccount(null);
        localStorage.removeItem('rift_tide_manual_wallet');
    };

    const login = async ({ email, password }) => {
        // Mock email login
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: 'mock-user-123',
                    name: 'Builder',
                    email: email,
                    avatar: `https://ui-avatars.com/api/?name=Builder&background=random`,
                    walletAddress: '0x...',
                    earnings: 0,
                    completedQuests: 0,
                    connectionType: 'email'
                };
                setUser(mockUser);
                localStorage.setItem('rift_tide_user', JSON.stringify(mockUser));
                setLoading(false);
                resolve(mockUser);
            }, 1000);
        });
    };

    const logout = () => {
        disconnect();
        manualLogout();
        localStorage.removeItem('rift_tide_user');
        setUser(null);
    };

    useEffect(() => {
        const account = currentAccount || manualAccount;

        if (account) {
            // User is connected with wallet (either dApp kit or manual)
            const walletAddress = account.address;
            const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
            const isWallet = !!currentAccount;

            setUser({
                id: walletAddress,
                name: shortAddress,
                email: `${shortAddress}@sui.wallet`,
                avatar: `https://ui-avatars.com/api/?name=${shortAddress}&background=random`,
                walletAddress: walletAddress,
                earnings: 0,
                completedQuests: 0,
                connectionType: isWallet ? 'wallet' : 'manual'
            });
        } else {
            // No wallet connected
            setUser(null);
        }
    }, [currentAccount, manualAccount]);

    const value = {
        user,
        loading,
        manualLogin,
        manualLogout,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
