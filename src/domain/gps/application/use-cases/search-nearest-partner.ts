import { Point } from '@/core/types/geo-json';
import { calculateEuclideanDistance } from '@/domain/gps/utils/calculate-euclidean-distance';
import { calculateMultiPolygonCentroid } from '@/domain/gps/utils/calculate-multi-polygon-centroid';
import { Partner } from '../../enterprise/entities/partner';
import { PartnersRepository } from '../repositories/partners.repository';
import { Either, left, right } from '@/core/errors/either';
import { LocationOutsideCoverageAreasError } from './errors/location-outside-coverage-areas.error';

interface SearchNearestPartnerUseCaseRequest {
  long: number;
  lat: number;
}

type SearchNearestPartnerUseCaseResponse = Either<
  LocationOutsideCoverageAreasError,
  { nearestPartner: Partner }
>;

export class SearchNearestPartnerUseCase {
  constructor(private readonly partnersRepository: PartnersRepository) {}

  async execute({
    long,
    lat,
  }: SearchNearestPartnerUseCaseRequest): Promise<SearchNearestPartnerUseCaseResponse> {
    const location: Point = [long, lat];
    let nearestPartner: Partner | null = null;
    let shortestDistance: number = Infinity;

    const partners = await this.partnersRepository.findManyByLocation({
      long,
      lat,
    });

    if (partners.length === 0) {
      return left(new LocationOutsideCoverageAreasError());
    }

    for (const partner of partners) {
      // Calculate the centroid of the partner's coverage area
      const centroid = calculateMultiPolygonCentroid(
        partner.coverageArea.getCoordinates(),
      );

      // Calculate the distance from the location to the centroid
      const distance = calculateEuclideanDistance(location, centroid);

      // Update the nearest partner and shortest distance if necessary
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestPartner = partner;
      }
    }

    return right({ nearestPartner: nearestPartner! });
  }
}
