import { Module } from "@nestjs/common";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.register({})], 
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
