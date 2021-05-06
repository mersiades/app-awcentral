import { Vehicle } from '../../@types/dataInterfaces';
import { BattleOptionType, VehicleFrameType, VehicleType } from '../../@types/enums';

export const mockVehicle1: Vehicle = {
  id: 'mock-vehicle-id-1',
  vehicleType: VehicleType.car,
  name: 'Mock Vehicle 1',
  vehicleFrame: {
    id: 'mock-vehicle-frame-id-1',
    frameType: VehicleFrameType.large,
    massive: 3,
    examples: 'Garbage truck, bus',
    battleOptionCount: 2,
  },
  speed: 0,
  handling: 1,
  massive: 3,
  armor: 1,
  battleOptions: [
    {
      id: 'mock-battle-option-id-1',
      battleOptionType: BattleOptionType.armor,
      name: '+1armor',
    },
    {
      id: 'mock-battle-option-id-1',
      battleOptionType: BattleOptionType.armor,
      name: '+1handling',
    },
  ],
  strengths: ['fast'],
  weaknesses: ['guzzler'],
  looks: ['muscular'],
};

export const mockVehicles: Vehicle[] = [mockVehicle1];
