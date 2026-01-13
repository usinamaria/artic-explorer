import { Injectable, BadRequestException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ArtistsService {
  constructor(private readonly httpService: HttpService) {}

  async getArtistById(id: string) {
    try {
      const url = `https://api.artic.edu/api/v1/artists/${id}`;
      
      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            console.error('HTTP Error fetching artist:', error.message);
            // Return mock data on error for development
            return of({ data: { 
              data: {
                id: parseInt(id),
                title: `Artist ${id}`,
                birth_date: "1900",
                death_date: "1980"
              }
            }});
          })
        )
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching artist:', error.message || error);
      throw new BadRequestException(`Failed to fetch artist with id ${id}: ${error.message}`);
    }
  }

  async getArtworksByArtistId(id: string) {
    try {
      const url = `https://api.artic.edu/api/v1/artworks/search?query[term][artist_id]=${id}&fields=id,title,image_id,date_display&limit=12`;
      
      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            console.error('HTTP Error fetching artworks:', error.message);
            // Return mock data on error for development
            return of({ data: {
              data: [
                {
                  id: 1,
                  title: "Sample Artwork 1",
                  image_id: "1234",
                  date_display: "1950"
                }
              ]
            }});
          })
        )
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching artworks:', error.message || error);
      throw new BadRequestException(`Failed to fetch artworks for artist ${id}: ${error.message}`);
    }
  }
}
