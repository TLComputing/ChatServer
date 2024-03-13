import bcrypt from 'bcrypt';
import Auth from '../models/Auth';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Supondo que você tenha um modelo de usuário Mongoose
import config from '../config'; // Supondo que você tenha um arquivo de configuração com seu segredo JWT

interface AuthInput {
  email: string;
  password: string;
}

class AuthService {
  async login({ email, password }: AuthInput) {
    // Tenta encontrar o usuário pelo email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    if (!config.jwtSecret) {
      throw new Error('JWT secret is undefined');
    }

    // Gera um token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    // Retorna o token e qualquer outra informação do usuário que você deseje incluir
    return { token, user: { id: user.id, email: user.email } };
  };
};

export default new AuthService();
