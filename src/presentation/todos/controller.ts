import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getTodos();
    return res.json(todos);
    console.log(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findByID(id);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body);

    const todo = await this.todoRepository.create(createTodoDto!);

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodo] = UpdateTodoDTO.create({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updateTodo!);

    return res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.deleteById(id);

    return res.json(deletedTodo);
  };
}
