import { CreateTodoDTO, UpdateTodoDTO } from '../dtos';
import { TodoEntity } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDTO): Promise<TodoEntity>;

  abstract getTodos(): Promise<TodoEntity[]>;
  abstract findByID(id: number): Promise<TodoEntity>;

  abstract updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity>;

  abstract deleteById(id: number): Promise<TodoEntity>;
}
