import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cryptocurrency name is required'],
    trim: true
  },
  symbol: {
    type: String,
    required: [true, 'Symbol is required'],
    uppercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  change24h: {
    type: Number,
    required: [true, '24h change is required'],
    default: 0
  },
  marketCap: {
    type: Number,
    default: 0
  },
  volume24h: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isNewListing: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
cryptoSchema.index({ symbol: 1 });
cryptoSchema.index({ change24h: -1 });
cryptoSchema.index({ createdAt: -1 });

export default mongoose.model('Crypto', cryptoSchema);
