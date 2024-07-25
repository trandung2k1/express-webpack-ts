import mongoose from 'mongoose';
export interface IToken {
    _id: mongoose.Types.ObjectId;
    isAdmin: boolean;
}
