import { Request } from 'express';

export class RequestBuilder {
    request:Request;

    constructor(request: Request) {
        this.request = request;
    }

    withData(data: any) {
        this.request.body.data = data;
        return this;
    }

    withInclude(include: any) {
        this.request.body.include = include;
        return this;
    }

    withWhere(where: any) {
        this.request.body.where = where;
        return this;
    }

    withSkip(skip: number) {
        this.request.body.skip = skip;
        return this;
    }

    withTake(take: number) {
        this.request.body.take = take;
        return this;
    }

    withOrderBy(orderBy: any) {
        this.request.body.orderBy = orderBy;
        return this;
    }

    withAuthorization(authorization: any) {
        this.request.body.authorization = authorization;
        return this;
    }

    get() {
        return this.request;
    }
}