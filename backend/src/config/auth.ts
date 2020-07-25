export default {
  Jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
