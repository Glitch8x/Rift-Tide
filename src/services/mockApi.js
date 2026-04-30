// Initial Data
// Initial Data
const initialBounties = [
    {
        id: 1,
        title: 'Build a Sui Network Token Dashboard',
        community: 'Sui Foundation',
        communityImg: 'https://ui-avatars.com/api/?name=Sui&background=6FB7F5&color=fff',
        reward: 2500,
        deadline: '3 days left',
        participants: 12,
        tags: ['Development', 'React', 'Move'],
        featured: true,
        category: 'Development',
        type: 'bounty'
    },
    {
        id: 2,
        title: 'Design a Premium NFT Collection UI',
        community: 'Rift Tide Labs',
        communityImg: 'https://ui-avatars.com/api/?name=Rift&background=00D1FF&color=fff',
        reward: 1500,
        deadline: '5 days left',
        participants: 45,
        tags: ['Design', 'UI/UX', 'Figma'],
        featured: true,
        category: 'Design',
        type: 'bounty'
    },
    {
        id: 3,
        title: 'Create a Technical Walkthrough Video for Move Language',
        community: 'Move Academy',
        communityImg: 'https://ui-avatars.com/api/?name=Move&background=7F5AF0&color=fff',
        reward: 800,
        deadline: '1 week left',
        participants: 8,
        tags: ['Content', 'Video', 'Education'],
        featured: false,
        category: 'Content',
        type: 'bounty'
    },
    {
        id: 5,
        title: 'Smart Contract Audit: Governance Protocol',
        community: 'Shield Pulse',
        communityImg: 'https://ui-avatars.com/api/?name=Shield&background=EF4444&color=fff',
        reward: 5000,
        deadline: '24h left',
        participants: 15,
        tags: ['Security', 'Audit', 'Move'],
        featured: true,
        category: 'Development',
        type: 'bounty'
    },
    {
        id: 6,
        title: 'Write a Detailed Thread on Sui Scalability',
        community: 'Sui Network',
        communityImg: 'https://ui-avatars.com/api/?name=Sui&background=6FB7F5&color=fff',
        reward: 200,
        deadline: '2 days left',
        participants: 156,
        tags: ['Content', 'Twitter', 'Writing'],
        featured: false,
        category: 'Content',
        type: 'bounty'
    },
    {
        id: 7,
        title: 'Design 3D Assets for Metaverse Quest',
        community: 'Rift World',
        communityImg: 'https://ui-avatars.com/api/?name=RW&background=F59E0B&color=fff',
        reward: 3500,
        deadline: '2 weeks left',
        participants: 5,
        tags: ['Design', '3D', 'Metaverse'],
        featured: false,
        category: 'Design',
        type: 'bounty'
    }
];


const initialGrants = [
    {
        id: 1,
        title: 'Regenerative Community Fund',
        amount: '$5,000',
        description: 'Funding for projects that improve local ecosystems and promote sustainability.',
        tags: ['Environment', 'Community'],
        applicants: 124
    },
    {
        id: 2,
        title: 'Rift Tide Creator Grant',
        amount: '$2,000',
        description: 'Support for artists and developers building on the Rift Tide protocol.',
        tags: ['Art', 'Dev'],
        applicants: 89
    },
    {
        id: 3,
        title: 'Education Initiative',
        amount: '$10,000',
        description: 'Grants for creating educational content about Web3 and civic engagement.',
        tags: ['Education', 'Content'],
        applicants: 45
    }
];

const initialStats = {
    totalValueEarned: 30000,
    opportunitiesListed: 5,
    activeUsers: 842
};

const initialUsers = [
    { id: 1, name: 'Yeti Believer', level: 1, xp: 0, quests: 2, earnings: 500, avatar: 'https://ui-avatars.com/api/?name=Yeti+Believer&background=0D8ABC&color=fff' },
    { id: 2, name: 'CryptoKing', level: 15, xp: 14500, quests: 42, earnings: 12500, avatar: 'https://ui-avatars.com/api/?name=CK&background=E53170&color=fff' },
    { id: 3, name: 'SuiMaster', level: 12, xp: 11200, quests: 35, earnings: 9800, avatar: 'https://ui-avatars.com/api/?name=SM&background=FF8906&color=fff' },
    { id: 4, name: 'GreenThumb', level: 8, xp: 7500, quests: 18, earnings: 4500, avatar: 'https://ui-avatars.com/api/?name=GT&background=2CB67D&color=fff' },
    { id: 5, name: 'PixelArtist', level: 20, xp: 19800, quests: 55, earnings: 25000, avatar: 'https://ui-avatars.com/api/?name=PA&background=7F5AF0&color=fff' },
    { id: 6, name: 'SolanaDev', level: 14, xp: 13200, quests: 28, earnings: 15000, avatar: 'https://ui-avatars.com/api/?name=SD&background=6366F1&color=fff' },
];

