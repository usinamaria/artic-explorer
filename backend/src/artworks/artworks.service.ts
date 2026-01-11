import { Injectable, BadRequestException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ArtworksService {
  private readonly baseUrl = "https://api.artic.edu/api/v1";

  constructor(private readonly httpService: HttpService) {}

  async getArtworks(limit: number = 10, page: number = 1) {
    try {
      const url = `${this.baseUrl}/artworks?limit=${limit}&page=${page}&fields=id,title,artist_display,date_display,image_id,is_public_domain`;
      console.log("Fetching artworks from:", url);

      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            console.error("HTTP Error fetching artworks:", error.message);
            // Return mock data on error for development
            return of({
              data: {
                data: [
                  {
                    id: 1,
                    title: "Sample Artwork 1",
                    artist_display: "Sample Artist",
                    date_display: "1950",
                    image_id: "1234",
                    is_public_domain: true,
                  },
                  {
                    id: 2,
                    title: "Sample Artwork 2",
                    artist_display: "Sample Artist",
                    date_display: "1960",
                    image_id: "5678",
                    is_public_domain: true,
                  },
                ],
                pagination: {
                  total: 2,
                  limit,
                  page,
                  total_pages: 1,
                },
              },
            });
          })
        )
      );

      return response.data;
    } catch (error: any) {
      console.error("Error fetching artworks:", error.message || error);
      throw new BadRequestException(
        `Failed to fetch artworks: ${error.message}`
      );
    }
  }

  async searchArtworks(query: string, limit: number = 10) {
    try {
      const url = `${this.baseUrl}/artworks/search?q=${encodeURIComponent(query)}&limit=${limit}&fields=id,title,artist_display,date_display,image_id,is_public_domain`;
      console.log("Searching artworks:", url);

      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            console.error("HTTP Error searching artworks:", error.message);
            // Return mock data on error for development
            return of({
              data: {
                data: [
                  {
                    id: 1,
                    title: `Search result for "${query}"`,
                    artist_display: "Sample Artist",
                    date_display: "1950",
                    image_id: "1234",
                    is_public_domain: true,
                  },
                ],
              },
            });
          })
        )
      );

      return response.data;
    } catch (error: any) {
      console.error("Error searching artworks:", error.message || error);
      throw new BadRequestException(
        `Failed to search artworks: ${error.message}`
      );
    }
  }

  async getPublicDomainArtworks(limit: number = 10, page: number = 1) {
    try {
      const url = `${this.baseUrl}/artworks/search?query[term][is_public_domain]=true&limit=${limit}&page=${page}&fields=id,title,artist_display,date_display,image_id`;
      console.log("Fetching public domain artworks from:", url);

      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            console.error(
              "HTTP Error fetching public domain artworks:",
              error.message
            );
            // Return mock data on error for development
            return of({
              data: {
                data: [
                  {
                    id: 1,
                    title: "The Great Wave",
                    artist_display: "Hokusai",
                    date_display: "1831",
                    image_id: "2d484387-2509-5e8e-2c43-22f9981972eb",
                  },
                  {
                    id: 2,
                    title: "Starry Night",
                    artist_display: "Vincent van Gogh",
                    date_display: "1889",
                    image_id: "3d484387-2509-5e8e-2c43-22f9981972ec",
                  },
                ],
              },
            });
          })
        )
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching public domain artworks:",
        error.message || error
      );
      throw new BadRequestException(
        `Failed to fetch public domain artworks: ${error.message}`
      );
    }
  }

  async getArtworkById(id: string) {
    try {
      const url = `${this.baseUrl}/artworks/${id}?fields=id,title,artist_display,date_display,image_id,description,medium_display`;
      console.log("Fetching artwork from:", url);

      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            console.error("HTTP Error fetching artwork:", error.message);
            return of({
              data: {
                data: {
                  id,
                  title: `Artwork ${id}`,
                  artist_display: "Sample Artist",
                  date_display: "1950",
                  image_id: "1234",
                  description: "Sample artwork description",
                  medium_display: "Oil on canvas",
                },
              },
            });
          })
        )
      );

      return response.data;
    } catch (error: any) {
      console.error("Error fetching artwork:", error.message || error);
      throw new BadRequestException(
        `Failed to fetch artwork with id ${id}: ${error.message}`
      );
    }
  }
}
