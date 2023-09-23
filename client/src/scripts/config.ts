export interface ConfigType {
    readonly regions: Record<string, {
        name: string
        address: string
        https: boolean
    }>
    readonly defaultRegion: string
}

export const Config = {
    regions: {
        dev: { name: "Local Server", address: "dv.suroi.io", https: true },
        na: { name: "North America (Detroit)", address: "suroi.io", https: true },
        eu: { name: "Europe (Berlin)", address: "eu.suroi.io", https: true },
        sa: { name: "South America (São Paulo)", address: "sa.suroi.io", https: true },
        as: { name: "Asia (Osaka)", address: "as.suroi.io", https: true }
    },
    defaultRegion: "dev"
} satisfies ConfigType as ConfigType;
