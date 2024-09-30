import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
