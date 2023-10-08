import { UseCaseError } from '@/core/errors/use-case.error';

export class LocationOutsideCoverageAreasError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Location outside coverage areas');
  }
}
