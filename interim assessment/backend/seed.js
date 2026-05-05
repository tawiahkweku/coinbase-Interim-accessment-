import mongoose from 'mongoose';
import Crypto from './models/Crypto.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const sampleCryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.75,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: 2.45,
    marketCap: 845000000000,
    volume24h: 28500000000,
    isNewListing: false
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2280.50,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: 3.12,
    marketCap: 273000000000,
    volume24h: 15600000000,
    isNewListing: false
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 98.45,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: 5.67,
    marketCap: 42000000000,
    volume24h: 2100000000,
    isNewListing: false
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.58,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    change24h: -1.23,
    marketCap: 20000000000,
    volume24h: 450000000,
    isNewListing: false
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.92,
    image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
    change24h: 4.89,
    marketCap: 8500000000,
    volume24h: 320000000,
    isNewListing: false
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 38.75,
    image: 'https://assets.coingecko.com/coins/images/12559/large/avalanche.png',
    change24h: 6.23,
    marketCap: 14000000000,
    volume24h: 580000000,
    isNewListing: false
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.85,
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink.png',
    change24h: -0.45,
    marketCap: 8200000000,
    volume24h: 280000000,
    isNewListing: false
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.65,
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    change24h: 3.78,
    marketCap: 9800000000,
    volume24h: 190000000,
    isNewListing: false
  },
  {
    name: 'NewCoin',
    symbol: 'NEW',
    price: 0.025,
    image: 'https://assets.coingecko.com/coins/images/99999/large/newcoin.png',
    change24h: 15.67,
    marketCap: 25000000,
    volume24h: 5000000,
    isNewListing: true
  },
  {
    name: 'FutureToken',
    symbol: 'FTK',
    price: 1.23,
    image: 'https://assets.coingecko.com/coins/images/99998/large/futuretoken.png',
    change24h: 8.91,
    marketCap: 123000000,
    volume24h: 12000000,
    isNewListing: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing crypto data
    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data');

    // Insert sample data
    const insertedCryptos = await Crypto.insertMany(sampleCryptos);
    console.log(`Inserted ${insertedCryptos.length} cryptocurrencies`);

    // Create demo user if it doesn't exist
    const demoEmail = 'demo@coinbase.demo';
    const existingDemoUser = await User.findOne({ email: demoEmail });
    
    if (!existingDemoUser) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('demo123456', salt);
      
      const demoUser = new User({
        name: 'Demo User',
        email: demoEmail,
        password: hashedPassword
      });
      
      await demoUser.save();
      console.log('Created demo user: demo@coinbase.demo');
    } else {
      console.log('Demo user already exists');
    }

    // Display some stats
    const totalCryptos = await Crypto.countDocuments();
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 }).limit(3);
    const newListings = await Crypto.find({ isNewListing: true });

    console.log('\n=== Database Stats ===');
    console.log(`Total cryptocurrencies: ${totalCryptos}`);
    console.log('\nTop Gainers:');
    gainers.forEach(crypto => {
      console.log(`  ${crypto.name} (${crypto.symbol}): +${crypto.change24h}%`);
    });
    console.log('\nNew Listings:');
    newListings.forEach(crypto => {
      console.log(`  ${crypto.name} (${crypto.symbol})`);
    });

    mongoose.connection.close();
    console.log('\nDatabase seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
