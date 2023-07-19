// users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true }) // Set unique to ensure no duplicate email addresses
  email: string;

  @Prop({ required: true })
  password: string; // Add a field to store the hashed password

  // Add any other properties you want for your user model

}

export const UserSchema = SchemaFactory.createForClass(User);
