import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Address } from './value-objects/address';
import { CoverageArea } from './value-objects/coverage-area';

export interface PartnerProps {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageArea;
  address: Address;
}

export class Partner extends Entity<PartnerProps> {
  get tradingName(): string {
    return this.props.tradingName;
  }

  set tradingName(tradingName: string) {
    this.props.tradingName = tradingName;
  }

  get ownerName(): string {
    return this.props.ownerName;
  }

  set ownerName(ownerName: string) {
    this.props.ownerName = ownerName;
  }

  get document(): string {
    return this.props.document;
  }

  set document(document: string) {
    this.props.document = document;
  }

  get coverageArea(): CoverageArea {
    return this.props.coverageArea;
  }

  get address(): Address {
    return this.props.address;
  }

  static create(props: PartnerProps, id?: UniqueEntityID): Partner {
    const partner = new Partner(props, id);

    return partner;
  }
}
