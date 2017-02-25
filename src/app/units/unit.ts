export class Units {

  constructor(public unitTypeAreas: Array<UnitTypeArea>, public prefixes: Array<Prefix>) { }

  static fromObject(src: Object): Units {
    let unitTypeAreas = new Array<UnitTypeArea>();
    src['unitTypeAreas'].forEach(unitTypeArea => unitTypeAreas.push(UnitTypeArea.fromObject(unitTypeArea)));
    let prefixes = new Array<Prefix>();
    src['prefixes'].forEach(prefix => prefixes.push(Prefix.fromObject(prefix)));
    let units = new Units(unitTypeAreas, prefixes);
    return units;
  }
}

export class UnitTypeArea {

  constructor(public index: string | Array<string>, public name: string, public units: Array<Unit>) { }

  static fromObject(src: Object): UnitTypeArea {
    let units = new Array<Unit>();
    src['units'].forEach(unit => units.push(Unit.fromObject(unit)));
    let unitTypeArea = new UnitTypeArea(src['index'], src['name'], units);
    return unitTypeArea;
  }
}

export class Unit {

  constructor(public name: string, public symbol: string, public notationIndex: string | Array<string>, public index: string | Array<string>, public description: string) { }

  static fromObject(src: Object): Unit {
    return new Unit(src['name'], src['symbol'], src['notationIndex'], src['index'], src['description']);
  }

  get symbolString(): string {
    return (typeof this.symbol === 'string' && this.symbol !== '1') ? this.symbol : '';
  }

  get notationIndexDecimal(): number {
    return typeof this.notationIndex === 'string' ? Number.parseInt(this.notationIndex, 16) : 0;
  }
}

export class Prefix {

  constructor(public prefix: string, public symbol: string, public factor: string, public notationIndex: string | Array<string>) { }

  static fromObject(src: Object): Prefix {
    return new Prefix(src['prefix'], src['symbol'], src['factor'], src['notationIndex']);
  }

  get symbolString(): string {
    return (typeof this.symbol === 'string' && this.symbol != 'reserved') ? this.symbol : '';
  }

  get notationIndexDecimal(): number {
    return typeof this.notationIndex === 'string' ? Number.parseInt(this.notationIndex, 16) : 0;
  }
}
