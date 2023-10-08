import { Point } from '@/core/types/geo-json';
import { makePartner } from 'test/factories/make-partner';
import { InMemoryPartnersRepository } from 'test/repositories/in-memory-partners.repository';
import { CoverageArea } from '../../enterprise/entities/value-objects/coverage-area';
import { LocationOutsideCoverageAreasError } from './errors/location-outside-coverage-areas.error';
import { SearchNearestPartnerUseCase } from './search-nearest-partner';

describe('SearchNearestPartnerUseCase', () => {
  let sut: SearchNearestPartnerUseCase;
  let inMemoryPartnersRepository: InMemoryPartnersRepository;

  beforeEach(() => {
    inMemoryPartnersRepository = new InMemoryPartnersRepository();
    sut = new SearchNearestPartnerUseCase(inMemoryPartnersRepository);
  });

  describe('when there is one partner', () => {
    it('should return an error if the the given location is outside partners coverage area', async () => {
      const pointOutside: Point = [50, 50];

      const result = await sut.execute({
        long: pointOutside[0],
        lat: pointOutside[1],
      });

      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(LocationOutsideCoverageAreasError);
    });

    it('should return the nearest partner given location inside coverage area', async () => {
      const partner = makePartner({
        coverageArea: CoverageArea.create({
          coordinates: [
            [
              [
                [30, 20],
                [45, 40],
                [10, 40],
                [30, 20],
              ],
            ],
            [
              [
                [15, 5],
                [40, 10],
                [10, 20],
                [5, 10],
                [15, 5],
              ],
            ],
          ],
        }),
      });
      await inMemoryPartnersRepository.create(partner);

      const pointInside: Point = [20, 30];

      const result = await sut.execute({
        long: pointInside[0],
        lat: pointInside[1],
      });

      expect(result.isRight()).toBeTruthy();

      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(partner.document);
      }
    });
  });

  describe('when there are two partners (A, B)', () => {
    beforeEach(async () => {
      const partnerA = makePartner({
        document: 'doc-1',
        coverageArea: CoverageArea.create({
          coordinates: [
            [
              [
                [0, 0],
                [7, 2],
                [5, 5],
                [2, 3],
                [0, 0],
              ],
            ],
            [
              [
                [5, 5],
                [8, 8],
                [6, 11],
                [3, 10],
                [5, 5],
              ],
            ],
            [
              [
                [8, 0],
                [11, 2],
                [11, 4],
                [9, 2],
                [8, 0],
              ],
            ],
          ],
        }),
      });
      const partnerB = makePartner({
        document: 'doc-2',
        coverageArea: CoverageArea.create({
          coordinates: [
            [
              [
                [4, 2],
                [10, 2],
                [9, 6],
                [3, 6],
                [4, 2],
              ],
            ],
            [
              [
                [7, 7],
                [11, 9],
                [9, 12],
                [6, 10],
                [7, 7],
              ],
            ],
            [
              [
                [0, 4],
                [3, 6],
                [1, 8],
                [0, 6],
                [0, 4],
              ],
            ],
          ],
        }),
      });
      await inMemoryPartnersRepository.create(partnerA);
      await inMemoryPartnersRepository.create(partnerB);
    });

    test('inside A and closer to it', async () => {
      const point: Point = [1, 1];

      const result = await sut.execute({
        long: point[0],
        lat: point[1],
      });

      expect(result.isRight()).toBeTruthy();
      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(
          inMemoryPartnersRepository.items[0].document,
        );
      }
    });

    test('inside A but closer to B', async () => {
      const point: Point = [6, 5];

      const result = await sut.execute({
        long: point[0],
        lat: point[1],
      });

      expect(result.isRight()).toBeTruthy();
      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(
          inMemoryPartnersRepository.items[1].document,
        );
      }
    });

    test('inside B and closer to it', async () => {
      const point: Point = [8.5, 3.5];

      const result = await sut.execute({
        long: point[0],
        lat: point[1],
      });

      expect(result.isRight()).toBeTruthy();
      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(
          inMemoryPartnersRepository.items[1].document,
        );
      }
    });

    test('inside B but closer to A', async () => {
      const point: Point = [4.5, 2.5];

      const result = await sut.execute({
        long: point[0],
        lat: point[1],
      });

      expect(result.isRight()).toBeTruthy();
      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(
          inMemoryPartnersRepository.items[0].document,
        );
      }
    });

    test('inside both and closer to A', async () => {
      const point: Point = [5, 4];

      const result = await sut.execute({
        long: point[0],
        lat: point[1],
      });

      expect(result.isRight()).toBeTruthy();
      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(
          inMemoryPartnersRepository.items[0].document,
        );
      }
    });

    test('inside both and closer to B', async () => {
      const point: Point = [8, 5];

      const result = await sut.execute({
        long: point[0],
        lat: point[1],
      });

      expect(result.isRight()).toBeTruthy();
      if (result.isRight()) {
        expect(result.value.nearestPartner.document).toEqual(
          inMemoryPartnersRepository.items[1].document,
        );
      }
    });

    test('outside both', async () => {
      const pointOutside: Point = [12, 13];

      const result = await sut.execute({
        long: pointOutside[0],
        lat: pointOutside[1],
      });

      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(LocationOutsideCoverageAreasError);
    });
  });
});
