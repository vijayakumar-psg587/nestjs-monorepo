import * as mongoose from 'mongoose';
import { movieDbSchema } from './movie-db.schema';
export const MovieDbModel = mongoose.model('movies', movieDbSchema);
