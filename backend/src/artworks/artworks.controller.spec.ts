import { Test, TestingModule } from '@nestjs/testing';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';

describe('ArtworksController', () => {
  let controller: ArtworksController;
  let service: ArtworksService;

  const mockArtworksResponse = {
    data: [
      {
        id: 1,
        title: 'Test Artwork',
        artist_display: 'Test Artist',
        date_display: '2024',
        image_id: 'abc123',
        is_public_domain: true,
      },
    ],
    pagination: {
      total: 100,
      limit: 12,
      page: 1,
      total_pages: 9,
    },
  };

  const mockSearchResponse = {
    data: [
      {
        id: 21023,
        title: 'Buddha Shakyamuni Seated in Meditation',
        date_display: 'about 12th century',
        artist_display: 'India',
        is_public_domain: true,
        image_id: '0675f9a9-1a7b-c90a-3bb6-7f7be2afb678',
        _score: 4460.983,
      },
    ],
    pagination: {
      total: 932,
      limit: 12,
      offset: 0,
      total_pages: 78,
      current_page: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtworksController],
      providers: [
        {
          provide: ArtworksService,
          useValue: {
            getArtworks: jest.fn().mockResolvedValue(mockArtworksResponse),
            searchArtworks: jest.fn().mockResolvedValue(mockSearchResponse),
            getPublicDomainArtworks: jest
              .fn()
              .mockResolvedValue(mockArtworksResponse),
            getArtworkById: jest.fn().mockResolvedValue({
              data: mockArtworksResponse.data[0],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtworksController>(ArtworksController);
    service = module.get<ArtworksService>(ArtworksService);
  });

  describe('getArtworks', () => {
    it('should return artworks with default pagination', async () => {
      const result = await controller.getArtworks('12', '1');
      expect(result).toEqual(mockArtworksResponse);
      expect(service.getArtworks).toHaveBeenCalledWith(12, 1);
    });

    it('should parse string limit and page to integers', async () => {
      await controller.getArtworks('24', '2');
      expect(service.getArtworks).toHaveBeenCalledWith(24, 2);
    });

    it('should use default limit and page when not provided', async () => {
      await controller.getArtworks('12', '1');
      expect(service.getArtworks).toHaveBeenCalledWith(12, 1);
    });
  });

  describe('searchArtworks', () => {
    it('should return search results when query is provided', async () => {
      const query = 'Buddha';
      const result = await controller.searchArtworks(query, '12', '0');
      expect(result).toEqual(mockSearchResponse);
      expect(service.searchArtworks).toHaveBeenCalledWith(query, 12, 0);
    });

    it('should return error when query is missing', async () => {
      const result = await controller.searchArtworks('', '12', '0');
      expect(result).toEqual({ error: 'Query parameter is required' });
      expect(service.searchArtworks).not.toHaveBeenCalled();
    });

    it('should parse limit and offset parameters correctly', async () => {
      const query = 'test';
      await controller.searchArtworks(query, '24', '12');
      expect(service.searchArtworks).toHaveBeenCalledWith(query, 24, 12);
    });

    it('should use default limit and offset when not provided', async () => {
      const query = 'test';
      await controller.searchArtworks(query, '12', '0');
      expect(service.searchArtworks).toHaveBeenCalledWith(query, 12, 0);
    });
  });

  describe('getPublicDomainArtworks', () => {
    it('should return public domain artworks with default pagination', async () => {
      const result = await controller.getPublicDomainArtworks('12', '1');
      expect(result).toEqual(mockArtworksResponse);
      expect(service.getPublicDomainArtworks).toHaveBeenCalledWith(12, 1);
    });

    it('should parse string parameters to integers', async () => {
      await controller.getPublicDomainArtworks('20', '3');
      expect(service.getPublicDomainArtworks).toHaveBeenCalledWith(20, 3);
    });
  });

  describe('getArtworkById', () => {
    it('should return a single artwork by id', async () => {
      const id = '123';
      const result = await controller.getArtworkById(id);
      expect(result).toBeDefined();
      expect(service.getArtworkById).toHaveBeenCalledWith(id);
    });

    it('should handle different id formats', async () => {
      const id = 'abc-def-123';
      await controller.getArtworkById(id);
      expect(service.getArtworkById).toHaveBeenCalledWith(id);
    });
  });
});
