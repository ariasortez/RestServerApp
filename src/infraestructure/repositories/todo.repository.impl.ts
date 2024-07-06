import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDTO,
} from '../../domain';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getTodos(): Promise<TodoEntity[]> {
    return this.datasource.getTodos();
  }
  findByID(id: number): Promise<TodoEntity> {
    return this.datasource.findByID(id);
  }
  updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
