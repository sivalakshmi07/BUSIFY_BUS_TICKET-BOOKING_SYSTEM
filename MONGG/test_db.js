const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/Bus').then(async () => {
    const User = require('./models/User');
    const username = 'Tippu';
    const password = '8590';

    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    console.log('User found:', user?.username);

    if (user) {
        console.log('Password starts with $2b$?', user.password.startsWith('$2b$'));
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Bcrypt match:', isMatch);
    }

    process.exit(0);
});
