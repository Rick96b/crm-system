import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = new AuthController(authService);
  }); 

  // describe('login', () => {
  //   it('should login a user', async () => {
  //     const result = ['test'];
  //     jest.spyOn(authService, 'login').mockImplementation(() => result);

  //     expect(await authController.signIn()).toBe(result);
  //   })
  // })

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
