import { Controller, Get, Param } from "@nestjs/common";
import { ArtistsService } from "./artists.service";

@Controller()
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  welcome() {
    return {
      message: "Artic Explorer API",
      endpoints: {
        artist: "GET /artists/:id",
        artworks: "GET /artists/:id/artworks"
      }
    };
  }

  @Get("test")
  test() {
    return {
      id: 1,
      title: "Test Artist",
      birth_date: "1900",
      death_date: "1980"
    };
  }

  @Get("artists/:id/artworks")
  getArtworksByArtist(@Param("id") id: string) {
    return this.artistsService.getArtworksByArtistId(id);
  }

  @Get("artists/:id")
  getArtist(@Param("id") id: string) {
    return this.artistsService.getArtistById(id);
  }
}