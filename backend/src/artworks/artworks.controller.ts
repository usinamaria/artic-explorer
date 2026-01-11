import { Controller, Get, Param, Query } from "@nestjs/common";
import { ArtworksService } from "./artworks.service";

@Controller("artworks")
export class ArtworksController {
  constructor(private readonly artworksService: ArtworksService) {}

  @Get()
  getArtworks(
    @Query("limit") limit: string = "10",
    @Query("page") page: string = "1"
  ) {
    return this.artworksService.getArtworks(
      parseInt(limit),
      parseInt(page)
    );
  }

  @Get("search")
  searchArtworks(@Query("q") query: string) {
    if (!query) {
      return { error: "Query parameter is required" };
    }
    return this.artworksService.searchArtworks(query);
  }

  @Get("public-domain")
  getPublicDomainArtworks(
    @Query("limit") limit: string = "10",
    @Query("page") page: string = "1"
  ) {
    return this.artworksService.getPublicDomainArtworks(
      parseInt(limit),
      parseInt(page)
    );
  }

  @Get(":id")
  getArtworkById(@Param("id") id: string) {
    return this.artworksService.getArtworkById(id);
  }
}
