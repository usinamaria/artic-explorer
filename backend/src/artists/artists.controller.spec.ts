import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

describe('ArtistsController', () => {
  let controller: ArtistsController;
  let service: ArtistsService;

  const mockArtistResponse = {
    data: {
      id: 2,
      title: 'Vincent van Gogh',
      birth_date: '1853',
      death_date: '1890',
    },
  };

  const mockArtworksResponse = {
    data: [
      {
        id: 20684,
        title: 'The Bedroom',
        artist_display: 'Vincent van Gogh',
        date_display: '1888',
        image_id: '52a3ee30-e951-446b-82b1-0467adc61435',
      },
      {
        id: 14079,
        title: 'Starry Night',
        artist_display: 'Vincent van Gogh',
        date_display: '1889',
        image_id: '29653a91-0e58-44ac-a47b-dd666150146f',
      },
    ],
    pagination: {
      total: 50,
      limit: 12,
      page: 1,
      total_pages: 5,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistsController],
      providers: [
        {
          provide: ArtistsService,
          useValue: {
            getArtistById: jest.fn().mockResolvedValue(mockArtistResponse),
            getArtworksByArtistId: jest.fn().mockResolvedValue(mockArtworksResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtistsController>(ArtistsController);
    service = module.get<ArtistsService>(ArtistsService);
  });

  describe('welcome', () => {
    it('should return welcome message with available endpoints', () => {
      const result = controller.welcome();
      expect(result).toEqual({
        message: 'Artic Explorer API',
        endpoints: {
          artist: 'GET /artists/:id',
          artworks: 'GET /artists/:id/artworks',
        },
      });
    });

    it('should provide correct endpoint documentation', () => {
      const result = controller.welcome();
      expect(result.endpoints).toBeDefined();
      expect(result.endpoints.artist).toBe('GET /artists/:id');
      expect(result.endpoints.artworks).toBe('GET /artists/:id/artworks');
    });
  });

  describe('test', () => {
    it('should return a test artist object', () => {
      const result = controller.test();
      expect(result).toEqual({
        id: 1,
        title: 'Test Artist',
        birth_date: '1900',
        death_date: '1980',
      });
    });

    it('should have all required test artist properties', () => {
      const result = controller.test();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('birth_date');
      expect(result).toHaveProperty('death_date');
    });
  });

  describe('getArtist', () => {
    it('should return artist data by id', async () => {
      const id = '2';
      const result = await controller.getArtist(id);
      expect(result).toEqual(mockArtistResponse);
      expect(service.getArtistById).toHaveBeenCalledWith(id);
    });

    it('should call service with correct artist id', async () => {
      const id = '42';
      await controller.getArtist(id);
      expect(service.getArtistById).toHaveBeenCalledWith('42');
    });

    it('should handle different id formats', async () => {
      const id = 'abc-123-def';
      await controller.getArtist(id);
      expect(service.getArtistById).toHaveBeenCalledWith(id);
    });
  });

  describe('getArtworksByArtist', () => {
    it('should return artworks by artist id', async () => {
      const id = '2';
      const result = await controller.getArtworksByArtist(id);
      expect(result).toEqual(mockArtworksResponse);
      expect(service.getArtworksByArtistId).toHaveBeenCalledWith(id);
    });

    it('should call service with correct artist id', async () => {
      const id = '2';
      await controller.getArtworksByArtist(id);
      expect(service.getArtworksByArtistId).toHaveBeenCalledWith(id);
    });

    it('should return paginated results', async () => {
      const id = '2';
      const result = await controller.getArtworksByArtist(id);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.pagination).toBeDefined();
      expect(result.pagination).toHaveProperty('total');
      expect(result.pagination).toHaveProperty('page');
      expect(result.pagination).toHaveProperty('total_pages');
    });

    it('should return multiple artworks', async () => {
      const id = '2';
      const result = await controller.getArtworksByArtist(id);
      expect(result.data.length).toBeGreaterThan(0);
    });
  });
});
