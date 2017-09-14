export default (sequelize, DataType) => {
  const PontosDeVenda = sequelize.define('pdvs', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tradingName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ownerName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    document: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    coverageArea: {
      type: DataType.GEOMETRY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataType.GEOMETRY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
    {
      timestamps: false,
    });
  return PontosDeVenda;
};
