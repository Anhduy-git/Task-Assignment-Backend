import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditTaskDto, CreateTaskDto } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/?')
  getTasks(@Query('userId') userId: string) {
    if (userId) {
      return this.taskService.getTasksOfUser(parseInt(userId));
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  editTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto,
  ) {
    return this.taskService.editTaskById(taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.deleteTaskById(userId, taskId);
  }
}
