import { Args, Query, Resolver } from '@nestjs/graphql';
import { PartnerModel } from '../graphql/dtos/models/partner.model';

@Resolver()
export class LoadPartnerByIdResolver {
  @Query(() => PartnerModel)
  async loadPartnerById(
    @Args('partnerId', { type: () => String }) partnerId: string,
  ) {
    return {
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001',
      coverageArea: {
        type: 'MultiPolygon',
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
      },
      address: {
        type: 'Point',
        coordinates: [-46.57421, -21.785741],
      },
    };
  }
}
