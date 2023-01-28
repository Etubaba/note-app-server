import { Injectable, NotFoundException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
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

    //check if title is not defined

    const subject = title !== undefined ? title : content.slice(0, 14);

    //generate slug

    //generate slug from title
    function convertToSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
    const slug: string = convertToSlug(subject);
    // create content

    await this.prismaService.notes.create({
      data: {
        content,
        title: subject,
        slug: slug,
        user_id,
      },
    });

    return { status: true, message: 'Note Created Successfully' };
  }

  async findUserNotes(id: number) {
    //validate user Id
    const userNotes = await this.prismaService.notes.findMany({
      where: {
        user_id: id,
      },
    });
    return { status: true, data: userNotes };
  }

  async findOne(id: number) {
    //check if note exist
    const note = await this.prismaService.notes.findUnique({
      where: {
        id,
      },
    });

    if (!note) throw new NotFoundException(`Note with id: ${id} not Found `);

    return { status: true, message: `Note Fetched successfully`, data: note };
  }
  async findOneBySlug(slug: string) {
    //check if note exist #####
    const note = await this.prismaService.notes.findFirst({
      where: {
        slug,
      },
    });

    if (!note) throw new NotFoundException(`Note  not Found `);

    return { status: true, message: `Note Fetched successfully`, data: note };
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto) {
    const { title, content, user_id } = updateNoteDto;

    //validate user Id
    const user = await this.prismaService.notes.findUnique({
      where: {
        id: user_id,
      },
    });

    // if (!user) throw new NotFoundException(`User not Found `);

    //check if note exist and validate note belongs to the user
    const note = await this.prismaService.notes.findUnique({
      where: {
        id,
      },
    });

    if (!note) throw new NotFoundException(`Note with id: ${id} not Found `);

    if (note.user_id !== user_id)
      throw new NotAcceptableException(
        ' You cannot edit note you did not post',
      );

    await this.prismaService.notes.update({
      where: {
        id,
      },
      data: {
        title: title !== undefined ? title : note.title,
        content,
      },
    });

    return { status: true, message: `Note updated successfull` };
  }

  async removeNote(id: number) {
    //check id validity
    const note = await this.prismaService.notes.findUnique({
      where: {
        id,
      },
    });

    if (!note) throw new NotFoundException(`No note with id :${id}`);

    await this.prismaService.notes.delete({
      where: {
        id,
      },
    });

    return { status: true, message: `Note with id:${id} deleted` };
  }
}
