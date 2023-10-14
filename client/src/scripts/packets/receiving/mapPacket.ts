import { ObjectCategory } from "../../../../../common/src/constants";
import { type BuildingDefinition } from "../../../../../common/src/definitions/buildings";
import { RotationMode, type ObstacleDefinition } from "../../../../../common/src/definitions/obstacles";
import { type Orientation, type Variation } from "../../../../../common/src/typings";
import { River } from "../../../../../common/src/utils/mapUtils";
import { type ObjectType } from "../../../../../common/src/utils/objectType";
import { type SuroiBitStream } from "../../../../../common/src/utils/suroiBitStream";
import { type Vector } from "../../../../../common/src/utils/vector";
import { ReceivingPacket } from "../../types/receivingPacket";

export class MapPacket extends ReceivingPacket {
    seed!: number;
    width!: number;
    height!: number;
    oceanSize!: number;
    beachSize!: number;

    readonly rivers: River[] = [];

    readonly obstacles: Array<{
        type: ObjectType<ObjectCategory.Obstacle, ObstacleDefinition>
        position: Vector
        rotation: number
        scale: number
        variation?: Variation
    }> = [];

    readonly buildings: Array<{
        type: ObjectType<ObjectCategory.Building, BuildingDefinition>
        position: Vector
        orientation: Orientation
        rotation: number
    }> = [];

    readonly places: Array<{
        position: Vector
        name: string
    }> = [];

    override deserialize(stream: SuroiBitStream): void {
        this.seed = stream.readUint32();
        this.width = stream.readUint16();
        this.height = stream.readUint16();
        this.oceanSize = stream.readUint16();
        this.beachSize = stream.readUint16();

        const riverCount = stream.readBits(4);
        for (let i = 0; i < riverCount; i++) {
            const width = stream.readUint8();

            const pointsCount = stream.readUint8();

            const points = new Array<Vector>(pointsCount);

            for (let i = 0; i < pointsCount; i++) {
                points[i] = stream.readPosition();
            }

            this.rivers.push(new River(width, points));
        }

        const numObstacles = stream.readBits(11);

        for (let i = 0; i < numObstacles; i++) {
            const type = stream.readObjectType();

            const position = stream.readPosition();

            switch (type.category) {
                case ObjectCategory.Obstacle: {
                    const scale = stream.readScale();
                    const definition = type.definition as ObstacleDefinition;
                    const rotation = stream.readObstacleRotation(definition.rotationMode).rotation;

                    let variation: Variation | undefined;
                    if (definition.variations !== undefined) {
                        variation = stream.readVariation();
                    }
                    this.obstacles.push({
                        position,
                        type: type as ObjectType<ObjectCategory.Obstacle, ObstacleDefinition>,
                        scale,
                        rotation,
                        variation
                    });
                    break;
                }
                case ObjectCategory.Building: {
                    const { orientation, rotation } = stream.readObstacleRotation(RotationMode.Limited);
                    this.buildings.push({
                        position,
                        type: type as ObjectType<ObjectCategory.Building, BuildingDefinition>,
                        orientation,
                        rotation
                    });
                    break;
                }
            }
        }

        const placesSize = stream.readBits(4);
        for (let i = 0; i < placesSize; i++) {
            const name = stream.readASCIIString(24);
            const position = stream.readPosition();
            this.places.push({ position, name });
        }
    }
}
