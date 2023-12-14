import UserRepository, {
  type CreateUserDto,
  type RegisterUserDao,
} from '#domain/contracts/repositories/user_repository';

export default class InMemoryUserRepository implements UserRepository {
  readonly #users: RegisterUserDao[] = [];

  getAll(): Promise<RegisterUserDao[]> {
    return Promise.resolve(this.#users);
  }
  save(user: CreateUserDto): Promise<{ id: number }> {
    this.#users.push(user);
    return Promise.resolve({ id: user.id });
  }

  delete(id: number): Promise<{ id: number }> {
    const index = this.#users.findIndex((user) => user.id === id);
    if (index === -1) {
      return Promise.reject({ id });
    }
    this.#users.splice(index, 1);
    return Promise.resolve({ id });
  }
}
