import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ArtworksController } from "./artworks.controller";
import { ArtworksService } from "./artworks.service";

@Module({
  imports: [HttpModule],
  controllers: [ArtworksController],
  providers: [ArtworksService],
})
export class ArtworksModule {}
