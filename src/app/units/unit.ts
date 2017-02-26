import * as _ from 'lodash';

export class Units {
  constructor(public unitTypeAreas: Array<UnitTypeArea>, public prefixes: Array<Prefix>, public predefinedUnits: Array<UnitValue>) { }

  predefinedUnitToUnitValue(predefinedUnit: string): UnitValue {
    let unitValue = new UnitValue(null, null, null);
    if (this.prefixes) {
      let notationIndex = Number.parseInt(predefinedUnit.substr(2, 2), 16);
      unitValue.prefix = this.prefixes.find(prefix => Number.parseInt(prefix.notationIndex.toString(), 16) === notationIndex);
    }
    if (this.unitTypeAreas) {
      let units = _.chain(this.unitTypeAreas).map('units').flatten().value() as Array<Unit>;
      let numeratorNotationIndex = Number.parseInt(predefinedUnit.substr(4, 2), 16);
      unitValue.numerator = units.find(unit => Number.parseInt(unit.notationIndex.toString(), 16) === numeratorNotationIndex);
      let denominatorNotationIndex = Number.parseInt(predefinedUnit.substr(6, 2), 16);
      unitValue.denominator = units.find(unit => Number.parseInt(unit.notationIndex.toString(), 16) === denominatorNotationIndex);
    }
    return unitValue;
  }

  static fromObject(src: Object): Units {
    let unitTypeAreas = new Array<UnitTypeArea>();
    src['unitTypeAreas'].forEach(unitTypeArea => unitTypeAreas.push(UnitTypeArea.fromObject(unitTypeArea)));
    let prefixes = new Array<Prefix>();
    src['prefixes'].forEach(prefix => prefixes.push(Prefix.fromObject(prefix)));
    let units = new Units(unitTypeAreas, prefixes, null);
    let predefinedUnits = new Array<UnitValue>();
    src['predefinedUnits'].forEach(predefinedUnit => predefinedUnits.push(units.predefinedUnitToUnitValue(predefinedUnit)));
    units.predefinedUnits = predefinedUnits;
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
    return (typeof this.symbol === 'string') ? this.symbol : '';
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

export class UnitValue {
  constructor(public prefix: Prefix, public numerator: Unit, public denominator: Unit) { }

  get index(): string {
    let index = "#x00000000";
    if (this.prefix) {
      index = index.substr(0, 2) + _.padStart(this.prefix.notationIndexDecimal.toString(16).toUpperCase(), 2, '0') + index.substr(4);
    }
    if (this.numerator) {
      index = index.substr(0, 4) + _.padStart(this.numerator.notationIndexDecimal.toString(16).toUpperCase(), 2, '0') + index.substr(6);
    }
    if (this.denominator) {
      index = index.substr(0, 6) + _.padStart(this.denominator.notationIndexDecimal.toString(16).toUpperCase(), 2, '0') + index.substr(8);
    }
    return index;
  }

  get symbol(): string {
    let symbol = '';
    if (this.prefix) {
      symbol += this.prefix.symbolString;
    }
    if (this.numerator) {
      symbol += this.numerator.symbolString;
    }
    if (this.denominator) {
      if (this.numerator && this.numerator.symbolString && this.denominator.symbolString) {
        symbol += '/';
      }
      symbol += this.denominator.symbolString;
    }
    return symbol;
  }
}
