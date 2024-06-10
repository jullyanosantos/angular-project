export class Role {

    id: number | undefined
    name!: string
    displayName!: string
    isStatic!: boolean
    isDefault!: boolean
    grantedPermissions: string[] | undefined
    creationDateTime!: string
}