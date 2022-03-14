import { DataTypes, Model } from "sequelize";
import db from "../../config/database.config";

interface RequesitionAttributes {
  id: string;
  userId: string;
  bodyReq: object;
  DateTime: Date;
}

export class RequisitionInstance extends Model<RequesitionAttributes> {}

RequisitionInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bodyReq: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    DateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "requesition",
  }
);
