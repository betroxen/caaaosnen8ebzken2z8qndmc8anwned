export type Casino = {
    id: string;
    name: string;
    logo: string;
    bonus: string;
    description: string;
    tags: string[];
    rating: number;
    reviewCount: number;
    withdrawalTime: string;
    certified: boolean;
    status: 'VERIFIED' | 'UNVERIFIED';
    specialRanking?: string;
    license: string;
    paymentMethods: string;
    founder: string;
    company: string;
    established: string;
    languages: string;
    kycPolicy: {
        level1: string;
        level2: string;
        level3: string;
        level4: string;
    };
    restrictedTerritories: string;
    companySize: string;
    zeroEdgeIntel?: {
        rtp: string;
        houseEdge: string;
        kycFriction: string;
        withdrawalLimits: string;
        leaderboardMonthly: string;
        mathThesis: string;
    };
};

export const casinos: Casino[] = [
    {
        id: 'duel',
        name: 'Duel',
        logo: 'https://files.catbox.moe/p4z3v7.jpg',
        bonus: '$12M+ MONTHLY LEADERBOARDS',
        description: 'Pure-variance singularity. **100% RTP originals**, true anon (username only), infinite withdrawals. The tactical manifesto against rigged empires.',
        tags: ['all', 'zero-edge', 'crypto-only', 'anon', 'new', 'no-kyc'],
        rating: 5.0,
        reviewCount: 420,
        withdrawalTime: 'INSTANT (∞ LIMITS)',
        certified: true,
        status: 'VERIFIED',
        specialRanking: 'ETERNAL CROWN',
        license: 'Anjouan (ALSI-202411026-FI1) — Full wagering authorization',
        paymentMethods: 'Crypto-exclusive (BTC, ETH, LTC, USDT); Fee-less, Unbounded',
        founder: 'Ossi "Monarch" Ketola',
        company: 'Immortal Snail LLC (Nevis)',
        established: '2025 (Operational Phase)',
        languages: 'English core; Crypto-universal',
        kycPolicy: {
            level1: 'NONE — Username + Passkey only. Zero data friction.',
            level2: 'ZERO — Withdrawals are permissionless. No documents required.',
            level3: 'N/A — AML shadows bypassed by transparent ledger design.',
            level4: 'N/A — VPN-optimized for global shadow operations.'
        },
        restrictedTerritories: 'Standard Anjouan prohibitions (USA, UK, France, Netherlands)',
        companySize: '~25 core staff; $12M+ monthly leaderboard expenditure (Founder-backed liquidity)',
        zeroEdgeIntel: {
            rtp: '100.00% (Originals)',
            houseEdge: '0.00%',
            kycFriction: 'ZERO (0)',
            withdrawalLimits: '∞ (INFINITE)',
            leaderboardMonthly: '$12,000,000+ USD',
            mathThesis: 'No tailwind + no caps = whale-scale explosions. Bankruptcy-risk model sustained by founder liquidity.'
        }
    },
    {
        id: 'stake',
        name: 'Stake',
        logo: 'https://files.catbox.moe/klt24q.jpg',
        bonus: '200% Welcome Surge',
        description: 'Crypto colossus with 11K+ games and premier sportsbooks. Strategic nexus for global wager flows, balancing elite liquidity with KYC drag.',
        tags: ['all', 'high-bonus', 'sports', 'live', 'vip', 'legacy'],
        rating: 4.9,
        reviewCount: 2133,
        withdrawalTime: '~5 mins (Crypto)',
        certified: true,
        status: 'VERIFIED',
        specialRanking: 'LEGACY TITAN',
        license: 'Curaçao eGaming; Multiple regional licenses',
        paymentMethods: '20+ Cryptos; Fiat On-Ramps via third-party providers.',
        founder: 'Edward Craven & Bijan Tehrani',
        company: 'Medium Rare N.V.',
        established: '2017',
        languages: '15+ regional translations.',
        kycPolicy: {
            level1: 'BASIC ENTRY — Email/DOB/Address required.',
            level2: 'MANDATORY — ID scan pre-withdrawal, standard for AML.',
            level3: 'HIGH FRICTION — Address/Payment proof for >$10K; Mandatory for fiat exits.',
            level4: 'STRICT — Enhanced Due Diligence for VIPs; Geo-blocking actively enforced.'
        },
        restrictedTerritories: 'USA, UK, Australia, Netherlands, Czech Republic (High geo-blocking density)',
        companySize: '200+ staff; $1B+ annual volume (Crypto volume leader)'
    },
    {
        id: 'whale-io',
        name: 'Whale.io',
        logo: 'https://files.catbox.moe/7zy00k.jpg',
        bonus: '200% BTC Bonus',
        description: 'Streamlined crypto predator optimized for VPN-based high-stakes hunts. Rapid scaling entrant with robust infra.',
        tags: ['all', 'high-bonus', 'new', 'vpn-friendly'],
        rating: 4.8,
        reviewCount: 250,
        withdrawalTime: '~10 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao Gaming Board (CGB)',
        paymentMethods: '10+ Cryptos; Fiat (Apple/Google Pay, Visa/MC)',
        founder: 'Anonymous (2024 Launch Team)',
        company: 'Whale Entertainment Ltd.',
        established: '2024',
        languages: 'English, Arabic, French',
        kycPolicy: {
            level1: 'Basic signup (Email)',
            level2: 'Optional for small crypto withdrawals',
            level3: 'ID + Address mandatory for >$2K',
            level4: 'Full AML for rewards/redemptions'
        },
        restrictedTerritories: 'Australia, USA, UK, France',
        companySize: '~30 staff; Est. $20M (Sports focus)'
    },
    {
        id: 'bc-game',
        name: 'BC.GAME',
        logo: 'https://files.catbox.moe/810c57.jpg',
        bonus: '360% Deposit Match (4 Stages)',
        description: 'Massive crypto ecosystem with Lightning Network speeds and 11K+ slots. Community-driven scale and token integration.',
        tags: ['all', 'high-bonus', 'live', 'community', 'lightning'],
        rating: 4.7,
        reviewCount: 1845,
        withdrawalTime: '~6 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao eGaming',
        paymentMethods: '100+ Cryptos; Fiat via MoonPay; Lightning Network support.',
        founder: 'Anonymous (Since 2017)',
        company: 'BC.Game Operations N.V.',
        established: '2017',
        languages: '10+ Multi-regional',
        kycPolicy: {
            level1: 'BASIC — Email and light verification on deposit.',
            level2: 'MANDATORY — ID often required for first significant withdrawal.',
            level3: 'MODERATE — Address proof for high limits/situational AML.',
            level4: 'LOW — Geo-blocking present but less aggressive than competitors.'
        },
        restrictedTerritories: 'USA, China, Australia, Netherlands',
        companySize: '100+ staff; $200M+ annual revenue'
    },
    {
        id: 'duelbits',
        name: 'Duelbits',
        logo: 'https://files.catbox.moe/e8i1og.jpg',
        bonus: 'Up to $100 Wager-Free',
        description: 'Esports vanguard with skin trading and live odds. Tactical for competitive wager chains, strong focus on utility.',
        tags: ['all', 'sports', 'live', 'esports', 'skins'],
        rating: 4.7,
        reviewCount: 880,
        withdrawalTime: '~5 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao (365/JAZ)',
        paymentMethods: 'BTC, ETH, USDT, LTC, CS:GO/Dota2 Skins; Fiat cards.',
        founder: 'Undisclosed (2020 Launch)',
        company: 'Liquid Entertainment NV',
        established: '2020',
        languages: 'English, Spanish, Portuguese',
        kycPolicy: {
            level1: 'BASIC — Electronic check on signup.',
            level2: 'MANDATORY — ID for all crypto/fiat withdrawals (Standard AML).',
            level3: 'MANDATORY — Address proof for higher tiers/volume.',
            level4: 'HIGH — Clear geo-restrictions on high-traffic regions.'
        },
        restrictedTerritories: 'USA, UK, France, Denmark, Aruba',
        companySize: '50+ staff; $100M+ annual revenue'
    },
    {
        id: 'gamdom',
        name: 'Gamdom',
        logo: 'https://files.catbox.moe/jav4a4.jpg',
        bonus: '150% BTC Surge',
        description: 'Bitcoin bastion with high-reward rain features and multi-currency fluidity.',
        tags: ['all', 'high-bonus', 'community', 'rewards'],
        rating: 4.6,
        reviewCount: 512,
        withdrawalTime: '~8 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao GCB',
        paymentMethods: 'BTC, ETH, LTC, USDT; Fiat (Cards, E-wallets, Bank)',
        founder: 'Startup Team (2016)',
        company: 'Gamdom Ltd.',
        established: '2016',
        languages: 'English, Japanese, Norwegian, Russian',
        kycPolicy: {
            level1: 'None mandatory for play',
            level2: 'ID if requested by risk team',
            level3: 'Address for high limits',
            level4: 'Situational AML for high-risk accounts'
        },
        restrictedTerritories: 'USA, UK, Germany',
        companySize: '40 staff; $50M+ annual revenue'
    },
    {
        id: 'chips',
        name: 'Chips',
        logo: 'https://files.catbox.moe/x0zu6m.jpg',
        bonus: '$100 Hybrid Bonus',
        description: 'Emerging niche stack for low-profile ops. Sparse grid presence demands caution.',
        tags: ['all', 'new', 'hybrid'],
        rating: 4.6,
        reviewCount: 310,
        withdrawalTime: '~9 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Curaçao (Inferred from sector norms; unconfirmed)',
        paymentMethods: 'BTC, ETH, TRX, USDT; Limited Fiat',
        founder: 'Unknown',
        company: 'Chips Gaming',
        established: '2023',
        languages: 'English',
        kycPolicy: {
            level1: 'Standard sector default',
            level2: 'ID likely for withdrawals',
            level3: 'Unknown',
            level4: 'Unknown'
        },
        restrictedTerritories: 'USA, UK (Sector default)',
        companySize: '<20 staff; <$10M revenue (Est.)'
    },
    {
        id: 'sportsbet-io',
        name: 'Sportsbet.io',
        logo: 'https://files.catbox.moe/v2jp51.jpg',
        bonus: '100% Match + Free Bet',
        description: 'Crypto sports citadel with live odds and premier partnerships. Multi-currency precision.',
        tags: ['all', 'sports', 'live', 'vip'],
        rating: 4.5,
        reviewCount: 890,
        withdrawalTime: '~10 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao (1668/JAZ)',
        paymentMethods: 'BTC, ETH, LTC, USDT, XRP, TRX, ADA, DOGE; Fiat On-ramp',
        founder: 'Coingaming Group (Yolo Group)',
        company: 'mBet Solutions NV',
        established: '2016',
        languages: '10+ Global (English, Portuguese, Spanish, Japanese)',
        kycPolicy: {
            level1: 'Basic account creation',
            level2: 'ID mandatory for >€2.5K withdrawals',
            level3: 'Address proof for high rollers',
            level4: 'Full verification mandatory for VIPs'
        },
        restrictedTerritories: 'USA, UK, Australia, Estonia, Germany',
        companySize: '100+ staff; $150M+ annual (Blockchain pioneer)'
    },
    {
        id: 'betfury',
        name: 'BetFury',
        logo: 'https://files.catbox.moe/tw3eoe.jpg',
        bonus: '125% + Staking Yields',
        description: 'DeFi-gambling hybrid fusing casino thrills with BFG token staking yields.',
        tags: ['all', 'high-bonus', 'defi', 'staking'],
        rating: 4.5,
        reviewCount: 680,
        withdrawalTime: '~10 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao (OGL/2024/1494/0942)',
        paymentMethods: '50+ Cryptos (BTC, ETH, BNB, TRX, USDT...)',
        founder: 'Anonymous (2019)',
        company: 'BetFury Operations',
        established: '2019',
        languages: '14 (English, Spanish, French, German, Russian...)',
        kycPolicy: {
            level1: 'None baseline for crypto play',
            level2: 'ID for AML compliance triggers',
            level3: 'Situational; low enforcement',
            level4: 'N/A'
        },
        restrictedTerritories: 'USA, UK, France',
        companySize: '50 staff; $80M+ (Heavy staking revenue)'
    },
    {
        id: 'rollbit',
        name: 'Rollbit',
        logo: 'https://files.catbox.moe/wpp3nk.jpg',
        bonus: 'Up to 70% Rakeback (RLB Token)',
        description: 'Hybrid crypto-NFT fortress. Solid foundation, but house drift (2-3%) and KYC walls must be factored into tactical risk analysis.',
        tags: ['all', 'live', 'crypto', 'nft', 'high-roller', 'token'],
        rating: 4.4,
        reviewCount: 1542,
        withdrawalTime: '~2 mins (Fastest crypto)',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao Gaming Authority (OGL/2024/1260)',
        paymentMethods: 'BTC, ETH, SOL, NFTs; Fiat On-Ramp (Visa/MC).',
        founder: 'Anonymous Collective',
        company: 'Bull Gaming N.V.',
        established: '2020',
        languages: 'English (Primary), Multi-regional support',
        kycPolicy: {
            level1: 'BASIC ENTRY — Email verification on signup.',
            level2: 'MODERATE — ID upload for withdrawals >$5K (Enhanced).',
            level3: 'HIGH FRICTION — Address proof + Source of Funds for high-volume transactions.',
            level4: 'MODERATE — Low friction, flagged only for AML anomalies.'
        },
        restrictedTerritories: 'UK, USA, Australia, France, Netherlands',
        companySize: '~50 employees; Est. $50M+ annual revenue'
    },
    {
        id: 'rainbet',
        name: 'Rainbet',
        logo: 'https://files.catbox.moe/0jft4x.jpg',
        bonus: '200% BTC Storm',
        description: 'Crypto chaos with instant transactions. Agile for storm-chasers, but unverified edges.',
        tags: ['all', 'high-bonus', 'new', 'slots'],
        rating: 4.4,
        reviewCount: 332,
        withdrawalTime: '~20 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Curaçao (#365/JAZ)',
        paymentMethods: '10+ Cryptos; Bank transfers, Gift cards',
        founder: 'Not specified',
        company: 'Rainbet Ltd.',
        established: '2023',
        languages: 'English, Multi-regional',
        kycPolicy: {
            level1: 'None for play',
            level2: 'Optional for most withdrawals',
            level3: 'Full if policy breach suspected',
            level4: 'Unknown'
        },
        restrictedTerritories: 'USA, UK, Netherlands',
        companySize: '~20 staff; $15M est. revenue'
    },
    {
        id: 'goated',
        name: 'Goated',
        logo: 'https://files.catbox.moe/qp4oyy.jpg',
        bonus: '100% up to €200',
        description: 'Degen frontier for sports and token airdrops. Raw high-risk plays with thin intel.',
        tags: ['all', 'new', 'degen', 'sports'],
        rating: 4.4,
        reviewCount: 110,
        withdrawalTime: '~15 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Curaçao (Inferred)',
        paymentMethods: 'Cryptos (BTC, ETH, SOL, USDT)',
        founder: 'Degen collective',
        company: 'Goated Ventures',
        established: '2024',
        languages: 'English',
        kycPolicy: {
            level1: 'Minimal (No-KYC crypto focus)',
            level2: 'Unknown',
            level3: 'Unknown',
            level4: 'Unknown'
        },
        restrictedTerritories: 'USA, UK, Regulated EU zones',
        companySize: 'Startup; <$5M revenue'
    },
    {
        id: 'shuffle',
        name: 'Shuffle',
        logo: 'https://files.catbox.moe/pkbfod.png',
        bonus: '100% Match + SHFL Airdrop',
        description: 'VIP crypto hands with provably fair originals and **SHFL token** integration. Strong focus on liquidity and high-roller retention.',
        tags: ['all', 'live', 'token', 'vip', 'new'],
        rating: 4.3,
        reviewCount: 205,
        withdrawalTime: '~15 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Curaçao, Natural Nine B.V.',
        paymentMethods: '20+ Cryptos (BTC, ETH, SOL, USDC, BONK...).',
        founder: 'Noah Dummett et al.',
        company: 'Natural Nine B.V.',
        established: '2023',
        languages: 'English, Japanese, Portuguese',
        kycPolicy: {
            level1: 'BASIC ENTRY — Name/DOB on signup.',
            level2: 'MANDATORY — ID upload standard for most users and withdrawals.',
            level3: 'MANDATORY — Address required for higher limits.',
            level4: 'MODERATE — Geo-blocking standard for Curaçao license.'
        },
        restrictedTerritories: 'USA, Australia, UK, France',
        companySize: '30 staff; $1.2B monthly volume (2023 peak)'
    },
    {
        id: 'blockbet',
        name: 'BlockBet',
        logo: 'https://files.catbox.moe/e6i3yr.jpg',
        bonus: '100% up to 1 BTC',
        description: 'Blockchain sports arm with deep UFC ties and fan-token wagers.',
        tags: ['all', 'sports', 'new', 'token'],
        rating: 4.3,
        reviewCount: 150,
        withdrawalTime: '~14 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Curaçao (via Blockasset parent)',
        paymentMethods: 'BTC, ETH, SOL, BLOCK token',
        founder: 'Blockasset Team',
        company: 'Blockasset (Sportsbook Arm)',
        established: '2023',
        languages: 'English',
        kycPolicy: {
            level1: 'Standard crypto signup',
            level2: 'ID required for exits',
            level3: 'Unknown',
            level4: 'Unknown'
        },
        restrictedTerritories: 'USA, UK',
        companySize: '20 staff; $10M+ (leveraging UFC partnerships)'
    },
    {
        id: 'razed',
        name: 'Razed',
        logo: 'https://files.catbox.moe/xvg0gy.jpg',
        bonus: '150% up to €300',
        description: 'Rising EU crypto ranker razing limits with thousands of slots and originals.',
        tags: ['all', 'new', 'slots'],
        rating: 4.2,
        reviewCount: 75,
        withdrawalTime: '~22 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Anjouan (ALSI-132405034-FI3)',
        paymentMethods: '20+ Cryptos; some cash options',
        founder: 'Undisclosed (Recent entrant)',
        company: 'Razed Gaming',
        established: '2024',
        languages: 'English, Multi-European',
        kycPolicy: {
            level1: 'Age/ID basic check',
            level2: 'Full ID for responsible gaming flags',
            level3: 'Address if high volume',
            level4: 'Unknown'
        },
        restrictedTerritories: 'Standard prohibited zones (USA, UK, etc.)',
        companySize: '25 staff; $20M est. revenue'
    },
    {
        id: 'roobet',
        name: 'Roobet',
        logo: 'https://files.catbox.moe/of4dut.jpg',
        bonus: 'Up to $80 Wager-Free',
        description: 'Crypto speed-demon. High growth but strict AML and some historical offshore evasion noted.',
        tags: ['all', 'live', 'slots', 'famous'],
        rating: 4.2,
        reviewCount: 987,
        withdrawalTime: '~12 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao, Raw Entertainment B.V.',
        paymentMethods: 'BTC, ETH, LTC, USDT; Fiat hybrids (limited)',
        founder: 'Lifelong Gamers (Undisclosed)',
        company: 'Raw Entertainment B.V.',
        established: '2019',
        languages: 'English, Spanish, Portuguese, French',
        kycPolicy: {
            level1: 'Basic (Name, DOB)',
            level2: 'Full ID/Selfie for compliance',
            level3: 'Address proof often requested',
            level4: 'Strict AML; offshore evasion noted historically'
        },
        restrictedTerritories: 'USA, UK, Australia, Denmark, Germany',
        companySize: '100+ staff; $500M+ annual revenue'
    },
    {
        id: 'yeet',
        name: 'Yeet',
        logo: 'https://files.catbox.moe/6kol09.jpg',
        bonus: '100% up to 1 BTC',
        description: 'Funded disruptor yeeting crypto velocity with low-friction regulated pushes.',
        tags: ['all', 'new', 'funded', 'fast'],
        rating: 4.1,
        reviewCount: 98,
        withdrawalTime: '~18 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Anjouan/Curaçao (ALSI-202410037-FI2)',
        paymentMethods: 'Cryptos Primary (BTC, ETH, USDT)',
        founder: 'Dragonfly-backed Team',
        company: 'Pao Chai Ventures B.V.',
        established: '2024',
        languages: 'English, Asian markets',
        kycPolicy: {
            level1: 'Minimal signup',
            level2: 'Low enforcement unless fiat triggers',
            level3: 'Required for very large cashouts',
            level4: 'Standard AML'
        },
        restrictedTerritories: 'USA, Regulated EU markets',
        companySize: '15 staff; $7.75M Seed Funding'
    },
    {
        id: 'moonroll',
        name: 'Moonroll',
        logo: 'https://files.catbox.moe/n7pja5.jpg',
        bonus: '150% up to 1.5 BTC',
        description: 'Lunar-themed crypto orbits with step-verified provably fair rewards.',
        tags: ['all', 'crypto', 'provably-fair'],
        rating: 4.1,
        reviewCount: 195,
        withdrawalTime: '~12 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao, Space Gaming B.V. (#163285)',
        paymentMethods: 'Major Cryptos (BTC, ETH, LTC)',
        founder: 'Not specified',
        company: 'Space Gaming B.V.',
        established: '2023',
        languages: 'English, Multi',
        kycPolicy: {
            level1: 'Basic',
            level2: 'Mandatory ID for withdrawals',
            level3: 'Escalating proofs for volume',
            level4: 'Full AML'
        },
        restrictedTerritories: 'Standard Curaçao restrictions',
        companySize: '20 staff; $10M est. revenue'
    },
    {
        id: '500-casino',
        name: '500 Casino',
        logo: 'https://files.catbox.moe/da6qov.jpg',
        bonus: '100% up to $1000 + 50FS',
        description: 'Compact crypto essence with transparent operations and CS:GO roots.',
        tags: ['all', 'csgo', 'slots'],
        rating: 4.0,
        reviewCount: 450,
        withdrawalTime: '~25 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao (OGL/2024/1354/0882)',
        paymentMethods: 'Cryptos (BTC, ETH, LTC, SOL...); CS:GO/Dota2 Skins; Fiat',
        founder: 'Unknown (CS:GO trading origins)',
        company: '500 Gaming Ltd.',
        established: '2016',
        languages: 'English, German, Russian, Turkish, Portuguese',
        kycPolicy: {
            level1: 'Steam link or Email',
            level2: 'ID needed for fiat/large crypto exits',
            level3: 'Address proof',
            level4: 'AML for high-value skin trades'
        },
        restrictedTerritories: 'USA, UK, France, Netherlands',
        companySize: 'Small-Mid; <$20M revenue'
    },
    {
        id: 'metawin',
        name: 'MetaWin',
        logo: 'https://files.catbox.moe/yr8ksr.jpg',
        bonus: 'No Deposit NFT Races',
        description: 'Web3 prize hub focusing on NFT collectible hunts and high-volatility races.',
        tags: ['all', 'new', 'web3', 'nft'],
        rating: 3.9,
        reviewCount: 45,
        withdrawalTime: '~30 mins',
        certified: false,
        status: 'UNVERIFIED',
        license: 'Regulatory compliant (Curaçao inferred)',
        paymentMethods: 'ETH (Web3 Connect); Fiat via MoonPay',
        founder: 'Web3 Team (Skel)',
        company: 'MetaWin Ltd. (UK Based Ops)',
        established: '2022',
        languages: 'English',
        kycPolicy: {
            level1: 'None for crypto (Web3)',
            level2: 'KYC mandatory for MoonPay fiat on-ramp',
            level3: 'N/A',
            level4: 'N/A'
        },
        restrictedTerritories: 'USA, UK, Bahamas, Belgium',
        companySize: '15 staff; $15M est. (Prize pools)'
    }
];
