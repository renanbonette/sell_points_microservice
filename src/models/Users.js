import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.set('password', bcrypt.hashSync(user.password, salt));
        },
      },
      classMethods: {
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
      },
      timestamps: false,
    });
  return Users;
};