// Simulated Service
class MockApiService {
    constructor() {
        this.bounties = [...initialBounties];
        this.grants = [...initialGrants];
        this.stats = { ...initialStats };
        this.user = {
            name: 'Yeti Believer',
            level: 1,
            xp: 0
        };
        this.users = [...initialUsers];
        this.users = [...initialUsers];
        this.recentEarners = [
            { id: 101, name: 'Olaoye roqeeb', task: 'Fere AI UGC Bounty', amount: 4, category: 'Content', avatar: 'https://ui-avatars.com/api/?name=Olaoye+roqeeb&background=E53170&color=fff' },
            { id: 102, name: 'th buidl', task: 'Solana ecosystem intros', amount: 2, category: 'Development', avatar: 'https://ui-avatars.com/api/?name=th+buidl&background=FF8906&color=fff' }
        ];
        this.notifications = [];
        this.listeners = [];
        this.winners = [
            { id: 10, user: 'Yeti Believer', walletAddress: '0x707c...87a7', itemTitle: 'Sui Token Dashboard', rank: 1, prizeAmount: 2500, paidAt: new Date().toISOString() },
            { id: 11, user: 'CryptoKing', walletAddress: '0x123...bcde', itemTitle: 'Move Language Walkthrough', rank: 2, prizeAmount: 400, paidAt: new Date().toISOString() },
            { id: 12, user: 'Olaoye roqeeb', walletAddress: '0x987...cba9', itemTitle: 'Twitter Raid: Sui Scalability', rank: 3, prizeAmount: 50, paidAt: new Date().toISOString() },
        ]; 
        this.submissions = [
            {
                user: 'CryptoKing',
                walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
                itemTitle: 'Build a Sui Network Token Dashboard',
                itemId: 1,
                type: 'quest',
                submittedAt: new Date().toISOString(),
                twitterLink: 'https://twitter.com/cryptoking/status/12345',
                videoLink: 'https://loom.com/share/video123',
                assetLink: 'https://github.com/cryptoking/sui-dashboard'
            },
            {
                user: 'Olaoye roqeeb',
                walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
                itemTitle: 'Write a Detailed Thread on Sui Scalability',
                itemId: 6,
                type: 'quest',
                submittedAt: new Date().toISOString(),
                twitterLink: 'https://twitter.com/roqeeb/status/67890',
                briefTelling: 'I wrote a 10-part thread explaining Sui consensus and parallel execution.'
            }
        ];
    }

    // Subscribe to updates
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notify() {
        this.listeners.forEach(cb => cb());
    }

