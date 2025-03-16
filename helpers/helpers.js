const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
    // return 1234;
};

module.exports = generateOtp;