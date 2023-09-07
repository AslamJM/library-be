import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { Service } from './services/entities/service.entity';
import { AdminModule } from './admin/admin.module';
import { Login } from './admin/entities/logins.entity';
import { ConfigModule } from '@nestjs/config';

// const DATABASE_URL =
//   'mysql://4itp9qv89z9zusla0ie0:pscale_pw_KCaa4y8JnWYmmkLFJ2mcP5M7MwYh4D3OyJpjDWlCTn8@aws.connect.psdb.cloud/library-app?ssl={"rejectUnauthorized":true}';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'library_db',

      type: 'postgres',
      // host: 'aws.connect.psdb.cloud',
      // port: 3306,
      // username: '4itp9qv89z9zusla0ie0',
      // password: 'pscale_pw_KCaa4y8JnWYmmkLFJ2mcP5M7MwYh4D3OyJpjDWlCTn8',
      // database: 'library-app',
      url: 'postgres://aslam:7LOK0laoHn0Xq6Lh0LOzozW2uJKHOLPv@dpg-cjsmc3r6fquc739o25a0-a.oregon-postgres.render.com/libraryapp_5lvw',
      entities: [User, Service, Login],
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
      },
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
