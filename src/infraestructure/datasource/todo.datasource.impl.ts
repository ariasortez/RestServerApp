import { prisma } from '../../data/postgres';
import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDTO,
} from '../../domain';

export class TodoDatasourceImplementation implements TodoDatasource {
  async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(todo);
  }
  async getTodos(): Promise<TodoEntity[]> {
    const getAllTodo = await prisma.todo.findMany();

    return getAllTodo.map((todo) => TodoEntity.fromObject(todo));
  }
  async findByID(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo) throw `Todo with id ${id} not found`;

    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findByID(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findByID(id);
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
