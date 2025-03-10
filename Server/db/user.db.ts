import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelize } from "./conn";

export class userModel extends Model<
  InferAttributes<userModel>,
  InferCreationAttributes<userModel>
> {
  declare username: string;
  declare password: string;
  declare balance: number;
}

userModel.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    //WTF?
    sequelize,
  }
);
