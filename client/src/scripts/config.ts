export const Config = {
    regions: {
        dev: { name: "Local Server", address: "dv.suroi.io", https: true },
        // na: { name: "North America", address: "suroi.io", https: true },
        // eu: { name: "Europe", address: "eu.suroi.io", https: true },
        // sa: { name: "South America", address: "sa.suroi.io", https: true },
        // as: { name: "Asia", address: "as.suroi.io", https: true }
    },
    defaultRegion: "dev"
} satisfies ConfigType as ConfigType;

export interface ConfigType {
    readonly regions: Record<string, {
        name: string
        address: string
        https: boolean
    }>
    readonly defaultRegion: string
}
