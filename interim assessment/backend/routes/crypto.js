import express from 'express';
import { body, validationResult } from 'express-validator';
import Crypto from '../models/Crypto.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all cryptocurrencies
router.get('/', async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: 'Cryptocurrencies retrieved successfully',
      data: cryptos
    });
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cryptocurrencies',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get top gainers
router.get('/gainers', async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);
    
    res.json({
      success: true,
      message: 'Top gainers retrieved successfully',
      data: gainers
    });
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching top gainers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get new listings
router.get('/new', async (req, res) => {
  try {
    const newListings = await Crypto.find({ isNewListing: true })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      success: true,
      message: 'New listings retrieved successfully',
      data: newListings
    });
  } catch (error) {
    console.error('Error fetching new listings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching new listings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Add new cryptocurrency (protected route)
router.post('/', authenticateToken, [
  body('name').trim().notEmpty().withMessage('Cryptocurrency name is required'),
  body('symbol').trim().isLength({ min: 1, max: 10 }).withMessage('Symbol must be 1-10 characters'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('image').isURL().withMessage('Image must be a valid URL'),
  body('change24h').isNumeric().withMessage('24h change must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, symbol, price, image, change24h } = req.body;

    // Check if cryptocurrency with this symbol already exists
    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(400).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists'
      });
    }

    // Create new cryptocurrency
    const crypto = new Crypto({
      name,
      symbol: symbol.toUpperCase(),
      price: parseFloat(price),
      image,
      change24h: parseFloat(change24h),
      isNewListing: true
    });

    await crypto.save();

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto
    });
  } catch (error) {
    console.error('Error adding cryptocurrency:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding cryptocurrency',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single cryptocurrency by ID
router.get('/:id', async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found'
      });
    }

    res.json({
      success: true,
      message: 'Cryptocurrency retrieved successfully',
      data: crypto
    });
  } catch (error) {
    console.error('Error fetching cryptocurrency:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cryptocurrency',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
