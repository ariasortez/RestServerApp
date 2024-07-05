import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO } from '../../domain/dtos';

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const getAllTodo = await prisma.todo.findMany();

    return res.status(200).json(getAllTodo);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { text, completedAt },
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    res.status(200).json(`The record ${deletedTodo} has been deleted`);
  };
}
