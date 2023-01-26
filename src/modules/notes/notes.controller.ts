import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/create')
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Get('/user/:id')
  findUserNotes(@Param('id') id: string) {
    return this.notesService.findUserNotes(+id);
  }

  @Get('/details/:id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }
  @Get('/link/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.notesService.findOneBySlug(slug);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.updateNote(+id, updateNoteDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.notesService.removeNote(+id);
  }
}
