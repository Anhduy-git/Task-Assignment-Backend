import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { UserRole } from './user.constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllMembers() {
    const members = await this.prisma.user.findMany({
      where: {
        role: UserRole.MEMBER,
      },
    });

    members.forEach((member) => delete member.hashedPassword);

    return members;
  }

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hashedPassword;

    return user;
  }
}