    startSimulation() {
        if (this.simulationInterval) return;
        this.simulationInterval = setInterval(() => {
            // Randomly pick a bounty and add a participant to simulate activity
            const randomBounty = this.bounties[Math.floor(Math.random() * this.bounties.length)];
            if (randomBounty) {
                randomBounty.participants += 1;
                this.stats.activeUsers += Math.floor(Math.random() * 3); // Randomly grow stats
                this.notify();
            }
        }, 8000);
    }

    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }

    getData() {
        return {
            bounties: this.bounties,
            grants: this.grants,
            stats: this.stats,
            user: this.user,
            leaderboard: this.users,
            recentEarners: this.recentEarners,
            winners: this.winners,
            // Only return notifications for the current logged in user
            notifications: this.notifications.filter(n => n.recipient === this.user.name)
        };
    }

    getLeaderboard() {
        return this.users;
    }

    // Actions
    joinBounty(id, submissionDetails = {}) {
        const bounty = this.bounties.find(b => b.id === id);
        if (bounty) {
            bounty.participants += 1;
            this.stats.activeUsers += 1;

            // Level up logic
            this.user.xp += 100;
            this.user.level = Math.floor(this.user.xp / 100) + 1;

            // Store submission
            if (!this.submissions) this.submissions = [];
            this.submissions.push({
                type: 'quest',
                itemId: id,
                itemTitle: bounty.title,
                submittedAt: new Date().toISOString(),
                ...submissionDetails // { walletAddress, link, etc. }
            });

            this.notify();
        }
    }

    applyGrant(id, submissionDetails = {}) {
        const grant = this.grants.find(g => g.id === id);
        if (grant) {
            grant.applicants += 1;

            // Level up logic
            this.user.xp += 100;
            this.user.level = Math.floor(this.user.xp / 100) + 1;

            // Store submission
            if (!this.submissions) this.submissions = [];
            this.submissions.push({
                type: 'grant',
                itemId: id,
                itemTitle: grant.title,
                submittedAt: new Date().toISOString(),
                ...submissionDetails
            });

            this.notify();
        }
    }

    getSubmissions() {
        return this.submissions || [];
    }

    postBounty(newBounty) {
        this.bounties.unshift({ ...newBounty, id: Date.now(), participants: 0 });
        this.stats.opportunitiesListed += 1;
        this.notify();
    }

    postGrant(newGrant) {
        this.grants.unshift({ ...newGrant, id: Date.now(), applicants: 0 });
        this.notify();
    }

    selectWinner(bountyId, submissionIndex) {
        const bounty = this.bounties.find(b => b.id === bountyId);
        // We find the submission by index or we could pass ID. 
        // For simplicity in this mock, we filter submissions by this bountyId and grab the index-th one
        // But better is to pass the submission object or ID.
        // Let's assume we pass the wallet address or unique ID if we had one.
        // Let's use the index from the filtered list in dashboard for now, or finding it in this.submissions.

        // Actually, let's search for the submission in this.submissions
        // But we need a unique way. Let's refer to submission by wallet for now or add IDs to submissions.
        // Simplified: The dashboard will pass the specific submission object roughly.

        // Let's assume we pass the wallet address to identify the winner.
        // selectWinner(bountyId, walletAddress)
    }

    selectWinnerByWallet(bountyId, walletAddress) {
        const bounty = this.bounties.find(b => b.id === bountyId);
        if (bounty) {
            bounty.winner = walletAddress;
            bounty.status = 'completed'; // Mark bounty as closed

            // Update stats
            this.stats.totalValueEarned += bounty.reward;

            // Add to recent earners
            this.recentEarners.unshift({
                id: Date.now(),
                name: walletAddress, // Or lookup user name if available
                task: bounty.title,
                amount: bounty.reward,
                category: bounty.category || 'General',
                avatar: `https://ui-avatars.com/api/?name=${walletAddress}&background=random&color=fff`
            });

            // Keep list distinct/short
            if (this.recentEarners.length > 5) this.recentEarners.pop();

            this.notify();
        }
        this.notify();
    }


    selectRankedWinner(bountyId, walletAddress, rank, subDetails = {}) {
        const bounty = this.bounties.find(b => b.id === bountyId);
        if (bounty) {
            if (!bounty.winners) bounty.winners = [];

            let rewardAmount = 0;
            if (rank === 1) rewardAmount = bounty.reward;
            if (rank === 2) rewardAmount = Math.floor(bounty.reward * 0.5);
            if (rank === 3) rewardAmount = Math.floor(bounty.reward * 0.25);

            const winnerEntry = {
                id: Date.now(),
                user: subDetails.user || 'Unknown',
                walletAddress: walletAddress,
                itemTitle: bounty.title,
                rank,
                prizeAmount: rewardAmount,
                paidAt: new Date().toISOString()
            };

            this.winners.unshift(winnerEntry);
            bounty.winners.push({ wallet: walletAddress, rank, amount: rewardAmount });

            if (rank === 1) {
                bounty.status = 'completed';
                bounty.winner = walletAddress;
                this.stats.totalValueEarned += rewardAmount;
            }

            this.notifications.unshift({
                id: Date.now(),
                recipient: walletAddress === '0x707c...87a7' ? 'Yeti Believer' : walletAddress,
                message: `You placed ${rank}${rank === 1 ? 'st' : rank === 2 ? 'nd' : 'rd'} in "${bounty.title}"! +${rewardAmount} SUI`,
                amount: rewardAmount,
                type: 'payout',
                read: false,
                date: new Date().toISOString()
            });

            this.recentEarners.unshift({
                id: Date.now(),
                name: subDetails.user || walletAddress,
                task: `${bounty.title} (${rank}${rank === 1 ? 'st' : rank === 2 ? 'nd' : 'rd'})`,
                amount: rewardAmount,
                category: bounty.category || 'General',
                avatar: `https://ui-avatars.com/api/?name=${walletAddress}&background=random&color=fff`
            });

            this.notify();
        }
    }



    syncTelegramData() {
        // Simulate fetching data from TG bot
        // We'll just randomly increment XP/Quests for top users to show "Movement"
        this.users.forEach(user => {
            const raidActivity = Math.floor(Math.random() * 5); // 0-4 raids found
            if (raidActivity > 0) {
                user.quests += raidActivity;
                user.xp += raidActivity * 50; // 50 XP per raid msg
                user.earnings += raidActivity * 10; // Small tip
            }
        });

        // Add a system notification
        this.notifications.unshift({
            id: Date.now(),
            recipient: 'Yeti Believer',
            message: `Telegram Raid Data Synced: Leaderboard updated.`,
            type: 'system',
            read: false,
            date: new Date().toISOString()
        });

        this.notify();
        return { success: true, message: "Synced successfully" };
    }
}

export const dataService = new MockApiService();
