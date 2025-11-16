import { Icons } from '../components/icons';

export const sidebarNavItems = [
  {
    group: 'DAS',
    items: [
      { title: 'Dashboard', href: '#', icon: Icons.Home },
      { title: 'Analytics', href: '#', icon: Icons.BarChart },
    ],
  },
  {
    group: 'CAS',
    items: [
      { title: 'Casino Directory', href: '#', icon: Icons.Database },
      { title: 'Bonus Offers', href: '#', icon: Icons.Gift },
      { title: 'Live RTP Tracker', href: '#', icon: Icons.Activity },
      { title: 'Certified Platforms', href: '#', icon: Icons.Verified },
      { title: 'Mines Game', href: '#', icon: Icons.Bomb },
      { title: 'Plinko Game', href: '#', icon: Icons.Zap },
    ]
  },
  {
    group: 'USER',
    items: [
       { title: 'Profile', href: '#', icon: Icons.User },
       { title: 'Messages', href: '#', icon: Icons.Mail },
       { title: 'Rewards', href: '#', icon: Icons.Trophy },
       { title: 'Settings', href: '#', icon: Icons.Settings },
    ]
  },
  {
    group: 'SUP',
    items: [
      { title: 'About Us', href: '#', icon: Icons.Info },
      { title: 'Review Methodology', href: '#', icon: Icons.FileCheck },
      { title: 'Partner Vetting', href: '#', icon: Icons.Shield },
      { title: 'Provably Fair', href: '#', icon: Icons.Lock },
      { title: 'Protocol Deep Dive', href: '#', icon: Icons.Cpu },
      { title: 'Affiliate Program', href: '#', icon: Icons.Link },
      { title: 'FAQ', href: '#', icon: Icons.HelpCircle },
      { title: 'Support', href: '#', icon: Icons.MessageSquare },
      { title: 'Terms of Service', href: '#', icon: Icons.FileText },
    ]
  }
];