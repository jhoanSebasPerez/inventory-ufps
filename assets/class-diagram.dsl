
classDiagram

class Categoria{
            +id: number
+name: string
+description: string
+euipos: Equipo[]
            #addEquipo() void
+removeEquipo() void
#getEquipos() Equipo[]
#getEquipo() Equipo | undefined
#getId() number
#getName() string
#getDescription() string
#setId() void
#setName() void
#setDescription() void
#setEquipos() void
#toString() string
        }
class Equipo{
            +id: number
+name: string
+description: string
+brand: string
+model: string
+category: Categoria
+quantity: number
+unidades: Unidad[]
            #getId() number
#getName() string
#addUnidad() void
#removeUnidad() void
#getUnidades() Unidad[]
#getUnidad() Unidad | undefined
#getDescription() string
#getBrand() string
#getModel() string
#getCategory() Categoria
#getQuantity() number
#setId() void
#setName() void
#setDescription() void
#setBrand() void
#setModel() void
#setCategory() void
#setQuantity() void
#toString() string
        }
class Usuario{
            +codigo: string
+name: string
+email: string
+password: string
+role: Roles
            #getCodigo() string
#getName() string
#getEmail() string
#getPassword() string
#getRole() Roles
#setCodigo() void
#setName() void
#setEmail() void
#setPassword() void
#setRole() void
#toString() string
        }
class Oficina{
            +id: number
+location: string
+description: string
            #getLocation() string
#getDescription() string
#setLocation() void
#setDescription() void
#toString() string
        }
class Unidad{
            +serialNumber: string
+equipment: Equipo
+state: States
+office: Oficina
+owner: Usuario
            #getSerialNumber() string
#getEquipment() Equipo
#getState() States
#getOffice() Oficina
#getOwner() Usuario
#setSerialNumber() void
#setEquipment() void
#setState() void
#setOffice() void
#setOwner() void
#toString() string
        }
class Roles {
        <<enumeration>>
        ADMIN
OWNER
JEFE_MANTENIMIENTO
ENCARGADO_MANTENIMIENTO
      }
class States {
        <<enumeration>>
        BUENO
MALO
REGULAR
      }