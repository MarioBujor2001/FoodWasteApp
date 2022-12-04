import { DataTypes } from "sequelize";
import sequelize from "../db";

const Product = sequelize.define("Producs", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photoURL: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    forTrade: {
        type: DataTypes.BOOLEAN
    },
    expDate: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING
    },
    quantityId: {
        type: DataTypes.INTEGER
    }
})

export default Product;