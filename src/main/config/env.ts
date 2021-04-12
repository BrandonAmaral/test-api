import 'dotenv/config';

export default {
  mongoURL: process.env.MONGO_URI || 'mongodb://localhost:27017/db',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'd41d8cd98f00b204e9800998ecf8427e',
};
