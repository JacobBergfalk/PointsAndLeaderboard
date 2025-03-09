import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';

export class userModel extends Model<InferAttributes<userModel>, InferCreationAttributes<userModel>> {
    declare username: string;
    declare password: string;
    declare balance: number;
  }

userModel.init(
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        {//WTF?
            sequelize,
        }

    }
);