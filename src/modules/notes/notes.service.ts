import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}
  async createNote(createNoteDto: CreateNoteDto) {
    const { title, content, user_id }: CreateNoteDto = createNoteDto;

    //check validity of a user

    const user = await this.prismaService.user.findUnique({
      where: { id: user_id },
    });

    if (!user)
      throw new NotFoundException(`Theres no user with this id ${user_id} `);

    //check if title is defined

    const subject = title !== undefined ? title : content.slice(0, 14);

    // create content

    await this.prismaService.notes.create({
      data: {
        content,
        title,
        user_id,
      },
    });

    return 'This action adds a new note';
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
