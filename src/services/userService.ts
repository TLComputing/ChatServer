import bcrypt from 'bcrypt';
import User from '../models/User';

interface UserInput {
  username: string;
  email: string;
  password: string;
}

class UserService {
  async create({ username, email, password }: UserInput) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
      teste: '123',
    });

    await user.save();

    return user;
  };

  async getAll() {
    return await User.find();
  };
};

export default new UserService();
