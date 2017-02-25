export class EntryDescription {
  constructor(public subIndex: string, public access: string, public pdoMapping: string, public valueRange: string, public defaultValue: string) { }
}

export class ObjectDescription {
  constructor(public index: string, public name: string, public objectCode: string, public dataType: string, public category: string) { }
}

export class ProfileObject {
  constructor(public description: string, public valueDefinition: string, public objectDescription: ObjectDescription, public entryDescription: Array<EntryDescription>) { }
}

export class Profile {
  constructor(public name: string, public series: number, public description: string, public link: string, public objects: Array<ProfileObject>) { }
}
