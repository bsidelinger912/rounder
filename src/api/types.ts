import { Document, Query, DocumentQuery, QueryFindOneAndUpdateOptions, ModelUpdateOptions } from 'mongoose';

export interface DocumentWithDelete extends Document {
  delete(callback?: (err: any, res: any[]) => void): Promise<this>;
  delete(args?: any, callback?: (err: any, res: any[]) => void): Promise<this>;
  restore(callback?: () => void): Promise<this>;
  countDeleted(callback?: (err: any, count: number) => void): Query<number>;
  countDeleted(criteria: any, callback?: (err: any, count: number) => void): Query<number>;
  countWithDeleted(callback?: (err: any, count: number) => void): Query<number>;
  countWithDeleted(criteria: any, callback?: (err: any, count: number) => void): Query<number>;
  findDeleted(callback?: (err: any, res: any[]) => void): DocumentQuery<any[], any>;
  findDeleted(criteria: any, callback?: (err: any, res: any[]) => void): DocumentQuery<any[], any>;
  findWithDeleted(callback?: (err: any, res: any[]) => void): DocumentQuery<any[], any>;
  findWithDeleted(criteria: any, callback?: (err: any, res: any[]) => void): DocumentQuery<any[], any>;
  findOneDeleted(callback?: (err: any, res: any | null) => void): DocumentQuery<any | null, any>;
  findOneDeleted(criteria: any, callback?: (err: any, res: any | null) => void): DocumentQuery<any | null, any>;
  findOneWithDeleted(callback?: (err: any, res: any | null) => void): DocumentQuery<any | null, any>;
  findOneWithDeleted(criteria: any, callback?: (err: any, res: any | null) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateDeleted(callback?: (err: any, doc: any | null) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateDeleted(update: any, callback?: (err: any, doc: any | null, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateDeleted(query: any, update: any, callback?: (err: any, doc: any | null, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateDeleted(query: any, update: any,
    options: { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
    callback?: (err: any, doc: any, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateDeleted(query: any, update: any, options: QueryFindOneAndUpdateOptions,
    callback?: (err: any, doc: any | null, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateWithDeleted(callback?: (err: any, doc: any | null) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateWithDeleted(update: any, callback?: (err: any, doc: any | null, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateWithDeleted(query: any, update: any, callback?: (err: any, doc: any | null, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateWithDeleted(query: any, update: any,
    options: { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
    callback?: (err: any, doc: any, res: any) => void): DocumentQuery<any | null, any>;
  findOneAndUpdateWithDeleted(query: any, update: any, options: QueryFindOneAndUpdateOptions,
    callback?: (err: any, doc: any | null, res: any) => void): DocumentQuery<any | null, any>;
  updateDeleted(doc: any, callback?: (err: any, raw: any) => void): Query<any>;
  updateDeleted(doc: any, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any>;
  updateWithDeleted(doc: any, callback?: (err: any, raw: any) => void): Query<any>;
  updateWithDeleted(doc: any, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any>;
}