import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthSignInDto, AuthSignUpDto } from '../src/auth/dto';
import { CreateTaskDto, EditTaskDto } from '../src/task/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3008);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3008');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const signUpDto: AuthSignUpDto = {
      email: 'anhduydp123@gmail.com',
      password: 'anhduy123',
      firstName: 'Duy',
      lastName: 'Anh',
      role: 0,
    };
    const signInDto: AuthSignInDto = {
      email: 'anhduydp123@gmail.com',
      password: 'anhduy123',
    };
    describe('Signup', () => {
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signUpDto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: signInDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: signInDto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signInDto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .expectStatus(200)
          .stores('userId', 'id');
      });
    });

    describe('Get all members', () => {
      it('should get all members', () => {
        return pactum
          .spec()
          .get('/users/members')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Tri',
          lastName: 'Anh',
        };
        return pactum
          .spec()
          .patch('/users/{id}')
          .withPathParams('id', '$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Tasks', () => {
    describe('Get tasks of a user', () => {
      it('should get tasks of a user', () => {
        return pactum
          .spec()
          .get('/tasks?userId=$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .expectStatus(200);
      });
    });
    describe('Get all tasks', () => {
      it('should get all tasks', () => {
        return pactum
          .spec()
          .get('/tasks')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .expectStatus(200);
      });
    });

    describe('Create a task', () => {
      const userId = pactum.parse('$S{userId}');
      const dto: CreateTaskDto = {
        userId,
        title: 'Lam viec nha',
        description: 'lam het',
        deadline: new Date(),
        priority: 100,
      };
      it('should create new task', () => {
        return pactum
          .spec()
          .post('/tasks')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('taskId', 'id');
      });
    });

    describe('Edit task by id', () => {
      const dto: EditTaskDto = {
        title: 'Hoc bai',
        description: 'Hoc javascript',
      };
      it('should edit task', () => {
        return pactum
          .spec()
          .patch('/tasks/{id}')
          .withPathParams('id', '$S{taskId}')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Delete task by id', () => {
      it('should delete task', () => {
        return pactum
          .spec()
          .delete('/tasks/{id}')
          .withPathParams('id', '$S{taskId}')
          .withHeaders({
            Authorization: 'Bearer $S{token}',
          })
          .expectStatus(204);
      });
    });
  });
});
