import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [UserModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
