/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name
 */

import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { ClassroomInput } from '../types';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   get:
 *     summary: Get the list of classrooms
 *     responses:
 *       200:
 *         description: The list of classrooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Classroom'
 */
classroomRouter.get('/', async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const classrooms = await classroomService.getAllClassrooms();
        res.json(classrooms);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /classrooms:
 *  post:
 *      summary: Create a new classroom
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          description: Classroom name
 *                      required:
 *                        - name
 *      responses:
 *          201:
 *              description: The created classroom.
 */

classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroomInput = <ClassroomInput>req.body;
        const classroom = await classroomService.createClassroom(classroomInput.name);
        res.status(201).json(classroom);
    } catch (err) {
        next(err);
    }
});

export default classroomRouter;