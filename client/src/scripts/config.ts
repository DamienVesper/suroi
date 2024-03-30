export const Config = {
    regions: {
        dev: { name: "CO-US01", address: "dv.suroi.io", https: true }
    },
    defaultRegion: "na",
    mode: "normal"
} satisfies ConfigType as ConfigType;

export interface ConfigType {
    readonly regions: Record<string, {
        readonly name: string
        readonly address: string
        readonly https: boolean
    }>
    readonly defaultRegion: string
    readonly mode: string
}
