import { Application } from "express";
import Router from 'express';
import { userRouter } from "./user.routes";
import { eventoRouter } from "./evento.routes";


export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/user', userRouter);
    apiRouter.use('/evento',eventoRouter);

    app.use('/api/v1', apiRouter);
}
