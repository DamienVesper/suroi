import { GasState } from "../../../common/src/constants";

export interface GasStage {
    readonly state: GasState
    readonly duration: number
    readonly oldRadius: number
    readonly newRadius: number
    readonly dps: number
    readonly preventJoin?: boolean
}

export const GasStages: GasStage[] = [
    {
        state: GasState.Inactive,
        duration: 0,
        oldRadius: 256,
        newRadius: 160,
        dps: 25
    },
    {
        state: GasState.Waiting,
        duration: 30,
        oldRadius: 256,
        newRadius: 160,
        dps: 25
    },
    {
        state: GasState.Advancing,
        duration: 5,
        oldRadius: 256,
        newRadius: 160,
        dps: 10
    },
    {
        state: GasState.Waiting,
        duration: 10,
        oldRadius: 160,
        newRadius: 128,
        dps: 10
    },
    {
        state: GasState.Advancing,
        duration: 5,
        oldRadius: 160,
        newRadius: 128,
        dps: 15 //,
        // preventJoin: true
    },
    {
        state: GasState.Waiting,
        duration: 10,
        oldRadius: 128,
        newRadius: 64,
        dps: 20
    },
    {
        state: GasState.Advancing,
        duration: 10,
        oldRadius: 128,
        newRadius: 64,
        dps: 25
    },
    {
        state: GasState.Waiting,
        duration: 15,
        oldRadius: 64,
        newRadius: 32,
        dps: 25
    },
    {
        state: GasState.Advancing,
        duration: 5,
        oldRadius: 64,
        newRadius: 32,
        dps: 30
    },
    {
        state: GasState.Waiting,
        duration: 60,
        oldRadius: 32,
        newRadius: 0,
        dps: 30
    },
    {
        state: GasState.Advancing,
        duration: 5,
        oldRadius: 32,
        newRadius: 0,
        dps: 15
    },
    {
        state: GasState.Waiting,
        duration: 0,
        oldRadius: 0,
        newRadius: 0,
        dps: 15
    }
];

//console.log(GasStages.reduce((a, b) => a + b.duration, 0));
