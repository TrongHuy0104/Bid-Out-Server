const express = require('express');
const {
    placeBid,
    getBiddingHistory,
    sellProduct,
    confirmProduct,
} = require('../controllers/biddingCtr');
const { protect, isSeller } = require('../middleWare/authMiddleWare');
const router = express.Router();

router.get('/:productId', getBiddingHistory);
router.post('/sell', protect, isSeller, sellProduct);
router.post('/confirm', protect, confirmProduct);
router.post('/', protect, placeBid);

module.exports = router;
