import { Document } from "mongoose";

export interface IUser extends Document {
    readonly name: string;
    readonly surname: string;
    readonly age: number;
}
