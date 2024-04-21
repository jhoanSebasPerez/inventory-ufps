class Categoria {
  private id: number;
  private name: string;
  private description: string;
  private euipos: Equipo[];

  constructor(id: number, name: string, description: string, euipos: Equipo[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.euipos = euipos;
  }

  public addEquipo(equipo: Equipo) : void {
    this.euipos.push(equipo);
  } 

  removeEquipo(equipo: Equipo) : void{
    this.euipos = this.euipos.filter(e => e.getId() !== equipo.getId());
  }

  public getEquipos() : Equipo[]{
    return this.euipos;
  }

  public getEquipo(id: number) : Equipo | undefined{
    return this.euipos.find(e => e.getId() === id);
  }

  public getId() : number {
    return this.id;
  }

  public getName() : string {
    return this.name;
  }

  public getDescription() : string {
    return this.description;
  }

  public setId(id: number) : void {
    this.id = id;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public setDescription(description: string) : void {
    this.description = description;
  }

  public setEquipos(equipos: Equipo[]) : void {
    this.euipos = equipos;
  }

  public toString() : string {
    return this.name + " " + this.description + " " + this.euipos.toString();
  }
}


class Equipo {
  private id: number;
  private name: string;
  private description: string;
  private brand: string;
  private model: string;
  private category: Categoria;
  private quantity: number;
  private unidades: Unidad[];

  constructor(id: number, name: string, description: string, brand: string, model: string, category: Categoria, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.model = model;
    this.category = category;
    this.quantity = quantity;
    this.unidades = [];
  }

  public getId() : number {
    return this.id;
  }

  public getName() : string {
    return this.name;
  }

  public addUnidad(unidad: Unidad) : void {
    this.unidades.push(unidad);
  }

  public removeUnidad(unidad: Unidad) : void {
    this.unidades = this.unidades.filter(u => u.getSerialNumber() !== unidad.getSerialNumber());
  }

  public getUnidades() : Unidad[] {
    return this.unidades;
  }

  public getUnidad(serialNumber: string) : Unidad | undefined {
    return this.unidades.find(u => u.getSerialNumber() === serialNumber);
  }

  public getDescription() : string {
    return this.description;
  }

  public getBrand() : string {
    return this.brand;
  }

  public getModel() : string {
    return this.model;
  }

  public getCategory() : Categoria {
    return this.category;
  }

  public getQuantity() : number {
    return this.quantity;
  }

  public setId(id: number) : void {
    this.id = id;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public setDescription(description: string) : void {
    this.description = description;
  }

  public setBrand(brand: string) : void {
    this.brand = brand;
  }

  public setModel(model: string) : void {
    this.model = model;
  }

  public setCategory(category: Categoria) : void {
    this.category = category;
  }

  public setQuantity(quantity: number) : void {
    this.quantity = quantity;
  }

  public toString() : string {
    return this.name + " " + this.description + " " + this.brand + " " + this.model + " " + this.category.toString() + " " + this.quantity;
  }
}

enum Roles {
  ADMIN = "admin",
  OWNER = "user",
  JEFE_MANTENIMIENTO = "jefe_mantenimiento",
  ENCARGADO_MANTENIMIENTO = "encargado_mantenimiento",
}

enum States {
  BUENO = "bueno",
  MALO = "malo",
  REGULAR = "regular",
}

class Usuario {
  private codigo: string;
  private name: string;
  private email: string;
  private password: string;
  private role: Roles;

  constructor(codigo: string, name: string, email: string, password: string, role: Roles) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public getCodigo() : string {
    return this.codigo;
  }

  public getName() : string {
    return this.name;
  }

  public getEmail() : string {
    return this.email;
  }

  public getPassword() : string {
    return this.password;
  }

  public getRole() : Roles {
    return this.role;
  }

  public setCodigo(codigo: string) : void {
    this.codigo = codigo;
  }

  public setName(name: string) : void {
    this.name = name;
  }

  public setEmail(email: string) : void {
    this.email = email;
  }

  public setPassword(password: string) : void {
    this.password = password;
  }

  public setRole(role: Roles) : void {
    this.role = role;
  }

  public toString() : string {
    return this.name + " " + this.email + " " + this.password + " " + this.role;
  }
}

class Oficina {
  private id: number;
  private location: string;
  private description: string;

  constructor(location: string, description: string) {
    this.location = location;
    this.description = description;
  }

  public getLocation() : string {
    return this.location;
  }

  public getDescription() : string {
    return this.description;
  }

  public setLocation(location: string) : void {
    this.location = location;
  }

  public setDescription(description: string) : void {
    this.description = description;
  }

  public toString() : string {
    return this.location + " " + this.description;
  }
}

class Unidad {
  private serialNumber: string;
  private equipment: Equipo;
  private state: States;
  private office: Oficina;
  private owner: Usuario;

  constructor(serialNumber: string, equipment: Equipo, state: States, office: Oficina, owner: Usuario) {
    this.serialNumber = serialNumber;
    this.equipment = equipment;
    this.state = state;
    this.office = office;
    this.owner = owner;
  }

  public getSerialNumber() : string {
    return this.serialNumber;
  }

  public getEquipment() : Equipo {
    return this.equipment;
  }

  public getState() : States {
    return this.state;
  }

  public getOffice() : Oficina {
    return this.office;
  }

  public getOwner() : Usuario {
    return this.owner;
  }

  public setSerialNumber(serialNumber: string) : void {
    this.serialNumber = serialNumber;
  }

  public setEquipment(equipment: Equipo) : void {
    this.equipment = equipment;
  }

  public setState(state: States) : void {
    this.state = state;
  }

  public setOffice(office: Oficina) : void {
    this.office = office;
  }

  public setOwner(owner: Usuario) : void {
    this.owner = owner;
  }

  public toString() : string {
    return this.serialNumber + " " + this.equipment.toString() + " " + this.state + " " + this.office.toString() + " " + this.owner.toString();
  }
}





