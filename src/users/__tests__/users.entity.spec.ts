import { User } from '../entities/user.entity';

describe('Users.entity', () => {
  const user: User = {
    id: 0,
    email: '',
    password: '',
    created_at: new Date(),
    updated_at: new Date(),
    projects: [],
  };

  it('should be defined', () => {
    expect(user).toBeDefined();
  });

  it('should have the correct types', () => {
    expect(typeof user.id).toBe('number');
    expect(typeof user.email).toBe('string');
    expect(typeof user.password).toBe('string');
    expect(user.created_at instanceof Date).toBe(true);
    expect(user.updated_at instanceof Date).toBe(true);
    expect(Array.isArray(user.projects)).toBe(true);
  });
});
