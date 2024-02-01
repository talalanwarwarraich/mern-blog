import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({ message: 'API is working' });
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { password, username, email, profilePic } = req.body;
  if (req.user.id !== userId) {
    return next(errorHandler(403, 'You can only update your own profile.'));
  }
  if (password) {
    if (password?.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters.'));
    }
    password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username?.length < 3) {
      return next(errorHandler(400, 'Username must be at least 3 characters.'));
    }
    if (username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot include spaces.'));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase.'));
    }
    if (!username.match(/[a-zA-z0-9]/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers.')
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          password,
          email,
          profilePic,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
