import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { ArtworksModule } from './artworks/artworks.module';

@Module({
  imports: [ArtistsModule, ArtworksModule],
})
export class AppModule {}
