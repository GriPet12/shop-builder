import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SitesModule } from './sites/sites.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, UsersModule, SitesModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
