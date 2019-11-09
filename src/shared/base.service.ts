import 'automapper-ts/dist/automapper';
import { Document, Model, Types } from 'mongoose';
import { promises } from 'fs';
import { Type } from '@nestjs/common';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
export abstract class BaseService<T extends Typegoose> {
    protected modelLocal: ModelType<T>;
    protected mapperLocal: AutoMapperJs.AutoMapper;

    private get modelName(): string {
        return this.modelLocal.modelName;
    }

    private get viewModelName(): string {
        return `${this.modelLocal.modelName}Vm`;
    }

    async map<K>(
        object: Partial<InstanceType<T>> | Array<Partial<InstanceType<T>>>,
        isArray: boolean = false,
        sourceKey?: string,
        destinationKey?: string,
        ): Promise<K> {
            const sourceKeyLocal = isArray ? `${sourceKey || this.modelName}[]` : sourceKey || this.modelName;
            const destinationKeyLocal = isArray ? `${destinationKey || this.viewModelName}[]` : destinationKey || this.viewModelName;
            return this.mapperLocal.map(sourceKeyLocal, destinationKeyLocal, object);
    }

    async findAll(filter = {}): Promise<Array<InstanceType<T>>> {
        return this.modelLocal.find(filter).exec();
    }
    async findOne(filter = {}): Promise<InstanceType<T>> {
        return this.modelLocal.findOne(filter).exec();
    }
    async findById(id: string): Promise<InstanceType<T>> {
        return this.modelLocal.findById(this.toObjectId(id));
    }

    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        return this.modelLocal.create(item);
    }
    async delete(id: string): Promise<InstanceType<T>> {
        return this.modelLocal.findByIdAndRemove(this.toObjectId(id)).exec();
    }
    async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
        return this.modelLocal.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
    }
    async clearCollection(filter = {}): Promise<void> {
        return this.modelLocal.deleteMany(filter).exec();
    }
    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
