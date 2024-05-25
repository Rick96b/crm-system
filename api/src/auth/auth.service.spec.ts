import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DeepMockProxy, MockProxy, mockDeep } from 'jest-mock-extended';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma.service'; 
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let authService: AuthService;
  let authController: AuthController;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let jwtMock: DeepMockProxy<JwtService>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    jwtMock = mockDeep<JwtService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
        {
          provide: JwtService,
          useValue: jwtMock
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = new AuthController(authService);

    prismaMock.user.findUnique.mockClear();
    prismaMock.user.findMany.mockClear();

    jwtMock.sign.mockClear();
  }); 

  describe('login', () => {
    it('should return users token', async () => {
      // let authService: AuthService;

      // const prismaMock: MockProxy<Pick<PrismaClient['user'], 'findUnique' 
      //                 |'update'>> = mock();
      
      const testJohnDb = {
        id: 1,
        login: 'johnd',
        password: await argon2.hash('djohn'),
        email: 'johndoe@mail.ru'
      }

      const testJohn = {
        id: 1,
        login: 'johnd',
        password: 'djohn',
        email: 'johndoe@mail.ru'
      }

      prismaMock.user.findUnique.mockResolvedValue(testJohnDb);
      
      const result = await authService.login(testJohn)
      const payload = { email: testJohn.email, id: testJohn.id };
      let token = jwtMock.sign(payload)
      console.log(result, token)
      expect(result).toEqual(token);
      expect(prismaMock.user.findUnique).toBeCalledTimes(1);
      expect(prismaMock.user.findUnique).toBeCalledWith({
        where: { id: testJohn.id },
      });
      

    })
  })

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
